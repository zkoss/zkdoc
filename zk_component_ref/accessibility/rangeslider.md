---
title: "Rangeslider"
---

 {% include
version-badge.html version=9.5.0 %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include
ZKComponentReferenceAccessibilityNamingReference.md %}

| Attributes | Description |
|---|---|
| data-ariaStartLabel | Describe the the slider button (start). |
| data-ariaEndLabel | Describe the the slider button (end). |
| data-largeStep-multiplier (optional) | Describe the moving step of pressing PageUp/PageDown. |

## Keyboard Support

| Key | Description |
|---|---|
| ArrowUp / ArrowDown | Move the slider button. |
| ArrowLeft / ArrowRight | Move the slider button. |
| Home / End | Move the slider button to the minimum/maximum. |
| PageUp / PageDown | Move the slider button in the large step. |

## Example

```xml
<zk xmlns:ca="client/attribute">
  <rangeslider ca:aria-label="range value" ca:data-ariaStartLabel="minimal range value"
      ca:data-ariaEndLabel="maximal range value"/>
</zk>
```
