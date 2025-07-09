**Syntax:**

<?tablib uri="''myURI''" prefix="''my''"?>

This directive is used to load a `taglib` file, which defines a set of
static methods that can be used in EL expressions (so called EL
functions).

For example, we could load the functions defined in the built-in TLD
files identified as
[<http://www.zkoss.org/dsp/web/core>](zuml_ref/el_expressions/core_methods),
and then use [the l function](zuml_ref/el_expressions/core_methods/l).

```xml
 <?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
 <window title="${c:l('my.title')}">
 ...
 </window>
```

If you want to load a TLD file from your Web application, you can
specify the path directly. For example, suppose you have a custom TLD at
`/WEB-INF/tld/my.tld`, then you could specify it as follows.

```xml
 <?taglib uri="/WEB-INF/tld/my.tld" prefix="my"?>
<listbox>
    <listitem label="${each.name}" forEach="${my:getCustomers()}"/>
        <!-- assume there is a function called getCustomers -->
</listbox>
```

The syntax of a taglib document is described in the subsection:

# uri

`[Required][EL is `*`not`*` allowed]`

A URL of the `taglib` file. Unlike other URL and URI, it doesn't
interpret ~ or \* specially. And, the page and the `taglib` files it
references must be in the same Web application.

# prefix

`[Required]`

A prefix is used to identify functions defined in this `taglib` file.
The prefix could be any non-empty strings.


