You could annotate a component or a property in Java by the use of
<javadoc method="addAnnotation(java.lang.String, java.lang.String, java.util.Map)" type="interface">org.zkoss.zk.ui.sys.ComponentCtrl</javadoc>.

For example,

``` java
Listbox listbox = new Listbox();
listbox.addAnnotation(null, "foo", null); //null in the first argument means to annotate listbox
Label label = new Label();
label.addAnnotation("value", "fun", null); //annotate the value property of label
```
