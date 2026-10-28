---
title: "Export"
---

You can export the computed Pivottable result to Excel or CSV. Excel export requires the Keikai libraries described in [Using Maven]({{site.baseurl}}/zk_pivottable_essentials/using_maven#add-excel-export-dependencies). Applications upgrading existing export code should also follow [Migrate to Pivottable 4.0.0]({{site.baseurl}}/zk_pivottable_essentials/migration_guide_4_0_0).

# Export to Microsoft Excel

Create a `PivotExportContext` from the component and pass it to `Exports.exportExcel()`. The exported sheet contains the complete computed result without paging.

## XLS Format

```java
try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
    PivotExportContext context = Exports.getExportContext(pivot, false, null);
    Exports.exportExcel(out, "xls", context, null);
    Filedownload.save(out.toByteArray(), "application/vnd.ms-excel", "pivot.xls");
}
```

## XLSX Format

```java
try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
    PivotExportContext context = Exports.getExportContext(pivot, false, null);
    Exports.exportExcel(out, "xlsx", context, null);
    Filedownload.save(out.toByteArray(),
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"pivot.xlsx");
}
```

## Customize Excel Styles

{% include supported-since.html version="4.0.0" %}

Pivottable 4.0.0 exposes Keikai model objects to custom style code. Implement [CellStyleConfigurator](https://www.zkoss.org/javadoc/latest/zkpvt/org/zkoss/pivot/util/poi/CellStyleConfigurator.html) with `SCell` instead of the former POI `Cell` type:

```java
Exports.exportExcel(out, "xlsx", context, new CellStyleConfigurator() {
    @Override
    public void config(PivotExportCell.Type type, SCell cell,
	StyleFactory styleFactory) {
	// Customize the cell with the Keikai model API.
    }

    @Override
    public String getDataFormat(String field) {
	// Return a format pattern for the specified data field.
        return null;
    }
});
```

The overloads that accept an existing workbook now take `io.keikai.model.SBook`. Call `SBook.destroy()` after finishing the export when your application creates the book. See [Export into an Existing Book]({{site.baseurl}}/zk_pivottable_essentials/migration_guide_4_0_0#export-into-an-existing-book) for the migration example and resource lifecycle requirements.

# Create an Export Context

`PivotExportContext` is an intermediate table or sheet representation. You can create it from a Pivottable component or directly from a `PivotModel` and `PivotRenderer`.

```java
// Create from a Pivottable component.
PivotExportContext context = Exports.getExportContext(pivot, open, titles);

// Create without a component instance.
PivotExportContext context =
	Exports.getExportContext(model, renderer, "column", open, titles);
```

The parameters control the exported result:

- `open`: Expands all header tree nodes for the export without changing the model.
- `titles`: Specifies the data, column, and row title cells, in that order. See [Title Cells]({{site.baseurl}}/zk_pivottable_essentials/create_pivottable#title-cells).

# Export to CSV

CSV export does not require the Keikai libraries:

```java
try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
    PivotExportContext context = Exports.getExportContext(pivot, true, TITLES);
    Exports.exportCSV(out, context);
    Filedownload.save(out.toByteArray(), "text/csv", "pivot.csv");
}
```
