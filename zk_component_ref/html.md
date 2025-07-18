

# Html

- Demonstration:
  [Html](http://www.zkoss.org/zkdemo/composite/html_element)
- Java API: [org.zkoss.zul.Html](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Html.html)
- JavaScript API: [zul.wgt.Html](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Html.html)


# Employment/Purpose

The simplest way is to use an XUL component called `html`to embed
whatever HTML tags you want to send directly to the browser. To avoid ZK
from interpreting the HTML tags, you usually enclose them with and
`]]>`. In other words, they are not the child component. Rather, they
are stored in the `content`property. Notice you can use EL expressions
in it.

# Example

![](/zk_component_ref/images/ZKComRef_Html.png)

```xml
 <window id="win" title="Html Demo" border="normal">
     <html><![CDATA[
         <h4>Hi, ${win.title}</h4>
         <p>It is the content of the html component.</p>
     ]]></html>
 </window>
```

where `<h4>...</p>` will become the content of the `html` element (see
also the `getContent` method of the `org.zkoss.zul.Html` class).

The `html` component generates the HTML `SPAN` tag to enclose the
content. In other words, it generates the following HTML tags when
rendered to the browser.

```xml
 <span id=”...”>
     <h4>Hi, Html Demo</h4>
     <p>It is the content of the html component.</p>
 </span>
```

# Size issue

On Chrome, if `

<html>

`'s sibling use `vflex` to set hight flexibly, developer must
override `.z-html` CSS like this:

```css
.z-html {
    display:block;
}
```

or

```css
.z-html {
    display: inline-block;
}
```

Without this setting, `offsetHeight` of `

<html>

` will be zero, and sibling's height will be wrong.

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*None`

# Use Cases

| Version | Description                                  | Example Location                                                                                     |
|---------|----------------------------------------------|------------------------------------------------------------------------------------------------------|
| 3.6     | Work with HTML tags: The Html component      | [The Html component]({{site.baseurl}}/zk_dev_ref/ui_patterns/the_html_component) |
| 3.6     | herf attribute in Html component             | [<http://www.zkoss.org/forum/listComment/4745>](http://www.zkoss.org/forum/listComment/4745)         |
| 3.6     | Use Html component to escape HTML characters | [<http://www.zkoss.org/forum/listComment/11118>](http://www.zkoss.org/forum/listComment/11118)       |



