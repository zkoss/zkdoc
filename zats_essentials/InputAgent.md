

# Type

`InputAgent` can be used on any **input component** such as *textbox* or
*datebox*. Among these input components, components in which users can
type *string* in, we can mimic it with `InputAgent.type(String)`. In
cases where components are not able to type in *string* such as
*slider*, we can use `InputAgent.input(Object)` instead.

We will use a todo list application to demonstrate the usage
of`InputAgent`. Here is the application's UI:

<figure>
<img src="Smalltalk-MimicLibrary-todolist.png"
title="Smalltalk-MimicLibrary-todolist.png" />
<figcaption>Smalltalk-MimicLibrary-todolist.png</figcaption>
</figure>

The following test case verifies "Add" function, we enter values into 3
fields: <b>item name</b>, <b>priority</b>, and <b>date</b>, and click
"Add" button. Then we inspect each *listcell* of a *listitem* to verify
that a to-do item is added to the *listbox*.

**TodoTest.java**

``` java

public class TodoTest {

    @Test
    public void test() {
        //visit the target page
        DesktopAgent desktop = Zats.newClient().connect("/todo.zul");

        //find components
        ComponentAgent itemName = desktop.query("textbox");
        ComponentAgent priority = desktop.query("intbox");
        ComponentAgent date = desktop.query("datebox");

        //add
        //itemName.as(InputAgent.class).type("one-item");
        itemName.type("one-item");
        priority.type("3");
        date.type("2012-03-16");
        desktop.query("button[label='Add']").click();
        
        //verify each listcell's label
        ComponentAgent listbox = desktop.query("listbox");
        List<ComponentAgent> cells = listbox.queryAll("listitem").get(0).getChildren();
        assertEquals("one-item",cells.get(0).as(Listcell.class).getLabel());
        assertEquals("3",cells.get(1).as(Listcell.class).getLabel());
        assertEquals("2012/03/16",cells.get(2).as(Listcell.class).getLabel());
    }
}
```

- The formal usage of `InputAgent` is to retrieve from a
  `ComponentAgent`. (line 14)
- As seen in the previous example, this is also a shortcut method. (line
  15)
- Although `priority` is an *intbox*, we still provide a String as the
  parameter. The string will be parsed to an integer internally, if
  failed we'll get an exception. (line 16)
- When typing in a <b>Datebox</b>, use the date format that you have
  specified in Datebox's "format" attribute. The same rule applies to
  *timebox*. (line 17)
- The query syntax means "retrieve a button whose label is 'Add'". (line
  18)
- If we call `ComponentAgent.query()`, it'll only query the
  <b>ComponentAgent</b>'s child components. Here, we find
  <b>listitem</b> to get <b>listcell</b>. (line 22)

# Typing

If you want to mimic a user's typing , you should use
`InputAgent.typing(String)`. It is similar to type(String) but it
triggers an onChanging event instead of an onChange event.

For example, to achieve auto-complete feature, developers usually
listens to an onChanging event of a *textbox* and performs
post-processing.

![](Zats-mimic-typing.png)

``` java

desktopAgent.query("textbox").as(InputAgent.class).typing("a");
```

# Select

`select(int, int)` is used to mark the selection of a range of text by
starting and ending index (ending index is exclusive).

![](Zats-mimic-selection.png)

``` java

desktopAgent.query("textbox").as(Input.class).select(0,3);
```

# Input

Among input components, only *slider* is where users cannot type text
in. So we provide a method, `input(Object)`, to generalize input
operation. Users don't have to care how values are inputted into a
component, but what the values are. For *slider*, we should pass integer
as the parameter.

![](Zats-mimic-input.png)

``` java

desktop.query("slider").as(InputAgent.class).input(40);
```

# Supported Components

<table>
<thead>
<tr class="header">
<th><center>
<p>Components</p>
</center></th>
<th><center>
<p>Version</p>
</center></th>
<th><center>
<p>Note</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Bandbox, Combobox, Textbox</p></td>
<td><p>5, 6</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>Datebox, Decimalbox, Doublebox, Doublespinner, Intbox, Longbox,
Spinner, Timebox</p></td>
<td><p>5, 6</p></td>
<td><p>input string should match "format" attribute's pattern</p></td>
</tr>
<tr class="odd">
<td><p>CKEditor</p></td>
<td><p>5, 6</p></td>
<td><p>only supports <code>type(String)</code>,
<code>typing(String)</code></p></td>
</tr>
<tr class="even">
<td><p>Colorbox</p></td>
<td><p>5, 6</p></td>
<td><p>only supports <code>type(String)</code></p></td>
</tr>
<tr class="odd">
<td><p>Slider</p></td>
<td><p>5, 6</p></td>
<td><p>only supports <code>input(Object)</code></p></td>
</tr>
</tbody>
</table>

 
