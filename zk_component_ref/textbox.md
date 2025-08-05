
- Demonstration:
  [Textbox](http://www.zkoss.org/zkdemo/input/form_sample)
- Java API: [org.zkoss.zul.Textbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Textbox.html)
- JavaScript API: [zul.inp.Textbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.Textbox.html)


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

## Multiline
If `true`, zk renders a multiline textbox. The `multiline` will also be `true` if you set `rows` larger than `1`.

## Tabbable
By specifying a true, the tabbox can insert a long space or format the
content inside textbox conveniently. For example,

![](/zk_component_ref/images/ZKComRef_Textbox_Tabbable.png)

```xml
<textbox tabbable="true"/>
```

## SubmitByEnter

{% include version-badge.html version=8.5.2 %}

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

`{% include version-badge.html version=6.5.0 %}`

The `type` attribute support HTML 5 defined types `tel`, `email` and `url`.

```xml
Phone: <textbox type="tel"/>
Email: <textbox type="email"/>
WebSite: <textbox type="url"/>
```

## Constraint

Please refert to [ZK Component Reference/Base Components/InputElement#Constraint]({{site.baseurl}}/zk_component_ref/inputelement#Constraint).

# Inherited Functions

Please refer to [ InputElement]({{site.baseurl}}/zk_component_ref/inputelement)
for inherited functions, such as in-place edition.

# Supported Events

- Inherited Supported Events: [ InputElement]({{site.baseurl}}/zk_component_ref/inputelement#Supported_Events)

# Supported Children

`*NONE`

# Browser Limitations

| Browser | description |
|---|---|
| IE | <div class="sourceCode" id="cb1"><pre class="sourceCode xml">`&lt;textbox value="color" style="color:red !important;" disabled="true"/&gt;``</pre></div>
There is no way to change the text color in a disabled input in
IE. |


