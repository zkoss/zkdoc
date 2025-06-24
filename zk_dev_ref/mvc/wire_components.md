# Wire Components

In a controller that extends
[org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html), when you
specify a `@Wire` annotation on a field or setter method, the
SelectorComposer will automatically find the target component and assign
it to the field or pass it into the setter method. It only finds the
target component among the applied component and its child components.

## Wire with ID selector by Default

You can either specify <strong>component selector syntax</strong>, as
the matching criteria for wiring, or leave it empty to wire by
**component id (default)**. For example,

ZUL:

```xml
<window apply="foo.MyComposer">
    <textbox />
    <button id="btn" />
</window>
```

- For this case, `MyComposer` can only wire <window> and its child
  components.

Controller:

```java
    @Wire
    Button btn; // wire to the button with id "btn"
    @Wire("window > textbox")
    Textbox tb; // wire to the first textbox whose parent is a window
```

# CSS3-like Selectors

The string value in `@Wire` annotation is a <strong>component
selector</strong>, which shares an analogous syntax of CSS3 selector.
The selector specifies matching criteria against the component tree
under the component which applies to this composer.

Given a selector in `@Wire` annotation, the SelectorComposer will wire a
field to the component of **the first match** (in a depth-first-search
sense) if the data type of the field is a subtype of `Component`.
Alternatively, if the field type is a subtype of `Collection`, it will
wire to an instance of `Collection` containing all the matched
components.

The syntax elements of selectors are described as the following:

## Type

The component type as in ZUML definition, case insensitive.

```java
    @Wire("button")
    Button btn; // wire to the first button.
```

## Combinator

Combinator constraints the relative position of components.

```java
    @Wire("window button")
    Button btn0; // wire to the first button who has an ancestor window
    @Wire("window > button") // ">" refers to child
    Button btn1; // wire to the first button whose parent is a window
    @Wire("window + button") // "+" refers to adjacent sibling (next sibling)
    Button btn2; // wire to the first button whose previous sibling is a window
    @Wire("window ~ button") // "~" refers to general sibling
    Button btn3; // wire to the first button who has an older sibling window
```

You can have any number of levels of combinators:

```java
    @Wire("window label + button")
    Button btn4; // wire to the first button whose previous sibling is a label with an ancestor window.
```

## ID

The component id.

```java
    @Wire("label#lb")
    Label label; // wire to the first label of id "lb" in the same id space of the root component
    @Wire("#btn")
    Button btn; // wire to the first component of id "btn", if not a Button, an exception will be thrown.
```

Unlike CSS3, the id only refers to the component in the same IdSpace of
the previous level or root component. For example, given zul

```xml
<window apply="foo.MyComposer">
    <div>
        <window id="win">
            <div>
                <button id="btn" /><!-- button 1 -->
                <textbox id="tb" /><!-- textbox 1 -->
            </div>
        </window>
        <button id="btn" /><!-- button 2 -->
    </div>
</window>
```

```java
    @Wire("#btn")
    Button btnA; // wire to button 2
    @Wire("#win #btn")
    Button btnB; // wire to button 1
    @Wire("#win + #btn")
    Button btnC; // wire to button 2
    @Wire("#tb")
    Textbox tbA; // fails, as there is no textbox of id "tb" 
                 // in the id space of the root window (who applies to the composer).
    @Wire("#win #tb")
    Textbox tbB; // wire to textbox 1
```

## Class

The sclass of component. For example,

```xml
<window apply="foo.MyComposer">
    <div>
        <button /><!-- button 1 -->
    </div>
    <span sclass="myclass">
        <button /><!-- button 2 -->
    </span>
    <div sclass="myclass">
        <button /><!-- button 3 -->
    </div>
</window>
```

```java
    @Wire(".myclass button")
    Button btnA; // wire to button 2
    @Wire("div.myclass button")
    Button btnB; // wire to button 3
```

## Attribute

The attributes on components, which means the value obtained from
calling the corresponding getter method on the component.

- Note: `[id="myid"]` does not restrict id space like `#myid` does, so
  they are **not** equivalent.

```java
    @Wire("button[label='submit']")
    Button btn; // wire to the first button whose getLabel() call returns "submit"
```

## Pseudo Class

A pseudo class is a custom criterion on a component. There are a few
default pseudo classes available:

```java
    @Wire("div:root") // matches only the root component
    @Wire("div:first-child") // matches if the component is the first child among its siblings
    @Wire("div:last-child") // matches if the component is the last child among its siblings
    @Wire("div:only-child") // matches if the component is the only child of its parent
    @Wire("div:empty") // matches if the component has no child
    @Wire("div:nth-child(3)") // matches if the component is the 3rd child of its parent
    @Wire("div:nth-child(even)") // matches if the component is an even child of its parent
    @Wire("div:nth-last-child(3)") // matches if the component is the last 3rd child of its parent
    @Wire("div:nth-last-child(even)") // matches if the component is an even child of its parent, counting from the end
```

