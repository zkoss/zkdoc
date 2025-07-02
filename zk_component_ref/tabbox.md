

# Tabbox

- Demonstration: [Tabbox](http://www.zkoss.org/zkdemo/tabbox)
- Java API: [org.zkoss.zul.Tabbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tabbox.html)
- JavaScript API: [zul.tab.Tabbox](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.tab.Tabbox.html)


# Employment/Purpose

A tabbox is a container used to display a set of tabbed groups of
components. A row of tabs is displayed at the top (or left or other
location) of tabbox which may be used to switch between each group. It
allows developers to separate a large number of components into several
groups (each group is contained in [a tabpanel]({{site.baseurl}}/zk_component_ref/containers/tabbox/tabpanel)).
Only one group is visible at the time, such that the user interface
won't be too complicate to read. Once [the tab]({{site.baseurl}}/zk_component_ref/containers/tabbox/tab) of an
invisible group is clicked, it becomes visible and the previous visible
group becomes invisible.

The visible group is called *selected*, which can be retrieved by use of
[org.zkoss.zul.Tabbox#getSelectedPanel()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tabbox.html#getSelectedPanel()) or
[org.zkoss.zul.Tabbox#getSelectedIndex()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Tabbox.html#getSelectedIndex()).

# Example

![](/zk_component_ref/images/ZKComRef_Tabbox_Examples.PNG)

```xml
<zk>
    <tabbox width="400px">
        <tabs>
            <tab label="Tab 1" />
            <tab label="Tab 2" />
        </tabs>
        <tabpanels>
            <tabpanel>This is panel 1</tabpanel>
            <tabpanel>This is panel 2</tabpanel>
        </tabpanels>
    </tabbox>
    <space />
    <tabbox width="400px" mold="accordion">
        <tabs>
            <tab label="Tab 3" />
            <tab label="Tab 4" />
        </tabs>
        <tabpanels>
            <tabpanel>This is panel 3</tabpanel>
            <tabpanel>This is panel 4</tabpanel>
        </tabpanels>
    </tabbox>
</zk>
```

# Properties and Features

## Toolbar in Tabbox

The Tabbox supports the inclusion of other controls within its tab bar,
thus allowing more freedom and layout options when creating layouts
which include a
[toolbar]({{site.baseurl}}/zk_component_ref/toolbar).
The screenshot below demonstrates an example Tabbox which includes extra
controls in the tab bar acting like a menu system.

Note: Toolbar in Tabbox only works in a horizontal(top/bottom) orient
Tabbox.

![](/zk_component_ref/images/ZKComRef_Tabbox_Toolbar_Examples.png)

```xml
<tabbox width="250px">
    <tabs>
        <tab label="Tab 1" closable="true" />
        <tab label="Tab 2" closable="true" />
        <tab label="Tab 3" closable="true" />
        <tab label="Tab 4" closable="true" />
        <tab label="Tab 5" closable="true" />
    </tabs>
    <toolbar>
        <toolbarbutton image="/img/live.gif" onClick='alert("Live")' />
        <toolbarbutton image="/img/defender.gif"
            onClick='alert("Defender")' />
        <toolbarbutton image="/img/battery.gif"
            onClick='alert("Battery")' />
    </toolbar>
    <tabpanels>
        <tabpanel>This is panel 1</tabpanel>
        <tabpanel>This is panel 2 The second panel</tabpanel>
        <tabpanel>This is panel 3</tabpanel>
        <tabpanel>This is panel 4</tabpanel>
        <tabpanel>This is panel 5</tabpanel>
    </tabpanels>
</tabbox>
```

## MaximalHeight

{% include version-badge.html version=7.0.0 %} In order to solve the problem where
each tabpanel have different heights, we offer this feature called
**MaximalHeight**. With this feature, every Tabpanel will be applied the
maximum height among all the tabpanels i.e. if one tabpanel's height is
at 300px while the rest is at 240px, all of the tabpanels will be
applied with a height of 300px. This feature only works in the initial
phase. The screenshot below demonstrates an example Tabbox which
includes 3 tabpanels and all of them use the maximum height.

Note: The Client ROD feature will be disabled if it is set to true.

![](/zk_component_ref/images/tabbox_maximalHeight_0.png)![](/zk_component_ref/images/tabbox_maximalHeight_1.png)![](/zk_component_ref/images/tabbox_maximalHeight_2.png)

```xml
<tabbox maximalHeight="true" width="300px">
    <tabs id="tabs0">
        <tab label="Tab1" />
        <tab label="Tab2" />
        <tab label="Tab3" />
    </tabs>
    <tabpanels id="pnls0">
        <tabpanel>
            <div>Tabpanel Content 1</div>
            <div>Tabpanel Content 1</div>
            <div>Tabpanel Content 1</div>
        </tabpanel>
        <tabpanel>
            <div>Tabpanel Content 2</div>
            <div>Tabpanel Content 2</div>
        </tabpanel>
        <tabpanel>
            <div>Tabpanel Content 3</div>
            <div>Tabpanel Content 3</div>
            <div>Tabpanel Content 3</div>
            <div>Tabpanel Content 3</div>
        </tabpanel>
    </tabpanels>
</tabbox>
```

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>onSelect</p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html)</p>
<p>Denotes user has selected a tab. onSelect is sent to both tab and
tabbox.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Molds

Available molds of a component are defined in lang.xml embedded in
zul.jar.

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Snapshot</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>default</p>
</center></td>
<td>![](/zk_component_ref/images/tabbox_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>accordion</p>
</center></td>
<td>![](/zk_component_ref/images/tabbox_mold_accordion.png)</td>
</tr>
<tr class="odd">
<td><center>
<p>accordion-lite</p>
</center></td>
<td><p>![](/zk_component_ref/images/tabbox_mold_accordion-lite.png)</td>
</tr>
<tr class="odd">
<td><center>
<p>right</p>
</center></td>
<td>![](/zk_component_ref/images/tabbox_orient_vertical-right.png)</td>
</tr>
<tr class="even">
<td><center>
<p>bottom</p>
</center></td>
<td>![](/zk_component_ref/images/tabbox_orient_bottom.png‎)</td>
</tr>
</tbody>
</table>

```xml
<tabbox orient="bottom">
</tabbox>
```

- {% include version-badge.html version=7.0.0 %} Rename orient "horizontal" to
  "top", "vertical" to "left" and add extra two orients named "bottom"
  and "right"

# Supported Children

`*`[` Tabs`]({{site.baseurl}}/zk_component_ref/containers/tabbox/tabs)`, `[` Tabpanels`]({{site.baseurl}}/zk_component_ref/containers/tabbox/tabpanels)`, `[`Toolbar`]({{site.baseurl}}/zk_component_ref/toolbar)


