**Syntax:**

`<script [src="`foo.js`"]`  
`[browser="ie|ie6|ie6-|ie7|ie7-|ie8|ie8-|gecko|gecko2|gecko2-|gecko3|gecko3-|gecko3.5|opera|safari"]>`

The script element is used to specify an external JavaScript file, or to
embed the JavaScript code directly.

Example,

```xml
  <script src="a.js"/>
  <script>
function doIt() {
}
  </script>
```

# src

`[Optional]`

The path of an external JavaScript file. It is suggested to use a path
related to the directory of the WPD file. For example,

```xml
 <script src="abc.js"/>
 <script src="../foo/def.js"/>
```

# browser

`[Optional]`

It specifies the condition to embed the specified JavaScript file. For
example, if `browser="ie6-"` is specified, the JavaSript file is embeded
only if the client is Internet Explorer 6. For the available types you
could check, please refer to
[org.zkoss.web.servlet.Servlets#isBrowser(javax.servlet.ServletRequest, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/servlet/Servlets.html#isBrowser(javax.servlet.ServletRequest, java.lang.String)).


