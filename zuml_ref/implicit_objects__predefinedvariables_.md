---
title: "Implicit Objects (Predefined Variables)"
description: "The complete list of ZK EL implicit objects (predefined variables) — self, execution, page, desktop, session, param, and the scope maps — with their types and usage."
---

EL expressions define a set of implicit objects (aka predefined variables) that
you can access directly in an EL expression, without declaring them. The table
below lists every implicit object with its type and purpose; click a name for
full details and examples.

| Variable | Type | Description |
|---|---|---|
| [applicationScope](/zuml_ref/applicationscope) | `java.util.Map` | Custom attributes shared across the whole web application (WAR); same as [WebApp.getAttributes](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WebApp.html#getAttributes--). |
| [arg](/zuml_ref/arg) | `java.util.Map` | The `arg` map passed to `Executions.createComponents`; available only while creating the included page. |
| [componentScope](/zuml_ref/componentscope) | `java.util.Map` | Custom attributes of the current component ([Component.getAttributes](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html)). |
| [cookie](/zuml_ref/cookie) | `java.util.Map` | The request's cookies, as a `(String, Cookie)` map. |
| [desktop](/zuml_ref/desktop) | [Desktop](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Desktop.html) | The current desktop; same as `self.desktop`. |
| [desktopScope](/zuml_ref/desktopscope) | `java.util.Map` | Custom attributes of the desktop; used to communicate among pages in the same desktop. |
| [each](/zuml_ref/each) | `java.lang.Object` | The current item while iterating an element that has the `forEach` attribute. |
| [event](/zuml_ref/event) | [Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) | The current event; available inside an event listener only. |
| [execution](/zuml_ref/execution) | [Execution](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html) | The current execution. |
| [header](/zuml_ref/header) | `java.util.Map` | The request's headers, as a `(String, String)` map. |
| [headerValues](/zuml_ref/headervalues) | `java.util.Map` | The request's headers, as a `(String, String[])` map. |
| [forEachStatus](/zuml_ref/foreachstatus) | [ForEachStatus](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ForEachStatus.html) | The status of the current `forEach` iteration (index, previous, current). |
| [labels](/zuml_ref/labels) | `java.util.Map` | All internationalization labels belonging to the current locale. |
| [page](/zuml_ref/page) | [Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html) | The current page. |
| [pageContext](/zuml_ref/pagecontext) | [PageContext](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/servlet/xel/PageContext.html) | The current page context (request, response, variable resolver, and so on). |
| [pageScope](/zuml_ref/pagescope) | `java.util.Map` | Custom attributes of the current page ([Page.getAttributes](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html)). |
| [param](/zuml_ref/param) | `java.util.Map` | The request parameters as a `(String, String)` map (first value of each). |
| [paramValues](/zuml_ref/paramvalues) | `java.util.Map` | The request parameters as a `(String, String[])` map (all values). |
| [requestScope](/zuml_ref/requestscope) | `java.util.Map` | Custom attributes of the current execution ([Execution.getAttributes](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html)). |
| [self](/zuml_ref/self) | [Component](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html) | The component itself (the closest component). |
| [session](/zuml_ref/session) | [Session](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Session.html) | The current session (encapsulates the HTTP session). |
| [sessionScope](/zuml_ref/sessionscope) | `java.util.Map` | Custom attributes of the session ([Session.getAttributes](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Session.html)). |
| [spaceOwner](/zuml_ref/spaceowner) | [IdSpace](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/IdSpace.html) | The space owner of this component; same as `self.spaceOwner`. |
| [spaceScope](/zuml_ref/spacescope) | `java.util.Map` | Custom attributes of the ID space containing this component. |
| [zk](/zuml_ref/zk) | `java.util.Map` | Browser and system information, e.g. `${zk.chrome}` returns the Chrome version. |
