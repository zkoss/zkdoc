

You could have some custom initialization and cleanup when an
application, a session, a desktop or an execution is instantiated or
about to be destroyed.

There are two steps:

1.  Implements the corresponding interface. For example,
    [org.zkoss.zk.ui.util.WebAppInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/WebAppInit.html)
    for application's initialization
2.  Register it in `WEB-INF/zk.xml`, or in Java.

# Interfaces

| Task                | Interface                                                                 |
|---------------------|---------------------------------------------------------------------------|
| Application Init    | [org.zkoss.zk.ui.util.WebAppInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/WebAppInit.html)       |
| Application Cleanup | [org.zkoss.zk.ui.util.WebAppCleanup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/WebAppCleanup.html)    |
| Session Init        | [org.zkoss.zk.ui.util.SessionInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/SessionInit.html)      |
| Session Cleanup     | [org.zkoss.zk.ui.util.SessionCleanup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/SessionCleanup.html)   |
| Desktop Init        | [org.zkoss.zk.ui.util.DesktopInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/DesktopInit.html)      |
| Desktop Cleanup     | [org.zkoss.zk.ui.util.DesktopCleanup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/DesktopCleanup.html)   |
| Execution Init      | [org.zkoss.zk.ui.util.ExecutionInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ExecutionInit.html)    |
| Execution Cleanup   | [org.zkoss.zk.ui.util.ExecutionCleanup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ExecutionCleanup.html) |

Notice that ZK will instantiate an object from the class you registered
for each callback. For example, an object is instantiated to invoke
<javadoc method="init(org.zkoss.zk.ui.Desktop, java.lnag.Object)" type="interface">org.zkoss.zk.ui.util.DesktopInit</javadoc>,
and another object instantiated to invoke
<javadoc method="cleanup(org.zkoss.zk.ui.Desktop)" type="interface">org.zkoss.zk.ui.util.DesktopCleanup</javadoc>,
even if you register a class that implements both
[org.zkoss.zk.ui.util.DesktopInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/DesktopInit.html) and
[org.zkoss.zk.ui.util.DesktopCleanup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/DesktopCleanup.html).

If you have something that is initialized in the init callback and have
to clean it up in the cleanup callback, you cannot store it as a data
member. Rather, you have to maintain it by yourself, such as storing it
in the desktop's attributes
(<javadoc type="interface" method="setAttribute(java.lang.String, java.lang.Object)">org.zkoss.zk.ui.Desktop</javadoc>),
session's attributes or application's attributes.

# Registration

The registration in `WEB-INF/zk.xml` is the same, no matter what
interface you implement:

```xml
<listener>
    <listener-class>my.MyImplementation</listener-class>
</listener>
```

The registration in Java is done by
<javadoc method="addListener(java.lang.Class)">org.zkoss.zk.ui.util.Configuration</javadoc>.

```java
webapp.getConfiguration().addListener(my.MyImplementation.class);
```
