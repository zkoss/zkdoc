## Component

**Syntax**

`<zk:component name="`*`componentName`*`" [class="`*`myPackage.myClass`*`"]`  
`    [extends="`*`existentJavaClassName`*`"] [moldName="`*`myMoldName`*`"] [moldURI="`*`myMoldURI`*`"]`  
`    [`*`prop1`*`="`*`value1`*`"] [`*`prop2`*`="`*`value2`*`"].../>`

It defines a new kind of component tag, which could be used in the JSP
document. If the class attribute is declared, the class must implement
[org.zkoss.zk.ui.Component](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html).

## Inline Macro Definition

**Syntax**

`<zk:component name="`*`componentName`*`" macroURI="`*`/mypath/my.zul`*`" inline="true"`  
` [`*`prop1`*`="`*`value1`*`"] [`*`prop2`*`="`*`value2`*`"].../>`

By specifying `inline="true"`, we could define an inline macro which
will inline-expends the macro template (specified in macroURI) when it
is used. In other words, it works as if you copy the content from the
template directly to the target document.

# Use New Defined Components

Due to the limitation of JSP, we cannot declare a new JSP tag
dynamically. In other words, we can not specify the name of the new
defined component directly. Thus, we introduce a special tag called `ui`
that has a special attribute called `tag` to allow us to specify the
component's name. For example:

```xml
<zk:component name="username" inline="true" macroURI="/macro/username.zul">
...
<zk:page>
  <zk:ui tag="username" who="ZK User"/>
    
</zk:page>
```

As shown, the `tag` attribute specifies the name of the component
defined in this JSP document.

