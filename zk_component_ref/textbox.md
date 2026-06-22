---
title: "Textbox"
---

- **Demonstration:** [Textbox](http://www.zkoss.org/zkdemo/input/form_sample)
- **Java API:** [org.zkoss.zul.Textbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Textbox.html)
- **JavaScript API:** [zul.inp.Textbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Textbox.html)

# Employment/Purpose

A `textbox` is used to let users input textual data.

You could assign `value, type, constraint, rows, cols` to a textbox
using the corresponding properties. When you assign the property `type`
to a string value "password" when `multiline` is false then any character in this component will replace by '\*'.

You could also assign a constraint value with a regular expression
string or a default constraint expression (available value is "no
empty"). When user change the value of textbox, it will cause a
validating process to validate the value. If the validation fails, then
a notification will pop up.

## Common Use Cases

- **Single-line text input** — collect short free-form text such as names, search terms, or identifiers by using the default single-row textbox.
- **Multi-line text area** — collect longer content such as comments or descriptions by setting `rows` to a value greater than `1` (which also enables `multiline` automatically).
- **Password fields** — hide sensitive input by setting `type="password"`.
- **Validated input** — enforce patterns like email addresses or non-empty fields with the `constraint` attribute (see [InputElement]({{site.baseurl}}/zk_component_ref/inputelement#Constraint)).
- **Tab-formatted content** — allow users to insert tab characters for code or tabular text by enabling `tabbable="true"`.
- **Submit on Enter** — fire the `onOK` event immediately when the user presses Enter in a single-line field by enabling `submitByEnter="true"`.

# Example

![](/zk_component_ref/images/ZKCompRef_Textbox.png)

```xml
<textbox value="text..." />
<textbox value="secret" type="password" />
<textbox constraint="/.+@.+\.[a-z]+/: Please enter an e-mail address" />
<textbox rows="5" cols="40">
    <attribute name="value">
text line1... 
text line2...
    </attribute>
</textbox>
```

To specify multilines value, you can use the attribute element or
`&#x0d;` as shown below

```xml
<textbox rows="5" cols="40">
    <attribute name="value">
text line1... 
text line2...
    </attribute>
</textbox>
<textbox value="Line 1&#x0d;Line 2" rows="3"/>
```

# Properties

## Value

**Default Value:** `""`

Sets the text content of the textbox. Passing `null` is treated as an empty string. The value is subject to any active constraint; a `WrongValueException` is thrown when validation fails.

```xml
<textbox value="Hello, World!"/>
```

## Multiline
If `true`, zk renders a multiline textbox. The `multiline` will also be `true` if you set `rows` larger than `1`.

## Rows

**Default Value:** `1`

Sets the number of visible text lines. The value must be greater than `0`; passing `0` or a negative number throws a `WrongValueException`. Setting `rows` to a value greater than `1` automatically enables `multiline`. Note that `rows` cannot be used together with `vflex` or `height` — an `UiException` is thrown if you attempt to combine them.

```xml
<textbox rows="5" cols="40" placeholder="Enter your message…"/>
```

## Tabbable
By specifying a true, the tabbox can insert a long space or format the
content inside textbox conveniently. For example,

![](/zk_component_ref/images/ZKComRef_Textbox_Tabbable.png)

```xml
<textbox tabbable="true"/>
```

## SubmitByEnter

{% include supported-since.html version="8.5.2" %}

When you specify **true**, pressing Enter will fire onOK event rather
then move to next line, if you want to move to next line, you should
press **Shift + Enter**.

When submitByEnter="false", press Enter will move to next line.

The default is **false**.

```xml
<textbox submitByEnter="true" onOK=""/>
```

## Type

The `type` attribute determines the component-rendered HTML element `<input type="?">`.
By setting the type as `password`, the text that is entered into the box cannot be viewed and is replaced by `*`.

```xml
Username: <textbox/>
Password: <textbox type="password"/>
```

{% include supported-since.html version="6.5.0" %}

The `type` attribute support HTML 5 defined types `tel`, `email` and `url`.

```xml
Phone: <textbox type="tel"/>
Email: <textbox type="email"/>
WebSite: <textbox type="url"/>
```

# Supported Events

- Inherited Supported Events: [ InputElement]({{site.baseurl}}/zk_component_ref/inputelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

| Name | Snapshot |
|---|---|
| default | ![](/zk_component_ref/images/ZKCompRef_Textbox.png) |
| rounded | ![](/zk_component_ref/images/Spinner_mold_rounded.png) {% include supported-since.html version="5.0.0" %} |

# Supported Children

`*NONE`

# Inherited Functions

Please refer to [ InputElement]({{site.baseurl}}/zk_component_ref/inputelement)
for inherited functions, such as in-place edition.