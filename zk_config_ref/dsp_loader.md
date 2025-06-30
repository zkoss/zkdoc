# InterpreterServlet

[Optional] Class: `org.zkoss.web.servlet.dsp.InterpreterServlet`

DSP Loader is a servlet used to process the DSP files. DSP is a JSP-like
template technology.

It is optional. You need to specify it only if you have DSP pages in
your Web application.

It takes the same syntax as that of JSP. Unlike JSP, DSP is interpreted
at the run time, so it is easy to deploy DSP pages. No Java compiler is
required in your run-time environment. In addition, you could distribute
DSP pages in jar files. This is the way ZK is distributed.

However, you cannot embed Java codes in DSP pages. Actions of DSP,
though extensible through TLD files, are different from JSP tags.

# The Initial Parameters

<table>
<thead>
<tr class="header">
<th><center>
<p>init-param</p>
</center></th>
<th><center>
<p>Descriptions</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>charset</p></td>
<td><p>[Optional][Default: `UTF-8`]</p>
<p>It specifies the default charset for the output of the DSP
interpreter.</p>
<p>If an empty string is specified as follows, the container's default
is used. In other words, the `setCharacterEncoding` method of
<em>javax.servlet.ServletResponse</em> is not called.</p></td>
</tr>
<tr class="even">
<td><p>class-resource</p></td>
<td><p>[Optional][Default: false]</p>
<p>Specifies whether to load resources, such as TLD files, from the
class loader, in addition to the servlet context.</p></td>
</tr>
<tr class="odd">
<td><p>compress</p></td>
<td><p>[Optional][Default: `true`]</p>
<p>It specifies whether to compress the output if the browser supports
the compression (`Accept-Encoding`) and this Servlet is not
included by other Servlets.</p></td>
</tr>
</tbody>
</table>

# Map URL to DSP Loader

Notice it is optional. You need to specify it only if you want to use
DSP pages (\*.dsp) in your Web application.

```xml
    <servlet>
        <servlet-name>dspLoader</servlet-name>
        <servlet-class>org.zkoss.web.servlet.dsp.InterpreterServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>dspLoader</servlet-name>
        <url-pattern>*.dsp</url-pattern>
    </servlet-mapping>
```

# Optional Jar

InterpreterServlet is split into a separate jar. It's no longer inside
zweb.jar by default. If you want to use this servlet, you need to
include the dependency below explicitly:

```xml
        <dependency>
            <groupId>org.zkoss.common</groupId>
            <artifactId>zweb-dsp</artifactId>
            <version>9.6.4</version>
        </dependency>
```
