

`Since 1.1.0`

[ Echo event]({{site.baseurl}}/zk_dev_ref/ui_patterns/use_echo_events)
is used to implement long operations. When you send an echo event, the
event won't be processed in the current execution. Rather, it is
processed in the next AU request sent (echoed back) from the client. In
this new release, Mimic `Client` are now capable of simulating an echo
event. By default (`IMMEDIATE`), Mimic `Client` sends the echoed AU
request immediately after receiving an echo event. In `PIGGYBACK` mode,
Mimic `Client` will then send custom events back to server together with
the next AU request instead of sending it back immediately.

```java
public enum EchoEventMode {

    /** immediately reply custom events back to server when receiving echo events    */
    IMMEDIATE,

    /** reply custom events back to server when next AU event posting */
    PIGGYBACK
}
```

- Line 4: The default mode.

However, you can change the default mode by the method
[org.zkoss.zats.mimic.Client#setEchoEventMode(org.zkoss.zats.mimic.EchoEventMode)](https://www.zkoss.org/javadoc/latest/zats/org/zkoss/zats/mimic/Client.html#setEchoEventMode(org.zkoss.zats.mimic.EchoEventMode))

 
