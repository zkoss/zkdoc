# self - <javadoc type="interface">org.zkoss.zk.ui.Component</javadoc>

The component itself. In other words, it is the closest component,
depicted as follows.

```xml
 <listbox>
   <zscript>self.getItems();</zscript><!-- self is listbox -->
   <listitem value="ab" label="${self.value}"/><!-- self is listitem -->
   <zscript>self.getSelectedIndex();</zscript><!-- self is listbox -->
 </listbox>
 
```


