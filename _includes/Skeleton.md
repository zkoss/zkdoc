## Skeleton

{% include supported-since.html version="11.0.0" %} {% include edition-availability.html edition="pe" %}

Shows the component as a loading placeholder. While the skeleton is on, the
component's content is hidden and the component is drawn as a muted block
that pulses until you clear the skeleton. Use it to show the shape of content
that is still loading.

**Default Value:** `null` (off)

**Values:** one of the following, case-sensitive:

| Value | Shape |
|---|---|
| `rect` | a rectangle with small rounded corners |
| `circle` | a circle, or an ellipse when the box is not square |
| `text` | a rounded block with a 2px corner radius, meant for a line of text |

The placeholder takes the component's current size, so give the component content or an explicit width and height. Set it to `null` or an empty string to turn the placeholder off. Any other
value is rejected with a `WrongValueException` in Java.

```xml
<vlayout>
    <image skeleton="circle" width="48px" height="48px"/>
    <div skeleton="rect" width="200px" height="16px"/>
</vlayout>
```

While the skeleton is on, the component gets `aria-busy="true"`, unless
another part of ZK has already set that attribute. The pulse stops for users
who prefer reduced motion. To change the look, override these CSS custom
properties: `--zk-skeleton-background`, `--zk-skeleton-duration`,
`--zk-skeleton-radius`, `--zk-skeleton-text-radius`, and
`--zk-skeleton-min-opacity`.

The placeholder does not block input. The component's own root element still receives clicks, so a skeleton button still fires `onClick`. If users must not interact while the data loads, set `disabled="true"` on input components.

{% include Notice.html text="In ZK CE the value is stored and sent to the client, but no placeholder is drawn. The placeholder requires ZK PE." %}
