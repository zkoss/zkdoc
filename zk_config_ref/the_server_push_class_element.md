**Syntax:**

<server-push-class>a_class_name</server-push-class>

`[Optional][Default: `depends on device and what edition you use`]`

It specifies which class used to implement the server-push feature. The
class must have a default constructor (without any argument), and
implement the
<javadoc type="interface">org.zkoss.zk.ui.sys.ServerPush</javadoc>
interface.

```xml
 <device-config>
     <device-type>ajax</device-type>
     <server-push-class>my.ServerPush</server-push-class>
 </device-config>
```

In addition to configuring the application's default implementation, you
can choose an implement for a particular class by the use of
<javadoc method="enableServerPush(org.zkoss.zk.ui.sys.ServerPush)">org.zkoss.zk.ui.sys.DesktopCtrl</javadoc>.
For example,

```java
((DesktopCtrl)desktop).enableServerPush(new org.zkoss.zk.ui.impl.PollingServerPush());
```


