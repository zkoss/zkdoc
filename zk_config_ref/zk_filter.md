# DHtmlLayoutFilter

[Optional] Class: `org.zkoss.zk.ui.http.DHtmlLayoutFilter`

ZK Filter is a filter to post-process the output generated by other
servlets, such as JSP pages. Its role is similar to the ZK Loader.
Unlike the ZK Loader, which loads static ZUML pages from Web
applications directly, the ZK filter is designed to process dynamic
pages generated by other servlets, say JSP or JSF. It enables developers
to add rich user interfaces to existent servlets written in any
technology.

**Note:** the output must be in XHTML (or ZUML) syntax. If you encounter
any problem, you can save the generated output into a ZHTML page and
then browse the URL whether the ZHTML page is stored.

# The Initial Parameters

| init-param | Descriptions |
|:----------:|:-------------|
| extension | [Optional][Default: `html`]<br><br>It specifies how to process the response generated by other servlets.<br><br>If `html` or `zhtml`, XHTML is assumed to be the default namespace. If `xul` or `zul`, XUL is assumed to be the default namespace. |
| charset | [Optional][Default: `UTF-8`]<br><br>It specifies the default charset for the output of this filter.<br><br>If an empty string is specified as follows, the container's default is used. In other words, the `setCharacterEncoding` method of *javax.servlet.ServletResponse* is not called.<br><br>`<param-value></param-value>` |
| compress | [Optional][Default: `true`]<br><br>It specifies whether to compress the output if the browser supports the compression (`Accept-Encoding`) and this filter is not included by other Servlets. |

# Map URL to ZK Filter

ZK Filter can be mapped to any servlet or JSP page you want. For
example,

```xml
    <filter>
        <filter-name>zkFilter</filter-name>
        <filter-class>org.zkoss.zk.ui.http.DHtmlLayoutFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>zkFilter</filter-name>
        <url-pattern>/foo/whatever.jsp</url-pattern>
    </filter-mapping>
    <filter-mapping>
        <filter-name>zkFilter</filter-name>
        <url-pattern>/foo2/*</url-pattern>
    </filter-mapping>
```


