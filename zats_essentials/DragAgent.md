

\_\_TOC\_\_

# Drag & Drop

`DragAgent` makes you mimic the dragging of a component and drop it onto
another component. You have to query the component you want to drag
first and convert it as `DragAgent` then call `dropOn(ComponentAgent)`.
The argument you pass into the method is the target component you want
to drop on.

Assume that we have two listbox: leftBox, rightBox, you can drag
*listitem* between two listboxes.

![](Zats-mimic-dragDrop.png)

The following code represents how to drag a *listitem* from left
*listbox* to right *listbox*.

``` java

        //move 1 item from left to right
        ComponentAgent draggedItem = leftBox.query("listcell[label='ZK Forge']").getParent();
        draggedItem.as(DragAgent.class).dropOn(rightBox);
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
<td><p>Sub-class of <javadoc> org.zkoss.zk.ui.HtmlBasedComponent
</javadoc></p></td>
<td><p>5, 6</p></td>
<td></td>
</tr>
</tbody>
</table>

 
