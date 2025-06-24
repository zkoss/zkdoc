# Overview

One of the simplest ways is to use a XUL component called
[html]({{site.baseurl}}/zk_component_ref/essential_components/html) to
embed whatever HTML tags you want. The html component works like an HTML
SPAN tag enclosing the HTML fragment. For example,

```xml
 <window border="normal" title="Html Demo">
     <html><![CDATA[
         <h4>Hi, ${parent.title}</h4>
         <p>It is the content of the html component.</p>
     ]]></html>
 </window>
```

As shown above, we enclose them with and `]]>` to prevent ZK Loader from
interpreting the HTML tags embedded in the html element. In other words,
they are not the child component. Rather, they are stored in the
`content` property (by use of
[org.zkoss.zul.Html#setContent(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Html.html#setContent(java.lang.String))[^1].
In other words, `<h4>...</p>` will become the content of the `html`
element.

Also notice that EL expressions are allowed.

> ------------------------------------------------------------------------
>
> <references/>

# What Are Generated

The `html` component will eventually generate the HTML SPAN tag to
enclose the content when attached to the browser's DOM tree. In other
words, it generates the following HTML tags when attached to the
browser's DOM tree.

```xml
 <span id="z_4a_3">
     <h4>Hi, Html Demo</h4>
     <p>It is the content of the html component.</p>
 </span>
```

# It's a Component

The `html` component is no different to other XUL components. For
example, you specify the CSS style and change its content dynamically.

```xml
<zk>
    <html id="h" style="border: 1px solid blue;background: yellow">
    <![CDATA[
         <ul>
             <li>Native browser content</li>
         </ul>
    ]]>
    </html>
    <button label="change" onClick="h.setContent(&quot;Hi, Update&quot;)" />
</zk>
```

You can change its content dynamically.

```java
htm.setContent("<ul><li>New content</li></ul>");
```

# Limitation

Since `SPAN` is used to enclose the embedded HTML tags, the following
code snippet is incorrect.

```xml
<zk>
    <html><![CDATA[
            <ul>
         <li> <!-- incorrect since <ul><li> is inside <span> -->
         ]]>
        </html>

        <textbox />

        <html><![CDATA[
                 </li>
             </ul>
         ]]>
    </html>
</zk>
```

If you need to generate the embedded HTML tags directly without the
enclosing `SPAN` tag, you can use the xhtml component set or the native
namespace as described in the following section.

[^1]: Fore more information please refer to [ZUML Reference](ZUML_Reference/ZUML/Texts).
