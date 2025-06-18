

# East

- Demonstration:
  [Borderlayout](http://www.zkoss.org/zkdemo/layout/border_layout)
- Java API: <javadoc>org.zkoss.zul.East</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.layout.East</javadoc>


# Employment/Purpose

An east region of a border layout and only allows one component as its
child.

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

For more details, please refer to
[Borderlayout]({{site.baseurl}}/zk_component_ref/layouts/borderlayout#How_to_Layout).

# Properties and Features

{% include LayoutCommonAttributes.md %}

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

- Inherited Supported Events: [ LayoutRegion]({{site.baseurl}}/zk_component_ref/base_components/layoutregion#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

[Borderlayout]({{site.baseurl}}/zk_component_ref/layouts/borderlayout#Use_Cases)

# Version History

| Version | Date      | Content                                                                                                                |
|---------|-----------|------------------------------------------------------------------------------------------------------------------------|
| 6.5.0   | June 2012 | [ZK-969](http://tracker.zkoss.org/browse/ZK-969): The LayoutRegion component supports a caption component as its title |
| 8.5.2   | May 2018  | [ZK-3329](http://tracker.zkoss.org/browse/ZK-3329): Collapsible Borderlayout region in the slide or open mode only     |


