---
title: "Data-AnimationSpeed"
---

To change the animation speed, you can apply `data-animationspeed`
attribute. The valid value can be `slow`, `fast` or any integer, same as
jQuery. When you specify `0` as the value, it means no animation.

```xml
<div xmlns:ca="client/attribute">
    <panel title="Panel" ca:data-animationspeed="0" 
    width="500px" border="normal" collapsible="true">
        <panelchildren>panel content</panelchildren>
    </panel>
</div>
```

# Version History

| Version | Date      | Content                                                                                                                  |
|---------|-----------|--------------------------------------------------------------------------------------------------------------------------|
| 7.0.3   | June 2014 | [1](http://tracker.zkoss.org/browse/ZK-2332) Cardlayout should support tuning animation speed or disabling the animation |
