

# Borderlayout

- Demonstration:
  [Borderlayout](http://www.zkoss.org/zkdemo/layout/border_layout)
- Java API: [org.zkoss.zul.Borderlayout](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Borderlayout.html)
- JavaScript API:
  [zul.layout.Borderlayout](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.Borderlayout.html)


# Employment/Purpose

The layout component is a nested component. The parent component is
`borderlayout`, and its children components include `north`, `south`,
`center`, `west`, and `east`. All extra space is placed in the center
area. The combination of children components of `borderlayout` is free.

A borderlayout could be nested to another borderlayout (actually, almost
all kinds of components) to form a complicated layout.

# Example

![](/zk_component_ref/images/ZKCompRef_Borderlayout.jpg)

```xml
<borderlayout height="450px">
    <north title="North" maxsize="300" size="50%" splittable="true" collapsible="true">
        <borderlayout>
            <west title="West" size="25%" flex="true" maxsize="250" splittable="true" collapsible="true">
                <div style="background:#B8D335">
                    <label value="25%"
                        style="color:white;font-size:50px" />
                </div>
            </west>
            <center border="none">
                <div style="background:#E6D92C" vflex="1">
                    <label value="25%"
                        style="color:white;font-size:50px" />
                </div>
            </center>
            <east size="50%" border="none">
                <label value="Here is a non-border"
                    style="color:gray;font-size:30px" />
            </east>
        </borderlayout>
    </north>
    <center border="0">
        <borderlayout>
            <west maxsize="600" size="30%" border="0" splittable="true">
                <div style="background:#E6D92C" vflex="1">
                    <label value="30%"
                        style="color:white;font-size:50px" />
                </div>
            </west>
            <center>
                <label value="Here is a border"
                    style="color:gray;font-size:30px" />
            </center>
            <east title="East" size="30%" collapsible="true">
                <div style="background:#B8D335"  vflex="1">
                    <label value="30%"
                        style="color:white;font-size:50px" />
                </div>
            </east>
        </borderlayout>
    </center>
</borderlayout>
```

# How to Layout

Borderlayout divides its child components into to five areas: North,
South, East, West and Center. The heights of North and South are firstly
decided, the remainder space is then given to Center as its height. Note
that East and West also takes on the height of Center.

<table>
<tbody>
<tr class="odd">
<td>![](/zk_component_ref/images/DrBorderlayout.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">borderlayout</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">north</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#008db7;color:white;&quot;</span>&gt;N&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">north</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">south</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#112f37;color:white;&quot;</span>&gt;S&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">south</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">center</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span>&gt;C&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">center</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">east</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;E&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">east</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">west</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;W&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">west</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">borderlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### flex

Layout region shares the height of Borderlayout with a distributing
sequence of: North, South and Center while the heights of East and West
takes on the height of Center. In the previous sample, the div in the
layout region does not take up all of layout region's space. In order
for the child to occupy the whole area, please set vflex="1" to the
child component.

<table>
<tbody>
<tr class="odd">
<td>![](/zk_component_ref/images/DrBorderlayout_flex.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">borderlayout</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">north</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#008db7;color:white;&quot;</span>&gt;N&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">north</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">south</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#112f37;color:white;&quot;</span>&gt;S&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">south</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">center</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span>&gt;C&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">center</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">east</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> vflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;E&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">east</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">west</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> vflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;W&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">west</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">borderlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Scrolling

- The height of Center depends on Borderlayout but not on its child,
  therefore, the height of Center will not be expanded by the growing
  size of its child components. If Center's height is too short for it's
  child, Center will cut out the contents of it's child, hence, to avoid
  this, specify autoscroll="true" to Center in order to assign Center to
  handle the scrolling.

<table>
<tbody>
<tr class="odd">
<td>![](/zk_component_ref/images/DrBorderlayout_Center_scrolling.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">borderlayout</span><span class="ot"> width=</span><span class="st">&quot;300px&quot;</span><span class="ot"> height=</span><span class="st">&quot;300px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">north</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot">  style=</span><span class="st">&quot;background:#008db7;color:white;&quot;</span>&gt;N&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">north</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">south</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot">  style=</span><span class="st">&quot;background:#112f37;color:white;&quot;</span>&gt;S&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">south</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">center</span><span class="ot"> autoscroll=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;200px&quot;</span>&gt;C&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">center</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">east</span><span class="ot"> flex=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;30px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;E&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">east</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">west</span><span class="ot"> flex=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;20px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;W&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">west</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">borderlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

{% include version-badge.html version=7.0.0 %}

The autoscroll attribute will create floating scrollbar and it is not
visible unless user mouse over on the region. To turn off the floating
scrollbar and use browser's default scrollbar, please add the following
configuration in zk.xml.

```xml
<library-property>
    <name>org.zkoss.zul.nativebar</name>
    <value>true</value>
</library-property>
```

**Note:** the value of org.zkoss.zul.nativebar is true by default ({%
include version-badge.html version=7.0.2 %}

### Grown by children

- To make Borderlayout dependable on the size of its child components,
  [vflex feature]({{site.baseurl}}/zk_dev_ref/ui_patterns/hflex_and_vflex#Minimum_Flexibility)
  is applied. Specify vflex="min" to each layout region and
  Borderlayout.

<table>
<tbody>
<tr class="odd">
<td>![](/zk_component_ref/images/DrBorderlayout_grow.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">borderlayout</span><span class="ot"> width=</span><span class="st">&quot;300px&quot;</span><span class="ot"> vflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">north</span><span class="ot"> vflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot">  style=</span><span class="st">&quot;background:#008db7;color:white;&quot;</span>&gt;N&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">north</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">south</span><span class="ot"> vflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot">  style=</span><span class="st">&quot;background:#112f37;color:white;&quot;</span>&gt;S&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">south</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">center</span><span class="ot"> vflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;200px&quot;</span>&gt;C&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">center</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">east</span><span class="ot"> flex=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;30px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;E&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">east</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">west</span><span class="ot"> flex=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;20px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;W&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">west</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">borderlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Borderlayout in a container

- Almost all containers' heights depend on their child components,
  however, the height of Borderlayout does not expand accordingly to the
  sizes of its child components, therefore, when placing Borderlayout in
  a container, users have to specify a fixed height in order for
  Borderlayout to be visible.

```xml
<zk>
    <window title="win" border="normal">
        <borderlayout height="200px">
            <north>
                <div style="background:blue">N</div>
            </north>
            <south>
                <div style="background:blue">S</div>
            </south>
            <center>
                <div>C</div>
            </center>
            <east>
                <div style="background:yellow">E</div>
            </east>
            <west>
                <div style="background:yellow">W</div>
            </west>
        </borderlayout>
    </window>
</zk>
```

- The default height of Borderlayout is dependent on its parent
  component, therefore, users can also put Borderlayout in a container
  with a fixed height.

```xml
<zk>
    <window title="win" border="normal" height="200px">
        <borderlayout>
            <north>
                <div style="background:blue">N</div>
            </north>
            <south>
                <div style="background:blue">S</div>
            </south>
            <center>
                <div>C</div>
            </center>
            <east>
                <div style="background:yellow">E</div>
            </east>
            <west>
                <div style="background:yellow">W</div>
            </west>
        </borderlayout>
    </window>
</zk>
```

# Properties

## AnimationDisabled

{% include version-badge.html version=5.0.8 %} You can specify this property to true
to disable the animation effects of this component.

### Configure to Disable the Animation Effects as Default

If you prefer to disable the animation effects as default, you could
configure ZK by adding the following to `/WEB-INF/zk.xml`

```xml
<library-property>
    <name>org.zkoss.zul.borderlayout.animation.disabled</name>
    <value>true</value>
</library-property>
```

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

- Inherited Supported Events: [ HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/htmlbasedcomponent#Supported_Events)

# Supported Children

`*`[` North`]({{site.baseurl}}/zk_component_ref/north)`, `[` South`]({{site.baseurl}}/zk_component_ref/south)`, `[` Center`]({{site.baseurl}}/zk_component_ref/center)`, `[` West`]({{site.baseurl}}/zk_component_ref/west)`, `[` East`]({{site.baseurl}}/zk_component_ref/east)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date            | Content                                                                                                                                                                                         |
|---------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.8   | August 11, 2011 | Added a way to disable the animation of borderlayout.                                                                                                                                           |
| 6.0.0   | Feb 14, 2012    | The flex attribute has been deprecated, please set vflex="1" to the child component in order to occupy the whole area.                                                                          |
| 7.0.2   | April 2014      | Due to the better user-firendly for the scrollbar layout, we changed the org.zkoss.zul.nativebar of the library property to true by default for Grid, Listbox, Tree and Borderlayout component. |


