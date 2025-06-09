# Accessing Java EE Scope Objects

This section describes how to access Java EE scope objects (like HttpServletRequest and HttpSession) from ZK applications. These objects are essential for interacting with the underlying Java EE environment and accessing request/response data, session attributes, and other web container features.

These utilities provide a bridge between ZK's component-based architecture and the standard Java EE web environment.

# Executions

[org.zkoss.zk.ui.Executions](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html)

## getCurrent
[Executions.getCurrent()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html#getCurrent)

Retrieves the current execution which contains HTTP request/response.

## get HttpServletRequest

`Executions.getCurrent()`

Retrieves the current execution which contains HTTP request/response.

## get HttpServletRequest

``` java
HttpServletRequest req = (HttpServletRequest)Executions.getCurrent().getNativeRequest();
```

[getNativeRequest()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#getNativeRequest)

# Sessions

[org.zkoss.zk.ui.Sessions](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Sessions.html)

## Get Current Session

[Sessions.getCurrent()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Sessions.html#getCurrent)

Retrieves the current ZK-wrapped session.

## Get HttpSession

``` java
HttpSession nativeSession = (HttpSession) Sessions.getCurrent().getNativeSession();
```
