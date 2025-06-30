**Syntax:**

```xml
<server-push-class>a_class_name</server-push-class>
```

`[Optional][Default: `depends on device and what edition you use`]`

It specifies which class used to implement the server-push feature. The
class must have a default constructor (without any argument), and
implement the
[org.zkoss.zk.ui.sys.ServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/ServerPush.html)
interface.

```xml
 <device-config>
     <device-type>ajax</device-type>
     <server-push-class>my.ServerPush</server-push-class>
 </device-config>
```

In addition to configuring the application's default implementation, you
can choose an implement for a particular class by the use of
[org.zkoss.zk.ui.sys.DesktopCtrl#enableServerPush(org.zkoss.zk.ui.sys.ServerPush)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/DesktopCtrl.html#enableServerPush(org.zkoss.zk.ui.sys.ServerPush)).
For example,

```java
((DesktopCtrl)desktop).enableServerPush(new org.zkoss.zk.ui.impl.PollingServerPush());
```


