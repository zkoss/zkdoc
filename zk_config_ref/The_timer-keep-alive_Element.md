**Syntax:**

<timer-keep-alive>`true|`**`false`**</timer-keep-alive>

`[Default: false]`

It specifies whether to keep the session alive, when receiving the
`onTimer` event.

A session is considered as timeout (and then invalidated), if it doesn't
receive any client requests in the specified timeout interval (see [the
session-timeout
element](ZK_Configuration_Reference/zk.xml/The_session-config_Element/The_session-timeout_Element)
for more information).

By setting this option to true, the `onTimer` event, just like any other
events, will reset the session timeout counter (and then keep the
session alive until timeout). Notice that, if this option is true and
the timer is shorter than the session timeout, the session won't be
expired.

By default, if this option is false, it means the `onTimer` event is
ignored when handling the session timeout. In other words, the session
will expire if no other event is received before timeout.

Notice that ZK will optimize the `onTime` event such that it won't be
sent if there is no event listener at the server (for better
performance). In other words, the following statement won't fire any
`onTimer` event to the server.

``` xml
<timer repeats="true" running="true" delay="1000"/>
```

Thus, if you have to add an event listener to enable the
timer-keep-alive feature, such as

``` xml
<timer repeats="true" running="true" delay="1000" onTimer=""/>
```

## Websockets

When enabled, Websockets use a persistent connection, which does not
extend the HTTPSession when individual messages are sent. To keep the
session alive using a <timer>-element you can force the request to use
HTTP/AJAX with the following additional event options. This will keep
the HTTP session alive

``` xml
<timer repeats="true" running="true" delay="10000"
       xmlns:w="client"
       w:onTimer="event.opts.toServer=true; event.opts.forceAjax=true;" />
```

- w:onTimer - client-side on timer event (to customize event options)
- forceAjax - (force an HTTP request instead of a WebSocket message)
- toServer - send the event to the server (avoids having to add a
  server-side event listener)

## 5.0.6 and Earlier

For 5.0.6 and earlier, the above statement will cause the interpreter to
start and thus cause some performance penalty. However, for better
performance, you could use [a
composer](ZK_Developer's_Reference/MVC/Controller/Composer)
as follows.

``` xml
<timer repeats="true" running="true" delay="1000" apply="foo.DoesNothingTimer"/>
```

And, then implement `foo.DoesNothingTimer` as follows.

``` java
public class DoesNothingTimer implements Composer {
    public void doAfterCompose(Component comp) throws Exception {
        comp.addEventListener("onTimer", new SerializableEventListener() {
            public void onEvent(Event event) throws Exception {
                //does nothing
            }
        });
    }
}
```


