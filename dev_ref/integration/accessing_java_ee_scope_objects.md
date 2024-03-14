# Executions

[org.zkoss.zk.ui.Executions](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html)

## getCurrent

\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#getCurrent>()
Executions.getCurrent()\]

Retrieves the current execution which contains HTTP request/response.

## get HttpServletRequest

``` java
HttpServletRequest req = (HttpServletRequest)Executions.getCurrent().getNativeRequest()
```

\[<https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#getNativeRequest>()
getNativeRequest()\]

# Sessions

[org.zkoss.zk.ui.Sessions](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Sessions.html)

## Get Current Session

\[<http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Sessions.html#getCurrent>()
Sessions.getCurrent()\]

Retrieves the current ZK-wrapped session.

## Get HttpSession

``` java
HttpSession nativeSession = (HttpSession) Sessions.getCurrent().getNativeSession();
```
