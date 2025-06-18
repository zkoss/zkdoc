

Hflex
(<javadoc method="setHflex(java.lang.String)">org.zkoss.zk.ui.HtmlBasedComponent</javadoc>)
and vflex
(<javadoc method="setVflex(java.lang.String)">org.zkoss.zk.ui.HtmlBasedComponent</javadoc>)
indicate the flexibility of the component, which indicates how a
component's parent distributes the remaining empty space among its
children. Hflex controls the flexibility in the horizontal direction,
while vflex in the vertical direction.

Flexible components grow and shrink to fit their given space. Components
with larger flex values will be made larger than components with lower
flex values, at the ratio determined by the two components. The actual
value is not relevant unless there are other flexible components within
the same container. Once the default sizes of components in a box are
calculated, the remaining space in the box is divided among the flexible
components, according to their flex ratios. Specifying a flex value of 0
has the same effect as leaving the flex attribute out entirely.

# 2 Different Underlying Implementations

ZK 9 implements hflex/vflex in a whole new, more performant way -- by
[CSS3 flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox),
which is supported by modern browsers natively. With this change, it
doesn't calculate an element's size in javascript thus improving the
client-side performance. This change should be transparent for
developers.

The exceptional case is `min`, e.g. `hflex="min" or vflex="min"`, which
still sets width by JavaScript.

## Fall Back to the Old Way

However, if your application depends on the previous implementation, you
can fall back by the property [ org.zkoss.zul.css.flex="false"]({{site.baseurl}}/zk_config_ref/the_library_properties/org.zkoss.zul.css.flex).

# Prerequisite: Parent Requires Width/Height Specified

Notice that, if the parent has no predefined size (width/height) (i.e.,
its size is decided by its children), the flexible component won't take
any space. For example, the inner div (with vflex) in the following
example takes no space:

```xml
<div><!--Wrong! The height is required since it is minimal height by default-->
  <datebox width="150px"/>
  <div vflex="1" style="background: yellow"/><!--height will be zero since height not specified in parent div-->
</div>
```

To solve it, you have to specify the height in the outer div, such as
`<div height="100%">`, `<div height="200px">`, or `<div vflex="1">`.

# Fit-the-Rest Flexibility

The simplest use of flex is to have one component to take the rest of
the space of its parent (or the page, if it is the root component). For
example,

```xml
<zk>
  <datebox/>
  <div vflex="1" style="background: yellow"/>
</zk>
```

And, the result

![]({{site.baseurl}}/zk_dev_ref/images/drflex1.png‎)

Here is another example that we'd like to grow the tabbox to fit the
rest of the space:

```xml
<zk>
   <datebox/>
   <tabbox vflex="1">
      <tabs>
         <tab label="Home"/>
         <tab label="Direction"/>
      </tabs>
      <tabpanels>
         <tabpanel style="overflow: auto">
         <div height="500px"  style="background: yellow"/>
         </tabpanel>
         <tabpanel>
         </tabpanel>
      </tabpanels>
   </tabbox>
</zk>
```

Notice you could specify `style="overflow: auto"` in the tabpanel such
that the scrollbar will be inside the tabbox rather than the browser
window if the content is too large to fit.

![]({{site.baseurl}}/zk_dev_ref/images/drflextabbox.png‎)

# Proportional Flexibility

The absolute value of the vflex/hflex is not that important. It is used
to determine the proportion among flexible components. That is, you can
give different integers to differentiate child components so they will
take space proportionally per the given vflex/hflex value. For example,

```xml
<div width="200px" height="50px">
    <div style="background: blue" vflex="1" hflex="1"/>
    <div style="background: yellow" vflex="2" hflex="1"/>
</div>
```

And, the result is

![]({{site.baseurl}}/zk_dev_ref/images/drflex2.png)

Here is another example (hflex):

```xml
<hlayout width="200px">
    <div style="background: blue" hflex="1">1</div>
    <div style="background: yellow" hflex="2">2</div>
</hlayout>
```

![]({{site.baseurl}}/zk_dev_ref/images/drflexerr1fix.png)

# Minimum Flexibility

Sometimes, you might wish that the parent component's size is determined
by its children. Or I shall say, the size of the parent component is
just high/wide enough to hold all of its child components. Specifying
`vflex/hflex="min"` can fulfill this fit-the-content requirement.

```xml
<borderlayout height="200px" width="400px">
    <north title="North" vflex="min">
        <borderlayout vflex="min">
            <west title="West" size="40%" flex="true" vflex="min">
                <div style="background:#B8D335">
                    <label value="40%" style="color:white;font-size:50px"/>
                </div>
            </west>
            <center flex="true" vflex="min">
                <div style="background:#E6D92C">
                    <label value="60%" style="color:white;font-size:50px"/>
                </div>
            </center>
        </borderlayout>
    </north>
    <center>
        <label value="This is the working area"
            style="font-size:30px" />
    </center>
</borderlayout>
```

