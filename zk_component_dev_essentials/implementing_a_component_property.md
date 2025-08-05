---
title: "Implementing a Component Property"
---

A property usually has a getter and a setter. The getter is
straightforward:

```java
private String _value = ""; //a data member
 
public String getValue() {
 return _value;
}
```

The setter is similar except we have to notify the client. This is
achieved by using the
[org.zkoss.zk.ui.AbstractComponent#smartUpdate(java.lang.String, java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/AbstractComponent.html#smartUpdate(java.lang.String, java.lang.Object))
function.

```java
public void setValue(String value) {
 if (!_value.equals(value)) {
  _value = value;
  smartUpdate("value", _value);
 }
}
```

The
[org.zkoss.zk.ui.AbstractComponent#smartUpdate(java.lang.String, java.lang.Object)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/AbstractComponent.html#smartUpdate(java.lang.String, java.lang.Object))
function causes ZK Client Engine to call the <mp>setValue</mp> method of
the peer widget (the first argument is the property name). Then, the
widget can manipulate the DOM tree from there.
