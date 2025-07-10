# Window

- Demonstration: [Window](https://www.zkoss.org/zkdemo/window/positioning)
- Java API: [org.zkoss.zul.Window](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html)
- JavaScript API: [zul.wnd.Window](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wnd.Window)

## Employment/Purpose
A ZK Window is a versatile component used to group other components. It acts as an owner of an ID space, allowing components contained within it to be uniquely identified. Windows can be overlapped, popped up, or embedded, and can also function as modal dialogs.

## Example
The following XML code snippet demonstrates two different styles of windows:

![Window Examples](ZKComRef_Window_Multiple_Examples.png)

```xml
<zk>
    <window title="Embedded Style" border="normal" width="200px">Hello, Embedded!</window>
    <window title="Overlapped Style" mode="overlapped" border="normal" width="200px">Hello, Overlapped!</window>
</zk>
```

Try it

* [Window](https://zkfiddle.org/sample/o0987d/1-ZK-Component-Reference-Window-Example?v=latest&t=Iceblue_Compact)

In the example above, the first window is displayed in an embedded style, while the second window is in an overlapped style.

## Window Modes
A ZK Window can be in one of five different modes: 
- Embedded (default)
- Overlapped
- Popup
- Modal
- Highlighted

You can change the mode using the `setMode(String)` method or by invoking specific methods like `doOverlapped()`, `doPopup()`, `doModal()`, `doHighlighted()`, and `doEmbedded()`.

For example,

```xml
<zk>
    <window id="win" title="Hi!" border="normal" width="200px">    
        <caption>        
            <toolbarbutton label="Help"/>
        </caption>        
        <checkbox label="Hello, Wolrd!"/>
      	<button label="Restore" onClick="win.doEmbedded()"/>
    </window>    
        
    <button label="Overlap" onClick="win.doOverlapped();"/>    
    <button label="Popup" onClick="win.doPopup();"/>    
    <button label="Modal" onClick="win.doModal();"/>    
    <button label="Embed" onClick="win.doEmbedded();"/>    
    <button label="Highlighted" onClick="win.doHighlighted();"/>    
</zk>
```

Try it

* [Window Modes](https://zkfiddle.org/sample/2t9v3om/1-ZK-Component-Reference-Window-Modes-Example?v=latest&t=Iceblue_Compact)

## Embedded
An embedded window is placed inline with other components and cannot be repositioned since it is determined by the browser.

## Overlapped
An overlapped window can be dragged around and its position can be set using `setLeft(String)` and `setTop(String)`.

```xml
<window title="My Overlapped" width="300px" mode="overlapped"></window>
```

An overlapped window is typically used to display the information that should co-exist with the current operation and should appear for a long time. You might have multiple overlapped windows and each for different set of information. If you want to show the information that will appear only temporarily (dismissed as soon as a user clicks somewhere else), you could use the popup mode as described in the next section, or the [Popup]({{site.baseurl}}/zk_component_ref/popup) component.

## Popup
A popup window is similar to overlapped windows, except it is automatically closed when user clicks on any component other than the popup window itself or any of its descendants. Of course, you could dismiss it manually by making it invisible or detaching it.

As its name suggested, it is designed to implement the popup windows. A typical application is to display information that won't obscure the current operation and are easy to close. A popup window is usually position around the focal point (such as a button). It can be done by use of `setPosition(String)` with `parent`.

For example, we could display a popup window right after a button as depicted below.

```xml
<zk>
    <toolbarbutton label="More info" onClick="info.doPopup()"/><span>
    <window id="info" visible="false" width="220px" border="normal" position="parent">
    Here is more information
    </window>
    </span>
</zk>
```

Try it

* [Window Popup](https://zkfiddle.org/sample/189e13/1-ZK-Component-Reference-Window-Popup-Example?v=latest&t=Iceblue_Compact)

where we specify `position="parent"`, and make it as a child of a span component. The span component acts as an anchor point and the window is posited based on it.

In additions to popup windows, you could use [Popup]({{site.baseurl}}/zk_component_ref/popup) for displaying a popup. The popup component has more control how to position it (by the use of [Popup.open(Component, String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Popup.html#open(org.zkoss.zk.ui.Component,_java.lang.String))).

## Modal and Highlighted
Modal and highlighted windows provide a similar visual effect of blocking background content and enforcing focus on the window. Closing a modal window can be done by making it invisible or detaching it.

## Blocking Background Content
A modal window limits user interaction to only the window itself, while multiple modal windows can be displayed with only the last one being active.

For instance, you could access only the textbox and button in the following example:

![Modalwindow](Modalwindow.png)
You can have multiple modal windows at the same time, and a user can only access the last modal window. Once the last modal is dismissed (invisible or detached), the previous modal window will become the active modal window until it is dismissed.

## Dismiss
Modal windows can be dismissed by making them invisible or detaching them from the page.

## Position
By default, modal windows are positioned at the center of the viewport, but the position can be changed using the `setPosition(String)`, `setLeft(String)`, and `setTop(String)` methods.

## Enforce Gaining the Focus
Modal windows will enforce focus on their first focusable child component when clicked elsewhere on the page.

## Modal Windows and Event Processing Threads
By default, events are processed in the same thread that serves the HTTP request. However, you can configure ZK to process events in an individual thread, allowing event listeners to suspend and resume execution. To enable the event processing thread, refer to the ZK Configuration Reference.

Modal windows in ZK suspend execution until dismissed, making them useful for scenarios where user input is required. In the following example, `f1()` is called only after `win1` is dismissed, while `g1()` is called immediately after `win2` becomes highlighted:

```java
win1.doModal(); // Execution is suspended until win1 is closed
f1();
win2.doHighlighted(); // Execution won't be suspended
g1();
```

## Properties and Features
### Border
The `border` property specifies whether to display a border for the window. The default value is `none`, meaning no border is displayed.

### Closable

By setting the `closable` property ([Window.setClosable(boolean)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/window.html#setClosable(boolean)) to true, a close button is displayed on the window. This button allows the user to close the window by clicking it. When the user clicks the close button, an `onClose` event is sent to the window. By default, the `onClose` event detaches the window itself.

#### onClose Event

The `onClose` event can be overridden to customize its behavior or register a listener to change the default functionality. For instance, you can choose to hide the window instead of closing it.

For example,

In the following example, the window hides itself when the close button is clicked. Additionally, `event.stopPropagation()` is used to prevent the default `onClose` handler from being executed.

```xml
<window closable="true" title="Detach on Close" border="normal" width="200px"
 onClose="self.visible = false; event.stopPropagation();">
     In this example, this window hides itself when the close button is clicked.
</window>
```

Try it

* [Window onClose](https://zkfiddle.org/sample/1okml07/1-ZK-Component-Reference-Window-OnClose-Example?v=latest&t=Iceblue_Compact)

**Note**: If the window is a popup, the `onOpen` event will be triggered with `open=false` when the popup is closed by clicking outside the window or pressing `ESC`.

The `onClose` event asks the server to detach or hide the window, with the default behavior being detachment. However, the application can override this behavior to implement custom actions.

On the other hand, the `onOpen` event is a notification sent to the application when the client hides the window. The application cannot prevent this action or change the default behavior to detachment.

By utilizing the `closable` property and handling the `onClose` event, developers can create interactive and user-friendly windows in their ZK applications.


### Content Style and Content Sclass

Developers can customize the look and feel of a window's content block by using the `contentStyle` property. This property allows for styling options such as background color. 

For example,

```xml
<zk>
    <window title="My Window" border="normal" width="200px" contentStyle="background:yellow">
        Hello, World!
    </window>
</zk>
```

Try it

* [Window ContentStyle](https://zkfiddle.org/sample/2qn6u7j/1-ZK-Component-Reference-Window-ContentStyle-Example?v=latest&t=Iceblue_Compact)

### Scrollable Window

The `contentStyle` attribute can be used to make a window scrollable by setting `overflow:auto`.

```xml
<window id="win" title="Hi" width="250px" height="100px" contentStyle="overflow:auto" border="normal">
    This is a long line wrapped over several lines, and more content to display. 
    Finally, the scrollbar becomes visible.
    This is another line.
</window>
```

Try it

* [Window Scrollable](https://zkfiddle.org/sample/1ikflcp/1-ZK-Component-Reference-Window-Scrollable-Example?v=latest&t=Iceblue_Compact)

### Position

The `position` attribute can be used to control the positioning of the window. It can be set to values such as `center`, `left`, `right`, `top`, or `bottom`.

For example, the following code snippet positions the window to the right-bottom corner.

```xml
<window width="300px" mode="overlapped" position="right,bottom">
    Positioned at the bottom right.
</window>
```
The `position`'s value can be a combination of the following constants by separating them with commas (`,`).

Try it

* [Window Position](https://zkfiddle.org/sample/374g5t/1-ZK-Component-Reference-Window-Position-Example?v=latest&t=Iceblue_Compact)


| Constant | Description |
|----------|-------------|
| center   | Position the window at the center. If `left` or `right` is also specified, it means the vertical center. If `top` or `bottom` is also specified, it means the horizontal center. If none of `left`, `right`, `top` and `bottom` is specified, it means the center in both directions. Both the `left` and `top` properties are ignored. |
| left     | Position the window at the left edge. The `setLeft()` method is ignored. |
| right    | Position the window at the right edge. The `setLeft()` method is ignored. |
| top      | Position the window at the top. The `setTop()` method is ignored. |
| bottom   | Position the window at the bottom. The `setTop()` method is ignored. |

### Based on Viewport

The `position` attribute is calculated based on the current viewport of the window, taking into account scrolling.

### Based on the Parent

The `position` attribute can also be set to `parent` to position the window relative to the top-left corner of the parent component.

This position **cannot** be combined with other positions mentioned in the previous table.

### Sizable

By setting the `sizable` attribute to true, users can resize the window by dragging the borders.

For example,

```xml
<window id="win" title="Sizable Window" border="normal" width="200px" sizable="true">
    This is a sizable window.
    <button label="Change Sizable" onClick="win.sizable = !win.sizable"/>
</window>
```

Try it

* [Window Sizable](https://zkfiddle.org/sample/2muvpdl/1-ZK-Component-Reference-Window-Sizable-Example?v=latest&t=Iceblue_Compact)

#### onSize Event
Once a user resizes the window, the onSize event is sent with an instance of the `org.zkoss.zul.event.SizeEvent`. Notice that the window is resized before the `onSize` event is sent. In other words, the event serves as a notification that you generally ignore. Of course, you can do whatever you want in the event listener.

**Note:** If the user drags the upper or left border, the `onMove` event is also sent since the position has changed, too.

### Title and Caption
A window in ZK can have a title, a caption, and a border. The title is specified using the `title` attribute, and the caption is specified by declaring a child component called `caption`. Any children of the `caption` component will appear on the right-hand side of the title.

![Window with Caption Example](Window_Caption_Example.png)

```xml
<zk>
	<window title="Demo" border="normal" width="350px">
		<caption>
			<toolbarbutton label="More" />
			<toolbarbutton label="Help" />
		</caption>
		<toolbar>
			<toolbarbutton label="Save" />
			<toolbarbutton label="Cancel" />
		</toolbar>
		What is your favorite framework?
		<radiogroup>
			<radio label="ZK" />
			<radio label="JSF" />
		</radiogroup>
	</window>
</zk>
```

Try it

* [Window Caption](https://zkfiddle.org/sample/3pfhoku/1-ZK-Component-Reference-Window-Caption-Example?v=latest&t=Iceblue_Compact)


Additionally, you can specify a label and an image within a caption, as shown below:

![Window with Label and Image Example](Window_Label_Image_Example.png)

```xml
<zk>
	<window id="win" title="Main" border="normal" width="200px">
	    <caption image="/img/ZK-Logo.gif" label="Hi there!"/>
	    <checkbox label="Hello, World!"/>
	</window>
</zk>
```

Try it

* [Window Caption](https://zkfiddle.org/sample/176o4ka/1-ZK-Component-Reference-Window-Caption-Image-Example?v=latest&t=Iceblue_Compact)

## Common Dialogs

The Window component supports various common dialogs to simplify common tasks:
- [Messagebox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Messagebox.html)
- [Fileupload](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Fileupload.html)
- [Filedownload](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Filedownload.html)

## Supported Events

| Name         | Event Type                                       |Description |
|--------------|--------------------------------------------------|----------- |
| `onMove`       | **Event:** [Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Denotes the position of the window is moved by a user.             |
| `onOpen`       | **Event:** [OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html) | Denotes user has opened or closed a component. **Note:** Unlike `onClose`, this event is only a notification. The client sends this event after opening or closing the component. It is useful to implement load-on-demand by listening to the `onOpen` event, and creating components when the first time the component is opened. |
| `onClose`      | **Event:** [Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | Denotes the close button is pressed by a user, and the component shall detach itself.               |
| `onMaximize`   | **Event:** [MaximizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MaximizeEvent.html) | Denotes user has maximize a component.|
| `onMinimize`   | **Event:** [MinimizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/MinimizeEvent.html) | Denotes user has minimize a component.|
| `onSize`       | **Event:** [SizeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SizeEvent.html) | Denotes the window's size is updated by a user.     |
| `onZIndex`     | **Event:** [ZIndexEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ZIndexEvent.html) | Denotes the window's zindex is updated by a user.  |

## Supported Children

`*ALL`: Indicates that the `Window` component can have any kind of ZK component as its child element. This allows you to include any ZK component within the `Window`, providing flexibility and customization options for your designs.

Note: Only one [`Caption`](caption) component is allowed in the `Window` and it must be the first component.