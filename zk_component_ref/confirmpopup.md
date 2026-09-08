---
title: "Confirmpopup"
---

- **Java API:** [org.zkoss.zul.Confirmpopup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Confirmpopup.html)
- **JavaScript API:** [zul.wgt.Confirmpopup](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Confirmpopup.html)

{% include edition-availability.html edition="ce" %} {% include supported-since.html version="11.0.0" %}

# Employment/Purpose

`Confirmpopup` asks the user to confirm an action without interrupting the page with a modal dialog. Open it from the action's component so the popup arrow points back to the source.

# Example

```xml
<button label="Delete" onClick="confirm.open(self)"/>
<confirmpopup id="confirm"
              placement="top"
              severity="danger"
              header="Confirm delete"
              message="This cannot be undone. Continue?"
              defaultFocus="cancel"
              onOK='Clients.showNotification("Deleted")'/>
```

The OK and Cancel labels come from ZK's locale bundle.

# Properties

## Header and Message

`header` sets the title and `message` sets the main prompt. A `null` header hides the title row.

## IconSclass

**Default Value:** `z-icon-exclamation-triangle`

Set an icon font class, set an empty string to hide the icon, or set `null` to restore the default.

## Severity

**Default Value:** `warning`

Allowed values are `info`, `success`, `warning`, `danger`, and `secondary`.

## Placement

**Default Value:** `top`

Allowed values are `top`, `bottom`, `left`, and `right`. The popup positions itself relative to the component passed to `open(Component)`.

## DefaultFocus

**Default Value:** `ok`

Allowed values are `ok` and `cancel`. Prefer `cancel` for destructive operations so an accidental Enter does not confirm them.

# Supported Events

| Name | Event Type |
|---|---|
| `onOK` | **Event:** [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Fired when the user confirms. |
| `onCancel` | **Event:** [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Fired when the user selects Cancel, presses Escape, or dismisses the popup. |

# Inherited Functions

Please refer to [Popup]({{site.baseurl}}/zk_component_ref/popup) for `open`, `close`, and inherited behavior.

# Supported Children

`*ALL`
