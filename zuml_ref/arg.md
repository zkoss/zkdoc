# arg - java.util.Map

The `arg` argument passed to the `createComponents` method in the
[org.zkoss.zk.ui.Executions](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Executions.html) class. It might be `null`,
depending on how `createComponents` is called.

It is the same as self.desktop.execution.arg.

```java
params.put("name", "John");
Executions.createComponents("/my.zul", null, params);
```

Then, in my.zul,

```xml
<window title="${arg.name}">
```

Notice that `arg` is available only when creating the components for the
included page, say `my.zul`. On the other hand, all events, including
`onCreate`, are processed later. Thus, if you want to access `arg` in
the `onCreate`'s listener, use the `getArg` method of the
[org.zkoss.zk.ui.event.CreateEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/CreateEvent.html).


