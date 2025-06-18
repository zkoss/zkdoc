

# Groupbox

- Demonstration:
  [Groupbox](http://www.zkoss.org/zkdemo/layout/group_box)
- Java API: <javadoc>org.zkoss.zul.Groupbox</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.Groupbox</javadoc>

# Employment/Purpose

A group box is used to group components together. A border is typically
drawn around the components to show that they are related. The label
across the top of the group box can be created by using [
Caption]({{site.baseurl}}/zk_component_ref/containers/caption)
component. It works much like the HTML legend element. Unlike [
Window]({{site.baseurl}}/zk_component_ref/containers/window), a group
box is not an owner of the ID space. It cannot be overlapped or popped
up.

# Example

![](/zk_component_ref/images/ZKComRef_Groupbox_Example.png)

```xml
 <groupbox width="250px">
     <caption label="Fruits"/>
     <radiogroup>
         <radio label="Apple"/>
         <radio label="Orange"/>
         <radio label="Banana"/>
     </radiogroup>
 </groupbox>
```

## Java Example

```java
Groupbox gb = new Groupbox();

new Caption("Here is Caption").setParent(gb);

gb.setMold("3d");
gb.setWidth("200px");
gb.appendChild(new Label("Here is Content"));

// register an onOpen event.
gb.addEventListener(Events.ON_OPEN, new EventListener() {
    public void onEvent(Event event) throws Exception {
    if (((OpenEvent)event).isOpen())
        //do something you want.
    }
});
gb.setParent(outer);
```

# Properties

## ContentStyle

Specify the CSS style for the content block of the groupbox.

![](/zk_component_ref/images/ZKComRef_Groupbox_ContentStyle.png)

```xml
<groupbox width="250px" mold="3d"
    contentStyle="border: 3px blue dashed;border-top:0px">
    <caption label="Fruits"/>
    <radiogroup>
        <radio label="Apple"/>
        <radio label="Orange"/>
        <radio label="Banana"/>
    </radiogroup>
</groupbox>
```

## ContentSclass

Specify the CSS class for the content block of the groupbox.

![](/zk_component_ref/images/ZKComRef_Groupbox_ContentStyle.png)

```xml
<zk>
<style>
.mygroupbox-cnt {
    border: 3px blue dashed;
    border-top:0px
}
</style>
<groupbox width="250px" mold="3d"
    contentSclass="mygroupbox-cnt">
    <caption label="Fruits"/>
    <radiogroup>
        <radio label="Apple"/>
        <radio label="Orange"/>
        <radio label="Banana"/>
    </radiogroup>
</groupbox>
</zk>
```

## Closable

Default: **true**

Specify whether the groupbox can be collapsed or not.

For example,

```xml
<groupbox width="250px" mold="3d" closable="true">
```

**Note:** the function can only be applied when the [
Caption]({{site.baseurl}}/zk_component_ref/containers/caption) exists.

## Open/Close

Default: **true**

Specify the display of the groupbox, whether it is open or closed. For
example,

```xml
<groupbox width="250px" mold="3d" open="false">
```

**Note:** false means the groupbox is closed, i.e. no content can
appear.

# Limitation of the Default Mold

The default mold of groupbox uses HTML FIELDSET to represent a groupbox
visually. It is efficient, but it has some limitations:

1.  The look might be different from one browser to another
2.  The real width and height might not be exactly the same as the
    specified value in some browsers, such as Firefox.

If it is an issue, you could use the 3d mold instead.

![](/zk_component_ref/images/groupbox-3d.jpg)

```xml
 <groupbox width="250px" mold="3d">
     <caption label="Fruits"/>
     <radiogroup>
         <radio label="Apple"/>
         <radio label="Orange"/>
         <radio label="Banana"/>
     </radiogroup>
 </groupbox>
```

{% include version-badge.html version=6.0.0 %}

The default mold uses the same method as 3d mold to represent a
groupbox, the limitation is gone.

## Configure to Use the 3d Mold as Default

If you prefer to use the 3d mold as default, you could configure ZK by
adding the following to `/WEB-INF/zk.xml`

```xml
<library-property>
    <name>org.zkoss.zul.Groupbox.mold</name>
    <value>3d</value>
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
<td><center>
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc> Denotes user has
opened or closed a component. Note:</p>
<p>unlike <code>onClose</code>, this event is only a notification. The
client sends this event after opening or closing the component.</p>
<p>It is useful to implement load-on-demand by listening to the
<code>onOpen</code> event, and creating components the first time the
component is opened.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Snapshot</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>default</p>
</center></td>
<td>![](/zk_component_ref/images/groupbox_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>3d</p>
</center></td>
<td>![](/zk_component_ref/images/groupbox_mold_3d.png)</td>
</tr>
</tbody>
</table>

# Supported Children

`*ALL`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


