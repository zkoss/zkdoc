

# Absolutechildren

- Demonstration: N/A
- Java API: [org.zkoss.zul.Absolutechildren](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Absolutechildren.html)
- JavaScript API:
  [zul.layout.Absolutechildren](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.Absolutechildren.html)


# Employment/Purpose

A container component that can contain any other ZK component and can
only be contained as direct child of Absolutelayout component. It can be
absolutely positioned within Absolutelayout component by either setting
"x" and "y" attribute or calling setX(int) and setY(int) methods.

# Example

![](/zk_component_ref/images/ZKComRef_Absolutelayout_Example.png)

```xml
<?component name="window" extends="window" border="normal" width="300px" height="300px"?>
<zk>
    <absolutelayout>
        <absolutechildren id="w1" x="60" y="100">
            <window title="X=60, Y=100">
            Window 1
            </window>
        </absolutechildren>
        <absolutechildren id="w2" x="160" y="200">
            <window title="X=60, Y=100">
            Window 2
            </window>
        </absolutechildren>
        <absolutechildren id="w3" x="260" y="300">
            <window title="X=60, Y=100">
            Window 3
            </window>
        </absolutechildren>
    </absolutelayout>
</zk>
```

# Supported Events


- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*All`



# Version History



| Version | Date            | Content                                |
|---------|-----------------|----------------------------------------|
| 6.0.0   | October 4, 2011 | Add the new Absolutechildren component |


