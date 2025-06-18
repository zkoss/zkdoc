

# Nav

- Demonstration:
- Java API:
  [Nav](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Nav.html)
- JavaScript API:
  [Nav](http://www.zkoss.org/javadoc/latest/jsdoc/zkmax/nav/Nav.html)
- Style Guide:
- {% include edition-availability.html edition="pe" %}

# Employment/Purpose

A container is used to display `navitem`, it should be placed inside a
`navbar`.

# Example

![](/zk_component_ref/images/ZKComRef_Nav.png)

```xml
<navbar orient="vertical" width="200px">
    <navitem label="Home" iconSclass="z-icon-home" />
    <nav label="Get Started" iconSclass="z-icon-th-list" badgeText="3">
        <navitem label="Step One" />
        <navitem label="Step Two" />
        <navitem label="Step Three" />
    </nav>
    <navitem label="About" iconSclass="z-icon-flag" />
    <navitem label="Contact" iconSclass="z-icon-envelope"/>
</navbar>
```

# Properties

## Badge Text

This property set the badge text for the `Nav`,it is used to present
more details of `Nav`. For example, a `Nav` with label "Get Started"
contains three `Navitem` components. If we want to let user know how
much items in the `Nav` without opening it, we can show the children
numbers of current `Nav` by
<javadoc class="false" method="setBadgeText(java.lang.String)">org.zkoss.zkmax.zul.Nav</javadoc>
API. The code snippets as shown below:

<table>
<tbody>
<tr class="odd">
<td>![](/zk_component_ref/images/ZKComRef_Nav_badgeText.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">nav</span><span class="ot"> label=</span><span class="st">&quot;Get Started&quot;</span><span class="ot"> iconSclass=</span><span class="st">&quot;z-icon-th-list&quot;</span><span class="ot"> badgeText=</span><span class="st">&quot;3&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">navitem</span><span class="ot"> label=</span><span class="st">&quot;Step One&quot;</span> /&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">navitem</span><span class="ot"> label=</span><span class="st">&quot;Step Two&quot;</span> /&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">navitem</span><span class="ot"> label=</span><span class="st">&quot;Step Three&quot;</span> /&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">nav</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

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
<td><center>
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc> Denotes user has
opened or closed a nav component.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ LabelImageElement]({{site.baseurl}}/zk_component_ref/base_components/labelimageelement#Supported_Events)

# Supported Children

`*`[` Nav`]({{site.baseurl}}/zk_component_ref/essential_components/nav)`, `[` Navitem`]({{site.baseurl}}/zk_component_ref/essential_components/nav/navitem)`,`[` Navseparator`]({{site.baseurl}}/zk_component_ref/essential_components/nav/navseparator)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date         | Content                                                                                    |
|---------|--------------|--------------------------------------------------------------------------------------------|
| 7.0.0   | August, 2013 | [Nav](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Nav.html) was introduced. |


