

# OpenEvent

- Demonstration: [OpenEvent](http://www.zkoss.org/zkdemo/userguide/#e9)
- Java API: [org.zkoss.zk.ui.event.OpenEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/OpenEvent.html)
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

Check inherited events

# Supported Children

`*NONE`



# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |


