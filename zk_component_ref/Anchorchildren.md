{% include ZKComponentReferencePageHeader %} {% include
Deprecated_Content %}

# Anchorchildren

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.Anchorchildren</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.layout.Anchorchildren</javadoc>
- Style Guide: N/A

# Employment/Purpose

The children of Anchorlayout that can anchor to the position that
according to the size of the Anchorlayout.

# Example

<figure>
<img src="ZKComRef_Anchorlayout_Example.png"
title="ZKComRef_Anchorlayout_Example.png" />
<figcaption>ZKComRef_Anchorlayout_Example.png</figcaption>
</figure>

``` xml
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
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*All`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

{% include LastUpdated %}

| Version | Date            | Content                              |
|---------|-----------------|--------------------------------------|
| 6.0.0   | October 4, 2011 | Add the new Anchorchildren component |

{% include ZKComponentReferencePageFooter %}
