

# Caption

- Demonstration:
  [Groupbox](http://www.zkoss.org/zkdemo/layout/group_box)
- Java API: <javadoc>org.zkoss.zul.Caption</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Caption</javadoc>


# Employement/Purpose

A header for a Groupbox, Window, and Panel. It may contain either a text
label, using
<javadoc method="setLabel(java.lang.String)">org.zkoss.zul.impl.LabelElement</javadoc>,
or child elements for a more complex caption.

# Preload Image

{% include version-badge.html version=6.0.0 %}

The feature is applied to all of the LabelImageElement and Image
components.

By default the preload function is disabled, so users have to specify
the *custom-attributes* and set it to true. For example,

```xml
<caption image="xxx.png" label="caption">
  <custom-attributes org.zkoss.zul.image.preload=”true”/>
</caption>
```

Or specify it just below the root component.

For example,

```xml
<window>
  <custom-attributes org.zkoss.zul.image.preload=”true”/>
  <caption image="xxx.png" label="caption">
  <image src="xxx.png"/>
</window>
```

As you can see, the *custom-attributes* will be checked recursively.

# Example

![](/zk_component_ref/images/ZKComRef_Caption_Example.png)

```xml
 <zk>
     <window border="normal" width="350px">
          <caption label="This is a caption"/>
             <groupbox width="300px">
                  <caption label="fruits"/>
                  <radiogroup onCheck="fruit.value = self.selectedItem.label">
                     <radio label="Apple"/>
                     <radio label="Orange"/>
                     <radio label="Banana"/>  
                  </radiogroup>
             </groupbox>
     </window>
 </zk>
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

- Inherited Supported Events: [ LabelImageElement]({{site.baseurl}}/zk_component_ref/base_components/labelimageelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

| Version | Description                                                                                             | Example Location                                                                           |
|---------|---------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| 5.0     | How to use the title and caption inside a [Window]({{site.baseurl}}/zk_component_ref/containers/window) | [Title and Caption]({{site.baseurl}}/zk_component_ref/containers/window#Title_and_Caption) |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


