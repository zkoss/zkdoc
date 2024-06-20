{% include ZKComponentReferencePageHeader %}

# OpenEvent

- Demonstration: [OpenEvent](http://www.zkoss.org/zkdemo/userguide/#e9)
- Java API: <javadoc>org.zkoss.zk.ui.event.OpenEvent</javadoc>
- JavaScript API: N/A

# Employment/Purpose

Represents an event cause by user's openning or closing something at the
client.

Note: it is a bit confusing but `Events.ON_CLOSE` is sent when user
clicks a close button. It is a request to ask the server to close a
window, a tab or others. If the server ignores the event, nothing will
happen at the client. By default, the component is detached when
receiving this event.

On the other hand,`Events.ON_OPEN` (with `OpenEvent`) is a notification.
It is sent to notify the server that the client has opened or closed
something. And, the server can not prevent the client from opening or
closing.

# Example

N/A

# Supported events

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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`

# Use cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |

{% include ZKComponentReferencePageFooter %}
