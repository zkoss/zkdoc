
- Demonstration: [Checkbox](http://www.zkoss.org/zkdemo/input/checkbox)
- Java API: [org.zkoss.zul.Checkbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Checkbox.html)
- JavaScript API: [zul.wgt.Checkbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Checkbox.html)


# Employment/Purpose

A checkbox.

# Example

![](/zk_component_ref/images/ZKComRef_Checkbox_Example.png)

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

# Mold

{% include version-badge.html version=8.6.0 %} There are two additional molds for
Checkbox: switch and toggle, you can customize the mold in css by
overriding class.

```xml
  <checkbox mold="switch" />
  <checkbox mold="toggle" />
```

## switch

Default:

![](/zk_component_ref/images/Switch-off.png) 
![](/zk_component_ref/images/Switch-on.png)

Customized in CSS:

![](/zk_component_ref/images/Switch-off-customized.png)
![](/zk_component_ref/images/Switch-on-customized.png)

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

![](/zk_component_ref/images/Toggle-off.png) ![](/zk_component_ref/images/Toggle-on.png)

Customized in CSS:

![](/zk_component_ref/images/Toggle-off-customized.png)
![](/zk_component_ref/images/Toggle-on-customized.png)

    .z-checkbox-toggle-off > .z-checkbox-mold {
        background-color: red;
    }
    .z-checkbox-toggle-on > .z-checkbox-mold {
        background-color: green;
    }

## tristate

{% include version-badge.html version=9.0.0 %} Allowing users to set the
indeterminate state, in addition to the checked and unchecked states. In
tristate mold, when users click on the checkbox, it will switch between
checked, unchecked and indeterminate states. This is different from the
default mold which has only checked and unchecked states.

![](/zk_component_ref/images/Tristate.png)

```xml
<checkbox mold="tristate"></checkbox>
```

We provide a new API `getState()` return CHECKED, UNCHECKED or
INDETERMINATE.

```java
State state = checkbox.getState() // CHECKED, UNCHECKED or INDETERMINATE
```

# Indeterminate

{% include version-badge.html version=8.6.0 %}

Indeterminate is a state that is neither checked nor unchecked.

Note: changing `indeterminate` will not affect the `checked` value, but
changing `checked` attribute will set `indeterminate` to `false`.

```xml
    <checkbox indeterminate="true"/>
```

Display a checkbox like: ![](/zk_component_ref/images/Indeterminate.png)

# Supported Events

| Name | Event Type |
|---|---|
| `onFocus` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes when a component
gets the focus. |
| `onBlur` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes when a component
loses the focus. |
| onCheck | <strong>Event:</strong>
[org.zkoss.zk.ui.event.CheckEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/CheckEvent.html) Denotes when a
component is checked or unchecked. |

- Inherited Supported Events: [ LabelImageElement]({{site.baseurl}}/zk_component_ref/labelimageelement#Supported_Events)

# Supported Children

`*None`



