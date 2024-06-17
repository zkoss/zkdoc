\_\_TOC\_\_

# Overview

As described in the earlier sections, a macro component is instantiated
to represent a regular macro. By default,
<javadoc>org.zkoss.zk.ui.HtmlMacroComponent</javadoc> is assumed (and
instantiated). However, you can also provide a custom Java class to
provide a better API to simplify the access and to encapsulate the
implementation.

# Implement Custom Java Class for Macro

The implementation is straightforward. First, the custom Java class for
macro components must extend from
<javadoc>org.zkoss.zk.ui.HtmlMacroComponent</javadoc>. Second, though
optional, it is suggested to invoke
<javadoc method="compose()">org.zkoss.zk.ui.HtmlMacroComponent</javadoc>
in the constructor[^1][^2], such that the template and the wiring of the
data members will be applied in the constructor.

For example, suppose we have a macro template as follows.

``` xml
<hlayout id="mc_layout">
    Username: <textbox id="mc_who"/>
</hlayout>
```

Then, we could implement a Java class for it:

``` java
package foo;

import org.zkoss.zk.ui.select.annotation.*;
import org.zkoss.zk.ui.HtmlMacroComponent;
import org.zkoss.zul.Textbox;

@VariableResolver(org.zkoss.zkplus.spring.DelegatingVariableResolver)
public class Username extends HtmlMacroComponent {
    @WireVariable
    private User currentUser; //will be wired if currentUser is a Spring-managed bean, when compose() is called
    @Wire
    private Textbox mc_who; //will be wired when compose() is called
    public Username() {
        compose(); //for the template to be applied, and to wire members automatically
    }
    public String getWho() {
        return mc_who.getValue();
    }
    public void setWho(String who) {
        mc_who.setValue(who);
    }
    @Listen("onClick=#submit")
    public void submit() { //will be wired when compose() is called.
    }
}
```

