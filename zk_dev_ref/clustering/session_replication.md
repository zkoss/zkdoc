# Session Replication

This document provides comprehensive guidance for implementing and troubleshooting ZK session replication in clustered environments. Based on analysis of production support tickets, this guide addresses the most common issues with their root causes and solutions.

# Performance Challenge

The major challenge is: session replication serializes the entire session including ZK's Desktop and component tree on every AU request.

## Large Destkop and Component Tree
ZK stores a Desktop and a whole component tree in a Session attribute. Since app developers build a page with zk components mostly, each page usually contains lots of components which enlarge a session size. A large session takes longer time to replicate.

## Component States Changes Frequently
Each AU request might invoke an event listener that changes a component's state. That means a Session state also changes, so you need to replicate the session every time. This can lead to high replication overhead, especially in applications with frequent UI updates.


## Solutions:
- **Minimize session size** - only store essential information and optimize the number of component in each page. Reducing the number of components reduces session size. See [Performance Tips]({{site.baseurl}}/zk_dev_ref/performance_tips)
- **Use lazy loading** for heavy objects, see [Defer the Creation of Child Components]({{site.baseurl}}/zk_dev_ref/performance_tips/defer_the_creation_of_child_components).
- Use Client binding to reduce server-side state management, see [Client Binding]({{site.baseurl}}/zk_mvvm_ref/data_binding/client_binding_api).
- **Consider application-level caching** instead of session storage
- **Monitor replication overhead** in network traffic
- **Use transient fields** for non-essential data that can be recomputed

# Common Issues and Solutions

## Serialization Failures

**Most frequent issue**: `NotSerializableException` during session replication

### Root Causes

**Framework Level:**
- ZK internal classes with non-serializable logger fields
- Default components storing non-serializable references
- Session hierarchy requiring full serialization chain

**Application Level:**
- ViewModels not implementing `Serializable`
- Composers containing non-serializable fields (especially logger instances)
- Non-serializable third-party libraries in session scope

### Solutions
* Regarding ZK related classes, report to ZK support team for further assistance.
* Regarding application classes, application developers should ensure all classes stored in the session implement `Serializable` and follow best practices for serialization.

## Logger Serialization Issues

```
java.io.NotSerializableException: org.apache.log4j.Logger
java.io.NotSerializableException: java.util.logging.Logger
```

### Solution
Make logger fields static (as detailed in [Programming Tips]({{site.baseurl}}/zk_dev_ref/clustering/programming_tips))
```java
// Instead of:
private final Logger logger = LoggerFactory.getLogger(getClass());

// Use:
private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
```

## Custom Class Serialization

### Solution

ViewModel should implement `Serializable`:
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


## Configuration Issues

### Root Causes
- Missing ZK clustering configuration
- Incomplete application server setup
- ZScript compatibility problems in clustered environments

### Solutions
1. Ensure `SerializableUiFactory` is configured (see [ZK Configuration]({{site.baseurl}}/zk_dev_ref/clustering/zk_configuration))
2. Add `<distributable/>` to web.xml
3. Disable ZScript in clustered environments
4. Configure proper load balancer with sticky sessions (see [Server Configuration]({{site.baseurl}}/zk_dev_ref/clustering/server_configuration))

## Session Timing Problems

### Root Causes
- UI changes not triggering session replication automatically
- Framework not detecting session modifications

### Solutions

**Manual Session Replication Trigger:**
For cases where UI changes don't automatically trigger replication:

```java
public void myEventListener() {
    // Perform your business logic
    updateUserData();
    
    // Manually trigger session replication
    Sessions.getCurrent().setAttribute("_manual_replication_trigger", 
                                     System.currentTimeMillis());
}
```

**ExecutionCleanup Listener:**
Force session replication after each request:

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

#Testing and Validation

## Serialization Testing

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