The `nth-child` and `nth-last-child` pseudo classes parameters can also
take a pattern, which follows [CSS3 specification](http://www.w3.org/TR/css3-selectors/#nth-child-pseudo).

## Asterisk

Asterisk simply matches anything. It is more useful when working with
combinators:

```java
    @Wire("*")
    Component rt; // wire to any component first met, which is the root.
    @Wire("window#win > * > textbox")
    Textbox textbox; // wire to the first grandchild textbox of the window with id "win"
    @Wire("window#win + * + textbox")
    Textbox textbox; // wire to the second next sibling textbox of the window with id "win"
```

## Multiple Selectors

Multiple selectors separated by commas refer to an OR condition. For
example,

```java
    @Wire("grid, listbox, tree")
    MeshElement mesh; // wire to the first grid, listbox or tree component
    @Wire("#win timebox, #win datebox")
    InputElement input; // wire to the first timebox or datebox under window with id "win"
```

## Shadow Selectors

Shadow selectors can only be used to select shadow related elements.

One pesudo class **:host** and one pseudo element **::shadow** have been
added.

- **:host** select all shadow hosts, which are non-shadow elements,
  hosting at least one shadow element.
- **:host(selector)** select all shadow hosts matching the additional
  selector given.
- **::shadow** select all shadow roots, which are shadow elements,
  hosted by a non-shadow element.

```xml
<div id="host">
    <apply id="root" dynamicValue="true"><!-- set dynamicValue="true" to avoid being removed after render -->
        <if id="if1" test="@load(vm.showLabel)"><!-- using @load will also prevent this element from being removed -->
            <label id="lb1" value="some text here" />
        </if>
        <if id="if2" test="false"><!-- no dynamicValue or data binding expression, will be removed after render -->
            <label id="lb2" value="some more text here" /><!-- will not render because the if test equals false -->
        </if>
    </apply>
</div>
```

Here are some examples of using shadow selectors with the above zul

```java
    @Wire(":host") // wire to the div with id "host", as it is the only shadow host
    @Wire(":host(#div2)") // wire to nothing, no shadow host with the id "div2" exists
    @Wire("::shadow") // wire to the apply with id "root", as it is the only shadow root
    @Wire(":host if") // wire to nothing, cannot select from non-shadow(Div) into shadow(If) without using ::shadow
    @Wire(":host::shadow if") // wire to if with the id "if1", as "if2" will be removed after render, thus cannot be selected
    @Wire(":host::shadow if label") // wire to nothing, cannot select from shadow(If) to non-shadow(Label)
    @Wire(":host label") // wire to "lb1", as the host(Div) and the first label are non-shadow elements
    @Wire("#host::shadow#root #if1") // wire to if with the id "if1", with performance boost
```

 

# Wiring by Method

You can either put the `@Wire` annotation on a field or method. In the
latter case, it is equivalent to call the method with the matched
component as the parameter. This feature allows a more delicate control
on handling auto-wires.

```java
    @Wire("grid#users")
    private void initUserGrid(Grid grid) {
        // ... your own handling
    }
```

In the example above, the SelectorComposer will find the grid of id
"users" and call `initUserGrid` with the grid as a parameter.

- If the method is static or has wrong signature (more than one
  parameter), an exception will be thrown.
- Wiring by method **requires a selector** on `@Wire` annotation,
  otherwise an exception will be thrown.
- If the component is not found, the method is still called, but with
  `null` value passed in.
- Do not confuse `@Wire` with `@Listen`, while the latter wires to
  events.

 

# Wiring a Collection

You can also wire **all** matched components to a Collection field or by
method if the field is of Collection type or the method takes a
Collection as the parameter.

- If the field starts null or uninitialized or wiring by method,
  SelectorComposer will try to construct an appropriate instance and
  assign it to the field or pass it to a method call.
- If the field starts with an instance of Collection already, the
  collection will be cleared and filled with matched components.
- If it wires by method and the selector matches no components, an empty
  collection will be passed into the method call.

```java
    @Wire("textbox")
    List<Textbox> boxes; // wire to an ArrayList containing all matched textboxes
    @Wire("button")
    Set<Button> buttons; // wire to a HashSet containing all matched buttons
    @Wire("grid#users row")
    List<Row> rows = new LinkedList<Row>(); // the LinkedList will be filled with matched row components.
    @Wire("panel")
    public void initPanels(List<Panel> panels) {
        // ...
    }
```

# Wiring Sequence

While extending from
[org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html), the fields
and methods with the proper annotations will be wired automatically.
Here is the sequence of wiring:

- In
  <javadoc method="doAfterCompose(T)">org.zkoss.zk.ui.util.Composer</javadoc>,
  it wires components to the fields and methods with the
  [org.zkoss.zk.ui.select.annotation.Wire](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/annotation/Wire.html)
  annotation.

<!-- -->

- Before `onCreate` event of the component which applies to the
  composer, the SelectorComposer will attempt to wire the **null
  fields** and **methods** again, for some of the components might have
  been generated after doAfterCompose() call.

 

# Performance Tips

The selector utility is implemented by a mixed strategy. In a selector
sequence, the first few levels with ids specified are handled by
<javadoc method="getFellow(Component)">org.zkoss.zk.ui.Component</javadoc>,
and the rest are covered by depth first search (DFS). In brief, the more
ids you specify in the **first few levels** of a selector string, the
more boost you can obtain in component finding. For example,

```java
    @Wire("#win #hl > #btn") // fast, as it is entirely handled by getFellow()

    @Wire("window hlayout > button") // slower, entirely handled by DFS

    @Wire("#win hlayout > button") // first level is handled by getFellow(), other handled by DFS

    @Wire("window #hl > #btn") // slower, as the first level has no id, all levels are handled by DFS
```

- Note: specifying id via attribute (for instance, `[id='myid']`) does
  not lead to the same performance boost.

In the case of multiple selectors, only the first few **identical levels
with ids** enjoy the performance gain.

```java
    @Wire("#win #hl > button, #win #hl > toolbarbutton") 
    // the first two levels have boost

    @Wire("#win #hl > #btn, #win #hl > #toolbtn")
    // the first two levels have boost

    @Wire("#win + #hl > #btn, #win #hl > #btn") 
    // only the first level has boost, as they differ in the first combinator

    @Wire("#win hlayout > #btn, #win hlayout > #toolbtn") 
    // only the first level has boost, as the second level has no id specified
```

In brief, it is recommended to specify id in selector when you have a
large component tree. If possible, you can specify id on all levels to
maximize the performance gain from the algorithm.

 
