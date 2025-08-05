---
title: "Radio"
---


- Demonstration: [Radio](http://www.zkoss.org/zkdemo/input/radio_button)
- Java API: [org.zkoss.zul.Radio](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Radio.html)
- JavaScript API: [zul.wgt.Radio](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Radio.html)


# Employment/Purpose

A `radio` button is a component that can be turned on and off. Radio
buttons are grouped together in a group, called `radiogroup`. Only one
radio button with the same group may be selected at a time.

# Example

![](/zk_component_ref/images/ZKComRef_radio.png)

```xml
    <vlayout>
        <radiogroup onCheck="fruit.value = self.selectedItem.label">
            <radio label="Apple"/>
            <radio label="Orange"/>
            <radio label="Banana"/>
        </radiogroup>
        You have selected :
        <label id="fruit" style="color:red"/>
    </vlayout>
```

# Supported Events

- Inherited Supported Events: [ Checkbox]({{site.baseurl}}/zk_component_ref/checkbox#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description                                    | Example Location                                                                             |
|---------|------------------------------------------------|----------------------------------------------------------------------------------------------|
| 3.6     | Radio buttons with Listitems                   | [<http://www.zkoss.org/forum/listComment/3867>](http://www.zkoss.org/forum/listComment/3867) |
| 3.6     | Radiogroup radio's in seperate table/grid rows | [<http://www.zkoss.org/forum/listComment/9002>](http://www.zkoss.org/forum/listComment/9002) |

See also: [ Radiogroup]({{site.baseurl}}/zk_component_ref/radiogroup#Use_Cases)



