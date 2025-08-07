---
title: "Progressmeter"
---


- Demonstration:
  [Progressmeter](http://www.zkoss.org/zkdemo/effects/upload_effect)
- Java API: [org.zkoss.zul.Progressmeter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Progressmeter.html)
- JavaScript API:
  [zul.wgt.Progressmeter](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Progressmeter.html)


# Employment/Purpose

A progress meter is a bar that indicates how much of a task has been
completed. The value property must be in the range between 0 and 100.

# Example

![](/zk_component_ref/images/ZKComRef_Progressmeter_Example.PNG)

```xml
     <progressmeter value="10"/>
```

# Properties

## Indeterminate

`{% include version-badge.html version="8.6.1" %}`

If true, the progressmeter will show an indeterminate animation and the
real value of the progressmeter will be hidden.(default false)

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*NONE`



# Version History



| Version | Date      | Content                                                                                                            |
|---------|-----------|--------------------------------------------------------------------------------------------------------------------|
|         |           |                                                                                                                    |
| 8.6.1   | Jan, 2019 | [ZK-3629](https://tracker.zkoss.org/browse/ZK-3629): use the progressmeter to indicate a long operation is so hard |


