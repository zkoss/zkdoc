

# Center

- Demonstration:
  [Borderlayout](http://www.zkoss.org/zkdemo/layout/border_layout)
- Java API: <javadoc>org.zkoss.zul.Center</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.layout.Center</javadoc>
- Style Guide:
  [Center](ZK_Style_Guide/XUL_Component_Specification/Borderlayout/Default_(Center))

# Employment/Purpose

A center region of a border layout and only allows one component as its
child.

# Example

![](images/ZKCompRef_Borderlayout.jpg)

``` xml
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

# Properties and Features

## Caption

A layout region might have a caption, which is specified by declaring a
child component called caption. {% include edition-availability.html edition="pe" %} {% include
version-badge.html version=6.5.0 %}

``` xml
<borderlayout>
    <center>
        <caption label="search" image="/img/live.gif">
            <combobox>
                <comboitem label="item 1" />
                <comboitem label="item 2" />
                <comboitem label="item 3" />
                <comboitem label="item 4" />
            </combobox>
        </caption>
        <div>
        Content
        </div>  
    </center>
</borderlayout>
```

# How to Layout

For more details, please refer to
[Borderlayout](ZK_Component_Reference/Layouts/Borderlayout#How_to_Layout).

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
  LayoutRegion](ZK_Component_Reference/Base_Components/LayoutRegion#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

[Borderlayout](ZK_Component_Reference/Layouts/Borderlayout#Use_Cases)

# Version History



| Version | Date      | Content                                                                                                              |
|---------|-----------|----------------------------------------------------------------------------------------------------------------------|
| 6.5.0   | June 2012 | [ZK-969](http://tracker.zkoss.org/browse/ZK-969): The LayoutRegion component support caption component as it's title |


