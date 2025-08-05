---
title: "The org.zkoss.zk.ui.util.UiLifeCycle interface"
---

**Listener:**

`org.zkoss.zk.ui.util.UiLifeCycle`

A listener could implement
[org.zkoss.zk.ui.util.UiLifeCycle](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/UiLifeCycle.html) to
handle something depending on the life cycle of UI, such as attaching a
component to a page, moving a component and so on.

**Instantiation:** For better performance, a single instance of the
given class is instantiated when registered. It is then shared in the
whole application. Thus, the implementation must be thread safe.
