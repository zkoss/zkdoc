# Custom Controller

A custom controller is called a composer in ZK. To implement it, you can
simply extend
<javadoc>org.zkoss.zk.ui.select.SelectorComposer</javadoc>. Then,
specify it in the UI element that it wants to handle in a ZUML document.

A composer usually does, but not limited to:

- Load data to components, if necessary.
- Handle events and manipulate components accordingly, if necessary.
- Provide the data, if necessary.

In addition, a composer can be used to involve the lifecycle of ZK
Loader for doing:

- Exception handling
- Component instantiation monitoring and filtering

A composer can be [configured as a system-level
composer](ZK_Configuration_Reference/zk.xml/The_listener_Element/The_org.zkoss.zk.ui.util.Composer_interface),
such that it will be called each time a ZUML document is loaded.

## Implement Composers

To simplify the implementation of the controller part of UI, ZK provides
several skeleton implementations. For example,
<javadoc>org.zkoss.zk.ui.select.SelectorComposer</javadoc>, as one of
the most popular skeletons, wires components, variables and event
listeners automatically based on Java annotations you specify. For
example, in the following controller and zul,

Controller:

``` java
package foo;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zk.ui.select.annotation.Listen;
import org.zkoss.zul.*;

public class MyComposer extends SelectorComposer<Window> {

    @Wire
    Textbox input;
    @Wire
    Label output;
    
    @Listen("onClick=#ok")
    public void submit() {
        output.setValue(input.getValue());
    }
    @Listen("onClick=#cancel")
    public void cancel() {
        output.setValue("");
    }
    
}
```

- Line: 9-12: The member fields `input`, `output` are automatically
  assigned with components with identifiers of "input" and "output",
  respectively.
- Line 14-21: The methods `submit()` and `cancel()` will be called when
  user clicks on the corresponding buttons.

ZUL:

``` XML
<window apply="foo.MyComposer">
    <div>
        Input: <textbox id="input" />
    </div>
    <div>
        Output: <label id="output" />
    </div>
    <button id="ok" label="Submit" />
    <button id="cancel" label="Clear" />
</window>
```

In addition to wiring components via identifiers, you could wire by a
CSS3-like selector (<javadoc>org.zkoss.zk.ui.select.Selector</javadoc>),
such as

- `@Wire("#foo")`
- `@Wire("textbox, intbox, decimalbox, datebox")`
- `@Wire("window > div > button")`

<!-- -->

- `@Listen("onClick = button[label='Clear']")`

