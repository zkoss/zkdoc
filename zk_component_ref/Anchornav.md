

# Anchornav

- Demonstration: [Anchornav: A new ZK Addon for scrolling within a
  page](https://blog.zkoss.org/2019/08/29/anchornav-a-new-zk-addon-for-scrolling-within-a-page/)
- Java API:
  [Anchornav](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Anchornav.html)
- JavaScript API:
  [Anchornav](http://www.zkoss.org/javadoc/latest/jsdoc/zkmax/nav/Anchornav.html)

{% include edition-availability.html edition="pe" %} {% include version-badge.html version=9.0.0 %}

# Employment/Purpose

This component synchronizes the scrolling position on a page or within
ZK containers (Div, Window, etc.) with [
<a>]({{site.baseurl}}/zk_component_ref/essential_components/A) and
[<button>]({{site.baseurl}}/zk_component_ref/essential_components/Button).
It allows you to both navigate to desired ZK components on a page and to
highlight the current navigation link based on the current scroll
position.

# Scroll a Page

By default, the Anchornav will watch the scroll position of a page.

![]({{site.baseurl}}/zk_component_ref/images/anchornav.gif)

``` xml
<zk xmlns:ca="client/attribute">
    <anchornav>
        <listbox sizedByContent="true" hflex="min">
            <listitem><listcell><a ca:data-anchornav-target="$win1"> First Window </a></listcell></listitem>
            <listitem><listcell><a ca:data-anchornav-target="$win2"> Second Window </a></listcell></listitem>
            <listitem><listcell><a ca:data-anchornav-target="$win3"> Third Window </a></listcell></listitem>
        </listbox>
    </anchornav>
    <window id="win1" title="1. First Window" height="500px" sclass="target" style="background:skyblue">
        Hello world.
    </window>
    <window id="win2" title="2. Second Window" height="500px" sclass="target" style="background:coral">
        Welcome to ZK world.
    </window>
    <window id="win3" title="3. Third Window" height="500px" sclass="target" style="background:bisque">
        Welcome to ZK world.
    </window>
</zk>
```

- Line 4~6: `$win1` is an ID selector which means the widget of the
  component whose ID is `win1`. Please see [Widget
  selector](https://www.zkoss.org/javadoc/latest/jsdoc/zk/Widget.html#Z:Z:D-zk.Object-_global_.Map-)
  for details.

A or Button components can be used as anchor links, and targets are
specified by the ZK client-attribute
`ca:data-anchornav-target=[selector]`.

Here the JQuery-based selector syntax (#domId / .class / elementName) is
extended by ZK specific selectors using `$componentId` or
`@componentName`.

# Scroll a Container

To scroll a container, you need to associate a named Anchornav with a
container component by setting the client-attribute:
`ca:data-anchornav-scroll`:

``` xml
<div ca:data-anchornav-scroll="a1">
     <!-- other components -->
</div>
```

# Properties

## Name

Set the name of Anchornav, it is only required when we want to watch
scrolling in ZK containers, instead of watching the whole page.

The name declared on Anchornav must be used on the scrolling container
with the ca:data-anchornav-scroll attribute such as:

Note: This is necessary when using a scrollbar inside a component,
rather than the document-level scrollbar

``` xml
<zk xmlns:ca="client/attribute">
  <anchornav name="a1" width="250px">
...
   </anchornav>
    <div id="scrollableDiv" style="overflow:auto" ca:data-anchornav-scroll="a1">
      <window id="win1" title="1. First Window">
        Hello world.
      </window>
      <window id="win2" title="2. Second Window">
        Welcome to ZK world.
      </window>
    </div>
</zk>
```

## PositionFixed

Default: `true`

Sets whether to enable position fixed when anchornav is out of current
view. When it is set to true, Anchornav will stay (float) on the same
position of the page.

# Supported Events

- Inherited Supported Events: [
  LabelImageElement]({{site.baseurl}}/zk_component_ref/base_components/LabelImageElement#Supported_Events)

# Supported Children

`*ALL`

# Version History



| Version | Date           | Content                                                                                                |
|---------|----------------|--------------------------------------------------------------------------------------------------------|
| 9.0.0   | November, 2019 | [Anchornav](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Anchornav.html) was introduced. |


