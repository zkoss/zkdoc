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

| init-param | Descriptions |
|:----------:|:-------------|
| charset | [Optional][Default: `UTF-8`]<br><br>It specifies the default charset for the output of the DSP interpreter.<br><br>If an empty string is specified as follows, the container's default is used. In other words, the `setCharacterEncoding` method of *javax.servlet.ServletResponse* is not called. |
| class-resource | [Optional][Default: false]<br><br>Specifies whether to load resources, such as TLD files, from the class loader, in addition to the servlet context. |
| compress | [Optional][Default: `true`]<br><br>It specifies whether to compress the output if the browser supports the compression (`Accept-Encoding`) and this Servlet is not included by other Servlets. |

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
