 {% include Deprecated_Content.html %}

- Demonstration: N/A
- Java API: [org.zkoss.zul.Anchorchildren](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Anchorchildren.html)
- JavaScript API:
  [zul.layout.Anchorchildren](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.layout.Anchorchildren.html)


{% include version-badge.html version="6.0.0" %}

# Employment/Purpose

The children of Anchorlayout that can anchor to the position that
according to the size of the Anchorlayout.

# Example

![]({{site.baseurl}}/zk_component_ref/images/zkcomref_anchorlayout_example.png)

```xml
<window title="anchorlayout Demo" border="normal" 
    height="100%">
    <anchorlayout id="al"  vflex="1"
        style="overflow:auto">
        <anchorchildren height="200px" anchor="-100">
            <window title="win1" border="normal" 
                height="100%">
                height is "200px" and width is its parent size minus 100
            </window>
        </anchorchildren>
        <anchorchildren anchor="50% -200">
            <window title="win2" border="normal" 
                height="100%">
                width is its parent size's 50%, and height is its parent
                size minus 200
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win3" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win4" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win5" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
        <anchorchildren anchor="25% 20%">
            <window title="win6" border="normal" 
                height="100%">
                width is its parent size's 25%, and height is its parent
                size's 20%
            </window>
        </anchorchildren>
    </anchorlayout>
</window>
```

# Supported Events
- Inherited Supported Events: [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

All