# Employment/Purpose

Instead of using an iframe, ZK provides JavaScript API for a non-Java EE
web container. Hence, you can embed a ZK application in a web
application based on NodeJs, Python, etc.

{$ include version-badge.html version=9.1.0 %}
{% include edition-availability.html edition="ee" %}
# Prerequisite

## Settings in the ZK application

We use library property to enable the embedded feature.

For example: (In **zk.xml**)

``` xml
<library-property>
    <name>org.zkoss.web.servlet.http.embedded.enabled</name>
    <value>true</value>
</library-property>
```

## Loading the embedding script into the host page

In order to make the zEmbedded.load API available in the host page,
first the embedding script must be loaded.

This can be done by loading the target script directly, or using the
EmbeddedServlet

### Loading through EmbeddedServlet

{$ include version-badge.html version=10.0.0 %}


**web.xml**

``` xml
    <servlet>
        <servlet-name>zkEmbedded</servlet-name>
        <servlet-class>org.zkoss.zkmax.ui.http.EmbeddedServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>zkEmbedded</servlet-name>
        <url-pattern>/zkEmbedded</url-pattern>
    </servlet-mapping>
```

Then target the url as mapped above:

**HostPage.html**

``` html
<script id="embeddedScript" src="http://zkembedded-app/zkEmbedded" />
```

### Loading embedded/index.js directly

{$ include version-badge.html version=10.0.0 %}

**HostPage.html**

``` html
<script id="embeddedScript" src="http://zkembedded-app/zkau/web/js/zkmax/embedded/index.js" />
```

### Loading embedded/embedded.js directly

{$ include version-badge.html version=9.0.1 %}

Discontinued in ZK 10.0.0 and later

**HostPage.html**

``` html
<script id="embeddedScript" src="http://zkembedded-app/zkau/web/js/zkmax/embedded/embedded.js" />
```

# Demo Example

In the [Demo project](https://github.com/zkoss-demo/zkembedded-demo),
there are 2 web applications, one is a non-ZK web application
(http://localhost:8080), and another one is a ZK application
(http://zkembedded-app).

We'll embed ZK into the non-ZK web application.

**index.html**

``` html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <div id="embeddedZK" style="height:80%">  
             Loading...
        </div>
        <script id="embeddedScript" src="http://zkembedded-app/zkau/web/js/zkmax/embedded/embedded.js" />
        <script>
            zEmbedded.load('embeddedZK', 'http://zkembedded-app/demo.zul');
        </script>
    </body>
</html>
```

- line 11: load the zk embedded JS API script
- line 13: load **demo.zul** (of the ZK application) into the DOM
  Element with id **embeddedZK**.

To see more information, please download the [Demo
project](https://github.com/zkoss-demo/zkembedded-demo).

# API in embedded.js

We provide two methods to embed ZK.

## zEmbedded.load(domId, ZKSrc)

The "domId" means after loading resource from "ZKSrc", the content of
"domId" (HTML DOM Element) would be replaced with the ZK content.

This function returns a [Promise
object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise),
which means that we can call functions after ZK is ready.

``` javascript
zEmbedded.load('embeddedZK', 'http://zkembedded-app/demo.zul')
  .then(function(result) {
    zk.log('ZK is ready!' + result.widget.uuid); //result contains the first widget
  }).catch(reason => {
    alert('ZK mounting error: ' + reason);
});
```

The "then" method of the promise is invoked when the embedding has
completed, and the embedded page has been loaded.

The "catch" method of the promise is invoked when the embedding process
encounters a failure. The reason object contains the error message
associated with the failure.

## zEmbedded.load(domId, ZKSrc, ZKHost)

{$ include version-badge.html version=9.6.0 %}

To handle the URL redirection, we can specify the ZK Host URL.

``` html
<script id="embeddedScript" src="/embedded/embedded.js"></script>
<script>
    zEmbedded.load('embeddedZK', '/embedded/demo.zul', '/embedded');
</script>
```

Notice that the URL redirection should rewrite the locations:

``` javascript
/embedded/embedded.js -> http://zkembedded-app/zkau/web/js/zkmax/embedded/embedded.js
```

``` javascript
/embedded -> http://zkembedded-app/embedded
```

## zEmbedded.destroy(domId, skipError)

This will destroy the embedded ZK desktop at server side and clear the
DOM Element. Use "skipError = true" to ignore error messages.

## Better way to include embedded.js in ZK 10

{$ include version-badge.html version=10.0.0 %}

Since ZK 10, we can set the zkEmbedded servlet in **web.xml**

``` xml
<servlet>
    <servlet-name>zkEmbedded</servlet-name>
    <servlet-class>org.zkoss.zkmax.ui.http.EmbeddedServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>zkEmbedded</servlet-name>
    <url-pattern>/zkEmbedded</url-pattern>
</servlet-mapping>
```

Then we can include embedded.js in html in the following way

``` xml
<script src="/${webappRoot}/zkEmbedded"></script>
```

# Control ZK Components when using embedded ZK

After loading the ZK contents, we could use the ZK Client command
binding to control the ZK components on a page.

To see more information, please refer to [ZK MVVM Book - Client command
binding](http://books.zkoss.org/zk-mvvm-book/9.5/data_binding/client_binding_api.html).

# Cross-Origin Resource Sharing

In Cross Origin scenarios the responses from the ZK application need to
set at least the following CORS headers:

``` javascript
Access-Control-Allow-Origin: [allowed embedding origins]
Access-Control-Allow-Headers: zk-sid
Access-Control-Expose-Headers: zk-sid, zk-error
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST
```

This can be done by configuring your server (e.g. nginx, apache-httpd,
tomcat, spring-boot...) appropriately and is **not** ZK-specific. Please
refer to the related documentation (e.g. [MDN: Cross-Origin Resource
Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS))
and your specific server configuration guides.

# Limitations

## Cannot Embed Pages from Different ZK Versions

Since ZK loads JavaScript and CSS in the global namespace, so multiple
versions of these assets will conflict with each other. Hence, you
cannot embed a `page1.zul` from **ZK 8** application and a `page2.zul`
from **ZK 9** application into one page.

## Cannot Embed Multiple Pages with WebSocket Enabled

{$ include version-badge.html version=10.0.0 %}

zEmbedded supports WebSocket under the condition that only one ZK page
can be embedded into a non-ZK page when WebSocket is enabled.

# Version History

| Version | Date         | Content                      |
|---------|--------------|------------------------------|
| 9.0.0   |              |                              |
| 10.0.0  | Jan 15, 2024 | zEmbedded supports WebSocket |
