

# Html

- Demonstration:
  [Html](http://www.zkoss.org/zkdemo/composite/html_element)
- Java API: <javadoc>org.zkoss.zul.Html</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Html</javadoc>


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

On Chrome, if <code>

<html>

</code>'s sibling use `vflex` to set hight flexibly, developer must
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

Without this setting, `offsetHeight` of <code>

<html>

</code> will be zero, and sibling's height will be wrong.

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*None`

# Use Cases

| Version | Description                                  | Example Location                                                                                     |
|---------|----------------------------------------------|------------------------------------------------------------------------------------------------------|
| 3.6     | Work with HTML tags: The Html component      | [The Html component]({{site.baseurl}}/zk_dev_ref/ui_patterns/html_tags/the_html_component) |
| 3.6     | herf attribute in Html component             | [<http://www.zkoss.org/forum/listComment/4745>](http://www.zkoss.org/forum/listComment/4745)         |
| 3.6     | Use Html component to escape HTML characters | [<http://www.zkoss.org/forum/listComment/11118>](http://www.zkoss.org/forum/listComment/11118)       |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


