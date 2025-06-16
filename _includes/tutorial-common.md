## Tutorial Objective
Our target application is a simple car catalog application. This application has two functions:
- **Search cars.**
  - Enter a keyword in the input field, click **Search** and search results will be displayed in the car list below.
- **View details.**
  - Click an item from the car list, the area below the car list will show the selected car's details including model, price, description, and preview.

![]({{site.baseurl}}/get_started/images/Tutorial-searchexample.png)


# Start from Example Project

You can get [the source code of this article](https://github.com/zkoss-demo/gettingStarted/) and import it to
your IDE without starting from scratch. Please follow the README to run
the project.

If you want to start a new project, please refer to [ZK Installation Guide/Quick Start](/{{site.baseurl}}/zk_installation_guide/Quick_Start).

# Declaring Domain Class

The following is the domain object that represents a car.

``` java

public class Car {
    private Integer id;
    private String model;
    private String make;
    private String preview;
    private String description;
    private Integer price;
    //omit getter and setter for brevity
}
```

We then define a service class to perform the business logic (search
cars) shown below:

``` java
public interface CarService {

    /**
     * Retrieve all cars in the catalog.
     * @return all cars
     */
    public List<Car> findAll();
    
    /**
     * search cars according to keyword in  model and make.
     * @param keyword for search
     * @return list of car that matches the keyword
     */
    public List<Car> search(String keyword);
}
```

In this example, we have defined a class, `CarServeImpl`, that
implements the above interface. For simplicity, it uses a static list
object as the data model. You can rewrite it so that it connects to a
database in a real application. Its implementation details are not in
the scope of this article, please refer to source code repository.

# Building User Interface

UI is a good start to building an application as it helps you define the
scope of your application. ZK provides hundreds of readily made UI
components, so developers can rapidly build their desired user interface
by combining and mix-matching these components without having to create
a page from scratch.

In ZK, you can use [ZK User Interface Markup Language(ZUML)](/{{site.baseurl}}/zuml_ref ), an XML-formatted language, to
describe UI. By ZK's convention, the files to describe the user
interface with ZUML uses **.zul** as the name suffix. In zul files, one
component is represented as an XML element (tag) and you can configure
each component's style, behavior, and function by setting XML element's
attributes. (check [ZK Component Reference](/{{site.baseurl}}/zk_component_ref) for details)

In this example application, first of all, we want to use a `Window`
with the specified title and normal border as our application's frame.

As `Window` is the outermost component, it is called the *root
component*. `Window` is a commonly used container because it makes your
web application look like a desktop application. Besides, it can also
enclose other components. All other components inside `Window` are
called its *child components* and should be put in <window>'s body.

**Extracted from [search.zul](https://github.com/zkoss-demo/gettingStarted/blob/master/src/main/webapp/search.zul)**

```xml
    <window title="Search" border="normal" width="600px">
        <!-- put child components inside a tag's body -->
    </window>
```

- Line 1: Specifying title bar text with `title` and make <window>
  display a normal border with `border` . For `width` attribute, use CSS
  like syntax such as `800px` or `60%`.

Our example application's user interface is divided into 3 areas within
the <window> (from top to bottom):

1.  search function
2.  car list
3.  car details.

![]({{site.baseurl}}/get_started/images/Tutorial-ui-3areas.png)

## Search Area

ZK components are like building blocks, you can combine and mix-match
existing components to construct your desired UI. To allow users to
search, we need a text to prompt users for input, a place to enter
keywords, and a button for triggering the search. We can use the
following ZK components to fulfill this requirement:

**Extracted from
[search.zul](https://github.com/zkoss-demo/gettingStarted/blob/master/src/main/webapp/search.zul)**

```xml
Keyword:
<textbox id="keywordBox" />
<button id="searchButton" label="Search" iconSclass="z-icon-search" style="margin: 0 0 5px 5px"/>
```

- Line 1~2: Specifying the `id` attribute for some components allows you
  to control them by referencing their *id*.
- Line 3: You can use built-in Font Awesome icon at `iconSclass`. Please
  refer to [LabelImageElement#IconSclass](/{{site.baseurl}}/zk_component_ref/base_components/LabelImageElement#IconSclass )
  for details.

## Car List Area

ZK provides several components to display a collection of data such as
`listbox`, `grid`, and `tree`. In this example, we use a `listbox` to
display a list of cars with 3 columns: Model, Make, and Price. Here we
use `listcell` with static label to demonstrate structure of a
`listitem`. Later, we'll talk about how to create `listitem` dynamically
with a collection of data.

**Extracted from
[search.zul](https://github.com/zkoss-demo/gettingStarted/blob/master/src/main/webapp/search.zul)**

``` xml
<listbox id="carListbox" emptyMessage="No car found in the result" rows="5">
    <listhead>
        <listheader label="Model" />
        <listheader label="Make" />
        <listheader label="Price" width="20%"/>
    </listhead>
    <listitem>
        <listcell label="car model"></listcell>
        <listcell label="make"></listcell>
        <listcell>$<label value="price" /></listcell>
    </listitem>
</listbox>
```

- Line 1: `rows` determines the max visible row. `emptyMessage` is used
  to show a message when `listbox` contains no items.
- Line 2: The `listbox` is a container component, and you can add
  `listhead` to define a column.
- Line 7: The `listitem` is used to display data, and the number of
  `listcell` in one `listitem` usually equals to the number of
  `listheader`.

## Car Details Area

`hlayout` and `vlayout` are layout components which arrange their child
components in horizontal and vertical order.

**Extracted from
[search.zul](https://github.com/zkoss-demo/gettingStarted/blob/master/src/main/webapp/search.zul)**

```xml
    <hlayout style="margin-top:20px" width="100%">
        <image id="previewImage" width="250px" />
        <vlayout hflex="1">
            <label id="modelLabel" />
            <label id="makeLabel" />
            <label id="priceLabel" />
            <label id="descriptionLabel" />
        </vlayout>
    </hlayout>
```

- Line 1: the `style` attribute allows you to customize component's
  style with CSS syntax.
