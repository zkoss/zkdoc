

Here we describe how to implement a groups model
([org.zkoss.zul.GroupsModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModel.html)). For the
concept of component, model and render, please refer to [the Model-driven Display section]({{site.baseurl}}/zk_dev_ref/mvc/model/list_model#Model-driven_Display).

A groups model is used to drive components that support groups of data.
The groups of data is a two-level tree of data: a list of grouped data
and each grouped data is a list of elements to display. Here is [a live demo](http://www.zkoss.org/zkdemo/grid/grouping). Currently, both
[org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html) and
[org.zkoss.zul.Grid](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Grid.html) support a list of grouped data.

Instead of implementing
[org.zkoss.zul.GroupsModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModel.html), it is
suggested to extend from
[org.zkoss.zul.AbstractGroupsModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractGroupsModel.html), or to use one of
the default implementations as following:

|             | [org.zkoss.zul.SimpleGroupsModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleGroupsModel.html)                                       | [org.zkoss.zul.GroupsModelArray](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModelArray.html)                                                                                                                   |
|-------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Usage       | The grouping is **immutable**, i.e., re-grouping is not allowed                          | Grouping is based on a comparator (java.util.Comparator)                                                                                                            |
| Constructor | The data must be grouped, i.e., data\[0\] is the first group, data\[1\] the second, etc. | The data is *not* grouped, i.e., data\[0\] is the first element. The constructor requires a comparator that will be used to group them.                             |
| Version     | Since 3.5.0                                                                              | Since 5.0.5; For 5.0.4 or prior, please use [org.zkoss.zul.ArrayGroupsModel](http://www.zkoss.org/javadoc/5.0.4/zk/org/zkoss/zul/ArrayGroupsModel.html) (the same). |

# Example: Immutable Grouping Data

If your data is already grouped and the grouping won't be changed, then
you could use [org.zkoss.zul.SimpleGroupsModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleGroupsModel.html) as
follows:

```xml
<zk>
    <zscript>
        String[][] datas = new String[][] {
            new String[] { //group 1
                // Today
                "RE: Bandbox Autocomplete Problem",
                "RE: It's not possible to navigate a listbox' ite",
                "RE: FileUpload"
            },
            new String[] { //group 2
                // Yesterday
                "RE: Opening more than one new browser window",
                "RE: SelectedItemConverter Question"
            },
            new String[] { //group 3
                "RE: Times_Series Chart help",
                "RE: SelectedItemConverter Question"
            }            
        };
        GroupsModel model = new SimpleGroupsModel(datas,
            new String[]{"Date: Today", "Date: Yesterday", "Date: Last Week"});
            //the 2nd argument is a list of group head
    </zscript>
    <grid model="${model}">
        <columns sizable="true">
            <column label="Subject"/>
        </columns>
    </grid>
</zk>
```

Then, the result

![]({{site.baseurl}}/zk_dev_ref/images/drgroupsmodel.png)

# Sorting and Regrouping

If your groups model allows the end user to sort and/or to re-group
(i.e., grouping data based on different criteria), you have to implement
[org.zkoss.zul.ext.GroupsSortableModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ext/GroupsSortableModel.html)
too. Then,
<javadoc method="group(java.util.Comparator,boolean,int)" type="interface">org.zkoss.zul.ext.GroupsSortableModel</javadoc>
will be called if the user requests to re-group the data based on a
particular column. And,
<javadoc method="sort(java.util.Comparator,boolean,int)" type="interface">org.zkoss.zul.ext.GroupsSortableModel</javadoc>
will be called if the user requests to sort the data based on a
particular column.

[org.zkoss.zul.GroupsModelArray](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModelArray.html) supports both sorting
and re-grouping as described below:

- Sorting: [org.zkoss.zul.GroupsModelArray](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModelArray.html) sorts each
  group separately by using the specified comparator
  (java.util.Comparator).
- Re-grouping: [org.zkoss.zul.GroupsModelArray](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModelArray.html)
  re-groups by assuming two data belong to the same group if the
  compared result is the same (i.e., the given java.util.Comparator
  returns 0).
  - For better control, you could implement
    [org.zkoss.zul.GroupComparator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupComparator.html),
    and pass an instance to, say,
    <javadoc method="setSortAscending(java.util.Comparator)">org.zkoss.zul.Column</javadoc>
    and
    <javadoc method="setSortDescending(java.util.Comparator)">org.zkoss.zul.Column</javadoc>.

![](/zk_dev_ref/images/Grouping_model_explain.png)

# Example: Grouping Tabular Data

Suppose you have the data in a two-dimensional array (see below), and
you want to allow the user to group them based on a field selected by
the user (such as food's name or food's calories).

![]({{site.baseurl}}/zk_dev_ref/images/drgroupsmodelarray.png)

```java
//Data
Object[][] _foods = new Object[][] { //Note: the order does not matter
    new Object[] { "Vegetables", "Asparagus", "Vitamin K", 115, 43},
    new Object[] { "Vegetables", "Beets", "Folate", 33, 74},
    new Object[] { "Vegetables", "Bell peppers", "Vitamin C", 291, 24},
    new Object[] { "Vegetables", "Cauliflower", "Vitamin C", 92, 28},
    new Object[] { "Vegetables", "Eggplant", "Dietary Fiber", 10, 27},
    new Object[] { "Vegetables", "Onions", "Chromium", 21, 60},
    new Object[] { "Vegetables", "Potatoes", "Vitamin C", 26, 132},
    new Object[] { "Vegetables", "Spinach", "Vitamin K", 1110, 41},
    new Object[] { "Vegetables", "Tomatoes", "Vitamin C", 57, 37},
    new Object[] { "Seafood", "Salmon", "Tryptophan", 103, 261},
    new Object[] { "Seafood", "Shrimp", "Tryptophan", 103, 112},
    new Object[] { "Seafood", "Scallops", "Tryptophan", 81, 151},
    new Object[] { "Seafood", "Cod", "Tryptophan", 90, 119},
    new Object[] { "Fruits", "Apples", "Manganese", 33, 61},
    new Object[] { "Fruits", "Cantaloupe", "Vitamin C", 112, 56},
    new Object[] { "Fruits", "Grapes", "Manganese", 33, 61},
    new Object[] { "Fruits", "Pineapple", "Manganese", 128, 75},
    new Object[] { "Fruits", "Strawberries", "Vitamin C", 24, 48},
    new Object[] { "Fruits", "Watermelon", "Vitamin C", 24, 48},
    new Object[] { "Poultry & Lean Meats", "Beef, lean organic", "Tryptophan", 112, 240},
    new Object[] { "Poultry & Lean Meats", "Lamb", "Tryptophan", 109, 229},
    new Object[] { "Poultry & Lean Meats", "Chicken", "Tryptophan", 121, 223},
    new Object[] { "Poultry & Lean Meats", "Venison ", "Protein", 69, 179},
    new Object[] { "Grains", "Corn ", "Vatamin B1", 24, 177},
    new Object[] { "Grains", "Oats ", "Manganese", 69, 147},
    new Object[] { "Grains", "Barley ", "Dietary Fiber", 54, 270}
};
```

Then, we can make it a groups model by extending from
[org.zkoss.zul.GroupsModelArray](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModelArray.html):

```java
//GroupsModel
package foo;
public class FoodGroupsModel extends GroupsModelArray {
    public FoodGroupsModel(java.util.Comparator cmpr) {
        super(_foods, cmpr); //assume we
        //cmpr is used to group 
    }
    protected Object createGroupHead(Object[] groupdata, int index, int col) {
        return ((Object[])groupdata[0])[col];
        //groupdata is one of groups after GroupsModelArray groups _foods
        //here we pick the first element and use the col-th column as the group head
    }
    private static Object[][] _foods = new Object[][] {
        //...tabular data as shown above
    };
};
```

In addition, we have to implement a comparator to group the data based
on the given column as follows.

```java
package foo;
public class FoodComparator implements java.util.Comparator {
    int _col;
    boolean _asc;
     public FoodComparator(long col, boolean asc) {
            _col = (int) col; //which column to compare
        _asc = asc; //ascending or descending
    }
    public int compare(Object o1, Object o2) {
            Object[] data = (Object[]) o1;
            Object[] data2 = (Object[]) o2;
            int v = ((Comparable)data[_col]).compareTo(data2[_col]);
        return _asc ? v: -v;
    }
}
```

Since the data will be displayed in multiple columns, we have to
implement a renderer. Here is an example.

```java
public class FoodGroupRenderer implements RowRenderer {
    public void render(Row row, java.lang.Object obj, int index) {
        if (row instanceof Group) {
            //display the group head
            row.appendChild(new Label(obj.toString()));
        } else {
            //display an element
            Object[] data = (Object[]) obj;
            row.appendChild(new Label(data[0].toString()));
            row.appendChild(new Label(data[1].toString()));
            row.appendChild(new Label(data[2].toString()));
            row.appendChild(new Label(data[3].toString()));
            row.appendChild(new Label(data[4].toString()));
        }
    }
};
```

Finally we could group them together in a ZUML document as follows.

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" ?>
<grid rowRenderer="${c:new('foo.FoodGroupRenderer')}"
   model="${c:new1('foo.FoodGroupsModel', c:new2('foo.FoodComparator', 0, true))}">
   <!-- Initially, we group data on 1st column in ascending order -->
    <columns menupopup="auto"> <!-- turn on column's menupopup -->
        <column label="Category"
         sortAscending="${c:new2('foo.FoodComparator', 0, true)}"
         sortDescending="${c:new2('foo.FoodComparator', 0, false)}"
         sortDirection="ascending"/> <!-- since it is initialized as sorted -->
        <column label="Name"
         sortAscending="${c:new2('foo.FoodComparator', 1, true)}"
         sortDescending="${c:new2('foo.FoodComparator', 1, false)}"/>
        <column label="Top Nutrients"
         sortAscending="${c:new2('foo.FoodComparator', 2, true)}"
         sortDescending="${c:new2('foo.FoodComparator', 2, false)}"/>
        <column label="% of Daily"
         sortAscending="${c:new2('foo.FoodComparator', 3, true)}"
         sortDescending="${c:new2('foo.FoodComparator', 3, false)}"/>
        <column label="Calories"
         sortAscending="${c:new2('foo.FoodComparator', 4, true)}"
         sortDescending="${c:new2('foo.FoodComparator', 4, false)}"/>
    </columns>
</grid>
```

If it is not the behavior you want, you could override
<javadoc method="sortGroupData(java.lang.Object, java.lang.Object[], java.util.Comparator, boolean, int)">org.zkoss.zul.GroupsModelArray</javadoc>.
Of course, you could extend from
[org.zkoss.zul.AbstractGroupsModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/AbstractGroupsModel.html) to have total
control.

## 5.0.6 and Later

Since 5.0.6, it is much easier to handle tabular data:

First,
<javadoc method="createGroupHead(java.lang.Object[], int, int)">org.zkoss.zul.GroupsModelArray</javadoc>
will return the correct element, so you don't have to override it as
shown above.

Second, [org.zkoss.zul.ArrayComparator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ArrayComparator.html) was introduced,
so `foo.FoodComparator` is not required in the above example.

Third,
<javadoc method="setSort(java.lang.String)">org.zkoss.zul.Column</javadoc>
supports `auto(0)`, `auto(1)`, etc.

Thus, we can simplify the above example as follows.

```xml
<grid apply="foo.FoodComposer">
    <columns menupopup="auto"> <!-- turn on column's menupopup -->
        <column label="Category" sort="auto(0)"
         sortDirection="ascending"/> <!-- since it is initialized as sorted -->
        <column label="Name" sort="auto(1)"/>
        <column label="Top Nutrients" sort="auto(2)"/>
        <column label="% of Daily" sort="auto(3)"/>
        <column label="Calories" sort="auto(4)"/>
    </columns>
</grid>
```

And, the composer is as follows.

```java
package foo;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.util.Composer;
import org.zkoss.zul.*;
public class FoodComposer implements Composer {
    public void doAfterCompose(Component comp) throws Exception {
        Grid grid = (Grid)comp;
        grid.setModel(new GroupsModelArray(_foods, new ArrayComparator(0, true)));
             //Initially, we group data on 1st column in ascending order
        grid.setRowRenderer(new FoodGroupRenderer());
    }
}
```

# Example: Grouping Array of JavaBean

Suppose you have a collection of JavaBean objects (i.e., with the proper
getter methods) as follows.

```java
public class Food {
    String _category,  _name, _nutrients;
    int _percentageOfDaily, _calories;

    public Food(String cat, String nm, String nutr, int pod, int cal) {
        _category = cat;
        _name = nm;
        _nutrients = nutr;
        _percentageOfDaily = pod;
        _calories = cal;
    }
    public String getCategory() {
        return _category;
    }
    public String getName() {
        return _name;
    }
    public String getNutrients() {
        return _nutrients;
    }
    public int getPercentageOfDaily() {
        return _percentageOfDaily;
    }
    public int getCalories() {
        return _calories;
    }
}
```

Assume you want to use the value of the field that the user uses to
group the data, then you could override
[org.zkoss.zul.GroupsModelArray](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModelArray.html) as follows.

```java
public class FoodGroupsModel extends GroupsModelArray {
    public FoodGroupsModel(Food[] foods) {
        super(foods, new FieldComparator("category", true));
    }
    protected Object createGroupHead(Object[] groupdata,int index,int col) {
        return new Object[] {groupdata[0], new Integer(col)};
    }
};
```

where

- We use [org.zkoss.zul.FieldComparator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/FieldComparator.html) to initialize
  the groups at the `category` field.
- We use an object array as the group head that carries the first
  element of the given group (`Food[]`), and the index of the column
  that causes the grouping. We will use the index later to retrieve the
  field's value

We also need a custom renderer:

```java
package foo;
import org.zkoss.lang.reflect.Fields;
import org.zkoss.zk.ui.*;
import org.zkoss.zul.*;
public class FoodGroupRenderer implements RowRenderer {
    public void render(Row row, java.lang.Object obj, int index) {
        if (row instanceof Group) {
            Object[] data = (Object[])obj; //prepared by createGroupHead()
            row.appendChild(new Label(getGroupHead(row, (Food)data[0], (Integer)data[1])));
        } else {
            Food food = (Food) obj;
            row.appendChild(new Label(food.getCategory()));
            row.appendChild(new Label(food.getName()));
            row.appendChild(new Label(food.getNutrients()));
            row.appendChild(new Label(food.getPercentageOfDaily() + ""));
            row.appendChild(new Label(food.getCalories() + ""));
        }
    }
    private String getGroupHead(Row row, Food food, int index) {
        Column column = (Column)row.getGrid().getColumns().getChildren().get(index);
        String orderBy = ((FieldComparator)column.getSortAscending()).getOrderBy();
        int j = orderBy.indexOf("name="),
            k = orderBy.indexOf(' ');
        try {
            return Fields.get(food, orderBy.substring(j+1, k>0 ? k: orderBy.length())).toString();
        } catch (NoSuchMethodException ex) {
            throw UiException.Aide.wrap(ex);
        }
    }
};
```

The retrieval of the field's value is a bit tricky: since we will use
`auto(fieldName)` to group and sort data for a given column (see the
ZUML content listed below), we could retrieve the field's name by use of
<javadoc method="getOrderBy()">org.zkoss.zul.FieldComparator</javadoc>,
which returns something like "name=category ASC". Then, use
<javadoc method="get(java.lang.Object, java.lang.String)">org.zkoss.lang.reflect.Fields</javadoc>
to retrieve it. If the field name is in a compound format, such as
`something.yet.another`, you could use
<javadoc method="getByCompound(java.lang.Object, java.lang.String)">org.zkoss.lang.reflect.Fields</javadoc>

> ------------------------------------------------------------------------
>
> For 5.0.6 or later, you could use
> <javadoc method="getRawOrderBy()">org.zkoss.zul.FieldComparator</javadoc>
> instead, which returns the field name you passed to
> <javadoc method="setSort(java.lang.String)">org.zkoss.zul.Column</javadoc>,
> i.e., "category".
>
> ```java
>         Column column = (Column)row.getGrid().getColumns().getChildren().get(index);
>         String field = ((FieldComparator)column.getSortAscending()).getRawOrderBy();
>         return Fields.get(food, field).toString();
> ```

Then, you could have the ZUML document as follows.

```xml
<grid apply="foo.FoodComposer">
    <columns menupopup="auto">
        <column label="Category" sort="auto(category)" sortDirection="ascending"/>
        <column label="Name" sort="auto(name)"/>
        <column label="Top Nutrients" sort="auto(nutrients)"/>
        <column label="% of Daily" sort="auto(percentageOfDaily)"/>
        <column label="Calories" sort="auto(calories)"/>
    </columns>
</grid>
```

And, the composer is as follows.

```java
package foo;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.util.Composer;
import org.zkoss.zul.*;
public class FoodComposer implements Composer {
    Food[] _foods = new Food[] { //assume we have a collection of foods
        new Food("Vegetables", "Asparagus", "Vitamin K", 115, 43),
        new Food("Vegetables", "Beets", "Folate", 33, 74)
        //...more
    };

    public void doAfterCompose(Component comp) throws Exception {
        Grid grid = (Grid)comp;
        grid.setModel(new FoodGroupsModel(_foods));
             //Initially, we group data on 1st column in ascending order
        grid.setRowRenderer(new FoodGroupRenderer());
    }
}
```

# Group Foot

If the groups model supports a foot (such as a summary of all data in
the same group), you could return an object to represent the footer when
<javadoc method="getGroupfoot(int)" type="interface">org.zkoss.zul.GroupsModel</javadoc>
is called (similar to
<javadoc method="getGroup(int)" type="interface">org.zkoss.zul.GroupsModel</javadoc>
shall return an object representing the group).

If you use [org.zkoss.zul.GroupsModelArray](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/GroupsModelArray.html), you could
override
<javadoc method="createGroupFoot(java.lang.Object[], int, int)">org.zkoss.zul.GroupsModelArray</javadoc>.
For example,

```java
public class FoodGroupsModel extends GroupsModelArray {
    protected Object createGroupFoot(Object[] groupdata, int index, int col) {
        return "Total " + groupdata.length + " items";
    }
...
```

# Version History

| Version | Date          | Content                                                                                                |
|---------|---------------|--------------------------------------------------------------------------------------------------------|
| 5.0.6   | December 2010 | Enhanced the support of tabular data as described in [\#5.0.6 and Later](#5.0.6_and_Later). |
