

# Separator

- Demonstration: N/A
- Java API: [org.zkoss.zul.Separator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Separator.html)
- JavaScript API: [zul.wgt.Separator](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Separator.html)


# Employment/Purpose

A separator is used to insert a space between two components. There are
several ways to customize the separator.

- By use of the orient attribute, you are able to specify whether the
  separator is vertical or horizontal. By default it is a horizontal
  separator, which inserts a line break. On the other hand, a vertical
  separator inserts white space.
- By use of the bar attribute, you can control whether to show a
  horizontal or vertical line between components.
- By use of the spacing attribute, you can control the size of spacing.

# Example

![](/zk_component_ref/images/ZKComRef_Separator_Example.png)

```xml
 line 1 by separator
 <separator />
 line 2 by separator
 <separator />
 line 3 by separator
 <space bar="true" />
 another piece
 <separator spacing="20px" />
 line 4 by separator
 <space bar="true" spacing="20px" />
 another piece
```

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*NONE `
