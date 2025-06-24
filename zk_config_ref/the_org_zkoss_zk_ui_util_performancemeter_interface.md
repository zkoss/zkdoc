**Listener:**

`org.zkoss.zk.ui.util.PerformanceMeter`

A listener could implement
[org.zkoss.zk.ui.util.PerformanceMeter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/PerformanceMeter.html)
to measure the performance. Unlike other listeners, there is at most one
performance meter listener for each Web application. If you like, you
can chain them together manually.

**Instantiation:** Unlike most other listeners, at most one monitor is
allowed in one application. In addition, it is shared, so the
implementation must be thread safe.
