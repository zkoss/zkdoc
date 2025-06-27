You could annotate a component or a property in Java by the use of
[org.zkoss.zk.ui.sys.ComponentCtrl#addAnnotation(java.lang.String, java.lang.String, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/ComponentCtrl.html#addAnnotation(java.lang.String, java.lang.String, java.util.Map)).

For example,

```java
Listbox listbox = new Listbox();
listbox.addAnnotation(null, "foo", null); //null in the first argument means to annotate listbox
Label label = new Label();
label.addAnnotation("value", "fun", null); //annotate the value property of label
```
