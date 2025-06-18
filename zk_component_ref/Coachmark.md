

# Coachmark

{% include version-badge.html version=9.0.0 %}

- Java API: <javadoc>org.zkoss.zkmax.zul.Coachmark</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.nav.Coachmark</javadoc>

{% include edition-availability.html edition="pe" %}

# Employment/Purpose

Coachmark is used to attract users' attention to the target component
and display a dialog. Once a coachmark is opened, the background mask
will be displayed and the target component will be highlighted.The
content of coachmark should be as relevant as possible to the context.
You can use more than one coachmarks to guide users to perform a series
of operations in the desired order.

# Example

## Basic

![](/zk_component_ref/images/Coachmark-4.png)

```xml
    <button id="infoButton" label="Information" />
    <coachmark target="infoButton" onTargetClick="self.close()">
        <label>Wellcome! click here for more information!</label>
        <button style="display: block;margin: 10px auto 0" label="got it!" onClick="self.parent.close()"/>
    </coachmark>
```

## Multiple Steps

```xml
        <button label="Step 1" sclass="big-margin"/>
        <coachmark target="${self.previousSibling}" next="mark2" onTargetClick="self.next()" >
            click here
        </coachmark>
        <button id="s2" label="Step 2" sclass="big-margin"/>
        <coachmark id="mark2" target="${self.previousSibling}" next="mark3" onTargetClick="self.next()" visible="false">
            click here
        </coachmark>
        <button label="Step 3" sclass="big-margin"/>
        <coachmark id="mark3" target="${self.previousSibling}" onTargetClick="self.next()" visible="false">
            click here
        </coachmark>
```

- Line 2: need to specify `next` and `onTargetClick`

# Supported Browsers

This component uses CSS keyframes. Browsers that support CSS keyframes
(IE10+, Edge, Chrome, Firefox, Safari) are compatible with this feature.
Please check [browser
compatibility](https://caniuse.com/?search=%40keyframes).

# Open / Close the Coachmark

By default, a Coachmark opens itself after a page loading without user
interaction. If you want to open a Coachmark in a specific timing,
please set `visible="false"`.

Both `visible` attribute and `open/close` methods allow you to open or
close the Coachmark.

# Properties

## Target

The target component that the Coachmark will point itself to. You need
to specify a component's id or an EL expression that resolved to a
component e.g. `${self.previousSibling}`

![](/zk_component_ref/images/Coachmark-1.png)

```xml
    <button id="infoButton" label="button"/>
    <coachmark target="infoButton">
            <label>Wellcome!</label>
    </coachmark>
```

## Position

{% include DefaultValue.md value=after_center %}

The positions of a coachmark. Below are the available values:

|               | start/before | center        | end/after   |
|---------------|--------------|---------------|-------------|
| <b>top</b>    | before_start | before_center | before_end  |
| <b>bottom</b> | after_start  | after_center  | after_end   |
| <b>left</b>   | start_before | start_center  | start_after |
| <b>right</b>  | end_before   | end_center    | end_after   |

See
[Popup#Position]({{site.baseurl}}/zk_component_ref/essential_components/popup#Position)

## Next

You need to specify a Coachmark's id or an EL expression that resolved
to a Coachmark e.g. `${self.previousSibling}`

The next Coachmark will be opened when the `onTargetClick` event or the
`next()` is called.

Note: if you call `next(Coachmark coachmark)`, it will open the
specified coachmark instead of the predefined "next" coachmark.

### Open Next Coachmark Programmatically

- `next()` : Closes the current coachmark and opens the next one.
- `next(Coachmark coachmark)`: Close the current coachmark and open the
  one you passed. (ignore the next coachmark you already set)

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
<p><code>onOpen</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc></p>
<p>Denotes that the user has opened or closed a component.</p>
<p>Note: unlike <code>onClose</code>, this event is only a notification.
The client sends this event after the component is opened or
closed.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onTargetClick</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.MouseEvent</javadoc></p>
<p>Represents an event caused by a user's click on a highlighted target
component.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*ALL`


