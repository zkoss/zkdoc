Once [a richlet is
declared]({{site.baseUrl}}/zk_config_ref/The_richlet_Element),
you could map it to any number of URL by using `richlet-mapping` as
depicted below.

``` xml
<richlet-mapping>
    <richlet-name>Test</richlet-name>
    <url-pattern>/test</url-pattern>
</richlet-mapping>
<richlet-mapping>
    <richlet-name>Test</richlet-name>
    <url-pattern>/some/more/*</url-pattern>
</richlet-mapping>
```

When mapping, you should consider the `servlet-mapping` of [ZK
Loader]({{site.baseUrl}}/zk_config_ref/web.xml/ZK_Loader) in
[web.xml]({{site.baseUrl}}/zk_config_ref/web.xml), for example,
if you want the Richlet work with `/path/*`, you may specify the
servlet-mapping in web.xml as follows:

``` xml
<servlet-mapping>
    <servlet-name>zkLoader</servlet-name>
    <url-pattern>/path/*</url-pattern>
</servlet-mapping>
```

and specify the richlet-mapping as follows:

``` xml
<richlet-mapping>
    <richlet-name>Test</richlet-name>
    <url-pattern>/*</url-pattern>
</richlet-mapping>
```

In this case, both Richlet and ZUL will work great. If you swap the
url-pattern of servlet-mapping with richlet-mapping, only the Richlet
will work well.

**Note:** Since ZK 7.0.0 release, when use ZK Richlet Filter, the
url-pattern of the richlet-mapping should start with the prefix
url-pattern in filter-mapping. For example,

In web.xml

``` xml
<filter>
    <filter-name>RichletFilter</filter-name>
    <filter-class>org.zkoss.zk.ui.http.RichletFilter</filter-class>
</filter>

<filter-mapping>
    <filter-name>RichletFilter</filter-name>
    <url-pattern>/zk/*</url-pattern>
</filter-mapping>
```

In zk.xml

``` xml
<richlet-mapping>
    <richlet-name>Test</richlet-name>
    <url-pattern>/zk/foo/*</url-pattern>
</richlet-mapping>
```

The URL specified in the `url-pattern` element must start with `/`. If
the URI ends with `/*`, then it is matched to all request with the same
prefix. To retrieve the real request, you can check the value returned
by
<javadoc type="interface" method="getRequestPath()">org.zkoss.zk.ui.Page</javadoc>
of the current page.

``` java
 public void service(Page page) {
     if ("/some/more/hi".equals(page.getRequestPath()) {
         ...
     }
 }
```

# Version History

| Version  | Date        | Content                                                                        |
|----------|-------------|--------------------------------------------------------------------------------|
| ZK 7.0.0 | August 2013 | [Support Richlet with Servlet Filter](http://tracker.zkoss.org/browse/ZK-1882) |
