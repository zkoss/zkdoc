---
title: "The org.zkoss.zk.ui.util.SessionInit interface"
---

**Listener:**

`org.zkoss.zk.ui.util.SessionInit`

A listener could implement
[org.zkoss.zk.ui.util.SessionInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/SessionInit.html) to
initialize a session that is being created.

When ZK Loader is going to create a session, it invokes the `init`
method of this interface such that developers could plug the
application-specific codes to initialize a session when it is created.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
