 {% include Deprecated_Content.html %}

# Anchorlayout

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.Anchorlayout</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.layout.Anchorlayout</javadoc>


{% include version-badge.html version="6.0.0" %}

# Employment/Purpose

An anchorlayout lays out a container which can resize it's children base
on its width and height

# Example

![]({{site.baseurl}}/zk_component_ref/images/zkcomref_anchorlayout_example.png)

```xml
<window title="anchorlayout Demo" border="normal" 
    height="100%">
    <anchorlayout id="al"  vflex="1"
        style="overflow:auto">
        <anchorchildren height="200px" anchor="-100">
            <window title="win1" border="normal" 
                height="100%">
                height is "200px" and width is its parent size minus 100
            </window>
        </anchorchildren>
        <anchorchildren anchor="50% -200">
            <window title="win2" border="normal" 
                height="100%">
                width is its parent size's 50%, and height is its parent
                size minus 200
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win3" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win4" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win5" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win6" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
    </anchorlayout>
</window>
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

- Inherited Supported Events: [
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

* [Anchorchildren]({{site.baseurl}}/zk_component_ref/layouts/anchorlayout/anchorchildren)
