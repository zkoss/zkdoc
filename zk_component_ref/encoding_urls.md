---
title: "Encoding URLs"
---



A XHTML component generates attributes directly to native HTML tags. It
means, unlike XUL, it doesn't prefix the servlet context path to
attributes for specifying URL. For example, the following codes will not
work (unless the servlet context is "").

```xml
 <img href="/my/good.png"/>
```

Instead, you should use the <mp>encodeURL</mp> function in EL
expressions as follows.

```xml
 <?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="p"?>
 ...
 <img href="${p:encodeURL('/my/good.png')}"/>
```

In Java, you should use the method,
[org.zkoss.zk.ui.Execution#encodeURL(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#encodeURL(java.lang.String)).

```xml
 <img id="another"/>
 <zscript>
   another.setDynamicAttribute("href",
     Executions.getCurrent().encodeURL("/my/good.png"));
 </zscript>
```

Notice that XUL components and all ZK features that accept a URL will
invoke the <mp>encodeURL</mp> method automatically. The reason why we do
not handle XHTML components is that we do not know which attribute
requires a URL.


