

# Scrollview

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zkmax.zul.Scrollview</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.layout.Scrollview</javadoc>

- [Available in ZK EE only](http://www.zkoss.org/product/edition.dsp)

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

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p><code>onScroll</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.ScrollEvent</javadoc> <strong>In mobile
devices:</strong> Denotes that the content of a scrollable component has
been scrolled by the user. Notice that you can check if it is scrolled
outside/inside boundaries by invoking <code>getOutOfBound</code> method
in the ScrollEvent.</p>
<p><strong>In desktop:</strong> This event will be triggered when users
scroll all the way to the top or to the end of the page.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onScrolling</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.ScrollEvent</javadoc> Denotes that the
user is scrolling a scrollable component.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date         | Content             |
|---------|--------------|---------------------|
| 6.5.0   | August, 2012 | new added component |


