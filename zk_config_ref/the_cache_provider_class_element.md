**Syntax:**

```xml
<cache-provider-class>a_class_name</cache-provider-class>
```

`[Default: `org.zkoss.zk.ui.impl.SessionDesktopCacheProvider`]`

It specifies which class is used to implement the desktop cache. The
class must have a default constructor (without any argument), and
implement the
[org.zkoss.zk.ui.sys.DesktopCacheProvider](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/DesktopCacheProvider.html)
interface.

One instance of the cache provider is created and shared for each Web
application, so you have to synchronize the access properly.

Available implementations are as follows.

| Class | Description |
|:-----:|:------------|
| `org.zkoss.zk.ui.impl.SessionDesktopCacheProvider` | It stores all desktops from the same session in one single cache. It is simple and fast, but not supporting clustering by default. To support clustering, please check the [configuration for clustering]({{site.baseurl}}/zk_dev_ref/clustering/zk_configuration). |
| `org.zkoss.zk.ui.impl.GlobalDesktopCacheProvider` | It stores all desktops from the same Web application in one single cache. In other words, it doesn't count on session at all.<br><br>It is useful because some Web server, e.g, [BEA WebLogic](http://www.bea.com/), might be configured to use independent sessions for each request. |


