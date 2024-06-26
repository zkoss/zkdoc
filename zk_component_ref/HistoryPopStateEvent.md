

# HistoryPopStateEvent

- Demonstration: N/A
- Java API:
  <javadoc>org.zkoss.zk.ui.event.HistoryPopStateEvent</javadoc>
- JavaScript API: N/A

# Employment/Purpose

The history pop state event used with `onHistoryPopState` to notify that
user pressed BACK, FORWARD or others that causes the history changed
(but still in the same desktop).

All root components of all pages of the desktop will receives this
event.

# Example

The example shows how to push a history state and handle a
`HistoryPopStateEvent` object.

``` xml
<zk>
  <tabbox id="tb" height="300px">
    <attribute name="onSelect"><![CDATA[
      Tab selected = event.getReference();
      int selectedIndex = selected.getIndex();
      desktop.pushHistoryState(Collections.singletonMap("tabIndex", selectedIndex), "", "/" + selectedIndex);
    ]]>
    </attribute>
    <attribute name="onHistoryPopState"><![CDATA[
      Map state = event.getState();
      if (state != null)
        tb.setSelectedIndex(state.get("tabIndex"));
    ]]>
    </attribute>
    <tabs id="tabs">
      <tab id="A" label="Tab A" />
      <tab id="B" label="Tab B" />
      <tab id="C" label="Tab C" />
      <tab id="D" label="Tab D" />
      <tab id="E" label="Tab E" />
    </tabs>
    <tabpanels>
      <tabpanel>This is panel A</tabpanel>
      <tabpanel>This is panel B</tabpanel>
      <tabpanel>This is panel C</tabpanel>
      <tabpanel>This is panel D</tabpanel>
      <tabpanel>This is panel E</tabpanel>
    </tabpanels>
  </tabbox>
</zk>
```

- Line 6: Use
  <javadoc class="true"  method="pushHistoryState(java.lang.Object,java.lang.String,java.lang.String)">org.zkoss.zk.ui.Desktop</javadoc>
  to push a history state.
- Line 9: Listen `onHistoryPopState` on any root component to handle
  `HistoryPopStateEvent` object.

You can handle events in an MVC fashion.

``` java
public class TestComposer extends SelectorComposer<Tabbox> {
  @Wire
  private Tabbox tb;
  
  @Listen("onHistoryPopState = #tb")
  public void handleHistoryPopState(HistoryPopStateEvent event) {
    Map state = (Map) event.getState();
    if (state != null) {
      tb.setSelectedIndex((int) state.get("tabIndex"));
    }
  }
}
```

- Line 5: Listen the onHistoryPopState event of the root component \#tb.

Or you can use a special annotition
<javadoc type="interface">org.zkoss.bind.annotation.HistoryPopState</javadoc>
if you prefer MVVM.

``` java
public class TestVM {
  private int selectedIndex = 0;
  
  public int getSelectedIndex() {
    return selectedIndex;
  }
  
  public void setSelectedIndex(int index) {
    selectedIndex = index;
    Desktop desktop = Executions.getCurrent().getDesktop();
    desktop.pushHistoryState(Collections.singletonMap("tabIndex", selectedIndex), "", "/" + selectedIndex);
  }

  @HistoryPopState
  @SmartNotifyChange("selectedIndex")
  public void handleHistoryPopState(@ContextParam(ContextType.TRIGGER_EVENT) HistoryPopStateEvent event) {
    Map state = (Map) event.getState();
    if (state != null) {
      selectedIndex = ((int) state.get("tabIndex"));
    }
  }
}
```

- Line 14: a method annotated with `HistoryPopState` can handle
  HistoryPopStateEvent.

# Supported events

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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`

# Use cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date     | Content                                                                       |
|---------|----------|-------------------------------------------------------------------------------|
| 8.5.0   | Oct 2017 | [ZK-3711](http://tracker.zkoss.org/browse/ZK-3711): Support HTML5 history API |


