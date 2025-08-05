---
title: "Configure ZK Pivottable JSP Tag"
---



Before using pivottable in your JSP pages, you would need to download a
few library jars, and make some configuration changes to your project.

### Downloads

- Download [ZK Framework](http://www.zkoss.org/download/zk.dsp)
  binaries.
- Download [ZK Pivottable](http://www.zkoss.org/download/zkpivottable.dsp) binaries.
- Download [ZK JSP Tags Library](http://www.zkoss.org/download/zkjsp.dsp) binaries.

### Configuration

1.  Configure your JSP web application to use ZK Framework, ZK
    Pivottable, ZK JSP Tags Library
    - copy the binaries into WEB-INF/lib - OR -
    - copy the binaries into the shared library folder of your web
      server - OR -
    - copy the binaries into one of the folders pointed to by your web
      application's classpath
2.  Add [org.zkoss.zk.au.http.DHtmlUpdateServlet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/http/DHtmlUpdateServlet.html) and
    its mapping into **web.xml** as shown below

```xml
    <servlet>
        <description>The asynchronous update engine for ZK</description>
        <servlet-name>auEngine</servlet-name>
        <servlet-class>org.zkoss.zk.au.http.DHtmlUpdateServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>auEngine</servlet-name>
        <url-pattern>/zkau/*</url-pattern>
    </servlet-mapping>
```

## Sample Application

Please goto
[github](https://github.com/leeyt/ZKSmalltalk/tree/master/zkpvtjsp/) for
the complete source code of the sample application.

To build the sample war file, please enter **mvn war:war** at project
root.

**Last update:** //