As shown,
<javadoc method="compose()">org.zkoss.zk.ui.HtmlMacroComponent</javadoc>
will wire variables, components and event listeners automatically, so we
could access them directly (such as the `mc_who` member). For more
information, please refer to [the Wire Components
section](ZK_Developer's_Reference/MVC/Controller/Wire_Components),
[the Wire Variables
section](ZK_Developer's_Reference/MVC/Controller/Wire_Variables)
and [Wire Event
Listeners](ZK_Developer's_Reference/MVC/Controller/Wire_Event_Listeners)
sections.

Also notice that the `arg` variable is still available to the template
so as to represent properties set by
<javadoc method="setDynamicProperty(java.lang.String, java.lang.Object)">org.zkoss.zk.ui.ext.DynamicPropertied</javadoc>,
though it is more useful if a custom implementation is provided.

> ------------------------------------------------------------------------
>
> <references/>

# Declare Macro with Custom Java Class

To make ZK Loader know which custom Java class to use, we have to
specify the `class` attribute when declaring it in the [component
directives](ZUML_Reference/ZUML/Processing_Instructions/component).
For example,

``` xml
<?component name="username" macroURI="/WEB-INF/macros/username.zul"
   class="foo.Username"?>
```

# Use Macro with Custom Java Class

## In ZUML

The use of the macro component with a custom Java class in a ZUML page
is the same as other macro components.

## In Java

The main purpose of introducing a custom Java class is to simplify the
use of a macro component in Java. For example, you could invoke a more
meaningful setter, say, setWho, directly rather than
<javadoc method="setDynamicProperty(java.lang.String, java.lang.Object)">org.zkoss.zk.ui.ext.DynamicPropertied</javadoc>.
In addition, the instantiation could be as simple as follows:

``` Java
Username ua = new Username();
ua.setParent(wnd);
ua.setWho("Joe");
```

# Macro Component and ID Space

Like <javadoc>org.zkoss.zul.Window</javadoc>,
<javadoc>org.zkoss.zk.ui.HtmlMacroComponent</javadoc> also implements
<javadoc>org.zkoss.zk.ui.IdSpace</javadoc>. It means that a macro
component (excluding inline macros) is a space owner. In other words, it
is free to use whatever identifiers to identify components inside the
template.

For example, assume we have a macro defined as follows.

``` xml
<hlayout>
    Username: <textbox id="who" value="${arg.who}"/>
</hlayout>
```

Then, the following codes work correctly.

``` xml
<?component name="username" macroURI="/WEB-INF/macros/username.zul"?>
<zk>
    <username/>
    <button id="who"/> <!-- no conflict because it is in a different ID space -->
</zk>
```

However, the following codes *do not* work.

``` xml
<?component name="username" macroURI="/WEB-INF/macros/username.zul"?>
<username id="who"/>
```

Why? Like any ID space owner, the macro component itself is in the same
ID space as its child components. There are two alternative solutions:

1\. Use a special prefix for the identifiers of child components of a
macro component. For example, `"mc_who"` instead of `"who"`.

``` xml
<hlayout>
    Username: <textbox id="mc_who" value="${arg.who}"/>
</hlayout>
```

2\. Use the `window` component to create an additional ID space.

``` xml
<window>
    <hlayout>
        Username: <textbox id="who" value="${arg.who}"/>
    </hlayout>
</window>
```

The first solution is suggested, if applicable, due to the simplicity.

# Manipulate component inside macro component

As the code described above, the component is wired and composed in a
constructor. Thus, you can append wired components or remove wired
components in a setProperty method.

For example,

``` java
package foo;

import org.zkoss.zk.ui.select.annotation.*;
import org.zkoss.zk.ui.HtmlMacroComponent;
import org.zkoss.zul.Textbox;

@VariableResolver(org.zkoss.zkplus.spring.DelegatingVariableResolver)
public class Username extends HtmlMacroComponent {
    @WireVariable
    private User currentUser; //will be wired if currentUser is a Spring-managed bean, when compose() is called

    //Wire existing components
    @Wire
    private Textbox mc_who;
    @Wire
    private Hlayout mc_layout;
    public Username() {
        compose(); //for the template to be applied, and to wire members automatically
    }
    public String getGender() {
        return currentUser.getGender();
    }
    public void setGender(String gender) {
        // append another textbox to hlayout
        Textbox genderTbx = new Textbox();
        genderTbx.setValue(gender);
        genderTbx.setParent(mc_layout);
    }
}
```

Also, you can add a forward event to the newly added component and
forward the event to a macro component.

``` java
public class Username extends HtmlMacroComponent {
    // omitted

    @Wire
    private Hlayout mc_layout;
    public void setGender(String gender) {
        Textbox genderTbx = new Textbox();
        genderTbx.setValue(gender);
        genderTbx.setParent(mc_layout);
        // listen onChange event to the textbox and forward to macro component
        genderTbx.addForward(Events.ON_CHANGE, this, "onGenderChange", genderTbx.getValue());
    }
}
```

Then use the forward event to communicate with other components.

``` xml
<?component name="username" macroURI="/WEB-INF/macros/username.zul" class="foo.Username"?>
<window apply="org.zkoss.bind.BindComposer" viewModel="@id('vm') @init('foo.MacroVM')">
    <username who="John" label="Username" gender="@load(vm.gender)" onGenderChange="@command('changeGender')" />
</window>
```

# Version History

| Version | Date          | Content                                                                                  |
|---------|---------------|------------------------------------------------------------------------------------------|
| 5.0.5   | October, 2010 | <javadoc method="compose()">org.zkoss.zk.ui.HtmlMacroComponent</javadoc> was introduced. |

[^1]: By default,
    <javadoc method="compose()">org.zkoss.zk.ui.HtmlMacroComponent</javadoc>
    is invoked when
    <javadoc method="afterCompose()">org.zkoss.zk.ui.HtmlMacroComponent</javadoc>
    is called. In many cases, it is generally too late, so we suggest to
    invoke it in the constructor.

[^2]: <javadoc method="compose()">org.zkoss.zk.ui.HtmlMacroComponent</javadoc>
    is introduced in 5.0.5. For 5.0.4 or earlier, please invoke
    <javadoc method="afterCompose()">org.zkoss.zk.ui.HtmlMacroComponent</javadoc>
    instead.
