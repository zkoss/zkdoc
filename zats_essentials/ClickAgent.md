



# Click, Double-Click, Right-Click

`ClickAgent` helps us to mimic the clicking of a component for general
intention; it is able to trigger <b>onClick</b>, <b>onDoubleClick</b>,
or <b>onRightClick</b> events. Most user actions are done by clicking,
but they might have different intentions. For example, clicking a
<b>listitem</b> would represent selecting it; clicking on a
<b>checkbox</b> would represent checking the box and so on. Therefore,
to avoid mixing several actions into clicking operations, specific
actions have different corresponding operation agents. For example, if
you wanted to select a <b>listitem</b>, use `SelectAgent`,for checkbox,
use `CheckAgent`. Which operation agent you choose would depend on the
intention.

According to [ZK Component Referenece]({{site.baseurl}}/zk_component_ref/base_components/HtmlBasedComponent),
**all components that inherit `HtmlBasedComponent` supports click,
double click, and right click**.

**ClickTest.java**

``` java
public class ClickTest {

    //remove other methods for brevity

    @Test
    public void test() {
        DesktopAgent desktop = Zats.newClient().connect("/click.zul");

        ComponentAgent label = desktop.query("#mylabel");
        ComponentAgent eventName = desktop.query("#eventName");
        
        label.click();
        assertEquals("onClick", eventName.as(Label.class).getValue());
        
        label.as(ClickAgent.class).doubleClick();
        assertEquals("onDoubleClick", eventName.as(Label.class).getValue());
        
        label.as(ClickAgent.class).rightClick();
        assertEquals("onRightClick", eventName.as(Label.class).getValue());
    }
}
```

- As mentioned in the previous section, it's a shortcut method for
  convenience. (line 12)

<!-- -->

- If you want to perform double click or right click, you have to get
  `ClickAgent` first from `ComponentAgent`. (line 15,18)

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

 
