**Listener:**

`org.zkoss.zk.ui.util.EventInterceptor`

A listener could implement
[org.zkoss.zk.ui.util.EventInterceptor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/EventInterceptor.html)
to intercept when an event is sent, posted and processed.

Once registered, an instance is created and shared within the whole
application. If you want to intercept events only for a particular
desktop, use
<javadoc method="addListener(java.lang.Object)">org.zkoss.zk.ui.Desktop</javadoc>.

**Instantiation:** For better performance, a single instance of the
given class is instantiated when registered. It is then shared in the
whole application. Thus, the implementation must be thread safe.
