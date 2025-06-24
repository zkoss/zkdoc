You can export the computed result of Pivottable to other formats.

# Export to Microsoft Excel

Given a Pivottable instance, you can dump the current result in .xls
format to an OutputStream. The exported Excel file contains a sheet that
reflects the computed result you see on browser windows, without paging.
For example,

## XLS Format

```java
ByteArrayOutputStream out = new ByteArrayOutputStream();
PivotExportContext context = Exports.getExportContext(pivot, false, null);
Exports.exportExcel(out, "xls", context, null); // writes Pivottable information to the output stream
Filedownload.save(out.toByteArray(), "application/vnd.ms-excel", "pivot.xls"); // file download
try {
    out.close();
} catch (IOException e) {}
```

## XLSX format

It needs extra jar files including

- dom4j-1.6.1.jar
- ooxml-schemas-1.1.jar
- xmlbeans-2.3.0.jar

```java
ByteArrayOutputStream out = new ByteArrayOutputStream();
PivotExportContext context = Exports.getExportContext(pivot, false, null);
Exports.exportExcel(out, "xlsx", context, null); // writes Pivottable information to the output stream
Filedownload.save(out.toByteArray(), "application/vnd.ms-excel", "pivot.xlsx"); // file download
try {
    out.close();
} catch (IOException e) {}
```

## Change Styles

The export utility provides a chance to handle Excel style via POI API.
You can specify custom styles by passing a
[org.zkoss.pivot.util.poi.CellStyleConfigurator](https://www.zkoss.org/javadoc/latest/zkpvt/org/zkoss/pivot/util/poi/CellStyleConfigurator.html).
For example,

```java
Exports.exportExcel(out, "xls", context, new CellStyleConfigurator() {
    public void config(PivotExportCell.Type type, Cell cell, StyleFactory styleFactory) {
        switch (type) {
            // you can specify style by cell type, use StyleFactory to create new style
        }
    }

    public String getDateFormat(String field) {
        //specify date format by filed
        return null;
    }
});
```

# PivotExportContext

PivotExportContext is an intermediate result for exporting Pivottable to
a table/sheet data structure. You can construct it from a Pivottable, or
from a PivotModel and a PivotRenderer (so you don't need a component
instance).

```java
// construct from a Pivottable
PivotExportContext context = Exports.getExportContext(pivot, open, titles); 

// construct from a PivotModel and a PivotRenderer
// in this case, you also have to specify the data field orientation ("column" or "row")
PivotExportContext context = Exports.getExportContext(model, renderer, "column", open, titles); 
```

There are two additional parameters in the API:

- boolean open: Expand all header tree nodes for the export, but the
  model itself it not changed.
- String\[\] titles: The text in the title cells (data title, column
  title, row title, respectively). See [ title cells definition]({{site.baseurl}}/zk_pivottable_essentials/quick_start/concept#Trivia).

 

# Export to CSV

You can also export to CSV format in a similar manner. For example,

```java
ByteArrayOutputStream out = new ByteArrayOutputStream();
PivotExportContext context = Exports.getExportContext(pivot, true, TITLES);
Exports.exportCSV(out, context);
Filedownload.save(out.toByteArray(), "text/csv", "pivot.csv");
try {
    out.close();
} catch (IOException e) {}
```

 

## Version History

| Version | Date      | Content                             |
|---------|-----------|-------------------------------------|
| 2.0.0   | May, 2012 | Support Microsoft Excel xlsx format |
|         |           |                                     |
