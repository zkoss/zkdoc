**Property:**

`org.zkoss.zul.tablet.meta.viewport.disabled`

`Default: false`  
`[Since 6.5.0]`

Specifies whether to generate a meta viewport tag or not for tablet
devices. It is enabled by default.

By default, ZK generates the following meta viewport tag for tablet
devices: [^1]

```html
<meta name="viewport" 
content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" >
```

If you set this library property to true, ZK will not generate the meta
above.

If you prefer to configure a particular viewport of specific page, you
could specify it as follows.

```xml
<?page viewport="width=device-width,initial-scale=1.0,maximum-scale=5.0"?>
```

Note: Enable user-scalable might have some potential issues like
scrolling, unnecessary events.

<references/>

# Version History

| Version | Date           | Content                                   |
|---------|----------------|-------------------------------------------|
| 6.5.0   | September 2012 | Viewport should enabled on tablet device. |

[^1]: <https://developers.google.com/web/fundamentals/design-and-ux/responsive/>
