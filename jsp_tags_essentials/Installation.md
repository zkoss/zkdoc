\_\_TOC\_\_ This section outlines information on installing ZK JSP Tags.

# Install ZK First

Please follow [ ZK Installation Guide](ZK_Installation_Guide)
to install the ZK environment first.

# Install ZK JSP Tags

Installation of ZK JSP Tags is very simple; you unpack the downloaded
zip file, copy zuljsp.jar to WEB-INF/lib/, do some little configuration
in web.xml and you can declaring ZK component tag in your JSP document.
We'll discuss how to do settings in web.xml below.

Bold text''

# Maven Project

If your project is managed by Maven already, you can adopt ZK JSP Tags
easily by simply adding a dependency[^1]

For projects depending on ZK **5.0.x**, add the following dependency:

``` xml

<dependency>
    <groupId>org.zkoss.zk</groupId>
    <artifactId>zuljsp</artifactId>
    <version>1.8</version>
</dependency>
```

For projects depending on ZK **6.5.x**, add the following dependency:

``` xml

<dependency>
    <groupId>org.zkoss.zk</groupId>
    <artifactId>zuljsp</artifactId>
    <version>2.2</version>
</dependency>
```

> ------------------------------------------------------------------------
>
> <references/>

# Configuration of Direct ZK Context EL Support in web.xml

In JSP page, you may want to use EL to access ZK Component's property,
for example:

``` xml
<z:window id="myWin" use="org.zkoss.jspdemo.MyWindow" myValue="special value of MyWindow">
    <ol>
        <c:forEach var="bean" items="${myWin.beans}">
            <li>bean: ${bean.name}sd</li>
        </c:forEach>
    </ol>
    use "self" to get property: <z:label value="${self.myValue}"/>
</z:window>
```

In order to support this, You have to add an additional setting in
web.xml:

``` xml
<listener>
    <description>ZK JSP Tags environment initiation </description>
    <display-name>ZK JSP Initiator</display-name>
    <listener-class>org.zkoss.jsp.spec.JspFactoryContextListener</listener-class>
</listener>
```

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |

[^1]: If you didn't setup zk maven repository yet, you have to [ setup
    zk maven
    repository](ZK_Installation_Guide/Setting_up_IDE/Maven/Use_ZK_Maven_Artifacts/Resolving_ZK_Framework_Artifacts_via_Maven#How_to_Use_ZK_Maven_Repository)
    too.
