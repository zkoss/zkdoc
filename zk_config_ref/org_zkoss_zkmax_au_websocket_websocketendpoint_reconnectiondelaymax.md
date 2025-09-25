---
title: "org.zkoss.zkmax.au.websocket.WebSocketEndPoint.reconnectionDelayMax"
---

**Property:**
`org.zkoss.zkmax.au.websocket.WebSocketEndPoint.reconnectionDelayMax`

{% include global-scope-only.html %}
Default:  `5000` (ms.)

The maximum delay between two reconnection attempts for the websocket
client. Each attempt increases the reconnection delay by 2x.

Only works when WebSocket connection is enabled.
