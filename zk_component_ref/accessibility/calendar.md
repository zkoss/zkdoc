---
title: "Calendar"
---

 {% include supported-since.html version="9.5.0" %} <!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} 
 {% include ZKComponentReferenceAccessibilityNamingReference.md %}

## Keyboard Support

| Key | Description |
|---|---|
| ArrowUp / ArrowDown / ArrowLeft / ArrowRight | Navigate the date. |
| Enter / Spacebar | Select the date. |
| PageUp / PageDown | {% include supported-since.html version="10.0.0" %} Navigate the month. |
| Shift+PageUp / Shift+PageDown | {% include supported-since.html version="10.0.0" %} Navigate the year. |

## Calendar Day AriaLabel Renderer

This is achieved by overriding the default renderer at the client to
customize the aria-label of days on ZK's Calendar.

```xml
<zk>
    <script><![CDATA[
        zk.afterLoad('zul.db', function(){
            zul.db.Renderer.cellAriaLabel = function (cal, y, m, day, monthofs, dayofweek) {
                var localizedSymbols = cal.getLocalizedSymbols();
                return day + ' ' + localizedSymbols.FMON[m] + ', ' + y; // dd MMMM, yyyy
            };
        });
    ]]></script>
    <calendar/>
</zk>
```

{% include supported-since.html version="9.5.0" %}
