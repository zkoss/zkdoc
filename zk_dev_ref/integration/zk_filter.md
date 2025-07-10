If you prefer to *Ajax*-ize a dynamically generated HTML page (e.g., the
output of a Velocity Servlet), you could use ZK Filter to process the
generated page. The content of the generated page will be interpreted by
ZK Filter as a ZUML document. Thus, please make sure the output is a
valid ZUML document, such as it must be a valid XML. If the output is
HTML, it must be a valid XHTML document.

To enable ZK Filter, you have to configure `WEB-INF/web.xml`, as shown
below.

```xml
<filter>
    <filter-name>zkFilter</filter-name>
    <filter-class>org.zkoss.zk.ui.http.DHtmlLayoutFilter</filter-class>
    <init-param>
        <param-name>extension</param-name>
        <param-value>html</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>zkFilter</filter-name>
    <url-pattern>/my/dyna.jsp</url-pattern>
</filter-mapping>
<filter-mapping>
    <filter-name>zkFilter</filter-name>
    <url-pattern>/my/dyna/*</url-pattern>
</filter-mapping>
```

where `url-pattern` is the servlets that you would like ZK Filter to
process.

The `extension` parameter (`init-param`) defines the language of the
dynamical output. By default, it is `html`, since most legacy servlets
generate an HTML document. If the output is [a ZUL document](/zuml_ref/zul), you could
specify `zul` as the extension.

Notice that, if you want to filter the output from include and/or
forward, remember to specify the dispatcher element with REQUEST and/or
INCLUDE. Consult the Java Servlet Specification for details. For
example,

```xml
<filter-mapping>
    <filter-name>zkFilter</filter-name>
    <url-pattern>/my/dyna/*</url-pattern>
    <dispatcher>REQUEST</dispatcher>
    <dispatcher>INCLUDE</dispatcher>
    <dispatcher>FORWARD</dispatcher>
    <dispatcher>ERROR</dispatcher>
</filter-mapping>
```

# Performance Consideration for Filtering XHTML

If the extension is html (and the output is XHTML), it means each HTML
tag will be converted to [an XHTML component](/zuml_ref/xhtml). It is
convenient if you want to manipulate them dynamically. However, it costs
more memory since ZK has to maintain the states of each HTML tag. Thus,
it is suggested to use [the native namespace]({{site.baseurl}}/zk_dev_ref/ui_patterns/the_native_namespace)
for the portion whose content won't be changed dynamically.

# ZK Filter versus UI Factory

ZK Filter is designed to handle the output of a legacy servlet. If you
would like to load a ZUML document from resources other than Web pages,
such as from the database, you could implement
[org.zkoss.zk.ui.sys.UiFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/UiFactory.html). It is
generally done by extending from
[org.zkoss.zk.ui.impl.AbstractUiFactory](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/impl/AbstractUiFactory.html) and overriding
[org.zkoss.zk.ui.impl.AbstractUiFactory#getPageDefinition(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/impl/AbstractUiFactory.html#getPageDefinition(org.zkoss.zk.ui.sys.RequestInfo, java.lang.String)).
For more information, please refer to [ZK Configuration Reference]({{site.baseurl}}/zk_config_ref/the_system_config_element).
