---
title: "Client-side UI Composing"
---

Though optional, you could have the total control of the client's
functionality without the assistance of server-side coding. Generally,
you don't need to do it. You don't even need to know how ZK Client
Engine and client-side widgets communicate with the server. Their states
can be synchronized automatically with ZK. However, you can still
control this type of synchronization if you want. It is the so-called
Server-client fusion.

A good rule of thumb is that you should handle events and manipulate UI
mostly, if not all, on the server, since it is more productive. Then,
you could improve the responsiveness and visual effects, and/or reduce
server loading by handling them at the client, when it is appropriate.
Notice that JavaScript is readable by any user, so be careful not to
expose sensitive data or business logic when migrating some code from
server to client.

- About client-side UI composing, please refer to [ZK Client-side Reference: UI Composing]({{site.baseurl}}/zk_client_side_ref/ui_composing).
- About customizing client-side widget's behavior, please refer to [ZK Client-side Reference: Widget Customization]({{site.baseurl}}/zk_client_side_ref/widget_customization).
- About client-side event handling, please refer to [ZK Client-side Reference: Event Listening]({{site.baseurl}}/zk_client_side_ref/event_listening)
