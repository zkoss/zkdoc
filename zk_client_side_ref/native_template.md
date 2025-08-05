---
title: "native-template"
---

**Syntax:**

```xml
<native-template>  
    <native-class>a_class_represents_native</native-class>  
</native-template>
```

It specifies the class used to instantiate a native component. The
native component is used only when ZK Loader is rendering a ZUML
document. After rendering, multiple native components might be merged
into one, and it might be replaced by other component to save the memory
at the server.

Example,

```xml
<native-template>
    <native-class>org.zkoss.zk.ui.HtmlNativeComponent</native-class>
</native-template>
```

# native-class

`[Required]`

The class used to instantiate a natve component.


