\_\_TOC\_\_

# Open

`OpenAgent` is used to expand a *treeitem*, *listgroup*, *detail*,
*bandbox*, *groupbox* or *combobutton* etc.

Here we use a *tree* with binary structure to demonstrate this agent's
usage. Each *treeitem* has two children.

![](Smalltalk-mimic-open.png)

In the test case below, we expand the first *treeitem* (node1) and its
first child *treeitem* (node3), the first treeitem's visible item count
should be 5. Before expanding, its visible item count is 1(only itself).

**OpenTest.java**

``` java

    @Test
    public void testAgent() {
        DesktopAgent desktop = Zats.newClient().connect("/open-tree.zul");

        ComponentAgent firstItem = desktop.query("#tree").query("treeitem");
        Assert.assertEquals(1, firstItem.as(Treeitem.class).getVisibleItemCount());
        
        //open first item
        firstItem.as(OpenAgent.class).open(true);
        firstItem.query("treechildren").query("treeitem").as(OpenAgent.class).open(true);
        Assert.assertEquals(5, firstItem.as(Treeitem.class).getVisibleItemCount());
        
        //collapse first item
        firstItem.as(OpenAgent.class).open(false);
        Assert.assertEquals(1, firstItem.as(Treeitem.class).getVisibleItemCount());
    }
```

- Although there are two *treeitems*, `query()` only returns the first
  one. (line 3)
- Before expanding, its visible item count is one(only itself). (line 6)
- After we expand the first *treeitem* and its first child item, its
  visible item count should now be five as shown in the image above.
  (line 8-9)
- Call `open(false)` to collapse first *treeitem*, and its visible item
  count comes back to one. (line 12)

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
<td><p>Combobutton, Popup, Bandbox, Combobox, Groupbox, Panel, Window,
Detail, Group, Listgroup, Treeitem,</p>
<p>Center, North, East, West, South, Splitter</p></td>
<td><p>5, 6</p></td>
<td></td>
</tr>
</tbody>
</table>
