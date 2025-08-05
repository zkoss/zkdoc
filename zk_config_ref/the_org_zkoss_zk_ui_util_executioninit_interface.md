---
title: "The org.zkoss.zk.ui.util.ExecutionInit interface"
---

**Listener:**

`org.zkoss.zk.ui.util.ExecutionInit`

A listener could implement
[org.zkoss.zk.ui.util.ExecutionInit](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ExecutionInit.html)
to initialize a new execution.

When the ZK Loader and Update Engine created a new execution, it invokes
the `init` method of this interface such that developers could plug the
application-specific codes to initialize an execution.

**Tip**: Executions might be stacked. To know whether it is the first
execution since a (Servlet) request is processed, you can check whether
the `parent` argument is `null`.

A developer can prevent an execution from being created by throwing an
exception in the `init` method.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
