

An EAR file or the installation of Web server could have multiple WAR
files. Each of them is a Web application. There are no standard way to
communicate between two Web applications. However, there are a few ways
to work around it.

# Include Another Application's Resource with ZK URL Prefix (~APP_CONTEXT/)

ZK supports a way to reference the resource from another web application
on the same application server. For example, assume you want to include
a resource, say `/foreign.zul`, from another Web application, say
`app2`. Then, you could do as follows.

```xml
<include src="~app2/foreign.zul"/>
```

Similarly, you could reference resources from another Web application.

```xml
<style src="~app2/foo.css"/> <!-- assume foo.css is in the context called app2 --> 
<image src="~/foo.png"/> <!-- assume foo.png is in the root context -->
```

Note: Whether you can access a resource located in another Web
application depends on the configuration of the Web server. For example,
you have to specify `crossContext="true"` in conf/context.xml, if you
are using Tomcat.

## Limitation

Cross-context access is not always allowed in a container, e.g. Tomcat,
you need to [enable crossContext](https://tomcat.apache.org/tomcat-9.0-doc/config/context.html)
first before including another context resources.

# Use Cookie

[Cookie](http://en.wikipedia.org/wiki/HTTP_cookie) is another way to
communicate among Web applications. It can be done by setting the path
to "/", such that every Web application in the same host will see it.

```java
HttpServletResponse response = (HttpServletResponse)Executions.getCurrent().getNativeResponse();
Cookie userCookie = new Cookie("user", "foo");
userCookie.setPath("/");
response.addCookie(userCookie);
```

# Web Resources from Classpath

Though it is not necessary for inter-application communication, you
could, with ZK, reference a resource that is locatable by the classpath.
The advantage is that you could embed Web resources in a JAR file, which
simplifies the deployment. Please read
[Include_a_Page#Classpath_Web_Resource_Path]({{site.baseurl}}/zk_dev_ref/ui_composing/include_a_page#Classpath_Web_Resource_Path).
