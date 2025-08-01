

Keystroke handling is generic. Any component inherited from
[org.zkoss.zul.impl.XulElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html) can handle the key
event in the same way.

# ENTER and ESC

To handle ENTER key pressing, you can listen to the event:

- **onOK** (notice O and K are both in upper case).

To handle ESC key pressing, you can listen to the event:

- **onCancel**

For example:

```xml
    <grid id="form" apply="org.zkoss.reference.developer.uipattern.KeystrokeComposer">
        <rows>
            <row>Username:
                <textbox id="username"/>
            </row>
            <row>Password:
                <textbox id="password" type="password"/>
            </row>
            <row>
                <button label="Login" forward="form.onOK"/>
                <button label="Reset" forward="form.onCancel"/>
            </row>
        </rows>
    </grid>
```

Then, you could implement [a composer]({{site.baseurl}}/zk_dev_ref/mvc/composer)
as follows.

```java
package org.zkoss.reference.developer.uipattern;

import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.*;
import org.zkoss.zul.Textbox;

public class KeystrokeComposer extends SelectorComposer<Component> {

    @Wire
    private Textbox username;
    @Wire
    private Textbox password;

    @Listen("onOK = #form")
    public void onOK() {
        //handle login
        System.out.println("ok");
    }

    @Listen("onCancel = #form")
    public void onCancel() {
        username.setValue("");
        password.setValue("");
    }
}
```

Notice that the `onOK` and `onCancel` events are sent to the nearest
ancestor of the component that has the focus. In other words, if you
press ENTER in a textbox, then ZK will look up the textbox, its parent,
its parent's parent and so on to see if any of them has been registered
as a listener for `onOK`. If found, the event is sent to it. If not
found, nothing will happen.

Also notice that, if a button gains the focus, ENTER will be intercepted
by the browser and interpreted as pressed. For example, if you move the
focus to the Reset button and press ENTER, you will receive `onCancel`
rather than `onOK` (since `onClick` will be fired and it is converted to
`onCancel` because of [the forward attribute](/zuml_ref/forward)
specified).

# Control Keys

To handle the control keys, you have to specify the keystrokes you want
to handle with
[org.zkoss.zul.impl.XulElement#setCtrlKeys(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html#setCtrlKeys(java.lang.String)).
Then, if any child component gains the focus and the user presses a
keystroke that matches the combination, the `onCtrlKey` will be sent to
the component with an instance of
[org.zkoss.zk.ui.event.KeyEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/KeyEvent.html).

Like ENTER and ESC, you could specify the listener and the `ctrlKeys`
property in one of the ancestors. ZK will search the component having
the focus, its parent, its parent's parent and so on to find if any of
them specifies the `ctrlKeys` property that matches the keystroke.

For example,

```xml
<vbox ctrlKeys="@c^a#f10^#f3" onCtrlKey="doSomething(event.getKeyCode())">
    <textbox/>
    <datebox/>
</vbox>
```

As shown, you could use
[org.zkoss.zk.ui.event.KeyEvent#getKeyCode()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/KeyEvent.html#getKeyCode())
to know which key was pressed.

## Allowed Control Keys

| Key | Syntax | Description |
|---|---|---|
| Control | ^[?] | `[?]` can be **a~z, 0~9, #[?]**, e.g. `^k` represents `Ctrl+k` |
| Alt | @[?] | `[?]` can be **a~z, 0~9, #[?]**, e.g. `@k` represents `Alt+k` |
| Shift | $[?] | `[?]` can be **#[?]**. Note: $a ~ $z are not supported. e.g. `$#down` represents `Shift+↓` |
| Mac command(⌘) | %[?] | `[?]` can be **a~z, 0~9, #[?]**. e.g. `%k` represents `command+k` |
| **Navigation key** | #[?] | the supported value of `[?]` are listed below: |
| Home | #home | |
| End | #end | |
| Insert | #ins | |
| Delete | #del | |
| ← | #left | |
| → | #right | |
| ↑ | #up | |
| ↓ | #down | |
| PgUp | #pgup | |
| PgDn | #pgdn | |
| Backspace | #bak | |
| function key (F1, F2,... F12) | #f1, #f2, ... #f12 | |
| Tab | #tab | |
| Space | #space | |

# Document-level Keystrokes

If you set the library property
[org.zkoss.zk.ui.invokeFirstRootForAfterKeyDown.enabled]({{site.baseurl}}/zk_config_ref/org_zkoss_zk_ui_invokefirstrootforafterkeydown_enabled)
to `true` and there is no widget gaining a focus when an end-user
presses a keystroke, ZK will fire a key event to **the first root
component that has an onCtrlKey listener**. For example, when visiting
the following page, the `div` component will receive the `onOK` event.

```xml
<div onOK="doSomething(event)" ctrlKeys="^K" onCtrlKey="doSomething(event)" >
press enter key or ctrl+k.
<zscript><![CDATA[
public void doSomething(KeyEvent e){
    Clients.showNotification(e.getKeyCode()+"");
}
]]></zscript>
</div>
```

In other words, `doSomething()` will be called if a user presses ENTER,
even though no widget ever gains the focus.

# Nested Components

Keystrokes are propagated up from the widget gaining the focus to the
first ancestor widget that handles the keystroke. For example,

```xml
<div onOK="doFirst()">
   <textbox id="t1"/>
   <div onOK="doSecond()">
       <textbox id="t2"/>
   </div>
</div>
```

Then, `doSecond()` is called if `t2` is the current focus, and
`doFirst()` is called if `t1` has the focus.

# Key handling and onChange event

When an onChange listener alone is registered on a component, onChange
will be triggered by blur events exclusively.

However, some key events will cause a check for change value and will
fire a change event if necessary.

These key events are: onOK, onCancel, and onCtrlkeys. If a listener for
any of these events is registered and triggered, an onChange event
calculation will be triggered, and an onChange event will be fired if
the value of the control has changed.

# Version History

| Version | Date          | Content                                           |
|---------|---------------|---------------------------------------------------|
| 5.0.6   | January 2011  | Document-level keystroke handling was introduced. |
| 9.5.1   | November 2020 | Add Tab key support                               |
| 10.0.0  | December 2023 | Add Space key support                             |
