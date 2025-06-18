# General considerations

## 'unsafe-eval' and 'unsafe-inline' script sources

Scripts loaded by web browsers can originate from many different types
of sources, such as being loaded from an external file. Two of these
sources that are important in regard to ZK's client engine are eval and
inline.

### 'unsafe-eval' source expression

The 'unsafe-eval' source expression controls code created by evaluating
strings in the client's JavaScript engine. The ZK client engine uses
evaluated scripts when building client-side objects. As a result, ZK
clients require access to the "eval" source.

[See the MDN CSP documentation for more
information.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_eval_expressions)

### 'unsafe-inline' source expression

The 'unsafe-inline' source expression controls code declared inside
\`script\` elements. The ZK client engine uses script elements to load
itself during page creation, and to load additional library resources,
such as wpd files containing widget classes.

```html
<script>
    //This is an inline script
    function foo(){
        return "bar";
    }
</script>
```

[See the MDN CSP documentation for more
information.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_inline_script)

## Unsecured CSP for inline and eval scripts

A simple-to-implement but unsecured way to allow ZK scripts to use the
eval and inline sources types is to simply declare the 'unsafe-inline'
and 'unsafe-eval' sources to be allowed in the page.

However, using this approach means that any script may be using the
'unsafe-eval' or 'unsafe-inline' sources to create code, which in turn
creates opportunities for XSS attacks, which the CSP is meant to protect
against.

# More secure with 'strict-dynamic'

As a secure alternative to allowing all scripts to use 'unsafe-inline'
and 'unsafe-eval' as allowed sources, we can use a nonce (a unique ID)
declared in the CSP header to only allow properly identified scripts to
be created by unsafe-inline and unsafe-eval sources.

This can be achieved using the
['strict-dynamic'](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#strict-dynamic).

The 'strict-dynamic' source expression specifies a nonce (or hash),
which acts as a one-time-use password. Scripts on this page that have
the nonce declared as an attribute will be granted the authorization to
execute according to the source expression contained in the
'strict-dynamic' policy.

Response header:

```xml
    Content-Security-Policy: script-src 'strict-dynamic' 'nonce-abc123'
```

```html
<script nonce="abc123">
    //This inline script can be executed since it holds a nonce matching the CSP header
    function foo(){
        return "bar";
    }
</script>
<script>
    //This inline script cannot be executed, since it doesn't hold a nonce matching the CSP header
    function baz(){
        return "qux";
    }
</script>
```

Note: When inspecting the script element from the browser's developer
tools, [the nonce attribute will not be
visible](https://html.spec.whatwg.org/multipage/urls-and-fetching.html#nonce-attributes%3Aattr-nonce).
This is intended, as it prevents other sources from trying to obtain a
valid nonce in order to bypass security during the page lifecycle.

*A nonce content attribute represents a cryptographic nonce ("number
used once") which can be used by Content Security Policy to determine
whether or not a given fetch will be allowed to proceed. The value is
text.*

*Elements that have a nonce content attribute ensure that the
cryptographic nonce is only exposed to script (and not to side-channels
like CSS attribute selectors) by taking the value from the content
attribute, moving it into an internal slot named CryptographicNonce,
exposing it to script via the HTMLOrSVGElement interface mixin, and
setting the content attribute to the empty string. Unless otherwise
specified, the slot's value is the empty string.*

## Trust propagation

Scripts that are trusted using 'strict-dynamic' may load additional
scripts, which receive the same trust, as described in the [MDN
documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#strict-dynamic).

*The 'strict-dynamic' source expression specifies that the trust
explicitly given to a script present in the markup, by accompanying it
with a nonce or a hash, shall be propagated to all the scripts loaded by
that root script*

This is convenient for the purpose of securing ZK scripts. We can
provide a valid nonce on scripts loaded during the initial page
response, and the trust given to these scripts will be propagated to
additional resources loaded by them.

## Creating a ZK CSP filter

All code referenced in this section is available on the matching [Github
project](https://github.com/zkoss/zkbooks/tree/master/csp-filter).

### Java class

In order to automatically add the nonce to the response headers and to
the initial page response content, we can create a servlet filter. This
filter should intercept all document requests (page loads) and create a
nonce. This nonce is then used to declare a response header containing
the strict-dynamic CSP expression. We also need to insert the nonce in
each script element generated by the page.

#### building the nonce, and adding it to the page response

This happens in two steps. First, we capture the original page response
content:

```java
    CapturingResponseWrapper capturingResponseWrapper = new CapturingResponseWrapper((HttpServletResponse) response);
    chain.doFilter(request, capturingResponseWrapper);
    String content = capturingResponseWrapper.getCaptureAsString();
```

Then, we add the nonce to the script element, write the content to the
actual httpResponse, and set the CSP header to the response.

```java
    String replacedContent = content.replaceAll("(?i)<script(\\s)*","<script nonce=\"" + hex + "\"");
    response.getWriter().write(replacedContent);
    ((HttpServletResponse) response).addHeader("Content-Security-Policy", String.format(cspHeader, hex));
```

#### compressing the response after update

Since we disabled response compression at layout servlet level, we can
recompress the response content before writing it to the response.

```java
    // Do gzip after CSP rewriting
    byte[] data = replacedContent.getBytes(response.getCharacterEncoding());
    if (data.length > 200) {
        byte[] bs = Https.gzip((HttpServletRequest)request, (HttpServletResponse)response, null, data);
        if (bs != null)
             data = bs; //yes, browser support compress
    }

    response.setContentLength(data.length);
    response.getOutputStream().write(data);
    response.flushBuffer();
```

[See full class in
github.](https://github.com/zkoss/zkbooks/blob/master/csp-filter/src/main/java/org/zkoss/support/zkdemo_csp_filter/ZkCspFilterStrictDynamic.java)

### Disable the Response Compression

In order to capture the uncompressed response content, we need to
disable the response compression in `DHtmlLayoutServlet`:

**web.xml**

```xml
<servlet>
    <description>ZK loader for ZUML pages</description>
    <servlet-name>zkLoader</servlet-name>
    <servlet-class>org.zkoss.zk.ui.http.DHtmlLayoutServlet</servlet-class>
    <init-param>
        <param-name>compress</param-name>
        <param-value>false</param-value>
    </init-param>
</servlet>
```

This allows the capture wrapper in the filter before being compressed.

[See
here](https://github.com/zkoss/zkbooks/blob/master/csp-filter/src/main/webapp/WEB-INF/web.xml#L55-L58)

We can then declare our filter, and set filter-mapping entries for ZK
documents returned by the ZK layout servlet.

```xml
    <filter>
        <filter-name>zkCspFilter</filter-name>
        <filter-class>org.zkoss.support.zkdemo_csp_filter.ZkCspFilterStrictDynamic</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>zkCspFilter</filter-name>
        <url-pattern>*.zul</url-pattern>
    </filter-mapping>
```

See [web.xml in
github](https://github.com/zkoss/zkbooks/blob/master/csp-filter/src/main/webapp/WEB-INF/web.xml#L10-L29full).

### resulting page response

As a result, the page response should contain both a CSP header
including our nonce, as well as a nonce on all script elements generated
by the ZK page.

![](Cspheader.png)

![](Cspnonce.png)

## Notes

- Using CSP strict-dynamic disables script caching
