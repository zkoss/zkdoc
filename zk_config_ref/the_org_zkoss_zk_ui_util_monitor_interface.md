**Listener:**

`org.zkoss.zk.ui.util.Monitor`

A listener could implement
[org.zkoss.zk.ui.util.Monitor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Monitor.html) to
monitor the statuses of ZK. Unlike other listeners, there is at most one
monitor listener for each Web application. If you like, you can chain
them together manually.

ZK provides an implementation named
`org.zkoss.zk.ui.util.Statistic`, which accumulates the
statistic data in the memory. It is a good starting point to understand
the loading of your ZK application.

**Instantiation:** Unlike most other listeners, at most one monitor
instance is created in one application. In addition, it is shared, so
the implementation must be thread-safe.
