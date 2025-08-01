**Listener:**

`org.zkoss.zk.ui.sys.SEORenderer`

A listener could implement
[org.zkoss.zk.ui.sys.SEORenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/SEORenderer.html) to
generate application-specific SEO content. The SEO content could be
anything. It is visible to the search engine (for indexing), but it is
not visible to the end users[^1]

Once registered,
[org.zkoss.zk.ui.sys.SEORenderer#render(org.zkoss.zk.ui.Page, java.io.Writer)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/SEORenderer.html#render(org.zkoss.zk.ui.Page, java.io.Writer))
will be invoked each time the main page of a desktop has been rendered
and sent to the client[^2].

For example, assume you have an implementation called
`foo.MySEORenderer`, then you could specify it in `WEB-INF/zk.xml`

```xml
<!-- in WEB-INF/zk.xml -->
<listener>
    <listener-class>foo.MySEORenderer</listener-class>
</listener>
```

You could generate anything that you'd like the search engine to index
in
[org.zkoss.zk.ui.sys.SEORenderer#render(org.zkoss.zk.ui.Page,  java.io.Writer)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/SEORenderer.html#render(org.zkoss.zk.ui.Page,  java.io.Writer)):

```java
package foo;
import org.zkoss.zk.ui.sys.SEORenderer;
import org.zkoss.zk.ui.Page;
public class MySEORenderer implements SEORenderer {
    public void render(Page page, java.io.Writer out)
    throws java.io.IOException {
        out.write("<a href=\"whatever\">whatever</a>");
    }
}
```

In addition to SEO content, you could also generate the JavaScript code.
For example, you could implement a SEORenderer listener to generate a
snippet of JavaScript code that will be embedded into every page.

Notice that, if specified, this class will be instantiated and invoked
even if [the crawlable option]({{site.baseurl}}/zk_config_ref/the_crawlable_element)
is not enabled.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.

# Real Example

You can also take a look at the ZK's blog about [another approach to SEO in ZK Applications](http://blog.zkoss.org/index.php/2011/03/17/make-zk-application-work-with-seo/).

> ------------------------------------------------------------------------
>
> <references/>

# Version History

| Version | Date       | Content                                                                                               |
|---------|------------|-------------------------------------------------------------------------------------------------------|
| 5.0.7   | April 2011 | [org.zkoss.zk.ui.sys.SEORenderer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/SEORenderer.html) could be specified as a listener. |

[^1]: The SEO content will be replaced with the content of ZK components
    after the page has been rendered.

[^2]: It also means it won't be called in AU requests.
