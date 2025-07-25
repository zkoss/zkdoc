

To improve the performance of an Ajax application, it is better to
monitor the performance for identifying the bottleneck. Depending on the
information you'd like to know, there are a few approaches.

- [org.zkoss.zk.ui.util.PerformanceMeter](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/PerformanceMeter.html):
  Monitoring the performance from the network speed, server-processing
  time and the client-rendering time.
- [org.zkoss.zk.ui.util.EventInterceptor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/EventInterceptor.html):
  Monitoring the performance of each event listener.
- [org.zkoss.zk.ui.util.Monitor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Monitor.html):
  Monitoring the number of desktops, sessions and other system load.
- There are a lot of performance monitor tools, such as
  [VisualVM](https://visualvm.github.io/) and
  [JProfiler](http://www.ej-technologies.com/products/jprofiler/overview.html).
  They can provide more insightful view of your application.

For sample implementations, you might take a look at the following
articles:

- [Performance Monitoring of ZK Applicaiton](https://www.zkoss.org/wiki/Small_Talks/2009/June/Performance_Monitoring_of_ZK_Applicaiton)
- [A ZK Performance Monitor](https://www.zkoss.org/wiki/Small_Talks/2010/January/A_ZK_Performance_Monitor)
- [Real-time Performance Monitoring of Ajax Event Handlers](https://www.zkoss.org/wiki/Small_Talks/2010/April/Real-time_Performance_Monitoring_of_Ajax_Event_Handlers)
