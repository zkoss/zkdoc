An AU extension
([org.zkoss.zk.au.http.AuExtension](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/http/AuExtension.html))
is a small program that can be plugged into ZK Update Engine
([org.zkoss.zk.au.http.DHtmlUpdateServlet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/http/DHtmlUpdateServlet.html)) and extend
its functionality. Actually our file upload and multimedia viewing are
implemented as an AU extension that you can replace with your
implementation.

An AU extension is associated with a name starting with slash, such as
"/upload". Then each time a request targeting /zkau/upload will be
forwarded to this extension for service.

To register an AU extension, you could specify the name and the class
name as the initial parameter of the declaration of ZK Update Engine in
`WEB-INF/web.xml`. For more information, please refer to [ZK Configuration Reference]({{site.baseurl}}/zk_config_ref/zk_au_engine).

If you want to register it in Java, you could use
[org.zkoss.zk.au.http.DHtmlUpdateServlet#addAuExtension(java.lang.String, org.zkoss.zk.au.http.AuExtension)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/au/http/DHtmlUpdateServlet.html#addAuExtension(java.lang.String, org.zkoss.zk.au.http.AuExtension))
instead.
