



# Close

Due to ZK component's specifications, only ***panel*, *tab*, and
*window***supports this operation. Notice that when you close any of
these components, the closed component is consequently detached from
desktop by default. Of course, you can write event handler to override
this behavior, for example to hide a component instead of detaching it.

![](images/Smalltalk-mimic-close.png")

The test below is quite simple, close each component and check if they
are detached one by one.

``` java

    @Test
    public void testAgent() {
        DesktopAgent desktopAgent = Zats.newClient().connect("/close.zul");
        
        ComponentAgent panel = desktopAgent.query("panel[title='closable']");
        panel.as(CloseAgent.class).close();
        Assert.assertNull(((Component)panel.getDelegatee()).getPage());
        
        ComponentAgent window = desktopAgent.query("window[title='closable']");
        window.as(CloseAgent.class).close();
        Assert.assertNull(((Component)window.getDelegatee()).getPage());
        
        ComponentAgent tab = desktopAgent.query("tab[label='closable']");
        tab.as(CloseAgent.class).close();
        Assert.assertNull(desktopAgent.query("tab[label='closable']"));
    }
```

- Close a closeable component with `CloseAgent.close()` When the
  component is detached, do not reuse the variables that references
  them. (line 6,10,14)

<!-- -->

- After "tab" is detached, you cannot retrieve from desktop. (line 15)

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
<td><p>Panel, Tab, Window</p></td>
<td><p>5, 6</p></td>
<td></td>
</tr>
</tbody>
</table>

 
