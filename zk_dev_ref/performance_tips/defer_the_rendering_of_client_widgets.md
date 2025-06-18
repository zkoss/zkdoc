In addition to [ Defer the Creation of Child
Components]({{site.baseurl}}/zk_dev_ref/performance_tips/defer_the_creation_of_child_components),
you can defer the rendering of the widgets at the client by the use of
the `renderdefer` attribute. It is a technique to make a sophisticated
page appear earlier.

For example, we can defer the rendering of the inner window for 100
milliseconds as shown below

```xml
<window title="Render Defer" border="normal">
    The following is rendered after 100 milliseconds.
    <window title="inner" width="300px" height="200px" border="normal"
    renderdefer="100">
        Enter something <datebox onChange='i.value = self.value + ""'/>
        <separator/>
        <label id="i"/>
        <separator bar="true"/>
        <button label="say hi" onClick='alert("Hi")'/>
    </window>
</window>
```

Unlike the `fulfill` attribute, the components on the server and the
widgets at the client are created no matter if `renderdefer` is
specified. It only defers the rendering of the widgets into DOM
elements.

Here is another example in pure Java.

```java
Tabpanel tp = new Tabpanel();
tp.setRenderdefer(0);
```

The render-defer technique is useful to improve the response time of
showing a sophisticated page in a slow client. The total time required
to render is not reduced (since all widgets still have to render later),
but it allows the page to show up sooner and it makes the user feel more
responsive.

# Things you need to be careful about

\[<http://tracker.zkoss.org/browse/ZK-2336%5DWhen> you use this function
on a child component, it's necessary to consider how the final style is
shown after finishing "renderdefer". For example,

```xml
<zk xmlns:w="client">
<style>
    .always-scroll .z-grid-body {
        overflow-y: scroll !important;
    }
</style>
<grid sclass="always-scroll" width="400px" height="200px" >
    <columns>
        <column label="renderdefer (scrollbar col / odd row style missing) hflex col" hflex="1"></column>
    </columns>
    <rows>
        <row renderdefer="200"><cell height="50px">CELL 1</cell></row>
        <row renderdefer="400"><cell height="50px">CELL 2</cell></row>
        <row renderdefer="600"><cell height="50px">CELL 3</cell></row>
        <row renderdefer="800"><cell height="50px">CELL 4</cell></row>
        <row renderdefer="1000"><cell height="50px">CELL 4</cell></row>
    </rows>
</grid>
```

When you put "renderdefer" into row or rows without pre-defining to
forcibly show the vertical-scrollbar, ZK treats it as the "zeroth" rows
at first while hflex uses the total width of the grid without
subtracting the width of the scrollbar. After "renderdefer" completes,
we will find that the horizontal scroll bar has also appeared. However,
this shouldn't be the case, only the y-scrollbar should have appeared.
The solution to solve this is to force the vertical-scrollbar to show
through CSS to prevent this from happening.

We recommend that you should defer the component by putting the
"renderdefer" property on the component tag instead of putting it on
children components (e.g. grid, columns, rows).
