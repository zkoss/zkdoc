

ZK Pivottable JSP tag can be used in a JSP page in much the same way as
any other custom JSP tag.

First, you need to declare ZK JSP taglib as shown below.

```xml
<%@ taglib prefix="zk" uri="http://www.zkoss.org/jsp/zul"%>
```

Then, you can start using ZK Pivottable in your JSP page like below.

```xml
<zk:pivottable id="pivot" />
```

ZK Pivottable JSP tag supports all the properties of the corresponding
ZUL component tag.

Below is another example of using the pivottable component with the
width and height specified.

```xml
<zk:pivottable id="pivot" 
     height="500px" />
```

Now, the pivottable needs raw data and field specification to start
analyzing the data. In order to do that, you would need to write a
controller to supply the raw data.

## JSP

Here is a more complete example of using pivottable component in a JSP
page.

```xml
...
<%@ taglib prefix="zss" uri="http://www.zkoss.org/jsp/zul"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ZK Pivottable JSP Tag Example</title>
</head>
<body style="height: 100%">
<zk:page>
    <zk:pivottable id="pivot" 
        apply="myapp.PivotJspComposer">
        <zk:div>Mileage</zk:div>
        <zk:div>Destination</zk:div>
        <zk:div>Origin</zk:div>
    </zk:pivottable>
</zk:page>
</body>
</html>
```

Example above shows that you would use the "apply" attribute to specify
the controller for supplying the raw data to pivottable.

## Java

### Prepare raw data for ZK Pivottable

The easiest way to supply raw data to ZK Pivottable is to write a
controller that directly wires the Java object to the pivottable
component.

First, the controller would extends the
[org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html) class. In the
controller, you would use the "Wire" annotation to automatically refer
to the pivottable with the id "pivot".

```java
public class PivotJspComposer extends SelectorComposer<Pivottable> {
    ...
    @Wire
    private Pivottable pivot;
    ...
}
```

Next, inside the controller, you would convert the data to be analyzed
into a two-dimensional list. The example below illustrates the data
conversion process required by the current pivottable implementation.
Lines 4-9 represents the data your application retrieves from somewhere
else, typically from databases through the use of DAO's. Lines 11-13
represents the intermediate data conversion dictated by incompatible
data types.

```java
...
    static List<List<Object>> getData() {
        ...
        Object[][] objs = new Object[][] {
            { "Carlene Valone", "Tameka Meserve",    "ATB Air", "AT15",  dt(-7), "Berlin",     "Paris",     186.6, 545  },
            { "Antonio Mattos", "Sharon Roundy",     "Jasper",  "JS1",   dt(-5), "Frankfurt",  "Berlin",    139.5, 262  },
            { "Russell Testa",  "Carl Whitmore",     "Epsilon", "EP2",   dt(-3), "Dublin",     "London",    108.0, 287  },
            ...
        };
        ...
        List<List<Object>> list = new ArrayList<List<Object>>();
        for (Object[] a : objs)
            list.add(Arrays.asList(a));
    
        return list;
    }
...
```

Also, you would need to give labels to each column of the data.

```java
...
    private static List<String> getColumns() {
        return Arrays.asList(new String[] {
            "Agent", "Customer", "Airline", "Flight", "Date", "Origin", "Destination", "Price", "Mileage"
        });
    }
...
```

### Supply data model to ZK Pivottable

After the raw data has been prepared, we are now ready to supply it to
the pivottable in the form of a data model.

```java
...
    // Data model for pivottable
    private TabularPivotModel pivotModel;
...
    public void doAfterCompose(Pivottable comp) throws Exception {
        super.doAfterCompose(comp);
        ...
        // Create data model for pivottable
        pivotModel = new TabularPivotModel(getData(), getColumns());
        pivotModel.setFieldType("Origin",      PivotField.Type.ROW);
        pivotModel.setFieldType("Destination", PivotField.Type.COLUMN);
        pivotModel.setFieldType("Mileage",     PivotField.Type.DATA);
        
        pivot.setModel(pivotModel);
    }
...
```

- Line 3: declare the data model for pivottable
- Line 9: instantiate the data model with the raw data and column labels
- Line 14: pivottable would start using the data model

Notice that we would also need to specify the row, column and data
fields. In the example above, lines 10-12 specifies that the mileage
from origin to destination would be summarized into a pivottable.

## Sample Application

Please goto
[github](https://github.com/leeyt/ZKSmalltalk/tree/master/zkpvtjsp/) for
the complete source code of the sample application.

To build the sample war file, please enter **mvn war:war** at project
root.
