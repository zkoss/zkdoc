# Message Boxes with Servlet Thread

When
<javadoc method="show(java.lang.String)">org.zkoss.zul.Messagebox</javadoc>
is called, it returns immediately after showing the message dialog.
Furthermore, it always returns `Messagebox.OK`. Thus, it is meaningless
to show buttons other than the OK button. For example, the `if` clause
in the following example is never true.

``` java
 if (Messagebox.show("Delete?", "Prompt", Messagebox.YES|Messagebox.NO,
     Messagebox.QUESTION) == Messagebox.YES) {
     this_never_executes();
 }
```

Rather, you have to provide an event listener as follows.

``` java
 Messagebox.show("Delete?", "Prompt", Messagebox.YES|Messagebox.NO,
     Messagebox.QUESTION,
     new EventListener() {
         public void onEvent(Event evt) {
             switch (((Integer)evt.getData()).intValue()) {
             case Messagebox.YES: doYes(); break; //the Yes button is pressed
             case Messagebox.NO: doNo(); break; //the No button is pressed
             }
         }
     }
 );
```

The event listener you provided is invoked when the user clicks one of
the buttons. Then, you can identify which button is clicked by examining
the data (Event's `getData`). The data is an integer whose value is the
button's identifier, such as `Messagebox.YES`.

Alternatively, you can examine the event name:

``` java
 public void onEvent(Event evt) {
     if ("onYes".equals(evt.getName())) {
         doYes(); //the Yes button is pressed
     } else if ("onNo".equals(evt.getName())) {
         doNo(); //the No button is pressed
     }
 }
```

**Note**: The event name for the OK button is `onOK`, not `onOk`.
**Notice**: If you want to make it run under clustering environment, you
shall implement
<javadoc  type="interface">org.zkoss.zk.ui.event.SerializableEventListener</javadoc>.
For more information, please refer to [ZK Developer's Reference:
Clustering](ZK_Developer's_Reference/Clustering/Programming_Tips).

# Message Boxes with Event Thread

If the event thread is enabled,
<javadoc method="show(java.lang.String)">org.zkoss.zul.Messagebox</javadoc>
will suspend the thread until the end user makes the choice. Thus, the
following code works correctly.

``` java
 if (Messagebox.show("Delete?", "Prompt", Messagebox.YES|Messagebox.NO,
     Messagebox.QUESTION) == Messagebox.YES) {
     //execute only if the YES button is clicked
 }
```
