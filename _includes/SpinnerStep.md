## Step

**Default Value:** `{{include.default}}`

Sets the amount added to or subtracted from the current value each time the
user clicks an up or down spin button (or presses the arrow keys). The value is
{{include.type}}; the setter stores it as-is and performs no range validation.

```xml
<{{include.component}} step="{{include.step}}" value="{{include.value}}"/>
```
