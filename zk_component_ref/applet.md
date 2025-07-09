

{% include Deprecated_Content.html %} Removed {% include version-badge.html version=
10.0.0 %}

# Applet

- Demonstration: N/A
- Java API: [org.zkoss.zul.Applet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Applet.html)
- JavaScript API: [zul.med.Applet](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.med.Applet.html)


# Employment/Purpose

A generic applet component.

If the properties are not enough, you can use [ the Client-Attribute namespace](zuml_ref/zuml/namespaces/client_attribute)
to specify them.

```xml
<applet  xmlns:ca="client/attribute"
  ca:whatever_name="whatever_value"/>
```

### Archive and Codebase

Since 5.0.3, both `archive` and `codebase` properties are encoded with
the application's context path and URL rewriting, so you don't and
should not have to encode it again.

# Example

![](/zk_component_ref/images/ZKComRef_Applet_Examples.PNG)

```xml
    <applet codebase="img/" code="ticker.class" msg="ZK is Simple and Rich!" width="580px" />
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

- Inherited Supported Events: [ HtmlBasedComponent]({{site.baseurl}}/zk_component_ref/base_components/htmlbasedcomponent#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date      | Content                                                                   |
|---------|-----------|---------------------------------------------------------------------------|
| 5.0.3   | June 2010 | The archive, myscript, align, hspace, and vspace properties are supported |


