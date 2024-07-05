



# Switch Pages

`PagingAgent` only works on ***paging*** component. When *listbox*,
*grid*, and *tree* are in "paging" mold, they all have one *paging*
component inside of them as shown in the image below:

![](Zats-mimic-paging.png)

You don't need to add *paging* component in a ZUL explicitly because
it's auto-created. Query it by selector syntax and convert it to a
`PagingAgent` to switch to a specific page. You should pass in a **page
index** (**start from zero**) instead of page number (start from one).

The following code demonstrates the usage:

``` java

        ComponentAgent paging = desktop.query("listbox > paging");
        paging.as(PagingAgent.class).moveTo(1);

        paging = desktop.query("grid > paging");
        paging.as(PagingAgent.class).moveTo(1);

        paging = desktop.query("tree > paging");
        paging.as(PagingAgent.class).moveTo(1);

        paging = desktop.query("paging");
        paging.as(PagingAgent.class).moveTo(1);
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
<td><p>Paging</p></td>
<td><p>5, 6</p></td>
<td></td>
</tr>
</tbody>
</table>

 
