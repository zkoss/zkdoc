**Listener:**

`org.zkoss.zk.ui.util.RequestInterceptor`

A listener could implement
[org.zkoss.zk.ui.util.RequestInterceptor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/RequestInterceptor.html)
to intercept each request made to the ZK Loader and ZK Update Engine.
Once registered, an instance of the specified class is created and
shared within the whole application. Then, the `request` method is
invoked, each time a request is received by the ZK Loader or ZK Update
Engine.

A typical use of this interface is to determine the locale and/or time
zone of the request. Please refer to [ZK Developer's Reference]({{site.baseurl}}/zk_dev_ref/internationalization/internationalization) for
the details of Internationalization.

You can register any number of the request interceptors
([org.zkoss.zk.ui.util.RequestInterceptor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/RequestInterceptor.html)).

**Note:**

1.  Unlike
    [org.zkoss.zk.ui.util.ExecutionInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ExecutionInit.html)
    and many other listeners, an instance of the registered
    `RequestInterceptor` is created at the time of registration, and
    then it is shared by the whole application. Thus, you have to make
    sure it can be accessed concurrently.
2.  The request parameters will be parsed with the proper locale and
    character encoding, after the
    [org.zkoss.zk.ui.util.RequestInterceptor#request(org.zkoss.zk.ui.Session, java.lang.Object, java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/RequestInterceptor.html#request(org.zkoss.zk.ui.Session, java.lang.Object, java.lang.Object))
    method is called. It is not recommended to call the `getParameter`
    or `getParameterValues` methods (of *javax.servlet.ServletRequest*)
    in this method.

**Instantiation:** For better performance, a single instance of the
given class is instantiated when registered. It is then shared in the
whole application. Thus, the implementation must be thread safe.
