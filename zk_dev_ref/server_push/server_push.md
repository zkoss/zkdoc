---
title: "Server Push"
---

HTTP is a request-and-response protocol. Technically, there is no way to
have the server to actively *push* data to the client. However, there
are [a few approaches](http://en.wikipedia.org/wiki/Push_technology) to
emulate *push* -- it is also called Ajax Push. We can summarize these
approaches in 2 categories:

1.  client polling and
2.  comet (more precisely, it is the so-called long polling)

They are both supported in ZK.

Different approaches have different pros and cons, and we will discuss
them in the
[Configuration]({{site.baseurl}}/zk_dev_ref/server_push/configuration)
section.

No matter which implementation you choose, the usage is the same. The
[Event Queue]({{site.baseurl}}/zk_dev_ref/server_push/event_queues) is
the high-level API, and this is a suggested approach for its simplicity.
However, if you prefer to access the low-level API directly, you could
refer to the [Asynchronous Tasks]({{site.baseurl}}/zk_dev_ref/server_push/asynchronous_tasks)
and [Synchronous Tasks]({{site.baseurl}}/zk_dev_ref/server_push/synchronous_tasks)
sections, depending on whether your task can be executed asynchronously.

# Browser Concurrent Connection Limitation

The Comet server push (except polling) establishes an open connection, long polling.
Modern web browsers typically impose a limitation on the number of
simultaneous HTTP/1.1 connections that can be established with a single
domain. According to the HTTP specification outlined in RFC2616, this
constraint is commonly set to a maximum of **6** concurrent connections per domain.

See [Browser connection limitations](https://docs.diffusiondata.com/cloud/latest/manual/html/designguide/solution/support/connection_limitations.html).

If you use HTTP/2, there is no connection limitation as it uses a single multiplexed connection for all requests.
