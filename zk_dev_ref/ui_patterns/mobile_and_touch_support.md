---
title: "Mobile And Touch Support"
---

# ZK Mobile Strategy and Architecture

ZK's approach to mobile support is based on a **single codebase architecture**, where the same application serves desktop, tablet, and mobile devices.

Instead of building separate applications for different platforms, developers can:

- Reuse the same backend logic
- Share UI components
- Customize presentation using templates and responsive design

## Core Concept: One Application, Multiple Views

ZK applications are rendered on the server and delivered as web applications. To support different devices, developers can adapt the UI using:

- **Responsive Design** (CSS-based layout adjustments)
- **ZUL Template Variations** (different layouts per device)
- **Conditional Rendering / Template Injection**

For example:

- A desktop view may use a multi-column layout
- A mobile view may switch to a stacked or simplified layout

This allows developers to optimize user experience without duplicating business logic.

## Mobile Output: Web-Based

Applications built with ZK run as **web applications**, even on mobile devices. They are not native iOS or Android Apps.

This means:

- No separate iOS or Android codebase is required
- Applications run in the browser or embedded web views

To provide an app-like experience, developers can optionally use:

- **Progressive Web Apps (PWA)** for installable web apps
- Native wrappers (e.g., WebView) if needed

## Why This Approach

ZK’s architecture is designed to simplify development and long-term maintenance by enabling a single codebase across desktop and mobile devices. Instead of building and maintaining separate applications for different platforms, developers can reuse the same business logic and UI components while adapting the presentation layer as needed. This approach reduces duplication, ensures consistency across devices, and allows teams to deliver and maintain applications more efficiently compared to solutions that require multiple technology stacks.

## When to Use Native Mobile Development

While ZK is suitable for most business applications, native mobile development may be more appropriate when deep integration with device hardware, highly platform-specific user experiences, or advanced offline capabilities are required. 

## Related Topics

- [Responsive Design]({{site.baseurl}}/zk_dev_ref/responsive_design/responsive_design)
- [Progressive Web Apps (PWA)]({{site.baseurl}}/zk_dev_ref/ui_patterns/pwa_guide)

---
# Mobile & Touch Support

ZK provides out-of-the-box detection and support of mobile, tablet and
touch-enabled devices.

When detecting these devices, ZK will automatically perform the
following actions:

- Detect if the device is mobile, and of which category
- Wire dedicated touch event listeners
- Load and apply [Tablet UI improvements]({{site.baseurl}}/zk_component_ref/tablet_devices/tablet_devices)

## Mobile detection

ZK uses the UserAgent string provided by the web browser to identify the
client device. If the user sets their mobile browser to "request desktop
page", ZK will detect it as a desktop device accordingly, based on the
UserAgent string.

### Browser detection flags 
The following JavaScript flags may be set to `true`, or to a version
number on the `zk` JavaScript object depending on the information
provided by the UserAgent string. Multiple flags may be set at the same time if a browser belongs to multiple categories.

| flag           | detects                                                             |
|----------------|---------------------------------------------------------------------|
| zk.opera       | Opera browser                                                       |
| zk.ff          | Firefox browser                                                     |
| zk.linux       | Linux OS / browser                                                  |
| zk.webkit      | Webkit engine based browser                                         |
| zk.chrome      | Chrome browser                                                      |
| zk.safari      | Safari browser                                                      |
| zk.edge_legacy | Edge browser (legacy, before webkit reimplementation)               |
| zk.edge        | Edge browser (Webkit implementation)                                |
| zk.ios         | iOS device (iPhone, iPad, iPod)                                     |
| zk.mac         | Mac OS device                                                       |
| zk.ipad        | iPad device                                                         |
| zk.android     | Android device                                                      |
| zk.mobile      | Mobile device of any type, used for mobile-specific behaviors below |

## Dedicated touch event listeners

If ZK detects that the client browser is a mobile device with
`zk.mobile` set to true and has touch capabilities (has at least one
touch-point support `navigator.maxTouchPoints > 0`), then the dedicated
touch listeners will be added to the page.

This includes swipe motion support, as well as direct support for
touchStart, touchEnd and touchMove events when interacting with ZK
components. This is transparent for the user, and simply allows touch
actions to map to equivalent mouse actions.

### disabling touch event support

{% include supported-since.html version="9.6.0" %}

You may want to disable touch event support, for example to force hybrid
devices to use only mouse controls.

Touch event support can be disabled with the
[org.zkoss.zkmax.touch.disabled library property]({{site.baseurl}}/zk_config_ref/org_zkoss_zkmax_touch_disabled).

Set to true to disable dedicated touch event support.

If enable this configuration, please also ensure that
"org.zkoss.zkmax.tablet.ui.disabled" is set to true.

```xml
<library-property>
    <name>org.zkoss.zkmax.touch.disabled</name>
    <value>true</value>
</library-property>
```

## Tablet UI Improvements

If ZK detects that the client browser is a mobile device with
`zk.mobile` set to true, then the Tablet UI Improvements will be added
to the page.

Tablet UI Improvements are a series of modifications to out-of-the-box
ZK component, which improves their usability on mobile devices. This
includes replacing dropdowns by scrollers, replacing scrolls with
swipes, etc.

For the full list of changes, please refer to [Tablet UI improvements]({{site.baseurl}}/zk_component_ref/tablet_devices/tablet_devices).

### disabling Tablet UI Improvements

You may want to disable tablet UI improvements, for example to the page
to use the same control on all clients, instead of using client-specific
controls.

Tablet UI Improvements can be disabled with the
[org.zkoss.zkmax.tablet.ui.disabled library property]({{site.baseurl}}/zk_config_ref/org_zkoss_zkmax_tablet_ui_disabled).

Set to true to disable dedicated touch event support.

```xml
<library-property>
    <name>org.zkoss.zkmax.tablet.ui.disabled</name>
    <value>true</value>
</library-property>
```
