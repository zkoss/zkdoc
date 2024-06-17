# Wire Event Listeners

To wire an event listener, you need to declare a method with
<javadoc>org.zkoss.zk.ui.select.annotation.Listen</javadoc> annotation.
The method should be public, with return type void, and have either no
parameter or one parameter of the specific event type (corresponding to
the event being listened to). The parameter of @Listen should be pairs
of an event name and a selector, separated by a semicolon.

ZK will look for the target component specified by the selector **in the
same [ ID
space](ZK%20Developer's%20Reference/UI%20Composing/ID%20Space)**.

For example,

``` java
@Listen("onClick = #btn0")
public void submit(MouseEvent event) {
    // called when onClick is received on the component of id btn0.
}
@Listen("onSelect = #listbox0")
public void select(SelectEvent event) {
    // called when onSelect is received on the component of id listbox0.
}
```

## Event Listener Parameter

There are three ways to declare the method signature of the event
listener:

1.  No parameter
2.  One parameter of the corresponding event type
3.  One parameter of a super class of the corresponding event type

For example,

``` java
@Listen("onChange = textbox#input0")
public void change() {
    // called when onChange is received on the textbox of id input0.
}
@Listen("onChange = textbox#input1")
public void change(InputEvent event) { 
    // called when onChange is received on the textbox of id input1.
}
@Listen("onChange = textbox#input2")
public void change(Event event) { 
    // called when onChange is received on the textbox of id input2.
}
```

## Multiple Targets

If the selector matches multiple components, the event listener will be
wired to **all** matched components. In such case, if you need to know
which component receives the event, you can retrieve it from
`Event#getTarget()`.

For example,

``` java
@Listen("onClick = grid#myGrid > rows > row")
public void click(MouseEvent event) {
    // called when onClick is received on any Row directly under the Grid of id myGrid
}
@Listen("onClick = #btn0, #btn1, #btn2")
public void click(MouseEvent event) {
    // called when onClick is received on components of id #btn0, #btn1, or #btn2
}
```

## Multiple Event Types

By separating multiple pairs of event names and selectors by
**semicolon**s, you can wire different types of events to a single
method.

For example,

``` java
@Listen("onClick = button#submit; onOK = textbox#password")
public void submit(Event event) {
    // called when onClick is received on #submit, or onOK (Enter key pressed) is received on #password
}
```

## Event Listener Priority

The calling order of an event listener can be declared by specifying a
number after the event name. The event listeners will be executed in the
order from the largest to smallest of the declared priority number.
Listeners without a priority number will be set to 0 automatically.

For example,

``` java
@Listen("onClick(1) = #btn0")
public void submit1(MouseEvent event) {
        // called before submit2 method when onClick is received on the component of id btn0.
}
@Listen("onClick = #btn0")
public void submit2(MouseEvent event) {
        // the priority of this listener will be set to 0 by default, and will be called after submit1 and before submit2 method when onClick is received on the component of id btn0.
}
@Listen("onClick(-1) = #btn0")
public void select3(SelectEvent event) {
        // called after submit2 method when onClick is received on the component of id btn0.
}
```

# Version History

| Version | Date          | Content                 |
|---------|---------------|-------------------------|
| 6.0.0   | February 2012 | @Listen was introduced. |
