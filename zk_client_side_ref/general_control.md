# If you're an application developer

Though optional, you could have the total control of the client's
functionality without the assistance of server-side code. Generally, you
don't need to do it. You don't need to know how ZK Client Engine and
client-side widgets communicate with the server. Their states are
synchronized automatically by ZK and components. However, you could
control it if necessary. It is the so-called Server-client fusion.

The rule of thumb that is you should handle most of, if not all, events
and manipulate UI at the server, since it is much more productive. Then,
you could improve the responsiveness and visual effects, and/or reduce
the server loading by handling them at the client, when it is
appropriate. Notice that JavaScript is readable by any user, so be
careful not to expose sensitive data or business logic when migrating
some code from server to client.

# If you're a component developer

This section provides more detailed information about client-side
programming, though it is written more for application developers. If
you're not familiar with ZK's component development, please refer to [ZK Component Development Essentials](/zk_component_dev_essentials/zk_component_overview) first.

In this section, we will discuss the details of the client-side control
and programming.
