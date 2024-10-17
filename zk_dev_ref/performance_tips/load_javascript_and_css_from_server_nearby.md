

> If some of the client machines are far away from the application
> server, we could set up a server near the clients to host ZK's
> JavaScript and CSS files, and then configure the application server to
> generate the URLs of JavaScript and CSS (and images it refers) from
> the server near the clients.

![]({{site.baseurl}}/zk_dev_ref/images/URLEncoder.png)

<span style="font-weight: bold;color:red;" >\*Notice :</span> the ZK
static resource server is an application server which you <b>deploy only
official ZK library to</b>, not your whole application.

# How-to

1.  Implement the
    <javadoc  type="interface">org.zkoss.web.servlet.http.Encodes.URLEncoder</javadoc>
2.  Add **library-property** configuration to the
    <span style="color:green;font-style:italic;">zk.xml</span>
      
    Document : [ZK Configuration Reference/zk.xml/The Library
    Properties/org.zkoss.web.servlet.http.URLEncoder](ZK_Configuration_Reference/zk.xml/The_Library_Properties/org.zkoss.web.servlet.http.URLEncoder).
3.  Host ZK static resource server

Following is a sample :

## Configuration

``` xml
<library-property>
    <name>org.zkoss.web.servlet.http.URLEncoder</name>
    <value>org.zkoss.test.TestEncoder</value> <!-- Where the Implementation Class is -->
</library-property>
```

## Implementation

``` java
package org.zkoss.test;
import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import org.zkoss.web.servlet.http.Encodes.URLEncoder;
public class TestEncoder implements URLEncoder {

    @Override
    public String encodeURL(ServletContext ctx, ServletRequest request, ServletResponse response,
    String uri, URLEncoder defaultEncoder) throws Exception {
        if (isStaticResource(uri)) {
            return getResourceHost() + uri.replace("~./", "");
        } else {
            return defaultEncoder.encodeURL(ctx, request, response, uri, defaultEncoder);
        }
    }
    /**
     * file .wcs : CSS File
     * file .wpd : Javscript File
     */
    private boolean isStaticResource(String url) {
        // zul.lang.wpd should not be a static resource
        return url.startsWith("~./") && !url.endsWith("zul.lang.wpd") && (url.endsWith(".wpd") || url.endsWith(".wcs"));
    }

    /**
     * Detect where the ip is / who login / what kind of resource server
     * 
     * @return the host name include protocol prefix. (Client will retrieve resource from it)
     */
    private String getResourceHost() {
        return "http://SomeWhereNearbyMe/DefaultContext/zkau/web/";
    }

}
```

## Hosting ZK Static Resource

1.  Create a WAR with all ZK JARs only (without your application code)
2.  configure `web.xml` as a normal ZK application
3.  deploy such special **ZK WAR** to a server near your customer and
    add the URL to your implementation of URLEncoder.

<i>Don't know how to deploy on server ? Please refer to [Installation
Guide](ZK_Installation_Guide)</i>.
