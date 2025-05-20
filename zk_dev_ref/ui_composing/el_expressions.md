# Overview

EL expressions are designed to make a ZUML document easier to access
objects available in the application, such as the application data and
parameters. For a complete introduction, please refer to [ZUML
Reference/EL Expressions](ZUML_Reference/EL_Expressions).

An EL expression is an expression enclosed with `${` and `}`, i.e., the
syntax `${expr}`. For example,

``` xml
 <element attr1="${bean.property}".../>
 ${map[entry]}
 <another-element>${3+counter} is ${empty map}</another-element>
```

When an EL expression is used as an attribute value, it could return any
kind of objects as long as the attribute allows. For example, the
following expressions will be evaluated to `boolean` and `int`
respectively.

``` xml
 <window if="${some > 10}"><!-- boolean -->
   <progressmetter value="${progress}"/><!-- integer -->
```

If the class does not match, ZK Loader will try to coerce it to the
correct one. If a failure has occurred, an exception is thrown.

Multiple EL expressions could be specified in a single attribute:

``` xml
<window title="${foo.name}: ${foo.version}">
```

## Example

| EL Expression                  | Result                                                               |
|--------------------------------|----------------------------------------------------------------------|
| \${1 \> (4/2)}                 | false                                                                |
| \${100.0 == 100}               | true                                                                 |
| \${'a' \< 'b'}                 | true                                                                 |
| \${'hip' gt 'hit'}             | false                                                                |
| \${1.2E4 + 1.4}                | 12001.4                                                              |
| \${3 div 4}                    | 0.75                                                                 |
| \${10 mod 4}                   | 2                                                                    |
| \${empty param.add}            | true if the request parameter named `add` is null or an empty string |
| \${param\['mycom.productId'\]} | The value of the request parameter named `mycom.productId`           |

- The example is from [JSP
  Tutorial](http://download.oracle.com/javaee/1.4/tutorial/doc/JSPIntro7.html).
- For more information please refer to
  [Operators](ZUML_Reference/EL_Expressions/Operators) and
  [Literals](ZUML_Reference/EL_Expressions/Literals).

## Difference from Java

- A string can be enclosed with either single quotes or double quotes.
  In other words, 'abc' is equivalent to "abc".
- The empty operator is useful for testing null and empty string, list
  and map, such as \${empty param.add}.
- The . operator can be used to access a property of an object (assuming
  that there is a get method of the same name) or a value of a map, such
  as \${foo.value.name}.
- The \[ \] operator can be used to access an item of a list or array, a
  value of a map, and a property of an object (assuming that there is a
  get method of the same name), such as \${ary\[5\]} and
  \${wnd\['title'\]}.
- `null` is returned if the value is not found and the index is
  out-of-bound.

For more information please refer to
[Operators](ZUML_Reference/EL_Expressions/Operators) and
[Literals](ZUML_Reference/EL_Expressions/Literals).

# Resolving EL Variables

EL expressions are evaluated on the server when the page is rendered.
Thus, an EL variable can access:

- Components by [using its
  ID]({{site.baseurl}}/zk_dev_ref/UI_Composing/Component-based_UI)
- Variables defined in
  [zscript]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML/Scripts_in_ZUML)
- [Implicit
  objects](ZUML_Reference/EL_Expressions/Implicit_Objects)
- Scoped attributes

``` xml
<!-- self is an implicit object referring to the component itself -->
<textbox id="tb" value="${self.parent.title}"/>

<!-- tb, the ID of a textbox, is the object reference of the textbox component -->
${tb.value}

<!-- param is an implicit object   -->
<button label="Enter" if="${not empty param.edit}"/>

<zscript><![CDATA[
     Date now = new Date();
]]></zscript>
<!-- now is a variable defined in zscript -->
<datebox value="${now}"/>
```

## Resolving Order

ZK resolves a variable from smaller scope to larger scope in the order
below:

1.  zscript variable
2.  execution
3.  component
4.  page
5.  desktop
6.  session
7.  application

Hence, if there is an attribute value in a smaller scope, it will shadow
the same attribute in the larger scope.

