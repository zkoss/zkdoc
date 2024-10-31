# DHtmlResourceServlet

[Optional] Class: ` org.zkoss.zk.au.http.DHtmlResourceServlet`

ZK Resource Engine, it is a servlet that handles static resources. After
you configure this servlet, ZK will retrieve its own static resources
(including wpd, wcs, dsp, and images) with the specified URL pattern.
Without this servlet, ZK retrieves by requesting `/zkau`.

Mapping URL to ZK Resource Engine is straightforward:

``` xml
    <servlet>
        <servlet-name>resourceEngine</servlet-name>
        <servlet-class>org.zkoss.zk.au.http.DHtmlResourceServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>resourceEngine</servlet-name>
        <url-pattern>/zkres/*</url-pattern>
    </servlet-mapping>
```

Notice that the URL pattern mapped to this engine must be consistent
with the `resource-uri` parameter of [ZK
Loader]({{site.baseUrl}}/zk_config_ref/web.xml/ZK_Loader).

# Version History

| Version | Date     | Content |
|---------|----------|---------|
| 9.5.0   | 09/29/20 |         |
