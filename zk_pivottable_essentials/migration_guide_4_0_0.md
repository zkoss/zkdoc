---
title: "Migrate to Pivottable 4.0.0"
permalink: /zk_pivottable_essentials/migration_guide_4_0_0
---

This guide explains how to migrate an application from Pivottable 3.1.x to 4.0.0. Pivottable 4.0.0 moves Excel export from `keikai-poi` to the Keikai 7 spreadsheet engine. The component, its events, and the PivotModel interfaces remain unchanged.

If your application does not call `Exports.exportExcel()` or implement `CellStyleConfigurator`, you only need to update the runtime requirements and dependencies.

# Update the Runtime Requirements

{% include supported-since.html version="4.0.0" %}

Pivottable 4.0.0 raises the minimum Java and ZK versions:

| Requirement | Pivottable 3.1.x | Pivottable 4.0.0 |
|-------------|------------------|------------------|
| Java | 11 | 17 |
| ZK | 10.0.0 | 10.3.1 |
| Keikai for Excel export | 5.13.0 | 7.0.0 |

# Replace the Excel Export Dependencies

Remove `keikai-poi`, `keikai-poiex`, and `ooxml-schemas`. If the application is upgrading from a version before 3.1.0, also remove `zpoi` and `zpoiex`.

Add `keikai-model` and explicitly add `keikai-native` as a runtime dependency:

```xml
<dependency>
    <groupId>io.keikai</groupId>
    <artifactId>keikai-model</artifactId>
    <version>7.0.0</version>
</dependency>
<dependency>
    <groupId>io.keikai</groupId>
    <artifactId>keikai-native</artifactId>
    <version>7.0.0</version>
    <scope>runtime</scope>
</dependency>
```

`keikai-native` contains the spreadsheet engine and is not pulled in transitively. Applications that do not export Excel files do not need these Keikai dependencies. See [Using Maven]({{site.baseurl}}/zk_pivottable_essentials/using_maven) for the complete repository configuration.

# Migrate the Export API

The Pivottable export class names remain unchanged, but their POI types become Keikai model types. The compiler identifies the affected call sites after you update the dependencies.

| Pivottable 3.1.x | Pivottable 4.0.0 |
|------------------|------------------|
| `org.zkoss.poi.ss.usermodel.Workbook` | `io.keikai.model.SBook` |
| `org.zkoss.poi.ss.usermodel.Cell` | `io.keikai.model.SCell` |
| `org.zkoss.poi.ss.usermodel.CellStyle` | `io.keikai.model.SCellStyle` |
| `org.zkoss.poi.ss.usermodel.Font` | `io.keikai.model.SFont` |

The format-string overloads, including `xls`, `xlsx`, and `xlsx.static`, remain available.

## Validate Export Sheet Names

`PivotExportSheetConfig` throws `IllegalArgumentException` when the pivot and data sheets have the same name, ignoring case, or when a sheet name violates an Excel restriction. A sheet name must:

- Contain between 1 and 31 characters.
- Not contain `:`, `\`, `/`, `?`, `*`, `[`, `]`, U+0000, or U+0003.
- Not start or end with an apostrophe.
- Not be `History`.

The `xlsx` exporter does not support `!` in the data sheet name in Keikai 7.0.0 ([KEIKAI-898](https://zkoss.atlassian.net/browse/KEIKAI-898)). Use another name or the `xlsx.static` format. The pivot sheet name may contain `!`.

## Export into an Existing Book

The `exportExcel(out, book, ...)` overload now accepts an `SBook` and writes the completed book to the output stream. Do not call `book.write(out)` afterward.

```java
SBook book = SBooks.createBook("pivot");
try {
    book.createSheet("Notes").getCell(0, 0)
	.setStringValue("Additional information");
    Exports.exportExcel(out, book, context, styleConfigurator);
} finally {
    book.destroy();
}
```

Migrate existing POI workbook code as follows:

- For an `HSSFWorkbook` imported from a file, use `SImporters.getImporter().imports(file, "report.xls")`.
- For a newly created `HSSFWorkbook`, call `Exports.exportExcel(out, Exports.XLS, context, styleConfigurator)` instead.
- Do not give custom sheets the export sheet names, such as the default `Sheet0` and `Sheet1`, or names specified through `PivotExportSheetConfig`.

Always call `destroy()` in a `finally` block for every `SBook` your application creates or imports. The Keikai engine keeps book resources outside the Java heap, so the garbage collector cannot release them. `Exports` releases the books it creates internally.

# Migrate Custom Excel Styles

`CellStyleConfigurator.config()` now receives an `SCell`. Treat `SCellStyle` as read-only because styles can be shared by multiple cells. Build a new style from the cell's existing style instead of modifying it directly.

Before 4.0.0:

```java
CellStyle style = styleFactory.createCellStyle();
style.setFont(styleFactory.getOrCreateFontWithBoldWeight(
	Font.BOLDWEIGHT_BOLD));
cell.setCellStyle(style);
```

Since 4.0.0:

```java
cell.setCellStyle(styleFactory.styleBuilder(cell.getCellStyle())
	.font(styleFactory.getOrCreateFontWithBoldWeight(
		StyleFactory.BOLD_WEIGHT_BOLD))
	.build());
```

Other `StyleFactory` changes include:

- `createDataFormat(String)` returns the format `String` instead of a `short`.
- `getOrCreateFont*()` methods return `SFont`.
- `getOrCreateFontWithColor(String)` accepts an HTML color.
- `getBook()`, `fontBuilder()`, and `toHtmlColor(short)` are available for advanced customization.
- A solid fill uses `backColor`, corresponding to POI's `setFillForegroundColor()`. `fillColor` corresponds to POI's `setFillBackgroundColor()`.
- `Font.BOLDWEIGHT_BOLD` becomes `StyleFactory.BOLD_WEIGHT_BOLD`.

The `getOrCreateFont*()` methods start with the book's default font and change only the requested property. Specify every font property when the output must use a particular font, such as Arial 10 pt.

# Review Exported File Differences

Pivottable 4.0.0 preserves cell values, merged regions, sheets, number formats, column widths, and the pivot table's layout, labels, and values. Review the following intentional differences when testing existing exports:

- Fonts created by `getOrCreateFont*()` now appear in the exported file and affect auto-sized column widths.
- Subtotals appear below each group, and disabled grand totals remain disabled after refreshing the pivot table in Excel.
- Excel 365's `hideValuesRow` extension is written.
- Fields containing every subtotal function open correctly in Excel.
- A `SUM_OR_COUNT` subtotal is exported as Sum in both the field and its rows. Avoid adding both `SUM` and `SUM_OR_COUNT` to the same field because an Excel pivot table can keep only one of the duplicate Sum entries.
- Auto-sizing XLSX columns no longer fails when a label contains a line break.
- Data sheet names containing spaces produce a valid pivot cache source reference.
- XLS rows use a height of 12.75 pt, and the resulting XLS files are smaller than those generated by 3.1.x.

# Known Limitations

- Keikai 7.0.0 does not support `!` in an XLSX data sheet name. Use another name or `xlsx.static` as described in [KEIKAI-898](https://zkoss.atlassian.net/browse/KEIKAI-898).
- The Keikai 7.0.0 XLS writer can round the final binary digit of some numbers. For example, `709.8000000000001` can be written as `709.8`. Verify exact-value requirements before choosing XLS output.

# Verify the Migration

After the application compiles, test at least one representative export for each format your application supports. Verify custom styles, sheet names, formulas, subtotal settings, grand totals, column widths, and numeric precision. Also confirm that every application-created `SBook` is destroyed after use.
