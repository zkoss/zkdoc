# Intbox

- Demonstration: [Intbox](http://www.zkoss.org/zkdemo/input/form_sample)
- Java API: [org.zkoss.zul.Intbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Intbox.html)
- JavaScript API: <javadoc directory="jsdoc">zul.inp.Intbox</javadoc>


# Employment/Purpose

An `intbox` is used to let users input integer data.

# Example

![](/zk_component_ref/images/ZKComRef_Intbox.png)

While input invalid data:

![](/zk_component_ref/images/ZKComRef_Intbox2.png)

```xml
 <window title="Intbox Demo" border="normal" width="200px">
     int box:<intbox/>
 </window>
```

# Properties

## Format

You are able to format the field by providing specifying the attribute
with a formatting string. The default value is `null`.

```xml
<intbox format="#,##0"/>
```

{% include version-badge.html version=8.5.2 %} You can provide a locale to format
the number by specify the String starts with "locale:"

```xml
<intbox format="locale:zh-TW"/>
```

## Constraint

You could specify what value to accept for input controls by use of the
`constraint`property. It could be a combination of `no positive`,
`no negative`, `no zero`, `no empty`.

To specify two or more constraints, use comma to separate them as
follows.

```xml
<intbox constraint="no negative,no empty"/>
```

If you prefer to display different message to the default one, you can
append the error message to the constraint with a colon.

```xml
<intbox constraint="no negative: it shall not be negative"/>
```

Notes:

- The error message, if specified, must be the last element and start
  with colon.
- To support multiple languages, you could use the 「l」 function as
  depicted in the **Internationalization** chapter.

```xml
<intbox constraint="no negative: ${c:l('err.num.negative')}"/>
```

### min & max constraint
{% include version-badge.html version=10.2.0 %}
{% include edition-availability.html edition="ee" %}

```xml
<spinner constraint="min -2 max 6"/>
```

# Inherited Functions

Please refer to [NumberInputElement]({{site.baseurl}}/zk_component_ref/base_components/numberinputelement)
for inherited functions.

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

- Inherited Supported Events: [NumberInputElement]({{site.baseurl}}/zk_component_ref/base_components/numberinputelement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description                             | Example Location                                                                               |
|---------|-----------------------------------------|------------------------------------------------------------------------------------------------|
| 3.6     | Leading zero in Intbox                  | [<http://www.zkoss.org/forum/listComment/10271>](http://www.zkoss.org/forum/listComment/10271) |
| 3.6     | Constraint Intbox to accept only digits | [<http://www.zkoss.org/forum/listComment/4603>](http://www.zkoss.org/forum/listComment/4603)   |
