\_\_TOC\_\_

You could have some custom initialization and cleanup when an
application, a session, a desktop or an execution is instantiated or
about to be destroyed.

There are two steps:

1.  Implements the corresponding interface. For example,
    <javadoc type="interface">org.zkoss.zk.ui.util.WebAppInit</javadoc>
    for application's initialization
2.  Register it in `WEB-INF/zk.xml`, or in Java.

# Interfaces

| Task                | Interface                                                                 |
|---------------------|---------------------------------------------------------------------------|
| Application Init    | <javadoc type="interface">org.zkoss.zk.ui.util.WebAppInit</javadoc>       |
| Application Cleanup | <javadoc type="interface">org.zkoss.zk.ui.util.WebAppCleanup</javadoc>    |
| Session Init        | <javadoc type="interface">org.zkoss.zk.ui.util.SessionInit</javadoc>      |
| Session Cleanup     | <javadoc type="interface">org.zkoss.zk.ui.util.SessionCleanup</javadoc>   |
| Desktop Init        | <javadoc type="interface">org.zkoss.zk.ui.util.DesktopInit</javadoc>      |
| Desktop Cleanup     | <javadoc type="interface">org.zkoss.zk.ui.util.DesktopCleanup</javadoc>   |
| Execution Init      | <javadoc type="interface">org.zkoss.zk.ui.util.ExecutionInit</javadoc>    |
| Execution Cleanup   | <javadoc type="interface">org.zkoss.zk.ui.util.ExecutionCleanup</javadoc> |

Notice that ZK will instantiate an object from the class you registered
for each callback. For example, an object is instantiated to invoke
<javadoc method="init(org.zkoss.zk.ui.Desktop, java.lnag.Object)" type="interface">org.zkoss.zk.ui.util.DesktopInit</javadoc>,
and another object instantiated to invoke
<javadoc method="cleanup(org.zkoss.zk.ui.Desktop)" type="interface">org.zkoss.zk.ui.util.DesktopCleanup</javadoc>,
even if you register a class that implements both
<javadoc type="interface">org.zkoss.zk.ui.util.DesktopInit</javadoc> and
<javadoc type="interface">org.zkoss.zk.ui.util.DesktopCleanup</javadoc>.

If you have something that is initialized in the init callback and have
to clean it up in the cleanup callback, you cannot store it as a data
member. Rather, you have to maintain it by yourself, such as storing it
in the desktop's attributes
(<javadoc type="interface" method="setAttribute(java.lang.String, java.lang.Object)">org.zkoss.zk.ui.Desktop</javadoc>),
session's attributes or application's attributes.

# Registration

The registration in `WEB-INF/zk.xml` is the same, no matter what
interface you implement:

``` xml
<listener>
    <listener-class>my.MyImplementation</listener-class>
</listener>
```

The registration in Java is done by
<javadoc method="addListener(java.lang.Class)">org.zkoss.zk.ui.util.Configuration</javadoc>.

``` java
webapp.getConfiguration().addListener(my.MyImplementation.class);
```
