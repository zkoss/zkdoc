---
title: "org.zkoss.zkmax.au.websocket.WebSocketEndPoint.pingIntervalSecond"
---

**Property:**
org.zkoss.zkmax.au.websocket.WebSocketEndPoint.pingIntervalSecond

Default:  `0`` (Turned off)`  
{% include version-badge.html version="9.5.0" %}

Default:  `25`` (Turned on)`  
`It means the http session will keep alive during the ping and pong mechanism until the user closes the browser tab or navigates to another browser page.`  
{% include version-badge.html version="9.6.1" %}

It specifies the interval in second of the ping mechanism described in
[RFC 6455](https://tools.ietf.org/html/rfc6455#section-5.5.2) when
WebSocket connection is enabled.

Only works when WebSocket connection is enabled.
