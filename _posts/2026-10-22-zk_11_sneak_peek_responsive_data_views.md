---
author: jameschu
date: 2026-10-22
version: ZK 11
category: small-talk
title: "ZK 11 Sneak Peek: Responsive Grids and Listboxes for Mobile-Friendly Data Views"
---

**Turn an existing Grid or Listbox into a readable stacked layout while keeping the same model, renderer, events, and ZUL view.**

## Responsive Behavior for Existing Data Components

ZK 11 adds responsive stacking to the existing Grid and Listbox components. A data view can remain a normal table at wider sizes and change to labeled cards when its container becomes narrow.

The same component is used in both layouts. The model, row renderer, MVVM bindings, selection state, paging, and server-side events do not need a separate mobile implementation.

![A wide Grid table and a narrow stacked-card layout rendered from the same ZK component.](/assets/images/small-talk/zk11-sneak-peek/responsive_grid_demo.png)

*The running ZK 11 demo renders the same Grid as a table in a wide container and as labeled cards in a narrow one.*

## Enable Stacking on a Grid

```xml
<grid model="@load(vm.employees)"
      responsive="stacking"
      responsiveColumns="sm-1 md-none"
      width="100%">
    <columns>
        <column label="Name"/>
        <column label="Email"/>
        <column label="Department"/>
    </columns>
    <template name="model">
        <row>
            <label value="@load(each.name)"/>
            <label value="@load(each.email)"/>
            <label value="@load(each.department)"/>
        </row>
    </template>
</grid>
```

responsive="stacking" enables the behavior. responsiveColumns controls the number of cards at each breakpoint and when the component returns to table form. In the example, small containers show one card per row and medium or wider containers use the regular table.

The calculation follows the component's available container width. A Grid in a narrow dashboard panel can therefore stack even when the browser window is wide.

![Diagram showing a ZK Grid changing from a table to multiple card columns and then a single card column as its container narrows.](/assets/images/small-talk/zk11-sneak-peek/responsive_grid_breakpoints.png)

*Responsive stacking follows the component's available container width and configured breakpoints.*

## Headers Become Field Labels

In stacked mode, each column header becomes a label beside its cell value. Users can still identify each field after the horizontal row changes to a vertical layout.

Columns that are useful on desktop but unnecessary on a small screen can be excluded from the stacked view.

```xml
<column label="Internal Cost"
        responsiveVisible="false"/>
```

The column remains part of the normal table. Only its narrow stacked presentation is hidden. This is useful for secondary metrics, internal identifiers, or actions that are not appropriate on mobile.

## Grid and Listbox Keep Their Existing Roles

Use Grid when the screen presents records and calculated values. Use Listbox when row selection is the main interaction. Both components support responsive stacking, so a screen can keep the component that already matches its behavior.

Selection, checkmarks, commands, and server-side listeners continue to work because stacking changes layout rather than application state. Existing renderers can also continue to create the cell content.

## Where Stacking Works Best

Stacking is well suited to customer records, orders, invoices, approval tasks, cases, and inventory items. These records remain understandable when their fields are read vertically.

It is less suitable for spreadsheet-like data where users must compare many numeric columns across rows. That type of screen may still be clearer as a desktop table with frozen columns or horizontal scrolling.

## Summary

This ZK 11 feature provides:

- Responsive behavior added to the existing Grid and Listbox
- One model, renderer, event flow, and ZUL view
- Table layout at wider sizes and labeled cards at narrow sizes
- Breakpoint-based card counts and selective field visibility

## Try It in ZK 11 EE Freshly

Responsive stacking is available in the latest ZK 11 EE FL (freshly) build. Try it first on a representative Grid or Listbox, then decide which columns should remain visible in the narrow layout. This feature is most useful when a current data view already works well on desktop but also needs to fit a phone, tablet, split view, or dashboard panel.

## Resources

- [Grid component reference](https://docs.zkoss.org/zk_component_ref/grid)
- [Listbox component reference](https://docs.zkoss.org/zk_component_ref/listbox)
- [ZK GitHub repository](https://github.com/zkoss/zk)
- [ZK Forum](https://forum.zkoss.org/)

