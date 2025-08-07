

# Scrollview

- Demonstration: N/A
- Java API: [org.zkoss.zkmax.zul.Scrollview](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Scrollview.html)
- JavaScript API:
  [zkmax.layout.Scrollview](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zkmax.layout.Scrollview.html)

{% include edition-availability.html edition="ee" %}

# Employment/Purpose

{% include version-badge.html version=6.5 %} Applications exceeding a browser's
viewport relies on desktop browsers to automatically generates
scrollbars by using CSS **overflow** attribute so users can view the
entire page but this feature, unfortunately, is not available on tablet
or mobile browsers.

Scrollview is a container that makes its content scrollable on
tablet/mobile device with a **rubber band** effect you see on
iPhone/iPad. When you attempt to scroll past the end of the content
area, the area still moves slowly with your fingers. Since there is no
more content, then the area will bounce back to the correct position
after your fingers leave the screen.

When end users access your application via a tablet or any mobile
devices, Scrollview detects and triggers this feature. Oppositely, if
the application is accessed via a desktop browser, Scrollview remains
un-triggered while desktop browser will automatically generate
scrollbars when needed just like before.

# Example

You can scroll up/down to see other window components with the following
sample ZUL.
[image:ScrollviewExample_Update.png](image:ScrollviewExample_Update.png)

```xml
<scrollview vflex="1" hflex="1">
    <zk forEach="1,2,3,4,5">
        <window title="window ${each}" border="normal" >
        This is Window ${each}
        </window>
    </zk>
</scrollview>
```

# Properties

## Orient

The default orient of child components inside Scrollview is
**`vertical`**. You can also change it to **`horizontal`**.

```xml
<scrollview vflex="1" hflex="1" orient="horizontal" />
```

# Supported Events

| Name | Event Type |
|---|---|
| `onScroll` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.ScrollEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ScrollEvent.html) <strong>In mobile
devices:</strong> Denotes that the content of a scrollable component has
been scrolled by the user. Notice that you can check if it is scrolled
outside/inside boundaries by invoking `getOutOfBound` method
in the ScrollEvent.
<strong>In desktop:</strong> This event will be triggered when users
scroll all the way to the top or to the end of the page. |
| `onScrolling` | <strong>Event:</strong>
[org.zkoss.zk.ui.event.ScrollEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ScrollEvent.html) Denotes that the
user is scrolling a scrollable component. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*ALL`



# Version History



| Version | Date         | Content             |
|---------|--------------|---------------------|
| 6.5.0   | August, 2012 | new added component |


