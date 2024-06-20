{% include ZKComponentReferencePageHeader %}

# Portalchildren

- Demonstration:
  [Portallayout](http://www.zkoss.org/zkdemo/layout/portal_layout)
- Java API: <javadoc>org.zkoss.zkmax.zul.Portalchildren</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.layout.Portalchildren</javadoc>
- Style Guide: [
  Portallayout](ZK_Style_Guide/XUL_Component_Specification/Portallayout)
- {% include ZK EE %}

# Employment/Purpose

The column of [
Portallayout](ZK_Component_Reference/Layouts/Portallayout)

Child of Portalchildren can only be [
Panel](ZK_Component_Reference/Containers/Panel)

# Example

<figure>
<img src="ZKComRef_Portallayout_Example.PNG"
title="ZKComRef_Portallayout_Example.PNG" />
<figcaption>ZKComRef_Portallayout_Example.PNG</figcaption>
</figure>

``` xml
<portallayout>
    <portalchildren width="50%">
        <panel height="150px" title="Yahoo">
            <panelchildren>
                <iframe  src="http://www.yahoo.com/"/>
            </panelchildren>
        </panel>
        <panel height="300px" title="Google">
            <panelchildren>
                <iframe  src="http://www.google.com/"/>
            </panelchildren>
        </panel>
    </portalchildren>
    <portalchildren width="50%">
        <panel height="150px" title="ZK">
            <panelchildren>
                <iframe  src="http://www.zkoss.org/"/>
            </panelchildren>
        </panel>
    </portalchildren>
</portallayout>
```

# Properties

## Title

{% include versionSince\| 9.0.0 %} Sets the title of the portalchildren.
If the title is not empty/null, frame design will be applied.

### Frame Design

PortalChildren now provides a frame design, making it extremely easy to
create a Kanban-like layout for your application. To turn on the
PortalChildren frame design, just specify the title attribute on the
PortalChildren.

### Example

Each PortalChildren with title can be used as a Kanban board column to
represent a process stage, and the panels inside each column represent
tasks in the said stage. The number next to the PortalChildren title is
a counter, indicating the total number of panels inside the said column.

If a panel has a panel title, users can drag and hold the panel title to
move it to the appropriate column. If the panel does not have a panel
title, you can drag the small dragging button at the top of the panel to
move.

![](Kanban-1.png)

``` xml
<zk>
  <style>
    .z-panel {
      width: 300px;
    }
  </style>
   <portallayout>
     <portalchildren title="TO-DO">
       <panel title="Animation" border="normal">
         <panelchildren>......</panelchildren>
       </panel>
       <panel title="Illustration" border="normal">
         <panelchildren>......</panelchildren>
       </panel>
       <panel border="normal">
         <panelchildren>......</panelchildren>
       </panel>
       <panel title="Landing Page" border="normal">
         <panelchildren>......</panelchildren>
       </panel>
    </portalchildren>
     <portalchildren title="IN-PROGRESS">
       <panel title="Banner" border="normal">
         <panelchildren>......</panelchildren>
       </panel>
       <panel border="normal">
         <panelchildren>......</panelchildren>
       </panel>
     </portalchildren>
      <portalchildren title="DONE" >
       <panel title="Advertising" border="normal">
         <panelchildren>......</panelchildren>
       </panel>
       <panel border="normal">
         <panelchildren>......</panelchildren>
       </panel>
       <panel title="Interview" border="normal">
         <panelchildren>......</panelchildren>
       </panel>
     </portalchildren>
   </portallayout>
</zk>
```

## CounterVisible

{% include versionSince \|9.0.0 %} Sets whether the counter is visible.
Meaningful only if frame design is applied.

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

`*`[` Panel`](ZK_Component_Reference/Containers/Panel)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

{% include LastUpdated %}

| Version | Date     | Content                                                                                            |
|---------|----------|----------------------------------------------------------------------------------------------------|
| 9.0.0   | Nov 2019 | [ZK-4398](https://tracker.zkoss.org/browse/ZK-4398): Provide PortalChildren title and frame design |

{% include ZKComponentReferencePageFooter %}
