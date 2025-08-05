---
title: "Toolbar"
---

 {% include
version-badge.html version=9.5.0 %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include
ZKComponentReferenceAccessibilityNamingReference.md %}

## Keyboard Support

| Key | Description |
|---|---|
| ArrowUp / ArrowLeft | Moves focus to the previous control. If there is no previous
control, focus movement will wrap from the first element to the last
element. |
| ArrowDown / ArrowRight | Moves focus to the next control. If there is no next control,
focus movement will wrap from the last element to the first
element. |
| Tab / Shift + Tab | Move focus into and out of the toolbar. |

## Limitations

Due to [this issue](https://github.com/w3c/aria-practices/issues/1283),
we suggest not to display any components that need to be controlled with
arrow keys in the toolbar.
