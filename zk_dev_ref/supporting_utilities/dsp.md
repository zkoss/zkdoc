Package:
[org.zkoss.web.servlet.dsp](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/servlet/dsp/package-summary.html)

A JSP-like template technology. It takes the same syntax as that of JSP.
Unlike JSP, DSP is interpreted at the run time, so it is easy to deploy
DSP pages. No Java compiler is required in your run-time environment. In
addition, you could distribute DSP pages in jar files.

However, you cannot embed Java codes in DSP pages. Actions of DSP,
though extensible through TLD files, are different from JSP tags.

If you want to use DSP in your Web applications, you have to set up
`WEB-INF/web.xml` to add the following lines.

```xml
    <servlet>
        <description><![CDATA[
 The servlet loads the DSP pages.
        ]]></description>
        <servlet-name>dspLoader</servlet-name>
        <servlet-class>org.zkoss.web.servlet.dsp.InterpreterServlet</servlet-class>

        <!-- Specify class-resource, if you want to access TLD defined in jar files -->
        <init-param>
            <param-name>class-resource</param-name>
            <param-value>true</param-value>
        </init-param>            
    </servlet>
    <servlet-mapping>
        <servlet-name>dspLoader</servlet-name>
        <url-pattern>*.dsp</url-pattern>
    </servlet-mapping>
```

The mapping of the DSP loader is optional. Specify it only if you want
to write Web pages in DSP syntax.

Though standard components of ZK use DSP as a template technology, they
are handled directly by ZK loader.

Using DSP requires including a jar explicitly, please read [ ZK Configuration Reference...DSP Loader#Optional_Jar]({{site.baseurl}}/zk_config_ref/web.xml/dsp_loader#Optional_Jar)

# A Sample of DSP

```html
<%@ page contentType="text/css;charset=UTF-8" %>
<%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>

<%-- header.jsp --%>
<style>
<!--Include-->
<c:include page="/css/header.css.dsp" />


<!--Test-->
<c:if test="${c:isSafari() || c:browser('chrome')}">
.search-input-outer input {
    padding: 0 2px;
}
</c:if>

</style>
```

For more details, please check the javadoc of
[org.zkoss.web.servlet.dsp.action](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/servlet/dsp/action/package-summary.html)
package.
