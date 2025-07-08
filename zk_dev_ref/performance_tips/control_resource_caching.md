

# Understanding ZK cache breaking by URL

ZK applications rely on a number of resource files loaded by a browser.
These resources are mainly JS and CSS packages, but can also include
images or other binaries necessary on client side. To improve
performance, default ZK applications will use the following caching
strategy. Resources are served to the client via a URL containing a hash
value of the ZK version e.g. `http://myapp/zkau/web/b33ca6ab/mycss.css`. If the ZK version doesn't change, this hash
value will stay identical between server restarts, sessions, and page
loading. This allows browsers to cache ZK resources, since the URL
doesn't change between page loads, and thus reduce page initialization
times on client side.

When the ZK version changes, the hash value contained in the resources
URLs also changes, and thus breaks caching on client side. This is
important, as ZK internal JavaScript files should only be used in their
intended ZK version.

In effect, this means that internal ZK files will be cached unless the
ZK version is changed. After version changes, the resources are
downloaded and the new version is cached, replacing the outdated
resources.

# Loading resources through the ZK cache enabled URLs

Resources loaded from the classpath, by `~./`, or from ZK
[ClassWebResources]({{site.baseurl}}/zk_config_ref/org.zkoss.web.util.resource.dir)
folder will be delivered to browsers through the same URL patterns as
the internal ZK resources. This can apply to resources declared globally
in `lang-addon`, or locally in a page with a script or style tag.


# Forcing Cache Clearing for Non-ZK Resources

Browsers may cache resources referenced in your application, and updates to those resources might not be reflected without a cache-clearing mechanism. To address this, ZK provides the following ways to force cache clearing by updating resource URLs with built-in hashed values.


## 1. Use the `versionInfo` Property in `zk.xml`

Specify a custom string for the `org.zkoss.zk.ui.versionInfo.enabled` library property in your `zk.xml` file. This string acts as a "salt" in the URL hash generation. By changing this string, you trigger a new hash, effectively invalidating cached resources.

### Steps:
1. Open your `zk.xml` file.
2. Add or update the following property:
```xml
   <library-property>
       <name>org.zkoss.zk.ui.versionInfo.enabled</name>
       <value>my-custom-version-1</value>
   </library-property>
```
3. Deploy the updated configuration. A new URL hash is generated, invalidating the cache.

More information is available here:
[org.zkoss.zk.ui.versionInfo.enabled]({{site.baseurl}}/zk_config_ref/org.zkoss.zk.ui.versioninfo.enabled)


## 2. Create a Custom WebApp Class
Override the default `SimpleWebApp` class and implement a custom `getBuild()` method. This ensures unique build values for resource URLs.

### Example 1: Force Cache Clearing on Server Restart
This example appends a timestamp to the build version to force cache clearing each time the server restarts:

```java
public class ForceResourcesUpdateWebapp extends SimpleWebApp {

    private String randomizer;
    
    @Override
    public void init(Object context, Configuration config) {
        super.init(context, config);
        randomizer = Long.toHexString(System.currentTimeMillis());
    }
    
    @Override
    public String getBuild() {
        return super.getBuild()+randomizer;
    }
}
```

### Example 2: Use a Fixed Build Version
This example appends a static version string to the build:

```java
public class ForceResourcesUpdateWebapp extends SimpleWebApp {
        @Override
    public String getBuild() {
        return super.getBuild()+"1.1.0";
    }
}
```

Once the webapp class has been 
created, you need to declare it in `zk.xml` such as:

```xml
    <system-config>
      <web-app-class>foo.bar.ForceResourcesUpdateWebapp</web-app-class>
    </system-config>
```

### Additional Resources

- [Cache break on webapp restart](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/java/org/zkoss/reference/developer/performance/controlcache/ForceResourcesUpdateOnRestartWebapp.java)
- [Cache break on build ID change](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/java/org/zkoss/reference/developer/performance/controlcache/ForceResourcesUpdateOnBuildChangeWebapp.java)
- [Custom webapp class declaration in zk.xml](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/webapp/WEB-INF/zk.xml#L587)
