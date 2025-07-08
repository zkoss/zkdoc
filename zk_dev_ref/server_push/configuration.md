

Since ZK 6, in addition to
[org.zkoss.zk.ui.impl.PollingServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/impl/PollingServerPush.html) and
[org.zkoss.zkex.ui.comet.CometServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/ui/comet/CometServerPush.html), ZK provides
a third Server Push implementation - Asynchronous Processing
[org.zkoss.zkmax.ui.comet.CometServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/comet/CometServerPush.html). As their
names suggest, they implement the Client-Polling, Comet (aka.,
long-polling) and Servlet 3 Comet ([Servlet 3 Asynchronous Processing-based Comet](http://books.zkoss.org/wiki/Small_Talks/2012/February/New_Features_of_ZK_6#ZK_Comet_supports_Servlet_3_Asynchronous_Processing))
server pushes. Client-polling is available in all editions, Comet Server
Push is available in ZK PE and EE, while ZK EE supports Servlet 3 Comet
Push.

The default implementation depends on which ZK edition you use:

| ZK Edition | Technology        | ZK Implementation                                           |
|------------|-------------------|-------------------------------------------------------------|
| CE         | Client Polling    | [org.zkoss.zk.ui.impl.PollingServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/impl/PollingServerPush.html)   |
| PE         | Comet Server Push | [org.zkoss.zkex.ui.comet.CometServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/ui/comet/CometServerPush.html)  |
| EE         | Servlet 3 Comet   | [org.zkoss.zkmax.ui.comet.CometServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/comet/CometServerPush.html) |

You can also configure ZK to use the one you prefer, or even use a
custom server push.

Note that Comet Server Push is available in ZK 5 EE only. By default, ZK
5 CE and ZK 5 PE use
[org.zkoss.zk.ui.impl.PollingServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/impl/PollingServerPush.html), and ZK 5 EE
uses [org.zkoss.zkmax.ui.comet.CometServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/ui/comet/CometServerPush.html).

# Choose an Implementation

Client-polling is based on a timer that peeks the server continuously to
see if any data is to be *pushed* to the client, while Comet establishes
a permanent connection for instant *push*. Client-polling will introduce
more traffic due to the continuous peeks, but Comet will consume the
network connections that a server allows.

## Page-level Configuration

You could configure a particular ZK page to use a particular
implementation by the use of
[org.zkoss.zk.ui.sys.DesktopCtrl#enableServerPush(org.zkoss.zk.ui.sys.ServerPush)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/DesktopCtrl.html#enableServerPush(org.zkoss.zk.ui.sys.ServerPush)).
For example,

```java
((DesktopCtrl)desktop).enableServerPush(
    new org.zkoss.zk.ui.impl.PollingServerPush(2000,5000,-1));
```

## Application-level Configuration

If you would like to change the default server push for the whole
application, you could use [the server-push-class element]({{site.baseurl}}/zk_config_ref/the_server-push-class_element)
as follows.

```xml
<device-config>
    <device-type>ajax</device-type>
    <server-push-class>org.zkoss.zk.ui.impl.PollingServerPush</server-push-class>
</device-config>
```

where you could specify any implementation that implements
[org.zkoss.zk.ui.sys.ServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/ServerPush.html).

# Client-Polling Configuration

The client-polling server push is implemented with an implicit timer at
the client. The interval of the timer depends on the loading of the
server. For example, the interval becomes longer if the time to get a
response has become longer.
[org.zkoss.zk.ui.impl.PollingServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/impl/PollingServerPush.html) uses a timer
to peek if the server has any data to *push* back. The period between
two peeks is determined by a few factors.

## PollingServerPush.delay.min

The minimal delay to send the second polling request (unit:
milliseconds).

`Default: 1000.`

## PollingServerPush.delay.max

The maximal delay to send the second polling request (unit:
milliseconds).

`Default: 15000.`

## PollingServerPush.delay.factor

- The delay factor. The real delay is the processing time multiplied by
  the delay factor. For example, if the last request took 1 second to
  process, then the client polling will be delayed for `1 x factor`
  seconds. Default: 5.
- The larger the factor, the longer the delay tends to be.

It could be configured in `WEB-INF/zk.xml` by use of [the preference element]({{site.baseurl}}/zk_config_ref/the_preference_element)
as follows.

```xml
<preference>
    <name>PollingServerPush.delay.min</name>
    <value>3000</value>
</preference>
<preference>
    <name>PollingServerPush.delay.max</name>
    <value>10000</value>
</preference>
<preference>
    <name>PollingServerPush.delay.factor</name>
    <value>5</value>
</preference>
<!-- JavaScript code to start the server push; rarely required
<preference>
    <name>PollingServerPush.start</name>
    <value></value>
</preference>
<preference>
    <name>PollingServerPush.stop</name>
    <value></value>
</preference>
-->
```

In additions, you could specify them in the constructor:
[org.zkoss.zk.ui.impl.PollingServerPush#PollingServerPush(int, int, int)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/impl/PollingServerPush.html#PollingServerPush(int, int, int)).
For example,

```java
((DesktopCtrl)desktop).enableServerPush(
    new org.zkoss.zk.ui.impl.PollingServerPush(2000,10000,3));
```

# Comet Server Push Config

The comet server push is implemented with a pre-established and
'virtual' permanent connection. It is like sending a taxi to the server,
and waiting in the server until there is data to send back. Meanwhile,
the client-polling server push is like sending a taxi periodically to
the server, and leaving immediately if no data is available.

[org.zkoss.zkex.ui.comet.CometServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/ui/comet/CometServerPush.html) comes with
its own configuration parameters such as retry delay, retry count, and
ajax timeout.

Configure these parameters by using [the preference element]({{site.baseurl}}/zk_config_ref/the_preference_element)
in your `WEB-INF/zk.xml` e.g.

```xml
<preference>
    <name>CometServerPush.retry.delay</name>
    <value>3000</value><!-- 3 seconds delay between each retry-->
</preference>
<preference>
    <name>CometServerPush.retry.count</name>
    <value>3</value><!-- 3 tries for each request -->
</preference>
<preference>
    <name>CometServerPush.ajax.timeout</name>
    <value>180000</value><!-- 3 minutes -->
</preference>
```

## CometServerPush.retry.delay

The minimum time delay to send the next comet request retry (unit:
milliseconds).

`Default: 5000.`

## CometServerPush.retry.count

The maximum retry counts if a comet request fails, -1 means keep retry
forever (unit: count).

`Default: 10.`

## CometServerPush.ajax.timeout

The amount of time a comet request will wait for a server response until
it aborts. (unit: milliseconds).

`Default: varies, `[`depending on browsers`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout)

# Error Handling

The configuration of the errors is handled by [the client-reload element]({{site.baseurl}}/zk_config_ref/the_error-reload_element),
specified in `WEB-INF/zk.xml`. The markup below demonstrates an example
of catching an error of the server push:

```xml
<error-reload>
    <device-type>ajax</device-type>
    <connection-type>server-push</connection-type>
    <error-code>410</error-code>
    <reload-uri>/login.zul</reload-uri>
</error-reload>
```

where the connection-type element specifies through which channel the
requests are sent. By default it is the AU channel in which Ajax
requests are sent by widgets running at the client. If you would like to
specify the error page for server-push then connection-type must be set
to `server-push`.

# "dummy" Requests

When using ServerPush the client engine will send "dummy"-requests
(without extra payload) to the /zkau servlet to pull queued server side
updates.

Those requests look similar to this:

`   dtid=z_m06&cmd_0=dummy&opt_0=i`

In the case of PollingServerPush there will be one of these requests per
configured interval, sometimes causing a firewall to give a false alert.

In the case of CometServerPush, after a long polling comet request is
returned, there will be one "dummy" request sent to retrieve server
update.

# WebSocketServerPush

Since ZK 8.5.0, the WebSocket based Server Push
[org.zkoss.zkmax.au.websocket.WebSocketServerPush](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/au/websocket/WebSocketServerPush.html) is
provided. When WebSocket connection is enabled, this will be used as
default, other configuration specifying which Server Push to use will be
ignored.

# Version History

| Version | Date     | Content                                                                                                        |
|---------|----------|----------------------------------------------------------------------------------------------------------------|
| 6.0.0   | Feb 2012 | The CometServerPush is available in ZK PE, while ZK EE supports Servlet 3 Asynchronous Processing-based Comet. |
