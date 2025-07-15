

# Style

- Demonstration:
  [Style](http://www.zkoss.org/zkdemo/styling/custom_style)
- Java API: [org.zkoss.zul.Style](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Style.html)
- JavaScript API: [zul.utl.Style](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.utl.Style.html)


# Employment/Purpose

The style component used to specify `CSS` styles for the owner desktop.

**Note:**

- a `style` component can appear anywhere in a zul page, but it affects
  all components in the same `desktop`.
- `getContent()` simply gets the string that is set by setContent(). If
  you call setSrc() or call the constructor of Style(), getContent()
  still gets null.

# Example

  
![](/zk_component_ref/images/ZKComRef_Style_Example.png)

```xml
<style> a{ color:red; }</style>
```

# Supported Events

- Inherited Supported Events: [ AbstractComponent]({{site.baseurl}}/zk_component_ref/abstractcomponent#Supported_Events)

# Supported Children

`*NONE`



# Version History



| Version | Date      | Content                          |
|---------|-----------|----------------------------------|
| 5.0.3   | June 2010 | The media property is supported. |


