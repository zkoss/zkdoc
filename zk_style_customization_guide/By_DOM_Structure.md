

The naming pattern of the DOM structure is used to describe components
which are composed of more than one part. The following recommended
naming patterns are to clarify the DOM structure of ZK components, not a
limitation.

# Layout Elements

The following naming patterns are based on component layout. For
example, "*z-window-**header***" means header part of window component.

<table>
<tbody>
<tr class="odd">
<td>![](images/Zk-css-dom.PNG)</td>
<td><dl>
<dt></dt>
<dd>
-<strong>outer</strong>:
<dl>
<dt></dt>
<dd>
the exterior of the specified component like splitter in vbox and hbox
</dd>
</dl>
</dd>
<dd>
-<strong>header</strong>:
<dl>
<dt></dt>
<dd>
the header content, like grid, tree, listbox, and so on.
</dd>
</dl>
</dd>
<dd>
-<strong>body</strong>:
<dl>
<dt></dt>
<dd>
the body content, like grid, tree, listbox, and so on.
</dd>
</dl>
</dd>
<dd>
-<strong>inner</strong>:
<dl>
<dt></dt>
<dd>
the interior of the specified component, like slider and tab.
</dd>
</dl>
</dd>
<dd>
-<strong>content</strong>:
<dl>
<dt></dt>
<dd>
like window's contentSclass or groupbox's contentSclass
</dd>
</dl>
</dd>
<dd>
-<strong>footer</strong>:
<dl>
<dt></dt>
<dd>
describes the footer content, like grid, tree, listbox, and so on.
</dd>
</dl>
</dd>
<dd>
-<strong>noheader</strong>:
<dl>
<dt></dt>
<dd>
no header element.
</dd>
</dl>
</dd>
<dd>
-<strong>noborder</strong>:
<dl>
<dt></dt>
<dd>
no border element.
</dd>
</dl>
</dd>
</dl></td>
</tr>
</tbody>
</table>

# Orient and Position Elements

The following naming patterns are based on component orientation and
positions. For example, "*z-menubar-**horizontal***" means the menubar
component is in horizontal orientation.

  
\-**vertical**:

  
vertical aspect, like menubar.

\-**horizontal**:

  
horizontal aspect, like menubar.

\-**start**:

  
beginning aspect, like toolbar.

\-**center**:

  
center aspect, like toolbar.

\-**end**:

  
ending aspect, like toolbar.

# Other Elements

The following naming patterns are based on component look and feel and
some interaction. For example, "*z-combobox-**button***" is the
drop-down button of combobox component.

  
\-**faker**:

  
faker element to mark a reference point at browser side, like grid,
listbox, and tree.

\-**text**:

  
text area.

\-**input**:

  
input element.

\-**separator**:

  
separator element.

\-**image**:

  
image area specified by comoponent's API.

\-**icon**

  
for component interaction

\-**popup**:

  
pop-up element, like datebox, combobox, and so on.

\-**button**:

  
a button.

# Tool Icons

The following naming patterns are based on component interactions. For
example, "*z-panel-**close***" is a closed icon of panel component.

<table>
<thead>
<tr class="header">
<th style="text-align:center;"><p>Switch</p></th>
<th style="text-align:center;"><p>Resize</p></th>
<th style="text-align:center;"><p>Split</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><dl>
<dt></dt>
<dd>
-<strong>close</strong>:
<dl>
<dt></dt>
<dd>
describes an icon which is closed, like tree, group, an so on.
</dd>
</dl>
</dd>
<dd>
-<strong>collapse</strong>:
<dl>
<dt></dt>
<dd>
describes a collapsible icon, like panel.
</dd>
</dl>
</dd>
<dd>
-<strong>collapsed</strong>:
<dl>
<dt></dt>
<dd>
describes a collapsible icon which is collapsed, like panel.
</dd>
</dl>
</dd>
<dd>
-<strong>expand</strong>:
<dl>
<dt></dt>
<dd>
describes an expandable icon, like panel.
</dd>
</dl>
</dd>
<dd>
-<strong>expanded</strong>:
<dl>
<dt></dt>
<dd>
describes an expandable icon which is expanded, like panel.
</dd>
</dl>
</dd>
</dl></td>
<td><dl>
<dt></dt>
<dd>
-<strong>maximize</strong>:
<dl>
<dt></dt>
<dd>
describes a maximizable icon.
</dd>
</dl>
</dd>
<dd>
-<strong>maximized</strong>:
<dl>
<dt></dt>
<dd>
describes a maximizable icon which is maximized.
</dd>
</dl>
</dd>
<dd>
-<strong>minimize</strong>:
<dl>
<dt></dt>
<dd>
describes a minimizable icon.
</dd>
</dl>
</dd>
</dl></td>
<td><dl>
<dt></dt>
<dd>
-<strong>splitter</strong>:
<dl>
<dt></dt>
<dd>
describes a splittable icon.
</dd>
</dl>
</dd>
<dd>
-<strong>nosplitter</strong>:
<dl>
<dt></dt>
<dd>
describes a non-splittable icon.
</dd>
</dl>
</dd>
</dl></td>
</tr>
</tbody>
</table>

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
