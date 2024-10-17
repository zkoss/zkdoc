---
permalink: /get_started/Get_ZK_Up_and_Running_with_MVVM
---
# Introduction

This tutorial is intended for software developers who have experience in
writing Java EE programs. We will guide you on how to build a modern web
application with ZK. The target application we are going to build is a
simple car catalog application. In this article, we will present an
approach that is classified as the **Model-View-ViewModel (MVVM)**
design pattern. Using this approach, ZK can control components for you
automatically and it separates the UI from its controller clearly. In
addition, you can also choose to go with the <b>MVC</b> approach that is
covered in [another tutorial](/get_started/Get_ZK_Up_and_Running_with_MVC).

{% include tutorial-common.md %}

# Automatic UI Controlling

The approach we introduce here to control user interaction is to **let
ZK control UI components for you**. This approach is classified to
**Model-View-ViewModel** (**MVVM**) design pattern. For complete information, please see [MVVM in Developer's
Reference](https://books.zkoss.org/zk-mvvm-book/10.0/index.html). This pattern
divides an application into three parts.

The **Model** consists of application data and business rules.
`CarService` and other classes used by it represent this part in our
example application.

The **View** means user interface. The zul page which contains ZK
components represents this part. A user's interaction with components
triggers events to be sent to controllers.

The **ViewModel** is responsible for exposing data from the Model to the
View and providing required action requested from the View. The
ViewModel is type of **View abstraction** which contains a View's state
and behavior. But **ViewModel should contain no reference to UI
components**. ZK framework handles communication and state
synchronization between View and ViewModel.

Under this approach, we just **prepare a ViewModel class** with proper
setter, getter and application logic methods, then **assign data-binding
expression to a component's attributes** in a ZUL. There is a binder in
ZK which will synchronize data between ViewModel and components and
handle events automatically according to binding expressions. We don't
need to control components by ourselves.

Here we use the search function to explain how MVVM works in ZK. Assume
that a user click "Search" button then *listbox* updates its content.
The flow is as follows:

![]({{site.baseurl}}/get_started/images/tutorial-mvvm.png)

1.  A user clicks "Search" button and a corresponding event is sent.
2.  ZK's binder invokes the corresponding command method in the
    ViewModel.
3.  The method accesses data from Model and updates some ViewModel's
    properties.
4.  ZK's binder reloads changed properties from the ViewModel to update
    component's states.

## Abstracting the View

ViewModel is an abstraction of View. Therefore when we design a
ViewModel, we should analyze UI's functions for what **state** it
contains and what **behavior** it has.

The state:

1.  keyword from user input
2.  car list of search result
3.  selected car

The operation:

1.  search

According to the above analysis, the ViewModel should have 3 variables
for the above states and one method for the behavior. In ZK, creating a
ViewModel is like creating a POJO, and it exposes its states like
JavaBean's properties through setter and getter methods. The search
method implements search logic with service class and updates the
property "carList".

**SearchViewModel.java**

``` java
package tutorial;

import java.util.List;
import org.zkoss.bind.annotation.*;

public class SearchViewModel {

    private String keyword;
    private List<Car> carList;
    private Car selectedCar;
    
    //omit getter and setter

    public void search(){
        carList = carService.search(keyword);
    }
}
```

**Annotation**

In ZK MVVM, any behavior that a View can request is a **command** in a
ViewModel. We can bind a component's event to the command and ZK will
invoke the method when a bound event is triggered. In order to let ZK
know which behavior (method) can be requested, you should apply an
annotation `@Command` on a method. We mark `search()` as a "command"
with **default command name**, search, which is the same as method name.
The command name is used in the data-binding expression we'll talk about
in the next section.

In `search()`, we change a ViewModel's property: `carList`. Thus, we
should tell ZK this change with `@NotifyChange` so that ZK can reload
the changed property for us after it invokes this method.

For the "search" command, it looks like this:

**SearchViewModel.java**

``` java
package tutorial;

import java.util.List;
import org.zkoss.bind.annotation.*;

public class SearchViewModel {

    //omit other codes

    @Command
    @NotifyChange("carList")
    public void search(){
        carList = carService.search(keyword);
    }
}
```

For complete source code, please refer to
[Github](https://github.com/zkoss-demo/gettingStarted/blob/master/src/main/java/tutorial/SearchViewModel.java)

## Binding UI to ViewModel

Under MVVM, we build our UI as same as we would with the MVC approach,
then we specify the relationship between a ZUL and a ViewModel by
writing data binding expression in component's attribute and let ZK
handle components for us.

### Bind a ViewModel

To bind a component to a ViewModel, we should apply a composer called
**org.zkoss.bind.BindComposer**. This composer processes data binding
expressions and initializes the ViewModel class. We then bind this
component to a ViewModel by setting its **viewModel** attribute with
following syntax:

**`@id('ID') @init('FULL.QUALIFIED.CLASSNAME')`**

- `@id()` is used to set ViewModel's id to whatever we want like a
  variable name. We will use this id to reference ViewModel's properties
  (e.g. vm.carList) in a data binding expression.
- We should provide full-qualified class name for `@init()` to
  initialize the ViewModel object.

**Extracted from searchMvvm.zul**

``` xml
    <window title="Search" width="600px" border="normal" 
            viewModel="@id('vm') @init('tutorial.SearchViewModel')">
    ...
    </window>
```

After binding the ViewModel to the component, all its child components
can access the same ViewModel and its properties.

We can bind View to both ViewModel's properties and behavior with data
binding expression. Let's see how to use data binding to achieve the
search function.

### Load Data From a ViewModel

Since we have declared variables in ViewModel class for a component's
states in the previous section, we can bind the component's attributes
to them. After binding a component's attribute to ViewModel, ZK will
synchronize data between the attribute's value and a ViewModel's
property for us automatically. We can specify **which attribute is
loaded from which property** by writing data binding expression as a
component attribute's value with the syntax:

**`@load(vm.aProperty)`**

- Remember that `vm` is the id we have given it in `@id()` previously
  and now we use it to reference ViewModel object.

### Save Data to a ViewModel

There are 2 states which relate to search function in the ViewModel upon
the previous analysis. First, we want to store value of *textbox* in
ViewModel's `keyword`. We can then bind "value" of *textbox* to
`vm.keyword` with `@save(vm.keyword)`. So that ZK will save the user
input into the ViewModel at the proper moment. Second, we want to assign
the *Listbox* 's data with ViewModel's `carList`, so we should bind its
"model" attribute to `vm.carList`.

**Extracted from searchMvvm.zul**

``` xml

        <hbox>
            Keyword:
            <textbox value="@save(vm.keyword)" />
            <button label="Search" image="/img/search.png"/>
        </hbox>
        <listbox height="160px" model="@load(vm.carList)" emptyMessage="No car found in the result">
        <!-- omit other tags -->
```

### Invoke a Method of a ViewModel

We can only bind a component's event attribute (e.g. onClick) to
ViewModel's behavior. After we bind an event to a ViewModel, each time a
user triggers the event, ZK finds the bound command method and invokes
it. In order to handle clicking on "Search" button, we have to bind the
button's onClick attribute to a command method with the following
syntax:

**`@command('COMMAND_NAME')`**

- We should look for command name specified in our ViewModel's command
  method.

**Extracted from searchMvvm.zul**

``` xml
        <hbox>
            Keyword:
            <textbox value="@save(vm.keyword)" />
            <button label="Search" image="/img/search.png" onClick="@command('search')" />
        </hbox>
        <listbox height="160px" model="@load(vm.carList)" emptyMessage="No car found in the result">
        <!-- omit other tags -->
```

After binding this "onClick" event, when a user clicks "Search" button,
ZK will invoke `search()` and reload the property "carList" which is
specified in `@NotifyChange`.

## Displaying Data Collection

The way to display a collection of data with data binding is very
similar to the way in the MVC approach. we will use a special tag,
[`<template>`](https://www.zkoss.org/wiki/ZK_Developer's_Reference/MVC/View/Template), to control the rendering of each item. The only
difference is we should use data binding expression instead of EL.

Steps to use `<template>`:

1.  Use **<template>** to enclose components that we want to create
    iteratively.
2.  Set template's "name" attribute to "model".(See [ZK Developer's Reference/MVC/View/Template/Listbox
    Template](https://www.zkoss.org/wiki/ZK_Developer's_Reference/MVC/View/Template/Listbox_Template))
3.  Use implicit variable, **each**, to assign domain object's
    properties to component's attributes.

**Extracted from searchMvvm.zul**

``` xml

        <listbox height="160px" model="@load(vm.carList)" emptyMessage="No car found in the result">
            <listhead>
                <listheader label="Model" />
                <listheader label="Make" />
                <listheader label="Price" width="20%"/>
            </listhead>
            <template name="model">
                <listitem>
                    <listcell label="@init(each.model)"></listcell>
                    <listcell label="@init(each.make)"></listcell>
                    <listcell>$<label value="@init(each.price)" />
                    </listcell>
                </listitem>
            </template>
        </listbox>
```

## Implementing View Details Functionality

The steps to implement the view details functionality are similar to
previous sections.

1.  We bind attribute `selectedItem` of *listbox* to the property
    `vm.selectedCar` to save selected domain object.
2.  Because we want to show selected car's details, we bind value of
    *label* and src of *image* to selected car's properties which can be
    access by chaining dot notation like `vm.selectedCar.price`.
3.  Each time a user selects a *listitem*, ZK saves selected car to the
    ViewModel. Then ZK reloads `selectedCar`'s properties to those bound
    attributes.

``` xml
        <listbox height="160px" model="@load(vm.carList)" emptyMessage="No car found in the result"
        selectedItem="@save(vm.selectedCar)">
        <!-- omit child components -->
        </listbox>
        <hbox style="margin-top:20px">
            <image width="250px" src="@load(vm.selectedCar.preview)" />
            <vbox>
                <label value="@load(vm.selectedCar.model)" />
                <label value="@load(vm.selectedCar.make)" />
                <label value="@load(vm.selectedCar.price)" />
                <label value="@load(vm.selectedCar.description)" />
            </vbox>
        </hbox>
```

You can view complete zul at [Github](https://github.com/zkoss-demo/gettingStarted/blob/master/src/main/webapp/searchMvvm.zul)
