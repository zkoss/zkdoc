---
author: jameschu
date: 2026-11-24
version: ZK 11
category: small-talk
title: "ZK 11 Sneak Peek: Responsive Grids and Listboxes for Mobile-Friendly Data Views"
---

**Turn an existing Grid or Listbox into a readable stacked layout while keeping the same model, renderer, events, and ZUL view.**

## Responsive Grid and Listbox for Narrow Layouts

A Grid or Listbox can fit comfortably on a desktop but become difficult to read in a narrow dashboard panel, split view, tablet, or phone. Reducing column widths or adding horizontal scrolling may help, but neither makes the content easy to scan. Creating a separate mobile template adds rendering logic and maintenance work.

ZK 11 introduces responsive stacking as a new feature for existing ZK Grid and Listbox. When the component’s container reaches a configured breakpoint, each row changes from a table row into a card, with column headers serving as field labels beside the corresponding values. When more space becomes available, the component returns to its normal table layout.

This lets developers adapt existing data views to narrow layouts while keeping the same model, row renderer, and MVVM bindings. Selection, paging, and server-side events continue to use the same component, reducing the need to build and maintain a separate mobile view.

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

Use responsive="stacking" to enable the behavior. responsiveColumns controls the number of cards per row at each breakpoint and when the component returns to table form. For example, you can configure a regular table for wide containers, two cards per row for medium containers, and one card per row for small containers.

![Diagram showing a ZK Grid changing from a table to multiple card columns and then a single card column as its container narrows.](/assets/images/small-talk/zk11-sneak-peek/responsive_grid_breakpoints.png)

*These breakpoints follow the component’s available container width. A Grid in a narrow dashboard panel can therefore stack even when the browser window is wide.*

## Field Labels and Column Visibility

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

## Try It in ZK 11 EE-Eval Freshly

ZK 11 is coming soon, and you can preview responsive stacking in the latest ZK 11 EE-Eval Freshly build (11.0.0.FL.20261021-Eval).

To try it in your existing ZK application, update your Maven `pom.xml` with the following configuration:

**1. Add the ZK Evaluation Maven Repository**

```xml
<repositories>
    <repository>
        <id>ZK Evaluation</id>
        <url>https://mavensync.zkoss.org/eval/</url>
    </repository>
</repositories>
```

**2. Update your ZK version and EE dependency**

```xml
<properties>
    <zk.version>11.0.0.FL.20261021-Eval</zk.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.zkoss.zk</groupId>
        <artifactId>zkmax</artifactId>
        <version>${zk.version}</version>
    </dependency>
</dependencies>
```

Make sure all ZK dependencies use the same evaluation version to avoid version conflicts.

Once configured, try responsive stacking on an existing Grid or Listbox. Define the breakpoints, choose which columns appear in the stacked view, and resize your browser to see how the layout adapts to different screen sizes.

For more details, see the [ZK Maven Setup Guide](https://docs.zkoss.org/zk_installation_guide/maven_setup).

## Resources

- [Grid component reference](https://docs.zkoss.org/zk_component_ref/grid)

- [Listbox component reference](https://docs.zkoss.org/zk_component_ref/listbox)

- [ZK GitHub repository](https://github.com/zkoss/zk)
