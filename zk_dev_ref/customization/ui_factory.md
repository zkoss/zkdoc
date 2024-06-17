<javadoc type="interface">org.zkoss.zk.ui.sys.UiFactory</javadoc> is
used to instantiate all UI objects, such as session, desktop, and
components, and to load ZUML documents. You could customize it to
provide the functionality you want.

For example,
<javadoc>org.zkoss.zk.ui.http.SerializableUiFactory</javadoc> is the
factory used to instantiate sessions that are serializable[^1], while
<javadoc>org.zkoss.zk.ui.http.SimpleUiFactory</javadoc>, the default
factory, instantiates non-serializable sessions.

Here are a list of customization you could do with UI Factory:

- Load a ZUML document from, say, a database
  - It can be done by overriding
    <javadoc method="getPageDefinition(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String)" type="interface">org.zkoss.zk.ui.sys.UiFactory</javadoc>
- Instantiate a component by using a different implementation
  - It can be done by overriding
    <javadoc method="newComponent(org.zkoss.zk.ui.Page, org.zkoss.zk.ui.Component, org.zkoss.zk.ui.metainfo.ComponentInfo)" type="interface">org.zkoss.zk.ui.sys.UiFactory</javadoc>
    and
    <javadoc method="newComponent(org.zkoss.zk.ui.Page, org.zkoss.zk.ui.Component, org.zkoss.zk.ui.metainfo.ComponentInfo, java.lang.String)" type="interface">org.zkoss.zk.ui.sys.UiFactory</javadoc>.
  - Instantiate a desktop by using a different implementation
  - It can be done by overriding
    <javadoc method="newDesktop(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String, java.lang.String)" type="interface">org.zkoss.zk.ui.sys.UiFactory</javadoc>
  - Instantiate a page by using a different implementation
  - It can be done by overriding
    <javadoc method="newPage(org.zkoss.zk.ui.sys.RequestInfo, org.zkoss.zk.ui.metainfo.PageDefinition, java.lang.String)" type="interface">org.zkoss.zk.ui.sys.UiFactory</javadoc>
    and/or
    <javadoc method="newPage(org.zkoss.zk.ui.sys.RequestInfo, org.zkoss.zk.ui.Richlet, java.lang.String)" type="interface">org.zkoss.zk.ui.sys.UiFactory</javadoc>

Notice that it is suggested to extend from either
<javadoc>org.zkoss.zk.ui.http.SerializableUiFactory</javadoc> or
<javadoc>org.zkoss.zk.ui.http.SimpleUiFactory</javadoc>, rather than to
implement
<javadoc type="interface">org.zkoss.zk.ui.sys.UiFactory</javadoc> from
scratch.

> ------------------------------------------------------------------------
>
> <references/>

# Load ZUML from Database

The default implementation of
<javadoc method="getPageDefinition(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String)">org.zkoss.zk.ui.impl.AbstractUiFactory</javadoc>
loads the ZUML document from the Web application's resources (i.e., the
files found in a Web application). If you prefer to load from other
sources, such as a database, you could override it.

The pseudo code will look like the following:

``` java
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
<javadoc method="getPageDefinitionDirectly(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String, java.lang.String)">org.zkoss.zk.ui.impl.AbstractUiFactory</javadoc>.

[^1]: Then, the application is able to run in a clustering environment.
    For more information, please refer to the [Clustering
    section](ZK_Developer's_Reference/Clustering/ZK_Configuration)
