---
title: "Checkbox"
---

- **Demonstration:** [Checkbox](http://www.zkoss.org/zkdemo/input/checkbox)
- **Java API:** [org.zkoss.zul.Checkbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Checkbox.html)
- **JavaScript API:** [zul.wgt.Checkbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Checkbox.html)

# Employment/Purpose

A checkbox.

## Common Use Cases

### Select-all / Select-none with a Group

Use a controlling checkbox whose `onCheck` handler iterates a group of checkboxes:

```xml
<checkbox id="selectAll" label="Select All"
    onCheck="for (c : fruits.getChildren()) c.checked = selectAll.checked;" />
<vbox id="fruits">
    <checkbox label="Apple" />
    <checkbox label="Orange" />
    <checkbox label="Banana" />
</vbox>
```

### Disable Other Controls While Processing

Use `autodisable` to prevent double-submission while an action runs:

```xml
<checkbox id="agree" label="I agree" autodisable="self,submitBtn"
    onCheck="doSubmit();" />
<button id="submitBtn" label="Submit" />
```

### Tristate Checkbox for Indeterminate State

Use `mold="tristate"` when the selection state of a group is partially fulfilled:

```xml
<checkbox mold="tristate" label="Select all items" />
```

# Example

![Checkbox Example](/zk_component_ref/images/ZKComRef_Checkbox_Example.png)

```xml
<window title="Checkbox demo" border="normal" width="350px">
    <checkbox id="apple" label="Apple" onCheck="doChecked()" />
    <checkbox id="orange" label="Orange" onCheck="doChecked()" />
    <checkbox id="banana" label="Banana" onCheck="doChecked()" />
    <hbox>
        You have selected :
        <label id="fruit2" />
    </hbox>
    <zscript> void doChecked() { fruit2.value = (apple.isChecked() ?
        apple.label+' ' : "") 
                     + (orange.isChecked() ? orange.label+' ' : "") 
                     + (banana.isChecked() ? banana.label+' ' : "");
             }
         </zscript>
 </window>
```

# Properties

## Autodisable

**Default Value:** `null`

{% include supported-since.html version="6.0.0" %}

Accepts a comma-separated list of component IDs that will be disabled when the user clicks the checkbox. The checkbox re-enables those components automatically once the server responds. To refer to the checkbox itself use the special keyword `self`. Prefix any ID with `+` to disable automatic re-enabling, requiring you to re-enable those components manually.

```xml
<!-- Disable itself and a sibling button on click -->
<checkbox id="ok" autodisable="self,cancel" label="Agree" />
<button id="cancel" label="Cancel" />
```

```xml
<!-- Disable with manual re-enable (+ prefix) -->
<checkbox id="ok" autodisable="+self,+cancel" label="Submit"
    onCheck="ok.disabled = false; cancel.disabled = false;" />
<button id="cancel" label="Cancel" />
```

## Checked

**Default Value:** `false`

Sets whether the checkbox is checked. Setting `checked` to any value will also clear the `indeterminate` state if it was active.

```xml
<checkbox checked="true" label="Pre-selected" />
```

## Value

**Default Value:** `null`

{% include supported-since.html version="5.0.4" %}

Attaches an arbitrary application-defined value to the checkbox. The value is not displayed; it is a convenience for associating domain data (such as a domain object or an ID) with the component. Retrieve it server-side via `getValue()` — for example in an `onCheck` handler with `event.getTarget().getValue()`.

When setting an object value from a composer or ViewModel, assign it via EL or a `<zscript>` block:

```xml
<zscript>
    String fruitCode = "APPLE";
</zscript>
<checkbox value="${fruitCode}" label="Apple" />
```

## Name

**Default Value:** `null`

Sets the `name` attribute of the underlying `<input>` element, used when submitting a legacy HTML form to a servlet. This property is only relevant for applications that handle requests via plain HTTP form submission rather than ZK's event-driven model. It has no effect in standard ZK AJAX applications.

```xml
<checkbox name="acceptTerms" label="I accept the terms" />
```

## Indeterminate

{% include supported-since.html version="8.6.0" %}

Indeterminate is a state that is neither checked nor unchecked.

Note: changing `indeterminate` will not affect the `checked` value, but
changing `checked` attribute will set `indeterminate` to `false`.

```xml
<checkbox indeterminate="true"/>
```

Display a checkbox like: ![Indeterminate](/zk_component_ref/images/Indeterminate.png)

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onFocus` | [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Denotes when a component gets the focus. |
| `onBlur` | [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Denotes when a component loses the focus. |
| `onCheck` | [org.zkoss.zk.ui.event.CheckEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/CheckEvent.html) | Denotes when a component is checked or unchecked. |

- Inherited Supported Events: [ LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement#Supported_Events)

# Supported Molds

{% include supported-since.html version="8.6.0" %} In addition to the default mold, Checkbox supports three additional molds: switch, toggle, and tristate. You can customize the mold in CSS by overriding class.

## default

The standard checkbox mold with a checkmark appearance.

```xml
<checkbox label="Standard checkbox" />
```

## switch

Default:

![Switch off](/zk_component_ref/images/Switch-off.png) 
![Switch on](/zk_component_ref/images/Switch-on.png)

Customized in CSS:

![Switch off customized](/zk_component_ref/images/Switch-off-customized.png)
![Switch on customized](/zk_component_ref/images/Switch-on-customized.png)

```css
.z-checkbox-switch-off > .z-checkbox-mold {
    background-color: red;
}
.z-checkbox-switch-on > .z-checkbox-mold {
    background-color: green;
}
.z-checkbox-switch-off > .z-checkbox-mold:before {
    background-color: black;
}
.z-checkbox-switch-on > .z-checkbox-mold:before {
    background-color: white;
}
```

## toggle

Default:

![Toggle off](/zk_component_ref/images/Toggle-off.png) ![Toggle on](/zk_component_ref/images/Toggle-on.png)

Customized in CSS:

![Toggle off customized](/zk_component_ref/images/Toggle-off-customized.png)
![Toggle on customized](/zk_component_ref/images/Toggle-on-customized.png)

    .z-checkbox-toggle-off > .z-checkbox-mold {
        background-color: red;
    }
    .z-checkbox-toggle-on > .z-checkbox-mold {
        background-color: green;
    }

## tristate

{% include supported-since.html version="9.0.0" %} Allowing users to set the
indeterminate state, in addition to the checked and unchecked states. In
tristate mold, when users click on the checkbox, it will switch between
checked, unchecked and indeterminate states. This is different from the
default mold which has only checked and unchecked states.

![Tristate](/zk_component_ref/images/Tristate.png)

```xml
<checkbox mold="tristate"></checkbox>
```

We provide a new API `getState()` return CHECKED, UNCHECKED or
INDETERMINATE.

```java
State state = checkbox.getState() // CHECKED, UNCHECKED or INDETERMINATE
```

# Supported Children

`*None`
