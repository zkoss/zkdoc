

\_\_TOC\_\_

# Sorting

This agent can work on <b>*column*, *listheader*</b>, and
<b>*treecol*</b> and mimic to sort a header with specified sorting
order.

![](Zats-mimic-group.png)

``` java
 

            ComponentAgent sortingColumn = desktop.query("column[label='Author']");
            //ascending
            sortingColumn.as(SortAgent.class).sort(true);
            //descending
            sortingColumn.as(SortAgent.class).sort(false);          
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
<td><p>Column, Listheader, Treecol</p></td>
<td><p>5, 6</p></td>
<td></td>
</tr>
</tbody>
</table>

 