![]({{site.baseurl}}/zk_dev_ref/images/vflexborderlayout.png)

As you can see, the height of the north region of the outer borderlayout
is determined by its child borderlayout. And the height of the inner
borderlayout, in this example, is determined by the height of its west
child region.

Also notice that the flex property
(<javadoc method="setFlex(boolean)">org.zkoss.zul.LayoutRegion</javadoc>)
is unique to borderlayout
([north]({{site.baseurl}}/zk_component_ref/layouts/borderlayout/north)
and others). Don't confuse it with hflex or vflex.

## Don't specify Minimum on a parent and 1 on a child

Because `min` means "calculate the size by its children" and `1` means
"calculate the size by its parent", this configuration will make 2
components' **size calculation depends on each other** and get 0
finally. But there are workarounds, please read the following sections.

### Component width within Vlayout/Vbox using minimum hflex

In the case below, we see nothing for the incorrect usage (`min` on the
parent - vlayout, `1` on the child - div):

```xml
<vlayout hflex="min" height="30px">
    <div hflex="1" vflex="1" style="background: yellow"></div>
</vlayout>
```

However, in the case below, because one of the children, red `div` has a
fixed width, `vlayout` can determine its width. So that yellow `div` can
also determine its width upon its parent, which is 150px.

<table>
<tbody>
<tr class="odd">
<td>![](/zk_dev_ref/images/ZK6DevRef_Vlayout_Hflex.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">vlayout</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span><span class="ot"> height=</span><span class="st">&quot;75px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span><span class="ot"> hflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> vflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> style=</span><span class="st">&quot;background: yellow&quot;</span>&gt;150px&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> vflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> style=</span><span class="st">&quot;background: cyan&quot;</span>&gt;100px&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;150px&quot;</span><span class="ot"> vflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> style=</span><span class="st">&quot;background: red&quot;</span>&gt;150px&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">vlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Component height within Hlayout/Hbox using minimum vflex

Normally, if the siblings of yellow **div** have been defined height
correctly, that yellow **div** height should be equal to the **max
height** of siblings, which is 30px in the following sample.

<table>
<tbody>
<tr class="odd">
<td>![](/zk_dev_ref/images/ZK6DevRef_Hlayout_Vflex.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">hlayout</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> vflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span><span class="ot"> hflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> vflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> style=</span><span class="st">&quot;background: yellow&quot;</span>&gt;30px&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span><span class="ot"> hflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> height=</span><span class="st">&quot;20px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background: cyan&quot;</span>&gt;20px&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span><span class="ot"> hflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> height=</span><span class="st">&quot;30px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background: red&quot;</span>&gt;30px&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">hlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

However, in the following use case, we should see nothing as it is an
incorrect usage:

```xml
<hlayout width="100px" vflex="min">
    <div hflex="1" vflex="1" style="background: yellow"></div>
</hlayout>
```

# Grid's Column and Flexibility

If hflex is specified in the header of
[grid]({{site.baseurl}}/zk_component_ref/data/grid),
[listbox]({{site.baseurl}}/zk_component_ref/data/listbox) and
[tree]({{site.baseurl}}/zk_component_ref/data/tree), it is applied to
the whole column (including the header and contents).

For example, we could assign 33% to the first column and 66% to the
second as follows.

```xml
<grid width="300px">
    <columns>
        <column label="Name" hflex="1"/>
        <column label="Value" hflex="2"/>
    </columns>
    <rows>
        <row>username:<textbox hflex="1"/></row>
        <row>password:<textbox hflex="1"/></row>
    </rows>
</grid>
```

The result is

![]({{site.baseurl}}/zk_dev_ref/images/drgridflex.png)

Notice that we also specify `hflex="1"` to the textbox, so it will take
up the whole space.

### Alignment

When we create a form, we will put some input elements in a Grid. We can
set hflex="min" to Grid and each Column to keep Grid with minimal size.

<table>
<tbody>
<tr class="odd">
<td>![](/zk_dev_ref/images/ZK5DevRef_GridColumn_FormHflex.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">grid</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">columns</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">column</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span><span class="ot"> align=</span><span class="st">&quot;right&quot;</span>/&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">column</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span>/&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">columns</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">rows</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">row</span>&gt;   </span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">label</span><span class="ot"> value=</span><span class="st">&quot;Name:&quot;</span>/&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">textbox</span>/&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">row</span>&gt;   </span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">label</span><span class="ot"> value=</span><span class="st">&quot;Birthday:&quot;</span>/&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">datebox</span>/&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">rows</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">grid</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a> </span></code></pre></div></td>
</tr>
</tbody>
</table>

If we need the Datebox's width the same as Textbox, we can specify
hflex="1" to Datebox.

<table>
<tbody>
<tr class="odd">
<td>![](/zk_dev_ref/images/ZK5DevRef_GridColumn_FormHflex2.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">grid</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">columns</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">column</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span><span class="ot"> align=</span><span class="st">&quot;right&quot;</span>/&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">column</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span>/&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">columns</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">rows</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">row</span>&gt;   </span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">label</span><span class="ot"> value=</span><span class="st">&quot;Name:&quot;</span>/&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">textbox</span>/&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">row</span>&gt;   </span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">label</span><span class="ot"> value=</span><span class="st">&quot;Birthday:&quot;</span>/&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">datebox</span><span class="ot"> hflex=</span><span class="st">&quot;1&quot;</span>/&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">rows</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">grid</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a> </span></code></pre></div></td>
</tr>
</tbody>
</table>

### Cell colspan

Sometimes we need to put some elements in cross column, we can put it in
a Cell and set hflex="1" to the element.

<table>
<tbody>
<tr class="odd">
<td>![](/zk_dev_ref/images/ZK5DevRef_GridColumn_FormHflex_colspan.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">grid</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">columns</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">column</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span><span class="ot"> align=</span><span class="st">&quot;right&quot;</span> /&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">column</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span> /&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">column</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span><span class="ot"> align=</span><span class="st">&quot;right&quot;</span> /&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">column</span><span class="ot"> hflex=</span><span class="st">&quot;min&quot;</span> /&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">columns</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">rows</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">row</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">label</span><span class="ot"> value=</span><span class="st">&quot;Name:&quot;</span> /&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">textbox</span>/&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">label</span><span class="ot"> value=</span><span class="st">&quot;Birthday:&quot;</span> /&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">datebox</span>/&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">row</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">label</span><span class="ot"> value=</span><span class="st">&quot;Address:&quot;</span> /&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">cell</span><span class="ot"> colspan=</span><span class="st">&quot;3&quot;</span>&gt;</span>
<span id="cb1-18"><a href="#cb1-18" aria-hidden="true" tabindex="-1"></a>                &lt;<span class="kw">textbox</span><span class="ot"> rows=</span><span class="st">&quot;5&quot;</span><span class="ot"> hflex=</span><span class="st">&quot;1&quot;</span>/&gt;</span>
<span id="cb1-19"><a href="#cb1-19" aria-hidden="true" tabindex="-1"></a>            &lt;/<span class="kw">cell</span>&gt;</span>
<span id="cb1-20"><a href="#cb1-20" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-21"><a href="#cb1-21" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">rows</span>&gt;</span>
<span id="cb1-22"><a href="#cb1-22" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">grid</span>&gt;</span>
<span id="cb1-23"><a href="#cb1-23" aria-hidden="true" tabindex="-1"></a> </span></code></pre></div></td>
</tr>
</tbody>
</table>

For a complete list of controls that you could apply to the columns of
grid, listbox and tree, please refer to [ZK Developer's Reference/UI Patterns/Grid's Columns and Hflex]({{site.baseurl}}/zk_dev_ref/ui_patterns/grid's_columns_and_hflex).

# Flexibility versus Percentage

The use of hflex and vflex is similar to the use of percentage in width
and height. For example,

```xml
<div width="200px" height="200px">
    <div height="33%" style="background: blue">1</div>
    <div height="66%" style="background: yellow">2</div>
</div>
```

The advantage of percentage is that the performance will be a little
better, since it is done by the browser. However, hflex and vflex are
recommended because of the following issues:

- The use of 100% will cause overflow (and then scrollbar appears if
  overflow:auto), if padding is not zero. Moreover, some browsers might
  show mysterious scrollbars or overflow the parent's space even if
  padding is zero.
- The percentage does *not* work, if any of the parent DOM element does
  not specify the width or height.
- The percentage does *not* support *take-the-rest-space*. For example,
  the following doesn't work:

```xml
<!-- a vertical scrollbar appear (not as expected) -->
<div height="100%">
    <datebox/>
    <div height="100%"/>
</div>
```

## Body Height and Padding

By default, ZK's theme configures the document's BODY tag as follows.

```css
body {
    height: 100%;
    padding: 0 5px;
}
```

Sometimes you might prefer to add some padding vertically, but it
*cannot* be done by changing BODY's styling as follows.

```css
body {
    height: 100%;
    padding: 5px; /* WRONG! It causes vertical scrollbar to appear since the 100% height is used with vertical padding */
}
```

As described in the previous section, a vertical scrollbar will appear,
since both the vertical padding and the 100% height are specified.

**Solution**: you shall *not* change the default CSS styling of BODY.
Rather, you could enclose the content with [the div component]({{site.baseurl}}/zk_component_ref/containers/div), and then
specify `vflex="1"` and the padding to the div component. For example,

```xml
<div style="padding: 5px 0" vflex="1">
    <grid>
        <rows>
            <row>aaa</row>
        </rows>
    </grid>
</div>
```

# Flexibility and Resizing

Vflex and hflex support resizing. If the parent component or the browser
window changes its size to increase or decrease the extra space, the
child components with vflex/hflex will recalculate themselves to
accommodate the new size.

```xml
<zk>
    <zscript><![CDATA[
        int[] str = new int[100];
        for(int i=0;i<100;i++){
            str[i]=i;
        }
    ]]></zscript>

    <div height="100%" width="300px">
        Top of the Tree
        <tree vflex="1">
            <treechildren>
                <treeitem forEach="${str}" label="item${each}"/>
            </treechildren>
        </tree>
        <tree vflex="2">
            <treechildren>
                <treeitem forEach="${str}" label="item${each}"/>
            </treechildren>
        </tree>
        Bottom of the Tree
    </div>
</zk>
```

Note that the height proportion between the two trees is always 1 : 2,
when we change the browser height.

# Limitations

## Span Ignores Width and Height

[Span]({{site.baseurl}}/zk_component_ref/containers/span) ignores the
width and height, so hflex and vflex have no effect on them (unless you
specify [display:block](http://www.quirksmode.org/css/display.html) --
but it makes it div eventually).

```xml
<!-- this example does not work -->
<div width="200px">
    <span style="background: blue" hflex="1">1</span>
    <span style="background: yellow" hflex="2">2</span>
</div>
```

And, the result is as follows - the width has no effect:

![]({{site.baseurl}}/zk_dev_ref/images/drflexerr1.png‎)

This limitation can be solved by the use of
[hlayout]({{site.baseurl}}/zk_component_ref/layouts/hlayout) and
[div]({{site.baseurl}}/zk_component_ref/containers/div) as follows.

```xml
<!-- this is correct -->
<hlayout width="200px">
    <div style="background: blue" hflex="1">1</div>
    <div style="background: yellow" hflex="2">2</div>
</hlayout>
```

![]({{site.baseurl}}/zk_dev_ref/images/drflexerr1fix.png)

## Hflex Must Align Correctly

Hflex will be wrong if a component is not aligned in the same *row* with
its siblings. For example,

```xml
<div width="200px">
  <div style="background: blue" hflex="1">1</div><!-- not work since it won't be aligned with sibling div -->
  <div style="background: yellow" hflex="2">2</div>
</div>
```

As shown below, the second div is not aligned vertically with the first
div, so is the width not as expected:

![]({{site.baseurl}}/zk_dev_ref/images/drflexerr2.png‎)

This limitation can be solved by use of
[hlayout]({{site.baseurl}}/zk_component_ref/layouts/hlayout) and
[div]({{site.baseurl}}/zk_component_ref/containers/div) as shown in the
previous subsection.

## Input elements have incorrect margin values in WebKit browsers

In WebKit browsers (Chrome, Safari), the left and right margin values of
an input element are considered 2px by browsers, where they are really
0px on screen. This may cause hflex to wrongly handle InputElements like
textbox, intbox, etc. For example, in the following case the Textbox
does not occupy the entire Div width in Chrome:

```xml
    <div width="300px" style="border: 1px solid green">
        <textbox hflex="1" />
    </div>
```

You can work around this by specifying Textbox margin to be 0:

```xml
    <style>
        input.nomargin {
            margin-left: 0;
            margin-right: 0;
        }
    </style>
    <div width="300px" style="border: 1px solid green">
        <textbox sclass="nomargin" hflex="1" />
    </div>
```

## Minimum Flexibility Doesn't Change a Component's Size Dynamically

When specifying `min` at `hflex`/`vflex`, ZK only sets a component's
size once at the page creation. The component doesn't change its size
accordingly even if you add or remove its child components (change its
content size). Therefore, if you want to resize the component upon its
content again, please call
<javadoc method="resize(org.zkoss.zk.ui.Component)">org.zkoss.zk.ui.util.Clients</javadoc>.

The same rule applies when you change the content of a parent component
to minimum hflex/vflex, the parent component doesn't resize itself upon
its content. You can need to call
<javadoc method="resize(org.zkoss.zk.ui.Component)">org.zkoss.zk.ui.util.Clients</javadoc>.

For example,

```xml
<zk>
    <div id="div" vflex="1" hflex="1" style="background: blue">blue</div>
    <button label="vflex to min">
        <attribute name="onClick"><![CDATA[
            div.setVflex("min");
            Clients.resize(div);
        ]]></attribute>
    </button>
</zk>
```
