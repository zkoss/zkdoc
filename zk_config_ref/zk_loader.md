# DHtmlLayoutServlet

`Location: WEB-INF/web.xml`

**\[Required\] Class:**
`org.zkoss.zk.ui.http.DHtmlLayoutServlet`

ZK Loader is a servlet used to load ZUML pages when the Web server
receives URL requests sent by the users.

Notice that you must specify `load-on-startup` since many other servlets
depend on the ZK loader.

```xml
<load-on-startup>1</load-on-startup>
```

Here is [a complete sample]({{site.baseurl}}/zk_config_ref/sample_of_web_xml).

# The Initial Parameters

| init-param | Descriptions |
|:----------:|:-------------|
| update-uri | [Required]<br><br>It specifies the URI which the ZK AU engine is mapped to.<br><br>For example, if the ZK AU engine is mapped to `/zkau/*`, by the use of `servlet-mapping`, then specify `/zkau` for this parameter.<br><br>Note: if the servlet container is used with other Web server, like Apache, you have to map this update URI to the servlet container (in additions to `zul` and `zhtml` files). |
| resource-uri | [Optional]<br><br>It specifies the URI which the [ZK Resource engine]({{site.baseUrl}}/zk_config_ref/ZK_Resource_Engine) is mapped to.<br><br>For example, if the ZK Resource engine is mapped to `/zkres/*`, by the use of `servlet-mapping`, then specify `/zkres` for this parameter.<br><br>Note: if the servlet container is used with other Web server, like Apache, you have to map this resource URI to the servlet container (in additions to `zul` and `zhtml` files). |
| compress | [Optional][Default:`true`]<br><br>It specifies whether to compress the output if the browser supports the compression (`Accept-Encoding`) and this Servlet is not included by other Servlets. |
| log-level | [Optional]<br><br>It specifies the default log level for `org.zkoss`. If not specified, the system default (usually `INFO`) is used.<br><br>Possible values: `OFF`, `ERROR`, `WARNING`, `INFO`, `DEBUG` and `FINER`. Please refer to [ZK Developer's Reference](ZK_Developer's_Reference/Supporting_Utilities/Logger) for details. |

# Map URL to ZUML pages

It is suggested to map this servlet to the `zul` and `zhtml` extensions
as shown below to process ZUML pages. It is OK if you want to prefer to
use `xul` and `html` as the extension; just map them to ZK Loader too.

```xml
    <servlet>
        <description>ZK loader for evaluating ZUML pages</description>
        <servlet-name>zkLoader</servlet-name>
        <servlet-class>org.zkoss.zk.ui.http.DHtmlLayoutServlet</servlet-class>
        <init-param>
            <param-name>update-uri</param-name>
            <param-value>/zkau</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup><!-- MUST -->
    </servlet>
    <servlet-mapping>
        <servlet-name>zkLoader</servlet-name>
        <url-pattern>*.zul</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>zkLoader</servlet-name>
        <url-pattern>*.zhtml</url-pattern>
    </servlet-mapping>
```

Here is [a complete sample]({{site.baseurl}}/zk_config_ref/sample_of_web_xml).

# Map URL to Richlets

Assume you have a
[richlet]({{site.baseurl}}/zk_dev_ref/ui_composing/richlet)
named `foo.FooRichlet`. Then, you could configure it as follows.

First, declare the richlet:

```xml
<richlet>
    <richlet-name>Foo</richlet-name>
    <richlet-class>foo.FooRichlet</richlet-class>
</richlet>
```

Second, map the richlet to any number of URL you want:

```xml
<richlet-mapping>
    <richlet-name>Foo</richlet-name>
    <url-pattern>/foo</url-pattern>
</richlet-mapping>
<richlet-mapping>
    <richlet-name>Fest</richlet-name>
    <url-pattern>/some/more/*</url-pattern>
</richlet-mapping>
```

Notice that, by default, richlets are disabled. To enable them, add the
following declaration to `web.xml`. Once enabled, you can add as many as
richlets as you want without modifying `web.xml` any more. Of course,
`url-pattern` could be any pattern you prefer.

```xml
<servlet-mapping>
    <servlet-name>zkLoader</servlet-name>
    <url-pattern>/zk/*</url-pattern><!-- any pattern you prefer -->
</servlet-mapping>
```

Then, you can visit
[<http://localhost:8080/PROJECT_NAME/zk/foo>](http://localhost:8080/PROJECT_NAME/zk/test)
to request the richlet.

The URL specified in the `url-pattern` element must start with `/`. If
the URI ends with `/*`, then it is matched to all request with the same
prefix. To retrieve the request's actual URL, you can check the value
returned by the
[org.zkoss.zk.ui.Page#getRequestPath](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html#getRequestPath).


