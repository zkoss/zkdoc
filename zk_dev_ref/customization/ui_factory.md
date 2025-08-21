---
title: "UI Factory"
---

[org.zkoss.zk.ui.sys.UiFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/UiFactory.html) is
used to instantiate all UI objects, such as session, desktop, and
components, and to load ZUML documents. You could customize it to
provide the functionality you want.

For example,
[org.zkoss.zk.ui.http.SerializableUiFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/http/SerializableUiFactory.html) is the
factory used to instantiate sessions that are serializable[^1], while
[org.zkoss.zk.ui.http.SimpleUiFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/http/SimpleUiFactory.html), the default
factory, instantiates non-serializable sessions.

Here are a list of customization you could do with UI Factory:

- Load a ZUML document from, say, a database
  - It can be done by overriding
    [org.zkoss.zk.ui.sys.UiFactory#getPageDefinition(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/UiFactory.html#getPageDefinition(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String))
- Instantiate a component by using a different implementation
  - It can be done by overriding
    [org.zkoss.zk.ui.sys.UiFactory#newComponent(org.zkoss.zk.ui.Page, org.zkoss.zk.ui.Component, org.zkoss.zk.ui.metainfo.ComponentInfo)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/UiFactory.html#newComponent(org.zkoss.zk.ui.Page, org.zkoss.zk.ui.Component, org.zkoss.zk.ui.metainfo.ComponentInfo))
    and
    [org.zkoss.zk.ui.sys.UiFactory#newComponent(org.zkoss.zk.ui.Page, org.zkoss.zk.ui.Component, org.zkoss.zk.ui.metainfo.ComponentInfo, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/UiFactory.html#newComponent(org.zkoss.zk.ui.Page, org.zkoss.zk.ui.Component, org.zkoss.zk.ui.metainfo.ComponentInfo, java.lang.String)).
  - Instantiate a desktop by using a different implementation
  - It can be done by overriding
    [org.zkoss.zk.ui.sys.UiFactory#newDesktop(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/UiFactory.html#newDesktop(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String, java.lang.String))
  - Instantiate a page by using a different implementation
  - It can be done by overriding
    [org.zkoss.zk.ui.sys.UiFactory#newPage(org.zkoss.zk.ui.sys.RequestInfo, org.zkoss.zk.ui.metainfo.PageDefinition, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/UiFactory.html#newPage(org.zkoss.zk.ui.sys.RequestInfo, org.zkoss.zk.ui.metainfo.PageDefinition, java.lang.String))
    and/or
    [org.zkoss.zk.ui.sys.UiFactory#newPage(org.zkoss.zk.ui.sys.RequestInfo, org.zkoss.zk.ui.Richlet, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/UiFactory.html#newPage(org.zkoss.zk.ui.sys.RequestInfo, org.zkoss.zk.ui.Richlet, java.lang.String))

Notice that it is suggested to extend from either
[org.zkoss.zk.ui.http.SerializableUiFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/http/SerializableUiFactory.html) or
[org.zkoss.zk.ui.http.SimpleUiFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/http/SimpleUiFactory.html), rather than to
implement
[org.zkoss.zk.ui.sys.UiFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/UiFactory.html) from
scratch.


# Load ZUML from Database

The default implementation of
[org.zkoss.zk.ui.impl.AbstractUiFactory#getPageDefinition(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/impl/AbstractUiFactory.html#getPageDefinition(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String))
loads the ZUML document from the Web application's resources (i.e., the
files found in a Web application). If you prefer to load from other
sources, such as a database, you could override it.

The pseudo code will look like the following:

```java
public class MyUiFactory extends SimpleUiFactory {
    @Override
    public PageDefinition getPageDefinition(RequestInfo ri, String path) {
        PageDefinition pgdef = getFromCache(path); //your cache implementation
        if (pgdef == null) {
            String content = loadFromDatabase(path); //your resource loading
            pgdef = getPageDefinition(ri, content, "zul"); //delegate to SimpleUiFactory
            setCache(path, pgdef); //cache the result
        }
        return pgdef;
    }
}
```

where we assume you implemented `loadFromDatabase` to load the ZUML
document from a database. In addition, you have to implement
`getFromCache` and `setCache` to cache the result in order to improve
the performance of retrieving the document from the database.

On the other hand, the parsing of the ZUML document can be done easily
by calling
[org.zkoss.zk.ui.impl.AbstractUiFactory#getPageDefinitionDirectly(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/impl/AbstractUiFactory.html#getPageDefinitionDirectly(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String, java.lang.String)).

[^1]: Then, the application is able to run in a clustering environment.
    For more information, please refer to the [Clustering section]({{site.baseurl}}/zk_dev_ref/clustering/zk_configuration)