``` xml
<div id="parent">
    <zscript><![CDATA[
    //the smaller scope (lower one) can shadow the upper one
    application.setAttribute("myname", "in application");
    session.setAttribute("myname", "in session");
    desktop.setAttribute("myname", "in desktop");
    page.setAttribute("myname", "in page");
    parent.setAttribute("myname", "in component");
    execution.setAttribute("myname", "in execution");
    ]]></zscript>
    Resolved result:
    <label style="font-weight: bold" value="${myname}"/>
</div>
```

In the example above, the resolved result is **in execution**. But if
you remove line 9, you will see **in component**.

(check org.zkoss.zk.xel.impl.ExecutionResolver.resolveVariable0())

Furthermore, you could define a variable resolver to associate a name
with an object or map a function to a Java static method as described in
the following.

## Variable Resolver

If you would like to support many variables, you could implement a
variable resolver: a class that implements
<javadoc type="interface">org.zkoss.xel.VariableResolver</javadoc>.

``` java
package foo;
public class CustomerResolver implements org.zkoss.xel.VariableResolver {
    public Object resolveVariable(String name) {
        if ("customers".equals(name))
            return Customer.getAll("*");
//     if ("recent".equals(name))
//         return something_else;
        return null; //not a recognized variable
    }
}
```

Then, you could specify it in a
[variable-resolver](ZUML_Reference/ZUML/Processing_Instructions/variable-resolver)
directive, such as:

``` xml
<?variable-resolver class="foo.CustomerResolve"?>

<listbox>
    <listitem label="${each.name}" forEach="${customers}"/>
</listbox>
```

### System-level Variable Resolver

If you have a variable resolver that will be used on every page, you can
register a system-level variable resolver rather than specifying it on
every page.

This can be done by specifying a variable resolver you have implemented
in `WEB-INF/zk.xml` as follows. For more information, please refer to
[ZK Configuration
Reference](ZK_Configuration_Reference/zk.xml/The_listener_Element).

``` xml
<listener>
    <listener-class>foo.MyVariableResolver</listener-class>
</listener>
```

Then, when a page is created each time, an instance of the specified
class will be instantiated and registered as if it is specified in [the
variable-resolver
element](ZUML_Reference/ZUML/Processing_Instructions/variable-resolver).

Notice that since a new instance of the variable resolver is created on
each page, there will not be any concurrency issues.

# Calling Java Methods

## Define in Page-Scope

The collection object could be retrieved by invoking a static method.
For example, suppose that we have a class and a static method as
follows:

``` java
package foo;
public class Customer {
    public static Collection<Customer> getAll(String condition) {
        //...returns a collection of customers
    }
    public String getName() {
       return _name;
    }
    //...
}
```

Then, we could retrieve them with the
[xel-method](ZUML_Reference/ZUML/Processing_Instructions/xel-method)
directive:

``` xml
<?xel-method prefix="c" name="getAllCustomers" class="foo.Customer"
   signature="java.util.Collection getAll(java.lang.String)"?><!-- Generics not allowed -->
<listbox>
    <listitem label="${each.name}" forEach="${c:getAllCustomers('*')}"/>
</listbox>
```

## Define as a Tag Library

If you have several static methods, you can declare them in an XML file
called taglib, such as

``` xml
<taglib>
    <function>
        <name>getAllCustomers</name>
        <function-class>foo.Customer</function-class>
        <function-signature>
    java.util.Collection getAll(java.lang.String)
        </function-signature>
        <description>
    Returns a collection of customers.
        </description>
    </function>
    <!-- any number of functions are allowed -->
</taglib>
```

Then, you can use them by specifying it in a [taglib
directive](ZUML_Reference/ZUML/Processing_Instructions/taglib).

``` xml
<?taglib uri="/WEB-INF/tld/my.tld" prefix="my"?>
<listbox>
    <listitem label="${each.name}" forEach="${my:getAllCustomers('*')}"/>
</listbox>
```

# EL 3.0 Support

{% include RemovedSince.html version=8.0.0 %} ZK supports some syntaxes of Java EE
7 Expression Language 3, see
[examples](http://books.zkoss.org/zk-mvvm-book/9.5/data_binding/el_expression.html).

``` xml
<?import org.zkoss.xel.fn.* ?>
CommonFns.formatNumber(Object, String, Locale) : ${CommonFns.formatNumber(12345, '$ ###,###,###.00', null)}

square root of 16: ${Math.sqrt(16)}
```

- Line 1: import directive is require to call CommonFns
- Line 4: `java.lang.*` is imported by default without specifying import
  explicitly.
