

# Tabbox

- Demonstration: [Tabbox](http://www.zkoss.org/zkdemo/tabbox)
- Java API: <javadoc>org.zkoss.zul.Tabbox</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.tab.Tabbox</javadoc>
- Style Guide: [
  Tabbox](ZK_Style_Guide/XUL_Component_Specification/Tabbox)

# Employment/Purpose

A tabbox is a container used to display a set of tabbed groups of
components. A row of tabs is displayed at the top (or left or other
location) of tabbox which may be used to switch between each group. It
allows developers to separate a large number of components into several
groups (each group is contained in [a
tabpanel](ZK_Component_Reference/Containers/Tabbox/Tabpanel)).
Only one group is visible at the time, such that the user interface
won't be too complicate to read. Once [the
tab](ZK_Component_Reference/Containers/Tabbox/Tab) of an
invisible group is clicked, it becomes visible and the previous visible
group becomes invisible.

The visible group is called *selected*, which can be retrieved by use of
<javadoc method="getSelectedPanel()">org.zkoss.zul.Tabbox</javadoc> or
<javadoc method="getSelectedIndex()">org.zkoss.zul.Tabbox</javadoc>.

# Example

<figure>
<img src="images/ZKComRef_Tabbox_Examples.PNG
title="ZKComRef_Tabbox_Examples.PNG" />
<figcaption>ZKComRef_Tabbox_Examples.PNG</figcaption>
</figure>

``` xml
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
[toolbar](ZK_Component_Reference/Essential_Components/Toolbar).
The screenshot below demonstrates an example Tabbox which includes extra
controls in the tab bar acting like a menu system.

Note: Toolbar in Tabbox only works in a horizontal(top/bottom) orient
Tabbox.

<figure>
<img src="images/ZKComRef_Tabbox_Toolbar_Examples.png
title="ZKComRef_Tabbox_Toolbar_Examples.png" />
<figcaption>ZKComRef_Tabbox_Toolbar_Examples.png</figcaption>
</figure>

``` xml
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

![](images/tabbox_maximalHeight_0.png "tabbox_maximalHeight_0.png")![](images/tabbox_maximalHeight_1.png "tabbox_maximalHeight_1.png")![](images/tabbox_maximalHeight_2.png "tabbox_maximalHeight_2.png")

``` xml
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
<javadoc>org.zkoss.zk.ui.event.SelectEvent</javadoc></p>
<p>Denotes user has selected a tab. onSelect is sent to both tab and
tabbox.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

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
<td>![](images/tabbox_mold_default.png)</td>
</tr>
<tr class="even">
<td><center>
<p>accordion</p>
</center></td>
<td><figure>
<img src="images/tabbox_mold_accordion.png
title="tabbox_mold_accordion.png" />
<figcaption>tabbox_mold_accordion.png</figcaption>
</figure></td>
</tr>
<tr class="odd">
<td><center>
<p>accordion-lite</p>
</center></td>
<td><p><img src="images/tabbox_mold_accordion-lite.png
title="tabbox_mold_accordion-lite.png"
alt="tabbox_mold_accordion-lite.png" /> {% include DeprecatedSince.md version=7.0.0 %}</p></td>
</tr>
</tbody>
</table>

# Supported Orients

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Screenshot</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>top</p>
</center></td>
<td>![](images/tabbox_orient_top.png)</td>
</tr>
<tr class="even">
<td><center>
<p>left</p>
</center></td>
<td><figure>
<img src="images/tabbox_orient_vertical.png
title="tabbox_orient_vertical.png" />
<figcaption>tabbox_orient_vertical.png</figcaption>
</figure></td>
</tr>
<tr class="odd">
<td><center>
<p>right</p>
</center></td>
<td><figure>
<img src="images/tabbox_orient_vertical-right.png
title="tabbox_orient_vertical-right.png" />
<figcaption>tabbox_orient_vertical-right.png</figcaption>
</figure></td>
</tr>
<tr class="even">
<td><center>
<p>bottom</p>
</center></td>
<td>![](images/tabbox_orient_bottom.png‎)</td>
</tr>
</tbody>
</table>

``` xml
<tabbox orient="bottom">
</tabbox>
```

- {% include version-badge.html version=7.0.0 %} Rename orient "horizontal" to
  "top", "vertical" to "left" and add extra two orients named "bottom"
  and "right"

# Supported Children

`*`[` Tabs`](ZK_Component_Reference/Containers/Tabbox/Tabs)`, `[` Tabpanels`](ZK_Component_Reference/Containers/Tabbox/Tabpanels)`, `[`Toolbar`](ZK_Component_Reference/Essential_Components/Toolbar)


