**Property:**

`org.zkoss.web.servlet.http.URLEncoder`

`Default: ``javax.servlet.http.HttpServletResponse.encodeURL`

It specifies the class used to encode URL by including the session ID
and Servlet's context path, if necessary. The specified class must
implement the
<javadoc type="interface">org.zkoss.web.servlet.http.Encodes.URLEncoder</javadoc>
interface.

If the clients are far away from the server, you might override this
class by encoding the URL of JavaScript and CSS files with a server
nearby. Thus, it could shorten the time to load a page. For more
information, please refer to [Performance
Tips]({{site.baseurl}}/zk_dev_ref/Performance_Tips/Load_JavaScript_and_CSS_from_Server_Nearby).

In a sophisticated environment, e.g., [Reverse
Proxy](http://en.wikipedia.org/wiki/Reverse_proxy), the encoded URL
might have to be prefixed with some special prefix. To do that, you can
implement the
<javadoc type="interface">org.zkoss.web.servlet.http.Encodes.URLEncoder</javadoc>
interface, and then specify the class with this library property.
