---
title: "Cell"
---

- Demonstration: [Grid (Spreadsheet Functionalities)](http://www.zkoss.org/zkdemo/grid/spreadsheet_functionalities)
- Java API: [org.zkoss.zul.Cell](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Cell.html)
- JavaScript API: [zul.wgt.Cell](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.wgt.Cell.html)

# Employment/Purpose

This Cell must only be a child of [Row](/zk_component_ref/row), [Hbox](/zk_component_ref/hbox), or [Vbox](/zk_component_ref/vbox). Other components cannot be its parent. Use it to control alignment and row/column span.

# Example

![](/zk_component_ref/images/ZKComRef_Cell_Example.png)

```xml
<zk>
    <grid>
        <columns>
            <column label="A" />
            <column label="B" />
            <column label="C" />
            <column label="D" />
        </columns>
        <rows>
            <row>
                <cell rowspan="4" align="center" valign="bottom">
                    <label value="item 1" />
                </cell>
                <cell colspan="3">
                    <label value="item 2" />
                </cell>
            </row>
            <row>
                <cell colspan="2"  align="center">
                    <label value="item 3" />
                </cell>
                <label value="item 4" />
            </row>
            <row>
                <label value="item 5" />
                <label value="item 6" />
                <label value="item 7" />
            </row>
            <row>
                <label value="item 8" />
                <label value="item 9" />
                <label value="item 10" />
            </row>
        </rows>
    </grid>
</zk>
```

![](/zk_component_ref/images/ZKComRef_Cell_Example_Hbox.png)

```xml
<zk>
    <window title="hbox" border="normal" width="320px">
        <hbox width="300px" pack="center">
            <cell hflex="1" align="center">
                <label value="item 1" />
            </cell>
            <cell hflex="1" align="center">
                <label value="item 2" />
            </cell>
        </hbox>
    </window>
</zk>
```

# Properties

##  rowspan

It specifies the number of rows this cell should occupy. It has the same
effect as HTML TR tag's `rowspan` attribute does.


# Comparison to the default (no Cell) scenario

The Cell component is designed to provide full control over the DOM structure, meaning developers should expect to handle some lower-level styling.

For example, consider the following scenario:

```xml
    <grid>
        <columns>
            <column label="A" />
            <column label="B" />
        </columns>
        <rows>
            <row>
                <label>A</label>
                <cell>
                    <label>B</label>
                </cell>
            </row>
        </rows>
    </grid>
```
In a browser, the 2 table cells visually look no difference.

## DOM Structure Differences

When embedding components in a Grid row:

* **Regular items (without `<cell>`)**: The `Row` component automatically wraps the child in a wrapper `<td>` with an inner `<div>` content wrapper:

  ```html
  <td class="z-row-inner">
      <div class="z-row-content">
          <!-- Component HTML (e.g. <span class="z-label">) -->
      </div>
  </td>
  ```

* **With `<cell>`**: The `<cell>` component renders its own `<td>` directly under the `<tr>`, with no inner `<div>` wrapper:

  ```html
  <td class="z-cell">
      <!-- Component HTML (e.g. <span class="z-label">) -->
  </td>
  ```

## Rationale Behind the Design

This structural difference is by design to support row spanning (`rowspan`):
1. **HTML Specification Constraint**: The HTML standard specifies that `rowspan` and `colspan` attributes must reside on a `<td>` element that is a direct child of a table row (`<tr>`).
2. **Invalid HTML Prevention**: If the parent `Row` continued to output its default `<td>` wrapper, any nested `<cell>` trying to output its own spanned `<td>` would result in nested table cells (`<tr>` -> `<td>` -> `<td>`), which is invalid HTML.
3. **Control Delegated**: Therefore, when `Row` detects a `<cell>` child, it yields rendering responsibilities to the `<cell>` component, which outputs a single, directly attached `<td>` element.

## CSS and Styling Implications

Because the inner wrapper `div.z-row-content` is absent when using `<cell>`, CSS selectors and styles apply differently:
* **Padding**: By default, regular items have their padding applied to the inner wrapper (`div.z-row-content`), whereas `<cell>` elements have their padding applied directly to the `td.z-cell` element.
* **Hover and Text Colors**: Hover background styles are applied to both, but text color inheritance paths differ since regular items inherit colors through `.z-row-content`.
* **Custom Styles**: If you write custom CSS selectors targeting `td` or direct cell wrappers, they may behave differently between regular cells and `<cell>` components.

## Best Practice Recommendations

* **Standard Usage**: If you do not have any custom DOM-level styling (e.g., you rely purely on ZK's default themes), mixing `<cell>` and regular items is perfectly safe.
* **CSS Customization / DOM Consistency**: If you apply custom CSS styling targeting the DOM element level (such as direct cell borders, paddings, or selector paths), mixing `<cell>` and regular items can lead to layout inconsistency. In this case, **it is highly recommended to wrap all child components of all rows in `<cell>`**, ensuring the entire grid uses a uniform `td.z-cell` DOM tree.

```xml
<!-- Recommended: Wrap all cells in <cell> for DOM and CSS consistency -->
<grid>
    <columns>
        <column label="A" />
        <column label="B" />
        <column label="C" />
    </columns>
    <rows>
        <row>
            <cell><label value="Item A1" /></cell> <!-- No span needed, but wrapped -->
            <cell><label value="Item A2" /></cell>
            <cell><label value="Item A3" /></cell>
        </row>
        <row>
            <cell colspan="2"><label value="Spans A & B" /></cell>
            <cell><label value="Item B3" /></cell>
        </row>
    </rows>
</grid>
```

# Supported Events

- Inherited Supported Events: [XulElement](/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*ALL`
