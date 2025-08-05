---
title: "The package Element"
---

**Syntax:**
```xml
<package>  
    <package-name>a_JS_package_name</package-name>  
</package>
```

[Default: none]

It defines a client package (JavaScript) and all of its sub packages
that are provided by this server. Use this configuration if some client
packages might be loaded from different servers, such as
Ajax-as-a-Service.

For example, if this server provides the client packages for
`foo.fly.*`, then the following shall be specified to enable
Ajax-as-a-Service.

```xml
<client-config>
    <package>
        <package-name>foo.fly</package-name>
    </package>
</client-config>
```

- See Also
  - [Experiment on EAI, Mashup and Ajax-as-a-Service](http://blog.zkoss.org/index.php/2009/08/16/experiment-on-eai-mashup-and-ajax-as-a-service)


