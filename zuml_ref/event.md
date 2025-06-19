# event - [org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) or derived

The current event. It is available for the event listener only.

```xml
<textbox onChanging="react(event.value)" />
<combobox onChanging="autoComplete()" />
<zscript>
 void react(String value) {
 ...
 }
 void autoComplete() {
   String value = event.getValue();
 ...
 }
</zscript>
```


