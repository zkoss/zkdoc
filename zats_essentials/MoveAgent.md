

\_\_TOC\_\_

# Move Position

You can move *window* and *panel* by specifying its **left** and
**top**. As there is no screen rendered when running a test case, no
visual window is moved. It just changes target component's left and top
attribute.

![](Zats-mimic-move.png)

``` java


desktopAgent.query("window").as(MoveAgent.class).moveTo(20,40);

desktopAgent.query("panel").as(MoveAgent.class).moveTo(100,150);
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
<td><p>Panel, Window</p></td>
<td><p>5, 6</p></td>
<td></td>
</tr>
</tbody>
</table>

 
