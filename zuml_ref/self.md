# self - [org.zkoss.zk.ui.Component](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html)

The component itself. In other words, it is the closest component,
depicted as follows.

```xml
 <listbox>
   <zscript>self.getItems();</zscript><!-- self is listbox -->
   <listitem value="ab" label="${self.value}"/><!-- self is listitem -->
   <zscript>self.getSelectedIndex();</zscript><!-- self is listbox -->
 </listbox>
 
```


