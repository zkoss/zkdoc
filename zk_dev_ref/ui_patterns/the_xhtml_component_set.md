# Overview

Like [ZUL](ZUML_Reference/ZUML/Languages/ZUL), the [XHTML component set](ZUML_Reference/ZUML/Languages/XHTML) is a
collection of components. Unlike ZUL, which is designed to have rich
features, each XHTML component represents an HTML tag. For example, the
following XML element will cause ZK Loader to create a component called
<javadoc>org.zkoss.zhtml.Ul</javadoc>.

```xml
<h:ul xmlns:h="xhtml">
```

XHTML component supports HTML5 tag attributes, and these attributes
could be accessed by MVVM. About MVVM, please refer to the [MVVM document](http://books.zkoss.org/zk-mvvm-book/8.0/introduction_of_mvvm.html).

# Dynamic Update

Because Components are instantiated for XML elements specified with the
XHTML namespace, you could update its content dynamically on the server.
For example, we could allow users to click a button to add a column as
shown below.

![]({{site.baseurl}}/zk_dev_ref/images/html_1.png)

```xml
 <window title="mix HTML demo" xmlns:h="xhtml">
     <h:table border="1">
         <h:tr id="row1">
             <h:td>column 1</h:td>
             <h:td>
                 <listbox id="list" mold="select">
                     <listitem label="AA"/>
                     <listitem label="BB"/>
                 </listbox>
             </h:td>
         </h:tr>
     </h:table>
     <button label="add" onClick="row1.appendChild(new org.zkoss.zhtml.Td())"/>
 </window>
```

On the other hand, the [native namespace]({{site.baseurl}}/zk_dev_ref/ui_patterns/html_tags/the_native_namespace)
will cause *native* HTML tags to be generated. It means you can not
modify the content dynamically on the server. Notice that you still can
handle them dynamically at the client.

However, when an XHTML component is used, a component running on the
server has to be maintained. Thus, you should use the XHTML component
set only if there is no better way for doing it.

For example, we could rewrite the previous sample with the native
namespace and some client-side code as follows.

```xml
<window title="mix HTML demo" xmlns:n="native">
     <n:table border="1">
         <n:tr id="row1">
             <n:td>column 1</n:td>
             <n:td>
                 <listbox id="list" mold="select">
                     <listitem label="AA"/>
                     <listitem label="BB"/>
                 </listbox>
             </n:td>
         </n:tr>
     </n:table>
     <button label="add" w:onClick="jq('#row1').append('&lt;td>&lt;/td>')" xmlns:w="client"/>
 </window>
```

# ID and UUID

Unlike other components, if you assign ID to an XHTML component, its
UUID (<javadoc method="getUuid()">org.zkoss.zk.ui.Component</javadoc>)
is changed accordingly. It means you cannot have two XHTML components
with the same ID, no matter if they are in different ID spaces.

# Filename Extension

As described in [ZUML](ZUML_Reference/ZUML/Languages), the
XHTML component set is associated with zhtml, xhtml, html and htm. It
means you could name a ZUML page as foo.zhtml if you map `*.zhtml` to ZK
Loader. However, when this kind of file is interpreted, ZK Loader
assumes it will have its own HTML, HEAD, BODY tags. On the other hand,
these tags are generated automatically if the filename extension is
`zul`.

For example, suppose we have a file called foo.zhtml, then the content
might look as follows.

```xml
<?link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"?>
<html xmlns:zk="zk" xmlns:z="zul">
  <head>
    <title>ZHTML Demo</title>
    <zkhead/><!-- a special tag to indicate where to generate ZK CSS and JS files -->
  </head>
  <body style="height:auto">
    <h1>ZHTML Demo</h1>
    <ul id="ul">
        <li>The first item.</li>
        <li id="li2" zk:onClick='self.setId("li2".equals(self.getId()) ? "":"li2")'>Click me to change Id.</li>
    </ul>
  </body>
</html>
```

where

1.  Since the extension is `zhtml`, the default namespace is XHTML.
    Thus, we have to specify the zk and zul namespace explicitly.
    - Notice that we have to specify the [zk namespace](ZUML_Reference/ZUML/Namespaces/ZK) too,
      because XHTML will cause ZK Loader to consider any unrecognized
      element as native HTML tag.
2.  We have to specify HTML, HEAD and BODY to make it a valid HTML
    document.
3.  We could specify zkhead (line 5) to indicate where to generate ZK
    CSS and JavaScript files. It is optional. If not specified, ZK will
    try to identify the proper location for ZK CSS and JavaScript files.
    Specify it if you want some CSS or JavaScript files to be evaluated
    *before* or *after* ZK's default ones.
4.  By default, BODY's CSS is `width:100%;height:100%`. However, it is
    appropriate for Web-look page[^1] For Web-look, we could specify
    `height:auto` to reset it back to the browser's default.

> ------------------------------------------------------------------------
>
> <references/>

[^1]: `height:100%` is more for desktop-application-look, such as using
    with <javadoc>org.zkoss.zul.Borderlayout</javadoc>.
