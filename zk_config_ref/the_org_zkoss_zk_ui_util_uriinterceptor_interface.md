---
title: "The org.zkoss.zk.ui.util.URIInterceptor interface"
---

**Listener:**

`org.zkoss.zk.ui.util.URIInterceptor`

A listener could implement
[org.zkoss.zk.ui.util.URIInterceptor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/URIInterceptor.html)
to intercept the retrieval of ZUML pages with the associated URI. Once
registered, an instance of the specified class is created and shared
within the whole application. Then, the `request` method is invoked,
each time the application wants to retrieve the page definition of a
page based on an URI.

A typical use of this interface is to ensure the current user has the
authority to access certain URIs.

You can register any number of URI interceptors (`URIInterceptor`).

**Note:**

1.  Unlike `ExecutionInit` and many other listeners, an instance of the
    registered `URIInterceptor` is created at the time of registration,
    and then it is shared by the whole application. Thus, you have to
    make sure that it can be accessed concurrently.

**Instantiation:** For better performance, a single instance of the
given class is instantiated when registered. It is then shared in the
whole application. Thus, the implementation must be thread safe.
