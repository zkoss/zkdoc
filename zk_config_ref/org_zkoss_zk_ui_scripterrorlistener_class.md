---
title: "org.zkoss.zk.ui.ScriptErrorListener.class"
---

**Property:** org.zkoss.zk.ui.ScriptErrorListener.class

Default:  `org.zkoss.zk.ui.script.DefaultScriptErrorListener`

The default one will log the error message starting with:

` Clients.evalJavascript error! message: ... , stack:...`

Specify a fully qualified class name of your custom listener. We suggest
you to extend the default one.

Put empty string as value to disable the default listener.

```xml
 <library-property>
   <name>org.zkoss.ui.script.ScriptErrorListener.class</name>
   <value></value>
 </library-property>
```
