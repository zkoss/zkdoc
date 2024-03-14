\_\_TOC\_\_

# Understanding ZK cache breaking by URL

ZK applications rely on a number of resource files loaded by the client.
These resources are mainly JS and CSS packages, but can also include
images or other binaries necessary on client side. To improve
performance, default ZK applications will use the following caching
strategy. Resources are served to the client via a URL containing a hash
value of the ZK version. If the ZK version doesn't change, this hash
value will stay identical between server restarts, sessions, and page
loading. This allows clients to cache ZK resources, since the URL
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

Resources declared from the classpath, or from ZK
[ClassWebResources](https://www.zkoss.org/wiki/ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.web.util.resource.dir)
folder will be delivered to the clients through the same URL patterns as
the internal ZK resources. This can apply to resources declared globally
in lang-addon, or locally in a page with a script or style tag.

# Forcing a cache clear on non-ZK resources

Since clients may cache a specific version of resources declared this
way, they will not update them unless forced to do so by a clear-cache,
a forced refresh, or a ZK version change. A simple way to break the
cache when a new version of your resources must be downloaded is to use
the built-in hashed value in the resource URLs. As stated before, the
value will change if the ZK version changes. However, it will also
change if the webapp build id changes.

This can be done by creating a new WebApp class extending the default
SimpleWebApp and overriding the default getBuild() method. The build
returned can be generated automatically on webapp init to force the
clients to update on every server restart. It could also be defined
manually as a string, or retrieved from a database to only force a
restart when the developer updates the version id.

## Cache breaking with zk.xml property

The `org.zkoss.zk.ui.versionInfo.enabled` can be used with a STRING
value. If a STRING is declared as the value, this string will be used as
salt when generating the URL version hash. As a result, making a change
to this property will cause a new hash to be generated, and can be used
to force a cache break on all resources loaded through the version cache
url. This includes all internal ZK resources, such as JS and CSS content
from the ZK libraries.

More information is available here:
[org.zkoss.zk.ui.versionInfo.enabled](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.zk.ui.versionInfo.enabled)

## Examples

Generating a random number on startup

``` java
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

Manually setting a version id

``` java
public class ForceResourcesUpdateWebapp extends SimpleWebApp {
        @Override
    public String getBuild() {
        return super.getBuild()+"1.1.0";
    }
}
```

Once the webapp class has been created, it must be declared in zk.xml
such as:

``` xml
    <system-config>
      <web-app-class>foo.bar.ForceResourcesUpdateWebapp</web-app-class>
    </system-config>
```

## Code samples

The following samples are available in github

- [Cache break on webapp
  restart](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/java/org/zkoss/reference/developer/performance/controlcache/ForceResourcesUpdateOnRestartWebapp.java)
- [Cache break on build ID
  change](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/java/org/zkoss/reference/developer/performance/controlcache/ForceResourcesUpdateOnBuildChangeWebapp.java)
- [Custom webapp class declaration in
  zk.xml](https://github.com/zkoss/zkbooks/blob/master/developersreference/developersreference/src/main/webapp/WEB-INF/zk.xml#L587)
