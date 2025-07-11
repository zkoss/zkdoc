# In Zscript

The simplest way to respond to a user's clicking is to define an event
listener method and register it in the `onClick` attribute. We can define
an event listener in Java inside a `<zscript>` and those codes
will be interpreted when a zul file is loaded. This element also allows
other scripting languages such as JavaScript, Ruby, or Groovy.
`<zscript>` is very suitable for **fast prototyping**, and it's interpreted when a zul page is created. So after you modify the code inside, you can reload your browser to see the changed result without re-deployment. But it has issues in performance and clustering
environment, **we don't recommend to use it in production environment**.

We can declare variables and write statements in `<zscript>`. ZK will run it when loading a zul.

**sidebar-zscript.zul**
```xml
<grid hflex="1" vflex="1" sclass="sidebar">
    <zscript><![CDATA[
        //zscript code, it runs on server side, use it for fast prototyping
        java.util.Map sites = new java.util.HashMap();

        sites.put("zk","http://www.zkoss.org/");
        sites.put("demo","http://www.zkoss.org/zkdemo");
        sites.put("devref","http://books.zkoss.org/wiki/ZK_Developer's_Reference");
    ]]></zscript>
...
```
-   Line 2: It's better to enclose your code with `<![CDATA[ ]]>`.

## Implement an event listener

**sidebar-zscript.zul**
```xml
<grid hflex="1" vflex="1" sclass="sidebar">
    <zscript><![CDATA[
        ...

        void redirect(String name){
            String loc = sites.get(name);
            if(loc!=null){
                execution.sendRedirect(loc);
            }
        }
    ]]></zscript>
...
```

-   Line 5: Define an event listener method like a normal Java method, and it redirects a browser according to the passed variable.
-   Line 8: The [execution](/zuml_ref/implicit_objects__predefinedvariables_)
    is a implicit variable which you can use it directly without
    declaration. It's a wrapper object of `HttpServletRequest`.


## Register event listeners at "onClick"
After defining the event listener, we should specify it in a `<row>`'s
event attribute `onClick` because we want to invoke the event listener
when clicking a `<row>`.

**sidebar-zscript.zul**
```xml
<grid>
    ...
    <rows>
        <row sclass="sidebar-fn" onClick='redirect("zk")'>
            <image src="/imgs/site.png"/> ZK
        </row>
        <row sclass="sidebar-fn" onClick='redirect("demo")'>
            <image src="/imgs/demo.png"/> ZK Demo
        </row>
        <row sclass="sidebar-fn" onClick='redirect("devref")'>
            <image src="/imgs/doc.png"/> ZK Developer Reference
        </row>
    </rows>
</grid>
```

Now when you click a `<row>` in the sidebar, your browser will
be redirected to the corresponding site.

This approach is very simple and fast, so it is especially suitable for
building a prototype. However, if you need a better architecture for
your application, you had better not use `<zscript>`.
