

Sometimes it is helpful to run some code before ZK Loader instantiates
any component. For example, check if the user has the authority to
access, initialize some data, or prepare some variables for EL
expressions.

This can be done easily by implementing
[org.zkoss.zk.ui.util.Initiator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Initiator.html)/[org.zkoss.zk.ui.util.InitiatorExt](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/InitiatorExt.html),
and then specifying it with [the init directive](zuml_ref/init).

```xml
<?init class="com.foo.MyInitial"?>
```

# Initiator and EL

To prepare a variable for EL expression in an initiator, you could store
the variable in the page's attributes.

> ------------------------------------------------------------------------
>
> **Notice** that the provision of variables for EL expression is
> generally better to be done with
> [org.zkoss.xel.VariableResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/xel/VariableResolver.html)
> (and then specified it with [the variable-resolver > directive](zuml_ref/variable-resolver)).

For example, suppose we have a class, `CustomerManager`, that can be
used to load all customers, then we could prepare a variable to store
all customers as follows.

```java
public class AllCustomerFinder implements Initiator, InitiatorExt {

    @Override
    public void doInit(Page page, Map args) throws Exception {
        String name = (String)args.get("name");
        page.setAttribute(name != null ? name: "customers", CustomerManager.findAll());
    }
    ...
}
```

Then, we could use the initiator in a ZUML document as follows.

```xml
 <?init class="my.AllCustomerFinder" name="customers"?>

 <listbox id="personList" width="800px" rows="5">
     <listhead>
         <listheader label="Name"/>
         <listheader label="Surname"/>
         <listheader label="Due Amount"/>
     </listhead>
     <listitem value="${each.id}" forEach="${pageScope.customers}">
         <listcell label="${each.name}"/>
         <listcell label="${each.surname}"/>
         <listcell label="${each.due}"/>
     </listitem>
 </listbox>
```

# System-level Initiator

If you have an initiator that shall be invoked for each page, you could
register a system-level initiator, rather than specifying it on every
page.

It could be done by specifying the initiator you implemented in
`WEB-INF/zk.xml` as follows. For more information, please refer to [ZK Configuration Reference]({{site.baseurl}}/zk_config_ref/the_listener_element).

```xml
<listener>
    <listener-class>foo.MyInitiator</listener-class>
</listener>
```

Once specified, an instance of the given class will be instantiated for
each page ([org.zkoss.zk.ui.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Page.html)),
and then its method will be called as if they are specified in the page
([the init directive](zuml_ref/init)).

# Exception Handling

The initiator can be used to handle the exception when ZK Loader renders
a page by implementing
[org.zkoss.zk.ui.util.InitiatorExt#doCatch(java.lang.Throwable)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/InitiatorExt.html#doCatch(java.lang.Throwable))

> ------------------------------------------------------------------------
>
> **Notice** that it does not cover the exception thrown in an event
> listener, which could be handled by the use of
> [org.zkoss.zk.ui.util.ExecutionCleanup](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ExecutionCleanup.html).

```java
import org.zkoss.zk.ui.Page;
import org.zkoss.zk.ui.util.Initiator;
import org.zkoss.zk.ui.util.InitiatorExt;

public class ErrorHandler implements Initiator, InitiatorExt {
    public void doInit(Page page, Map args) throws Exception {
    }
    public void doAfterCompose(Page page) throws Exception { //nothing to do
    }
    public boolean doCatch(Throwable ex) throws Exception {
        //handle exception here
        return shallIgnore(ex); //return true if the exception is safe to ignore
    }
    public void doFinally() throws Exception {
        //the finally cleanup
    }
}
```

# Version History

| Version | Date       | Content                                    |
|---------|------------|--------------------------------------------|
| 5.0.7   | April 2011 | The system-level initiator was introduced. |
