---
title: "org.zkoss.zkmax.au.websocket.WebSocketEndPoint.reconnection"
---

**Property:**
org.zkoss.zkmax.au.websocket.WebSocketEndPoint.reconnection
{% include global-scope-only.html %}
Default:  `true`
{% include supported-since.html version="9.6.1" %}

Specifies whether to enable or not for the WebSocket client reconnection
mechanism.

Only works when WebSocket connection is enabled.

When ZK reconnects a server and fails, the browser console will show the
error like:

`zk.wpd:48603 WebSocket connection to '`[`ws://192.168.0.5:8080/yourapp/zkwm?dtid=z_36yyy9abcdabde9H8npff8Ew`](ws://192.168.0.5:8080/yourapp/zkwm?dtid=z_36yyy9abcdabde9H8npff8Ew)`' failed: `
