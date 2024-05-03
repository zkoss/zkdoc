**Syntax:**

<max-process-time>*`a_number`*</max-process-time>

`[Default: 3000]`

It specifies the maximum allowed time to process events, in
milliseconds. It must be positive. ZK will keep processing the requests
until all requests are processed, or the maximum allowed time expires.

Notice that this setting has no effect on AU requests. Rather, it
controls the number of the requests caused by the client-polling server
push. In other words, if there are multiple pending server-push based on
the client-polling, ZK will handle them one-by-one until all are served
or the time expires.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
