# WebSocket

By default, ZK communicates with a server in
[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
or [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
asynchronously. Now you can switch to WebSocket. Then
`org.zkoss.zkmax.au.websocket.WebSocketEndPoint`
handles ping/pong messages from and to the client. This feature works
only for browsers that support WebSocket natively.

To enable WebSocket connection, add the following listener into zk.xml

```xml
<listener>
    <listener-class>org.zkoss.zkmax.au.websocket.WebSocketWebAppInit</listener-class>
</listener>
```

To change the URL pattern, please refer to [this library property]({{site.baseurl}}/zk_config_ref/org.zkoss.zkmax.au.websocket.websocketendpoint.urlpattern).

When WebSocket connection is enabled, ZK will use WebSocketServerPush by
default when server-push started.

Note that we cannot guarantee the accessing of the information provided
by HTTP requests when a WebSocket connection is enabled.
