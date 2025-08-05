---
title: "Native"
---

`Name: native`  
`Namespace: `[`http://www.zkoss.org/2005/zk/native`](http://www.zkoss.org/2005/zk/native)  
`Namespace shortcut: native`  
`Java: `[`org.zkoss.zk.ui.metainfo.LanguageDefinition`#NATIVE_NAMESPACE](https://www.zkoss.org/javadoc/latest/zk/`org/zkoss/zk/ui/metainfo/LanguageDefinition`.html#NATIVE_NAMESPACE)

It is the reserved namespace for specifying native elements. A native
element represents a native tag at the client. For browsers, a native
element represents a HTML tag. Unlike the xhtml language, there is no
component associated with, so the performance is much better but you
cannot change it dynamically.

```xml
<n:table xmlns:n="native">
  <n:tr>
    <n:td>Username</n:td>
    <n:td><textbox/></n:td>
  </n:tr>
  <n:tr>
    <n:td>Password</n:td>
    <n:td><textbox type="password"/></n:td>
  </n:tr>
</n:table>
```

where `n:table`, `n:tr` and `n:td` are native, i.e., they are generated
directly to the client without creating a component for each of them.

Notice that ZK Loader assumes any element name with the native namespace
is correct and generated to the client directly. It is your job to make
sure there is no typo or other errors.


