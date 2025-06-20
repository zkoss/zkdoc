# Session Replication Overview

This document provides comprehensive guidance for implementing and troubleshooting ZK session replication in clustered environments. Based on analysis of production support tickets, this guide addresses the most common issues and provides proven solutions.

## Common Issues

### 1. Serialization Failures

**Most frequent issue**: `NotSerializableException` during session replication

#### Logger Serialization Issues
```
java.io.NotSerializableException: org.apache.log4j.Logger
java.io.NotSerializableException: java.util.logging.Logger
```

**Affected Components:**
- UserBarCtrl with logger fields
- TrackerImpl in ZK framework
- Custom ViewModels with logger references

#### Custom Class Serialization
- ViewModels not implementing `Serializable`
- Composers containing non-serializable fields
- Session attributes storing complex objects

### 2. Configuration Issues

- Missing ZK clustering configuration
- Incomplete application server setup
- ZScript compatibility problems in clustered environments

### 3. Session Timing Problems

- UI changes not triggering session replication
- Manual session replication requirements
- Spring Session integration complexities

## Root Causes

### Framework Level
```
HttpSession → SerializableSession → DesktopCache → Desktop → Components
```

- ZK internal classes with non-serializable logger fields
- Default components storing non-serializable references
- Session hierarchy requiring full serialization chain

### Application Level
- Developers not implementing `Serializable` interface
- Non-serializable third-party libraries in session scope
- Incorrect understanding of ZK serialization requirements

### Infrastructure Level
- Application server clustering misconfiguration
- Load balancer session affinity issues
- Missing clustering-specific ZK settings


## Solutions and Fixes

### 1. General Serialization Requirements

For general programming requirements including serializable objects, event listeners, and data models, please refer to [Programming Tips]({{site.baseurl}}/zk_dev_ref/clustering/programming_tips).

### 2. Session Replication Specific Fixes

#### Logger Serialization Fix

**Problem**: Logger fields causing serialization failures

**Solution**: Make logger fields static (as detailed in Programming Tips)
```java
// Instead of:
private final Logger logger = LoggerFactory.getLogger(getClass());

// Use:
private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
```

#### Custom Class Serialization for Session Replication

**ViewModel Implementation:**
```java
public class EventsMessageViewModel implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Logger logger = LoggerFactory.getLogger(EventsMessageViewModel.class);
    
    // Serializable fields
    private String message;
    private List<String> events;
    
    // Non-serializable fields marked as transient
    private transient DatabaseConnection dbConnection;
    
    // Implement readObject for transient field initialization
    private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        // Reinitialize transient fields after deserialization
        initializeTransientFields();
    }
    
    private void initializeTransientFields() {
        dbConnection = DatabaseFactory.getConnection();
    }
}
```

**Composer Implementation:**
```java
public class UserBarCtrl extends SelectorComposer<Component>{
    private static final long serialVersionUID = 1L;
    private static final Logger logger = LoggerFactory.getLogger(UserBarCtrl.class);
    
    // Serializable fields only
    private String userName;
    private List<String> permissions;
}
```

### 3. Manual Session Replication Trigger

For cases where UI changes don't automatically trigger replication:

```java
// In your event handler or service method
public void onSomeEvent() {
    // Perform your business logic
    updateUserData();
    
    // Manually trigger session replication
    Sessions.getCurrent().setAttribute("_manual_replication_trigger", 
                                     System.currentTimeMillis());
}
```

### 4. ExecutionCleanup Listener

```java
public class SessionReplicationCleanup implements ExecutionCleanup {
    @Override
    public void cleanup(Execution exec) throws Exception {
        // Force session replication after each request
        Session session = Sessions.getCurrent();
        if (session != null) {
            session.setAttribute("_replication_timestamp", System.currentTimeMillis());
        }
    }
}
```

