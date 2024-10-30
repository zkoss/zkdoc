**Syntax:**

<au-decoder-class>*`a_class_name`*</au-decoder-class>

`[Default: null (using the default JSON-based format)]`

It specifies which class will be used to implement the AU decoder. The
AU decoder is used to decode the AU requests. The class must implement
<javadoc type="interface">org.zkoss.zk.au.AuDecoder</javadoc>.

By default, the AU request is sent in the JSON format. If you prefer to
use another format, you could provide an implementation as follows.

1.  Implement
    <javadoc type="interface">org.zkoss.zk.au.AuDecoder</javadoc>. You
    can reference the default implementation, inner class AuDecoder in
    `org.zkoss.zk.au.http.DHtmlUpdateServlet`.
2.  Register it by specifying it with the `au-decoder-class` element in
    `WEB-INF/zk.xml`
3.  Override a JavaScript method called
    <javadoc directory="jsdoc" method="encode(int, zk.Event, zk.Desktop)">\_global\_.zAu</javadoc>
    to encode to the custom format
