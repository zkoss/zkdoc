**Syntax:**

```xml
<max-desktops-per-session>a_number</max-desktops-per-session>
```

`[Default: 15]`

It specifies the **maximum allowed number of desktops** per session. A
desktop represents a browser tab. In other words, this number limit the
number of concurrent browser tab allowed per session.

**A negative number** means no limitation at all.

If you specify 2, then after you open the 3rd tab, then the
corresponding desktop of the first tab is dropped. If you trigger an AU
request to a server (e.g. clicking a button), you will see the error
message like:

<div style="width:600px;margin:auto; border:solid 2px; padding:5px">

<code> The resource you request is no longer available: /index.zul
(z_8nc).

This is normally caused by timeout, or opening too many Web pages.

You have to reload the page and try again.</code>

</div>

**Note**: If you use
`org.zkoss.zk.ui.impl.GlobalDesktopCacheProvider`, then
you have to make this number much larger since it means the maximum
allowed number of desktops *per system*.