Register in zk.xml:
```xml
<system-config>
    <listener>
        <listener-class>com.yourpackage.SessionReplicationCleanup</listener-class>
    </listener>
</system-config>
```

## Testing and Validation

### 1. Serialization Testing

**Test Method:**
```java
private <T> T testSerialization(T object) throws IOException, ClassNotFoundException {
    // Serialize
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    ObjectOutputStream oos = new ObjectOutputStream(baos);
    oos.writeObject(object);
    oos.close();
    
    // Deserialize
    ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
    ObjectInputStream ois = new ObjectInputStream(bais);
    T result = (T) ois.readObject();
    ois.close();
    
    return result;
}

// Usage
@Test
public void testViewModelSerialization() {
    MyViewModel viewModel = new MyViewModel();
    viewModel.setData("test data");
    
    try {
        MyViewModel deserialized = testSerialization(viewModel);
        assertEquals("test data", deserialized.getData());
    } catch (Exception e) {
        fail("ViewModel serialization failed: " + e.getMessage());
    }
}
```

### 2. Cluster Testing Procedure

1. **Setup**: Configure two application server instances with clustering
2. **Deploy**: Deploy application to both instances
3. **Test Session Creation**: Create session on instance 1
4. **Test Failover**: Stop instance 1, verify session continues on instance 2
5. **Test Session Updates**: Modify session data, verify replication
6. **Monitor Logs**: Check for serialization errors

##  Performance Considerations

- **Minimize session data size** - only store essential information. Besides, ZK stores a Desktop and a whole component tree in a Session attribute. So reducing the number of components can also reduces a session's size. See [Performance Tips]({{site.baseurl}}/zk_dev_ref/performance_tips).
- **Use lazy loading** for heavy objects, see [Defer the Creation of Child Components]({{site.baseurl}}/zk_dev_ref/performance_tips/defer_the_creation_of_child_components).
- **Consider application-level caching** instead of session storage
- **Monitor replication overhead** in network traffic

## Troubleshooting

### 1. Serialization Errors

**Symptom:**
```
java.io.NotSerializableException: com.yourpackage.SomeClass
```

**Diagnosis:**
1. Identify the class causing the issue from stack trace
2. Check if class implements Serializable
3. Look for non-serializable fields (loggers, connections, etc.)

**Resolution:**
1. Implement Serializable interface
2. Make problematic fields static or transient
3. Add custom serialization logic if needed

### 2. Session Not Replicating

**Symptom:** User session lost after server failover

**Diagnosis:**
1. Check application server clustering logs
2. Verify ZK clustering configuration
3. Monitor session replication timing

**Resolution:**
1. Verify `<distributable/>` in web.xml
2. Check `SerializableUiFactory` configuration
3. Add manual replication triggers if needed

### 3. Performance Issues

**Symptom:** Slow response times in clustered environment

**Diagnosis:**
1. Monitor session serialization size
2. Check network replication overhead
3. Analyze serialization frequency

**Resolution:**
1. Reduce session data size
2. Optimize serialization code
3. Consider selective replication strategies

### 4. Common Error Patterns

#### Logger Issues
```
org.zkoss.io.Serializables.smartWrite Unable to serialize entry
java.io.NotSerializableException: org.apache.log4j.Logger
```
**Fix:** Make logger static

#### Custom Class Issues
```
Cannot serialize session attribute [javax.zkoss.zk.ui.Session]
java.io.NotSerializableException: com.yourpackage.CustomViewModel
```
**Fix:** Implement Serializable interface

#### Framework Issues
```
org.apache.catalina.ha.session.DeltaSession.doWriteObject Cannot serialize session attribute
```
**Fix:** Check ZK version and apply patches if needed

## Conclusion

Successful ZK session replication requires careful attention to:
1. Proper serialization implementation at all levels
2. Correct ZK and application server configuration
3. Thorough testing of failover scenarios
4. Ongoing monitoring of cluster health

Following these guidelines will ensure reliable session replication in production ZK applications.