

# Pdfviewer

- Demonstration: [Embed PDF Documents in Your ZK Application](https://blog.zkoss.org/2019/10/02/zk-9-preview-embed-pdf-documents-in-your-zk-application/)
- Java API: [org.zkoss.zkex.zul.Pdfviewer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/zul/Pdfviewer.html)
- JavaScript API:
  [zkex.pdfviewer.Pdfviewer](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkex.pdfviewer.Pdfviewer.html)

<!--REQUIRED ZK EDITION: PE -->
{% include edition-availability.html edition="pe" %} {% include version-badge.html version=9.0.0 %}

# Employment/Purpose

The `Pdfviewer` component is based on Mozilla’s great work --
[PDF.js](https://github.com/mozilla/pdf.js), that renders PDF documents
in a browser.

# Example

![](/zk_component_ref/images/ZK-pdfviewer-example.png)

```xml
<pdfviewer src="/pdf/sample.pdf" />
```

# Supported Browsers

It is compatible with HTML5-supported browsers, like IE 11, Edge,
Firefox, Opera, Chrome and Safari.

# Customize the Toolbar

Pdfviewer accepts only one child: <toolbar>. You can customize the
toolbar by adding your own one. By default, the position of the toolbar
is at the top. You can use CSS to do more tweaks.

```xml
<pdfviewer id="pv2">
  <toolbar>
    <toolbarbutton iconSclass="z-icon-fw z-icon-fast-backward"
                   onClick="pv2.firstPage()"/>
    <toolbarbutton iconSclass="z-icon-fw z-icon-chevron-left"
                   onClick="pv2.previousPage()"/>
    <toolbarbutton iconSclass="z-icon-fw z-icon-chevron-right"
                   onClick="pv2.nextPage()"/>
    <toolbarbutton iconSclass="z-icon-fw z-icon-fast-forward"
                   onClick="pv2.lastPage()"/>
  </toolbar>
</pdfviewer>
```

# Zoom to Fit Page Width / Fit Page Height

{% include version-badge.html version=9.6.0 %}

You can call `setZoom("fit-page-width")` or `setZoom("fit-page-height")`
now.

Or just specify it as an initial zoom level:

```xml
<pdfviewer id="pv" src="/pdf/sample.pdf" zoom="fit-page-width" />
```

# Cross-Origin Resource Sharing (CORS)

If you want to load a remote PDF document, please make sure the response
headers contain the necessary [CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) or it
won’t be allowed to be loaded.

# Enable Fullscreen

Due to a specification limitation, this method must be called while
responding to user interaction (i.g. event handlers). Therefore the
component only provides a client-side method `toggleFullscreen()` to
enable the full-screen mode.

```xml
<pdfviewer id="pv" src="/pdf/sample.pdf" />
<button xmlns:w="client" w:onClick="zk.$('$pv').toggleFullscreen()" />
```

# Underlying Library

This component depends on <https://github.com/mozilla/pdf.js>. To check
the bundled pdfjs version, open a browser developer tool \> Console tab,
and run the code below:

```js
pdfjsLib.version
```

# Supported Events

| Name | Event Type |
|---|---|
| `onPaging` | <strong>Event:</strong>
[org.zkoss.zul.event.PagingEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/event/PagingEvent.html) Notifies one of the
pages is selected by the user. |
| `onRender` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes the loading pdf
file is finished rendering. |
| `onZoom` | <strong>Event:</strong>
[org.zkoss.zkex.ui.event.ZoomEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/ui/event/ZoomEvent.html) Denotes user has
changed the zoom level. |
| `onRotate` | <strong>Event:</strong>
[org.zkoss.zkex.ui.event.RotationEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/ui/event/RotationEvent.html) Denotes user
has changed the rotation angle. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*Toolbar`

| Version | Date         | Content                                                                                                            |
|---------|--------------|--------------------------------------------------------------------------------------------------------------------|
| 9.0.0   | October 2019 | [ZK-4395](https://tracker.zkoss.org/browse/ZK-4395): Provide a pdfviewer component                                 |
| 9.6.0   | June 2021    | [ZK-4917](https://tracker.zkoss.org/browse/ZK-4917): set zoom level with fit-page-width or fit-page-height in Java |


