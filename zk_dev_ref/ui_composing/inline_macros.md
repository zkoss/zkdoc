

# Overview

An inline macro is a special macro component which behaves like
*inline-expansion*. Unlike a regular macro component, ZK does not create
a macro component. Rather, it inline-expands the components defined in
the macro URI, as if the content of the in-line macro's template is
entered directly into the target page.

# Declare an Inline Macro

To declare an inline macro, we have to specify `inline="true"` in the
component directive, while the definition and the use of an inline macro
are the same as the regular macro components (i.e., non-inline).

For example, suppose we have a macro definition (aka., template) as
follows:

```xml
<!-- username.zul: (macro definition) -->
<row>
    Username
    <textbox id="${arg.id}" value="${arg.name}"/>
</row>
```

We can declare it as an inline macro as follows:

```xml
<!-- target page -->
<?component name="username" inline="true" macroURI="username.zul"?>
<grid>
    <rows>
        <username id="ua" name="John"/>
    </rows>
</grid>
```

Then, it is equivalent to:

```xml
<grid>
    <rows>
        <row>
            Username
            <textbox id="ua" value="John"/>
        </row>
    </rows>
</grid>
```

Notice that all the properties, including `id`, are passed to the inline
macro too.

# Inline versus Regular Macro

As described above, an inline macro is expanded inline when it is used
as if they are entered directly. On the other hand, ZK will create a
component (an instance of
[org.zkoss.zk.ui.HtmlMacroComponent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/HtmlMacroComponent.html) or deriving) to
represent the regular macro. That is, the macro component is created as
the parent of the components that are defined in the template.

Inline macros are easier to integrate into sophisticated pages. For
example, you *cannot* use *regular* macro components in the previous
example since `rows` accepts only `row` as children, not macro
components. It is also easier to access all components defined in a
macro since they are expanded inline. However, it also means that the
developers must take care of `id` themselves. In addition, there is no
way to instantiate inline macros in pure Java (rather,
[org.zkoss.zk.ui.Execution#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#createComponents(java.lang.String, org.zkoss.zk.ui.Component, java.util.Map))
shall be used)[^1].

On the other hand, regular macros allow the component developers to
provide a custom Java class to represent the component so a better
abstraction and addition functionality can be implemented. We will
discuss it more in the [following section]({{site.baseurl}}/zk_dev_ref/ui_composing/implement_custom_java_class).


## arg.includer

Unlike regular macros, `arg.includer` for an inline macro is the parent
component of the macro (after all, the inline macro does not really
exist).

# An Example

`inline.zul`: (the macro definition)

```xml
<row>
    <textbox value="${arg.col1}"/>
    <textbox value="${arg.col2}"/>
</row>
```

`useinline.zul`: (the target page)

```xml
<?component name="myrow" macroURI="inline.zul" inline="true"?>
<window title="Test of inline macros" border="normal">
    <zscript><![CDATA[
        import  org.zkoss.util.Pair;
        List  infos = new LinkedList();
        for(int j = 0; j <10; ++j){
            infos.add(new Pair("A" + j, "B" +j));
        }
    ]]>
    </zscript>
    <grid>
        <rows>
            <myrow col1="${each.x}" col2="${each.y}" forEach="${infos}"/>
        </rows>
    </grid>
</window>
```

[^1]: ZK Loader does create a component for an inline macro when
    rendering, and then drop it after *expanding* into the parent
    component. Technically, an application can do the same thing but it
    is not recommended since we might change it in the future.
