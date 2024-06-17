# PivotUIEvent

<javadoc directory="zkpvt">org.zkoss.pivot.event.PivotUIEvent</javadoc>
is fired when user operates on the Pivottable. This event class covers
the following types of Events: *onPivotNodeOpen, onPivotPopup,
onPivotTooltip, onPivotContext*.

The effective regions where the event will occur are **column area**,
**row area**, and **data area**. In other words, activities in title
cells do not trigger this event.

## onPivotNodeOpen

This event is fired when users click on the open/close icon of a header
node rows or columns.

## onPivotPopup (left click)

This event is fired when users left-click on a cell.

- If this event is not listened, the event will not be fired.

For example,

``` xml
<pivottable model="${model}" onPivotPopup='alert("Pivot Popup!")' />
```

To get the clicked cell data:

``` java
    @Listen("onPivotPopup = #pivot")
    public void onPivotPopup$pivot(PivotUIEvent e){
        System.out.println(pivotmodel.getValue(e.getRowContext().getNode(), -1,
            e.getColumnContext().getNode(), -1, 
            Arrays.asList(pivotmodel.getDataFields()).indexOf(e.getDataField())));
    }
```

## onPivotTooltip (mouse over)

This event is fired when user's cursor hovers on a cell.

- If this event is not listened, the event will not be fired.

For example,

``` xml
<pivottable model="${model}" 
    onPivotTooltip='label.value = "(" + event.x + ", " + event.y + ")"' />
<label id="label" />
```

Note: this event will be fired whenever you move a cursor to a new cell.
You can listen to the event on client side to save bandwidth.

## onPivotContext (right click)

This event is fired when a user right-clicks on a cell.

- If this event is not listened, the event will not be fired.

For example,

``` xml
<pivottable model="${model}" onPivotContext='menupopup.open(self, "at_pointer")' />
<menupopup id="menupopup">
    <menuitem label="My Menuitem" />
</menupopup>
```

## Information provided by PivotUIEvent

PivotUIEvent provides the following information:

- The area in which the event occurs (data area, row area, or column
  area)
- Data field on which the event occurs (null if not applicable)
- Header node and subtotal on which the event occurs, for both row and
  column
- The row and column indices on which the event occurs
- Cursor coordinate relative to Pivottable component.

``` java
public void onPivotPopup$pivot(PivotUIEvent event) {
    int fieldType = event.getFieldType(); // area
    PivotField dataField = event.getDataField(); // data field
    
    PivotHeaderContext rowContext = event.getRowContext(); // row information
    PivotHeaderContext colContext = event.getColumnContext(); // column information
    
    int mouseX = event.getX(); // cursor x-coordinate
    int mouseY = event.getY(); // cursor y-coordinate
}
```

### PivotHeaderContext

[PivotHeaderContext](http://www.zkoss.org/javadoc/latest/zkpvt/org/zkoss/pivot/PivotHeaderContext.html)
represents a specific column or row in a Pivottable. It consists of
three variables: **header node**, **subtotal calculator**, and
**displayed index**.

- Header node refers to the PivotHeaderNode it belongs to.
- Subtotal calculator refers to the Calculator it corresponds to. If the
  column or row does not represent a subtotal, it will be null.
- Displayed index refers to the actual index shown in the table. The
  origin (0, 0) is defined to be the first data cell (the
  upper-left-most one).

# onPivotFieldControlChange

The <pivot-field-control> will fire this event after you drag to change
a field in the field control and pass
<javadoc directory="zkpvt">org.zkoss.pivot.ui.PivotFieldControlChangeEvent</javadoc>
to a listener.

## Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
