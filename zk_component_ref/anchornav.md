---
title: "Anchornav"
---

- **Demonstration:** [Anchornav: A new ZK Addon for scrolling within a page](https://blog.zkoss.org/2019/08/29/anchornav-a-new-zk-addon-for-scrolling-within-a-page/)
- **Java API:** [Anchornav](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Anchornav.html)
- **JavaScript API:** [Anchornav](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.nav.Anchornav.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include supported-since.html version="9.0.0" %}

# Employment/Purpose

This component synchronizes the scrolling position on a page or within
ZK containers (Div, Window, etc.) with [`<a>`]({{site.baseurl}}/zk_component_ref/a) and [`<button>`]({{site.baseurl}}/zk_component_ref/button).
It allows you to both navigate to desired ZK components on a page and to highlight the current navigation link based on the current scroll
position.

## Common Use Cases

- **Page-level navigation bar**: place `<anchornav>` alongside tall content pages so users can jump between sections and see the active section highlighted as they scroll.
- **In-container navigation**: name the `<anchornav>` and associate it with an overflow `<div>` or `<window>` to track scrolling inside a ZK container rather than the document viewport.
- **Floating navigation widget**: rely on the default `positionFixed="true"` so the navigation panel stays visible even after the user scrolls past it.

# Example

The following minimal example shows `<anchornav>` watching the full-page scroll. Each `<a>` link carries a `ca:data-anchornav-target` pointing to a ZK component ID selector:

```xml
<zk xmlns:ca="client/attribute">
    <anchornav>
        <listbox sizedByContent="true" hflex="min">
            <listitem><listcell><a ca:data-anchornav-target="$sec1">Section 1</a></listcell></listitem>
            <listitem><listcell><a ca:data-anchornav-target="$sec2">Section 2</a></listcell></listitem>
        </listbox>
    </anchornav>
    <div id="sec1" height="400px" style="background:lightblue">
        Content of section 1
    </div>
    <div id="sec2" height="400px" style="background:lightyellow">
        Content of section 2
    </div>
</zk>
```

The `$sec1` notation is a ZK widget selector that resolves to the widget whose component ID is `sec1`. See [Widget selector](https://www.zkoss.org/javadoc/latest/jsdoc/zk/Widget.html#Z:Z:D-zk.Object-_global_.Map-) for the full selector syntax.

# Scroll a Page

By default, the Anchornav will watch the scroll position of a page.

![Anchornav]({{site.baseurl}}/zk_component_ref/images/anchornav.gif)

```xml
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
  component whose ID is `win1`. Please see [Widget selector](https://www.zkoss.org/javadoc/latest/jsdoc/zk/Widget.html#Z:Z:D-zk.Object-_global_.Map-)
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

```xml
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

```xml
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

**Default Value:** `true`

Sets whether to enable position fixed when anchornav is out of current
view. When it is set to true, Anchornav will stay (float) on the same
position of the page.

# Supported Events

- Inherited Supported Events: [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*ALL`