For more information, please refer to the following sections: [Wire
Components](ZK_Developer's_Reference/MVC/Controller/Wire_Components),
[Wire
Variables](ZK_Developer's_Reference/MVC/Controller/Wire_Variables)
and [Wire Event
Listeners](ZK_Developer's_Reference/MVC/Controller/Wire_Event_Listeners).

## Apply Composers

Once a composer is implemented, you usually associate it with a
component, so that the composer can control the associated components
and its child components.

Associating a composer to a component is straightforward: just specify
the class to [the apply
attribute](ZUML_Reference/ZUML/Attributes/apply) of the XML
element you want to control. For example,

``` xml
<grid apply="foo.MyComposer">
    <rows>
        <row>
            <textbox id="input"/>
            <button label="Submit" id="submit"/>
            <button label="Reset" id="reset"/>
        </row>
    </rows>
</grid>
```

### Applying Multiple Composers

You could specify multiple composers; just separate them with commas.
They will be called from left to right.

``` xml
<div apply="foo.Composer1, foo2.Composer2">
```

### Apply Composer Instances

In addition to the class name, you could specify an instance too. For
example, suppose you have an instance called `fooComposer`, then

``` xml
<grid apply="${fooComposer}">
```

If a class name is specified, each time the component is instantiated,
an instance of the specified composer class is instantiated too. Thus,
you don't have to worry about the concurrency issue. However, if you
specify an instance, it will be used directly. Thus, you have to either
create an instance for each request, or make it thread-safe.

## Retrieve Composer in EL Expressions

If you have to retrieve the composer back later (such as reference it in
an EL expression), you can store the composer into a component's
attribute[^1].

If the composer extends from one of ZK skeletal implementations (such as
<javadoc>org.zkoss.zk.ui.select.SelectorComposer</javadoc> and
<javadoc>org.zkoss.zk.ui.util.GenericForwardComposer</javadoc>), it will
be stored into an attribute automatically. Thus, for the sake of
convenience, you could extend from one of these classes, if you'd like
to retrieve the composer back.

Every ZK skeletal implementation provides several ways to name the
composer as described in the following sections.

> ------------------------------------------------------------------------
>
> <references/>

### Default Names of Composer

If a composer extends from one of ZK skeletal implementations (such as
<javadoc>org.zkoss.zk.ui.select.SelectorComposer</javadoc> and
<javadoc>org.zkoss.zk.ui.util.GenericForwardComposer</javadoc>), the
composer is stored in three component attributes called:

- `$composer`
- *`id`*`$composer`
- *`id`*`$`*`ClassName`*, where *id* is the component's ID, and
  *ClassName* is the class name of the composer. If ID is not assigned,
  it defaults to an empty string, so the composer will be stored to two
  component attributes: `$composer` and `$`*`ClassName`*.

Therefore, you can access the composer with one of the above variables
e.g.

``` xml
<window id="mywin" apply="MyComposer">
     <textbox value="${mywin$composer.title}"/>
     <textbox value="${$composer.title}"/> <!- also refer to MyComposer -->
 </window>
```

Notice that `$composer` is always assigned no matter what the ID is, so
it is more convenient to use. However, if there are several components
assigned with composers, you might have to use ID to distinguish them.

The second name (*`id`*`$`*`ClassName`*) is useful, if there are
multiple composers applied.

``` xml
<window apply="foo.Handle1, foo.Handle2">
    <textbox value="${$Handle1.title}"/>
    <textbox value="${$Handle2.name}"/>
 </window>
```

### Specify Name for Composer

If you prefer to name the composer by yourself, you could specify the
name in a component attribute called `composerName`. For example,

``` xml
<window apply="MyComposer">
    <custom-attributes composerName="mc"/> <!-- name the composer as mc -->

    <textbox value="${mc.title}"/>
 </window>
```

## Prepare Data for EL Expressions in Composer

It is a common practice to prepare some data in a composer, such that
those data are available when rendering the child components. As
described above, the composer will be stored as a component attribute
that is accessible directly in EL expressions. Thus, you could provide
the data easily by declaring a public getter method. For example,

``` java
public class UsersComposer extends org.zkoss.zk.ui.select.SelectorComposer<Window> {
    public ListModel<User> getUsers() {
        //return a collection of users
    }
}
```

Then, you could access it as follows.

``` xml
<window title="User List" border="normal" apply="foo.UsersComposer">
    <grid model="${$composer.users}>
...
```

### Wire Spring-managed beans

Here is another example that we wire Spring-managed beans with the
<javadoc type="interface">org.zkoss.zk.ui.select.WireVariable</javadoc>
annotation.

``` java
@VariableResolver(org.zkoss.zkplus.spring.DelegatingVariableResolver.class)
public class UsersComposer extends SelectorComposer<Window> {
    @WireVariable
    private List<User> users;

    public ListModel<User> getUsers() {
        return new ListModelList<User>(users);
    }
}
```

where we register a variable resolver called
<javadoc>org.zkoss.zkplus.spring.DelegatingVariableResolver</javadoc>
with the
<javadoc type="interface">org.zkoss.zk.ui.select.VariableResolver</javadoc>
annotation. As its name suggests,
<javadoc>org.zkoss.zkplus.spring.DelegatingVariableResolver</javadoc>
will be used to retrieve Spring-managed beans when `@WireVariable` is
encountered. For more information, please refer to [the Wire Variables
section](ZK_Developer's_Reference/MVC/Controller/Wire_Variables).

Notice that the variables will be wired before instantiating the
component and its children, so it is OK to access them in the ZUML
document, as below.

``` xml
<window title="User List" border="normal" apply="foo.UsersComposer">
    <grid model="${$composer.users}>
...
```

> ------------------------------------------------------------------------
>
> <references/>

# Composer with More Control

A composer could also handle the exceptions, if any, control the life
cycle of rendering, and intercept how a child component is instantiated.
It can be done by implementing the corresponding interfaces,
<javadoc type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc>
and/or
<javadoc type="interface">org.zkoss.zk.ui.util.FullComposer</javadoc>.

## Initialize Components

If you want to initialize a component's properties with some default
values, after ZK creates it, you should override
<javadoc method="doAfterCompose(T)">org.zkoss.zk.ui.select.SelectorComposer</javadoc>.

``` java
public class MyComposer extends SelectorComposer<Grid> {
   public void doAfterCompose(Grid comp) {
      super.doAfterCompose(comp); //wire variables and event listeners
      //initialize wired components here e.g. myLabel.setValue("default value")
   }
...
```

- Line 2: The passed argument, `comp`, is the component that the
  composer is applied to. In this example, it is the grid. As the name
  indicates, `doAfterCompose` is called after the grid and all its
  descendants are instantiated.
- Line 3: Calling `super.doAfterCompose(comp)` first is required to make
  `@Wire` and `@Listen` work.

## Exception and Lifecycle Handling with ComposerExt

If you want a composer to handle the exception and/or control the life
cycle of rendering, you could also implement
<javadoc type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc>.
Since <javadoc>org.zkoss.zk.ui.select.SelectorComposer</javadoc> already
implements this interface, you only need to override the method you care
about if you extend from it.

For example, we could handle the exception by overriding
<javadoc method="doCatch(java.lang.Throwable)">org.zkoss.zk.ui.util.ComposerExt</javadoc>
and/or
<javadoc method="doFinally()">org.zkoss.zk.ui.util.ComposerExt</javadoc>.

``` java
public class MyComposer<T extends Component> extends SelectorComposer<T> {
    public boolean doCatch(Throwable ex) {
        return ignorable(ex); //return true if ex could be ignored
    }
}
```

For involving the life cycle, you could override
<javadoc method="doBeforeCompose(org.zkoss.zk.ui.Page, org.zkoss.zk.ui.Component, org.zkoss.zk.ui.metainfo.ComponentInfo)" type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc>
and/or
<javadoc method="doBeforeComposeChildren(T)" type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc>.

> ------------------------------------------------------------------------
>
> <references/>

## Fine-grained Full Control with FullComposer

In addition to controlling the given component, a composer can monitor
the instantiation and exceptions for each child and the descendant
component. It is done by implementing
<javadoc type="interface">org.zkoss.zk.ui.util.FullComposer</javadoc>.
<javadoc>org.zkoss.zk.ui.select.SelectorComposer</javadoc> does not
implement this interface by default. Thus, you have to implement it
explicitly.

There is no implementation method needed for this interface. It is like
a decorative interface to indicate that it requires the fine-grained
full control. In other words, all methods declared in
<javadoc type="interface">org.zkoss.zk.ui.util.Composer</javadoc> and
<javadoc type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc>
will be invoked one-by-one against each child and the descendant
component.

For example, suppose we have a composer implementing both
<javadoc type="interface">org.zkoss.zk.ui.util.Composer</javadoc> and
<javadoc type="interface">org.zkoss.zk.ui.util.FullComposer</javadoc>,
and it is assigned as followed

``` xml
    <panel apply="foo.MyFullComposer">
        <panelchildren>
        <div>
            <datebox/>
            <textbox/>
        </div>
        </panelchildren>
    </panel>
```

Then,
<javadoc type="interface" method="doAfterCompose(T)">org.zkoss.zk.ui.util.Composer</javadoc>
will be called for datebox, textbox, div and then panel (in the order of
*child-first-parent-last*). If
<javadoc type="interface">org.zkoss.zk.ui.util.FullComposer</javadoc> is
not implemented, only the panel will be called.

Notice that, because
<javadoc type="interface" method="doAfterCompose(T)">org.zkoss.zk.ui.util.Composer</javadoc>
will be called for each child, the generic type should be
<javadoc type="interface">org.zkoss.zk.ui.Component</javadoc> rather
than the component's type to which the composer is applied. For example,

``` java
public class MyFullComposer extends SelectorComposer<Component> implements FullComposer {
...
```

## Lifecycle

Here is a lifecycle of the invocation of a composer:

![](Composer.PNG)

# System-level Composer

If you have a composer that shall be invoked for every page, you can
register a system-level composer rather than applying it on every page.
For example, handling logout logic, or receiving a common event fired by
every page.

To register it, specify the composer you implemented in
`WEB-INF/zk.xml`:

``` xml
<listener>
    <listener-class>foo.MyComposer</listener-class>
</listener>
```

For more information, please refer to [ZK Configuration
Reference/zk.xml](ZK_Configuration_Reference/zk.xml/The_listener_Element).

Each time a ZK page, including ZK pages and richlets, is created, ZK
will instantiate one instance for each registered system-level composer
and then invoke
<javadoc method="doAfterCompose(T)" type="interface">org.zkoss.zk.ui.util.Composer</javadoc>
for each root component. The system-level composer is usually used to
process ZK pages after all components are instantiated successfully,
such as adding a trademark. If you want to process only certain pages,
you can check the request path by calling
<javadoc method="getRequestPath()" type="interface">org.zkoss.zk.ui.Desktop</javadoc>
(the desktop instance can be found through the given component).

If the system-level composer also implements
<javadoc type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc>, it
can be used to handle more situations, such as exceptions, like any
other composer can do.

If the system-level composer also implements
<javadoc type="interface">org.zkoss.zk.ui.util.FullComposer</javadoc>,
it will be invoked when each component is created. It provides the
finest grain of control but a wrong implementation might degrade the
performance.

Notice that since a new instance of the composer is created for each
page, there are no concurrency issues.

## Richlet

A system-level composer can implement
<javadoc type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc> to
handle exceptions for a richlet, such as `doCatch` and `doFinally`.
However, `doBeforeCompose` and `doBeforeComposeChildren` won't be
called.

<javadoc type="interface">org.zkoss.zk.ui.util.FullComposer</javadoc> is
not applicable to richlets. In other words, system-level composers are
called only for root components.

# Version History

| Version | Date       | Content                                                                                                                                                                          |
|---------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.8   | June, 2011 | <javadoc>org.zkoss.zk.ui.util.GenericAutowireComposer</javadoc> and its derives allow developers to specify a custom name by use of a component attribute called `composerName`. |

[^1]: It can be done by invoking
    <javadoc method="setAttribute(java.lang.String, java.lang.Object)" type="interface">org.zkoss.zk.ui.Component</javadoc>,
    because the component's attribute can be referenced directly in EL
    expressions. Notice that if you want to reference it in EL
    expressions, you'd set the attribute in
    <javadoc method="doBeforeComposeChildren(T)" type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc>
    because
    <javadoc method="doAfterCompose(T)" type="interface">org.zkoss.zk.ui.util.Composer</javadoc>
    was called after all child components were instantiated.
