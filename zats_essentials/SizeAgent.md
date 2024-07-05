



## Maximize and Minimize

With `SizeAgent`, we can mimic to maximize, minimize, and resize a
*window* or a *panel*. There are two flags in a *window* (and a *panel*)
to represent maximized and minimized state respectively. When they are
both "false", it represents "original size". To maximize a component,
you should set maximized to **true** and minimized to **false**. To
minimize it, set maximized to **false** and minimized to **true**.

``` java

ComponentAgent window = desktopAgent.query("window");

//maximize
window.as(SizeAgent.class).maximize(true);
window.as(SizeAgent.class).minimize(false)

//restore to original size
window.as(SizeAgent.class).maximize(false);
window.as(SizeAgent.class).minimize(false)

//minimize
window.as(SizeAgent.class).maximize(false);
window.as(SizeAgent.class).minimize(true);
```

## Resize

`SizeAgent` can also mimic resizing a component by specifying **width**
and **height**. As test case runs in a simulated environment, there is
no screen rendering involved, it simply changes target component's width
and height.,

``` java

ComponentAgent window = desktopAgent.query("window");

window.as(SizeAgent.class).resize(100, 100);
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

 
