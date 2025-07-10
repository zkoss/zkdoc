

The client-side action (CSA) is used to control how to perform an action
at the client. Typical use is to control the effect of showing or hiding
a widget. For example, with CSA, you could use the so-called
*slide-down* effect to display a widget.

It is a generic feature available to
[org.zkoss.zk.ui.HtmlBasedComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBasedComponent.html), so you could
apply it to almost all widgets.

CSA allows the developer to control some actions without JavaScript. If
you want to have the full control (and are OK to write some JavaScript
code), please refer to [ZK Client-side Reference]({{site.baseurl}}/zk_client_side_ref/general_control) for the
complete control of the client-side behavior.

# How to Apply Client-side Actions

To apply the client-side action to a widget, you have to assign a value
to the `action` property
([org.zkoss.zk.ui.HtmlBasedComponent#setAction(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBasedComponent.html#setAction(java.lang.String))).
The syntax is as follows.

`action="`*`action-name1`*`: `*`effect1`*`; `*`action-name2`*`: `*`effect2`*`"`

The action name (e.g., `action1`) has to be one of the predefined names,
such as show and hide. The action effect (e.g., `effect1`) has to be one
of the predefined effects, such as slideDown and slideUp.

For example, we could use the *slide-down* effect to display a window as
follows[^1].

```xml
<zk>
    <button label="Show a modal window" onClick="wnd.doModal()"/>
    <window id="wnd" title="Modal" border="normal" width="300px"
     action="show: slideDown" visible="false">
        This is a modal window.
    </window>
</zk>
```

In addition, you could specify additional options by enclosing them with
the parentheses as follows.

```xml
<div action="show: slideDown({duration: 1000}); hide: slideUp({duration: 300})">
....
</div>
```

which specifies the duration of sliding down is 100 milliseconds, and
the duration of sliding up is 300 milliseconds.

Security Note: the options is actually a JavaScript object (i.e., a map,
[\_global\_.Map](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.Map.html)), and ZK passes
whatever is being specified to the client for evaluation. Thus, if you
allow the user to specify the effect, you shall encode it first to avoid
[cross-site scripting]({{site.baseurl}}/zk_dev_ref/security_tips/cross-site_scripting).

> ------------------------------------------------------------------------
>
> <references/>

## Predefined Actions

Here is a list of predefined actions.

| Name       | Description                                                                                                                                                                                                                 |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| show       | The show action is used to display a widget (making a widget visible). When a visible widget is attached to a page, the `show` action will take place too.                                                                  |
| hide       | The hide action is used to hide a widget (making a widget invisible). When a visible widget is detached from a page, the `hide` action will take place too.                                                                 |
| invalidate | The invalidate action is invoked when a visible widget is invalidated, i.e., when [org.zkoss.zk.ui.Component#invalidate()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#invalidate()) is called. Example, `action="invalidate: slideDown"`. |

## Predefined Effects

Here is a list of predefined effects.

| Name      | Description                                                   |
|-----------|---------------------------------------------------------------|
| slideDown | Slides down to display this widget (making a widget visible). |
| slideUp   | Slides up to hide this widget (making a widget invisible).    |
| slideIn   | Slides in to display this widget (making a widget visible).   |
| slideOut  | Slides out to hide this widget (making a widget invisible).   |

## Predefined Options for Effects

| Option Name | Acceptable Values        | Description                                                                                                                                  |
|-------------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| anchor      | t, b, l, r               | The 4 values represent **the direction** to slide: **top to bottom** , **bottom to top**, **left to right**, **right to left** respectively. |
| duration    | a number of milliseconds | The time to slide up/down/in/out a widget. The larger the time, the slower the widget slides.                                                |

## Custom Actions

If you want to take some actions other than the predefined actions
listed above, you have to override the corresponding method at the
client. For example, suppose you'd like to change the color when a
label's value
([org.zkoss.zul.Label#setValue(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Label.html#setValue(java.lang.String)))
is changed. Then, you could do as follows:

```xml
<label id="inf2">
    <attribute w:name="setValue">
    function (value, fromServer) {
        this.$setValue(value, fromServer);
        if (this.desktop) {
            this._red = !this._red;
            this.setStyle('background:'+(this._red ? 'red':'green'));
        }
    }
    </attribute>
</label>
```

For more information, please refer to [ZK Client-side Reference: Widget Customization]({{site.baseurl}}/zk_client_side_ref/widget_customization).

## Custom Effects

For adding your custom effects, please refer to [ZK Client-side Reference: Customization: Actions and Effects]({{site.baseurl}}/zk_client_side_ref/actions_and_effects)
for details.

# Notes for Upgrading from ZK 3

They are both called Client-side Actions, but they are different and you
have to rewrite them to make them work under ZK 5:

1.  The action names were changed and the support is limited to `show`
    and `hide` (while ZK 3 supports any `onxxx`).
2.  The action operation must be the name of one of the methods defined
    in [zk.eff.Actions](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.eff.Actions.html) (while ZK 3
    is the JavaScript code).
3.  It is part of [org.zkoss.zk.ui.HtmlBasedComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlBasedComponent.html)
    (while ZK 3 is [org.zkoss.zul.impl.XulElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/XulElement.html)).

# Version History

| Version | Date          | Content                                         |
|---------|---------------|-------------------------------------------------|
| 5.0.6   | December 2010 | Client-side actions were introduced since 5.0.6 |

[^1]: If you are using the effects with a modal window, it is important
    to specify the width. Otherwise, the calculation of the position
    might be wrong.
