

# Package Single Version in WAR

ZK doesn't support running 2 different versions in a single web
application (WAR). Mixing Compact Edition/official version with
evaluation version is not allowed. Please be sure you package only one
single version of ZK JAR into a WAR.

For example, if you include **zul:9.6.0** and **zkex:9.6.3**, then you
will see the following messages when starting a server:

    2023-03-02 09:21:44 [INFO ] ConfigParser:116 - Ignore jar:file:/Users/yourName/.m2/repository/org/zkoss/zk/zkex/9.6.3/zkex-9.6.3.jar!/metainfo/zk/config.xml
    Cause: ZK version must be 9.6.3 or later, not 9.6.0
    ...
    Your ZK binary is being altered and may not work as expected. Please contact us at info@zkoss.org for assistance.

# Package ZK As a Shared Library

This is a not-recommended practice. Since ZK stores its configurations
(parsed from `zk.xml`) as a static object, all your zk applications in
the same application server will have the same configurations. If you
change a configuration (library property), it will affect all zk
applications.

# Package as EAR

An EAR file contains one or more JAR and WAR.

## Notice for Form Binding

If you package multiple WAR files and EJB as an EAR file and use form
binding on an entity bean packaged in EJB jar, you need to arrange
zkbind jar in the following way, or you might encounter the error:

`java.lang.NoClassDefFoundError: org/zkoss/bind/proxy/FormProxyObject`

1.  put `zkbind-api.jar` and `javassist.jar` in a shared library
2.  package `zkbind-impl.jar` in a WAR.
3.  make sure a WAR doesn't contain `zkbind-api.jar`

Check [this EAR demo project](https://github.com/hawkchen/ear-demo) for
details.

**myapp.ear**

    lib/javassist.jar
    lib/zkbind-api.jar
    lib/zk.jar (and its dependent jar)

    myapp-ejb.jar (MyEntity.java)

    myapp.war/WEB-INF/lib/zkbind-impl.jar
    myapp.war/WEB-INF/lib/other ZK jars (but NO zkbind-api.jar here)

If you don't use form binding or don't use form binding on a bean in an
EJB jar, then you don't need above arrangement.

### Underlying Details

In enterprise application server, each module has its own class loader
like: ![](HierachicalClassLoader.jpg "HierachicalClassLoader.jpg")

When ZK creates a proxy object based on EJB class with javassist, it
uses the target object's class loader. In this case, it's EJB's class
loader.

**The related code in javassist:3.28.0-GA**

``` java
public class ProxyFactory {
...
    protected ClassLoader getClassLoader0() {
        ClassLoader loader = null;
        if (superClass != null && !superClass.getName().equals("java.lang.Object"))
            loader = superClass.getClassLoader();
```

- Line 6: `superClass` is the EJB bean to be proxied.

Since parent class loader cannot know the classed loaded by its child
class loader, EarClassLoader doesn't know the classes loaded by
WebappClassLoader. So it will throw
`java.lang.NoClassDefFoundError: org/zkoss/bind/proxy/FormProxyObject`
because zkbind.jar is in a WAR.

Hence, that's the reason you need to put zkbind-api.jar in `/lib` (out
of WAR) in order to be loaded by EarLibClassLoader.

(Related issues: [ZK-2932](https://tracker.zkoss.org/browse/ZK-2932),
[ZK-3135](https://tracker.zkoss.org/browse/ZK-3135) ,
[ZK-4554](https://tracker.zkoss.org/browse/ZK-4554),
[ZK-5256](https://tracker.zkoss.org/browse/ZK-5256))

#### Class Loader Hierarchy in Glassfish 6

**WAR**

WebappClassLoader (load classes under WEB-INF) ➡️  
EarClassLoader ➡️  
org.glassfish.internal.api.DelegatingClassLoader@6144db94 ➡️  
EarLibClassLoader (load jar in lib) ➡️  
org.glassfish.internal.api.DelegatingClassLoader@76bcc8a2 ➡️  
java.net.URLClassLoader@42561fba ➡️  
APIClassLoader ➡️  
jdk.internal.loader.ClassLoaders\$PlatformClassLoader@80937

**EJB**

EarClassLoader ➡️  
org.glassfish.internal.api.DelegatingClassLoader@6144db94 ➡️  
EarLibClassLoader ➡️  
org.glassfish.internal.api.DelegatingClassLoader@76bcc8a2 ➡️  
java.net.URLClassLoader@42561fba ➡️  
APIClassLoader ➡️  
jdk.internal.loader.ClassLoaders\$PlatformClassLoader@80937
