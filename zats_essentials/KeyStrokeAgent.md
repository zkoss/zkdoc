\_\_TOC\_\_

# Stroke

**All components that inherit `HtmlBasedComponent` supports this
operation**. When calling `stroke()`, you have to provide special string
for control keys. Please refer to
\[<http://books.zkoss.org/wiki/ZK_Developer%27s_Reference/UI_Patterns/Keystroke_Handling>\|
Keystroke Handling in Developer's Reference\].

For example, **^#left** means *Ctrl+Left*, and **@#f3** means *Alt+F3*.

``` java

component.as(KeyStrokeAgent.class).stroke("$#left");
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
