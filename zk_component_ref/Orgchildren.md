

# Orgchildren

- Java API: <javadoc>org.zkoss.zkmax.zul.Orgchildren </javadoc>
- JavaScript API: <javadoc directory="jsdoc">zkmax.layout.Orgchildren
  </javadoc>

`{% include edition-availability.html edition="ee" %}`

{% include version-badge.html version=8.6.0 %}

# Employment/Purpose

`Orgchildren`contains a collection of Orgitem components. It is main
body of the `Organigram`and it also the main body of an `Orgitem`'s
children.

# Example

![](images/Orgchildren_example.png)

        <organigram width="600px">
            <orgchildren>
                <orgitem label="Item1">
                    <orgchildren>
                        <orgitem label="Item2">
                            <orgchildren>
                                <orgitem label="Item3"/>
                                <orgitem label="Item4"/>
                            </orgchildren>
                        </orgitem>
                    </orgchildren>
                </orgitem>
            </orgchildren>
        </organigram>

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

`*`[` Orgitem`](ZK_Component_Reference/Layouts/Organigram/Orgitem)

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


