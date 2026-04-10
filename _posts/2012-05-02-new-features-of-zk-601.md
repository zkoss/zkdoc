---
author: hawk
date: 2012-05-02
version: "6.0.1"
category: small-talk
title: "New Features of ZK 6.0.1"
---

# Biglistbox

{% include edition-availability.html edition="ee" %}

The Biglistbox is a component to handle huge data sets while providing
the same functionalities as the
[Listbox](https://www.zkoss.org/wiki/ZK_Component_Reference/Data/Listbox) such as selection, sorting, keystroke
navigation and ROD(rendering-on-demand). The biglistbox is capable of
handling huge amounts of data, for example the demo below demonstrates
it handling over 1 trillion cells.

{% include youtube.html id="3zTzlmDbO78" %}

![]({{site.baseurl}}/assets/images/small-talk/zkcomref_biglistbox.PNG)

```xml
<biglistbox hflex="1" vflex="1">
    <!-- Template example
    <template name="heads">
        <html><![CDATA[
    <div class="images_${matrixInfo[0]%28}" title="x=${matrixInfo[0]},y=${matrixInfo[1]}">${each[matrixInfo[0]]}</div>
        ]]></html>
    </template>
    <template name="rows">
        <html><![CDATA[
     <div class="images_${matrixInfo[0]%28}" title="x=${matrixInfo[0]},y=${matrixInfo[1]}">${each[matrixInfo[0]]}</div>
        ]]></html>
    </template> -->
</biglistbox>
```

# Fusionchart integration

{% include edition-availability.html edition="ee" %}

The Fusionchart which integrates the [FusionCharts
Free](http://www.fusioncharts.com/free/) with ZK. The technology makes
use of Flash to draw charts and enables the user to customize the style
of charts such as bar or line colors.

Fusionchart separates the presentation layer from the data, providing
the users with a API to supply data in a clean MVC based manner. In
addition to updating the data dynamically, it provides a pleasant user
experience as the visual display is updated immediately.

Charts include but are not limited to the following following:

## Vertical Bar Chart

![]({{site.baseurl}}/assets/images/small-talk/barchart_2d.png)

```xml
<zk>
<fusionchart id="mychart" title="Bar Chart" type="bar"
    width="500" height="250" fgAlpha="128">
    <zscript>
        import org.zkoss.zul.*;
    
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        mychart.setModel(catmodel);
    </zscript>
</fusionchart>
</zk>
```

## 3D Vertical Bar Chart

![]({{site.baseurl}}/assets/images/small-talk/barchart_3d.png)

```xml
<zk>
<fusionchart id="mychart" title="3D Bar Chart" type="bar" threeD="true"
    width="500" height="250" fgAlpha="128">
    <zscript>
        import org.zkoss.zul.*;
    
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        mychart.setModel(catmodel);
    </zscript>
</fusionchart>
</zk>
```

## Line Chart

![]({{site.baseurl}}/assets/images/small-talk/linechart.png)

```xml
<zk>
<fusionchart id="mychart" title="Line Chart" type="line"
    width="500" height="250" fgAlpha="128">
    <zscript>
        import org.zkoss.zul.*;
    
        XYModel xymodel = new SimpleXYModel();
        xymodel.addValue("2001", new Integer(20), new Integer(120));
        xymodel.addValue("2001", new Integer(40), new Integer(135));
        xymodel.addValue("2001", new Integer(60), new Integer(140));
        xymodel.addValue("2001", new Integer(80), new Integer(160));
        xymodel.addValue("2001", new Integer(25), new Integer(120));
        xymodel.addValue("2001", new Integer(75), new Integer(135));
        xymodel.addValue("2001", new Integer(65), new Integer(140));
        xymodel.addValue("2001", new Integer(85), new Integer(160));
        xymodel.addValue("2002", new Integer(30), new Integer(120));
        xymodel.addValue("2002", new Integer(31), new Integer(135));
        xymodel.addValue("2002", new Integer(32), new Integer(140));
        xymodel.addValue("2002", new Integer(90), new Integer(160));
        xymodel.addValue("2002", new Integer(35), new Integer(120));
        xymodel.addValue("2002", new Integer(55), new Integer(135));
        xymodel.addValue("2002", new Integer(75), new Integer(140));
        xymodel.addValue("2002", new Integer(80), new Integer(160));
        mychart.setModel(xymodel);
    </zscript>
</fusionchart>
</zk>
```

## 2D Pie Chart

![]({{site.baseurl}}/assets/images/small-talk/piechart_2d.png)

```xml
<zk>
<fusionchart id="mychart" title="Pie Chart" type="pie"
    width="500" height="250" fgAlpha="128">
    <zscript>
        import org.zkoss.zul.*;
    
        PieModel piemodel = new SimplePieModel();
        piemodel.setValue("C/C++", new Double(12.5));
        piemodel.setValue("Java", new Double(50.2));
        piemodel.setValue("VB", new Double(20.5));
        piemodel.setValue("PHP", new Double(15.5));
        mychart.setModel(piemodel);
    </zscript>
</fusionchart>
</zk>
```

## 3D Pie Chart

![]({{site.baseurl}}/assets/images/small-talk/piechart_3d.png)

```xml
<zk>
<fusionchart id="mychart" title="3D Pie Chart" type="pie" threeD="true"
    width="500" height="250" fgAlpha="128">
    <zscript>
        import org.zkoss.zul.*;
    
        PieModel piemodel = new SimplePieModel();
        piemodel.setValue("C/C++", new Double(12.5));
        piemodel.setValue("Java", new Double(50.2));
        piemodel.setValue("VB", new Double(20.5));
        piemodel.setValue("PHP", new Double(15.5));
        mychart.setModel(piemodel);
    </zscript>
</fusionchart>
</zk>
```

## Area Chart

![]({{site.baseurl}}/assets/images/small-talk/areachart.png)

```xml
<zk>
<fusionchart id="mychart" title="Area Charts" type="area" 
    width="500" height="250" fgAlpha="128">
    <zscript>
        import org.zkoss.zul.*;
    
        CategoryModel catmodel = new SimpleCategoryModel();
        catmodel.setValue("2001", "Q1", new Integer(20));
        catmodel.setValue("2001", "Q2", new Integer(35));
        catmodel.setValue("2001", "Q3", new Integer(40));
        catmodel.setValue("2001", "Q4", new Integer(55));
        catmodel.setValue("2002", "Q1", new Integer(40));
        catmodel.setValue("2002", "Q2", new Integer(60));
        catmodel.setValue("2002", "Q3", new Integer(70));
        catmodel.setValue("2002", "Q4", new Integer(90));
        mychart.setModel(catmodel);
    </zscript>
</fusionchart>
</zk>
```

## Gantt Chart

![]({{site.baseurl}}/assets/images/small-talk/gantt.png)

```xml
<zk>
<fusionchart id="mychart" title="Gantt Chart" type="gantt"
    width="500" height="250" fgAlpha="128">
    <zscript>
        import org.zkoss.zul.*;
        import org.zkoss.zul.GanttModel.GanttTask;
        import java.util.*;
        
        public Date date(int year, int month, int day) {
            final java.util.Calendar calendar = java.util.Calendar.getInstance();
            calendar.set(year, month - 1, day);
            return calendar.getTime();
        }
    
        GanttModel ganttmodel = new GanttModel();
        
        String scheduled = "Scheduled";
        String actual = "Actual";
        
        ganttmodel.addValue(scheduled,
                new GanttTask(
                        "Write Proposal", date(2008, 4, 1), date(2008, 4, 5), 0.0));
        ganttmodel.addValue(scheduled, 
                new GanttTask(
                        "Requirements Analysis", date(2008, 4, 10), date(2008, 5, 5), 0.0));
        ganttmodel.addValue(scheduled,
                new GanttTask(
                        "Design Phase", date(2008, 5, 6), date(2008, 5, 30), 0.0));
        ganttmodel.addValue(scheduled, 
                new GanttTask(
                        "Alpha Implementation", date(2008, 6, 3), date(2008, 7, 31), 0.0));

        ganttmodel.addValue(actual,
                new GanttTask(
                        "Write Proposal", date(2008, 4, 1), date(2008, 4, 3), 0.0));
        ganttmodel.addValue(actual, 
                new GanttTask(
                        "Requirements Analysis", date(2008, 4, 10), date(2008, 5, 15), 0.0));
        ganttmodel.addValue(actual,
                new GanttTask(
                        "Design Phase", date(2008, 5, 15), date(2008, 6, 17), 0.0));
        ganttmodel.addValue(actual, 
                new GanttTask(
                        "Alpha Implementation", date(2008, 7, 1), date(2008, 9, 12), 0.0));
        mychart.setModel(ganttmodel);
    </zscript>
    <attribute name="onClick">
        Map data = (Map) event.getData();
        Messagebox.show(data.toString());
    </attribute>
</fusionchart>
</zk>
```

**For more available charts please refer to the
[fusionchart
documentation](https://www.zkoss.org/wiki/ZK_Component_Reference/Diagrams_and_Reports/Fusionchart)**

# Children binding now supports a converter

It is now possible to specify a converter when loading children. There
is a default converter which attempts to coerce the argument object into
a List. The following code provides a sample for this:

```xml
<hlayout children="@init(vm.items) @converter(vm.itemConverter)">
    <template name="children">
        <label value="@load(each) "/>
    </template>
</hlayout>
```

for more information please see the
[developer's
reference](https://www.zkoss.org/wiki/ZK_Developer&#39;s_Reference/MVVM/Data_Binding/Converter).

# Reference Binding

{% include edition-availability.html edition="pe-ee" %}

Reference binding allows us to reference an expression with a customized
name. We can use this reference in another EL expression nested in the
component that is binded to this reference.

A simple example is as follows:

```xml

<window apply="org.zkoss.bind.BindComposer" 
    viewModel="@id('vm') @init('foo.MyVM')">
    <vlayout p="@ref(vm.person)">
        <hlayout>
            First Name: <textbox value="@bind(p.firstName)" />
        </hlayout>
        <hlayout>
            Last Name: <textbox value="@bind(p.lastName)" />
        </hlayout>
    </vlayout>
</window>
```

steps to use this feature:

1.  Bind a custom attribute on a component with `@ref`.
2.  Use the custom attribute in other EL expressions that are nested in
    children components

The above code shows these implemented steps, for more information and
more uses please visit the [developer's
reference](https://www.zkoss.org/wiki/ZK_Developer&#39;s_Reference/MVVM/Data_Binding/Reference_Binding).

# @Init on type

In ZK 6.0.1 it is now possible to add an @Init annotation to a type,
this will then instruct ZK to instantiate the parent class' init method.

```java
//since 6.0.1
@Init(superclass=true)
public class ChildViewModel extends BarViewModel{

}
```

# Easier retrival of the event as a param

It is now much easier to retrieve the command's event in the view model
method, the following demonstrates two methods for doing this:

1.use @ContextParam(ContextType.TRIGGER_EVENT

```java
public void cmd(@ContextParam(ContextType.TRIGGER_EVENT) Event e2) {...}
```

2.use @BindingParam

```xml
<button label="click me" onClick="@command('cmd',e=event)"/>
```

```java
public void cmd(@BindingParam("e") Event e1) {...}
```

# Formatting methods

Since ZK 6.0.1 more formatting methods and now provided to developers to
make it easier to format labels. The following methods have been added:

- [formatNumber](https://www.zkoss.org/wiki/ZUML_Reference/EL_Expressions/Core_Methods/formatNumber)
- [formatDate](https://www.zkoss.org/wiki/ZUML_Reference/EL_Expressions/Core_Methods/formatDate)

These methods can be used as follows:

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
<zk>
    <label value="${c:formatNumber(2332315231, '$ ###,###,###.00')}" />
</zk>
```

# Form Bean Validator

{% include edition-availability.html edition="ee" %}

This feature is similar to the Bean Validator, as it integrates JavaBean
Validation and validates a bean's all saving properties. For the
configuration and JavaBean usage, please refer to [Prepare_to_Use_JSR_303](https://www.zkoss.org/wiki/ZK_Developer&#39;s_Reference/MVVM/Data_Binding/Validator#Prepare_to_Use_JSR_303)

## Usage

Use this validator with the name **formBeanValidator** and set a unique
prefix key by **prefix** argument of validator. When any property of the
bean is invalid, it puts the invalid message to validation message
holder with key **prefix**+propertyName.

```xml
<window id="win" apply="org.zkoss.bind.BindComposer" viewModel="@id('vm') @init(foo.MyViewModel)" 
    validationMessages="@id('vmsgs')">
    <grid width="600px" form="@id('fx') @load(vm.user) @save(vm.user,after='save') 
        @validator('formBeanValidator',prefix='p_')">
        <textbox value="@bind(fx.firstName)"/>
        <label value="@load(vmsgs['p_firstName'])"/> 
    </grid>
<!--more components-->
</window>
```

for more information please refer to the [developer's
reference](https://www.zkoss.org/wiki/ZK_Developer&#39;s_Reference/MVVM/Data_Binding/Validator#Bean_Validator).

# Application Level Converters

{% include edition-availability.html edition="ee" %}

It is now possible to register a converter for the entire application
which is shared between all binders. This is done by first setting the
library-property(*org.zkoss.bind.appConverters*) in zk.xml.

```xml
<library-property>
    <name>org.zkoss.bind.appConverters</name>
    <value>foo=my.FooConverter,bar=my.BarConverter</value>
</library-property>
```

then it is possible to use them by the converter name.

```xml
<label value="@load(vm.message) @converter('foo')"/>
<label value="@load(vm.message) @converter('bar')"/>
```

for more information please consult the [developer's
reference](https://www.zkoss.org/wiki/ZK_Developer&#39;s_Reference/MVVM/Data_Binding/Converter#Register_Application_Level_Converters).

# Register Application Level Validators

{% include edition-availability.html edition="ee" %}

It is now possible to register a validators for the application by
setting library-property(*org.zkoss.bind.appValidators*) in zk.xml.

```xml
<library-property>
    <name>org.zkoss.bind.appValidators</name>
    <value>foo=my.FooValidator,bar=my.BarValidator</value>
</library-property>
```

then it is possible to use them by the validator name.

```xml
<textbox value="@bind(vm.name) @validator('foo')"/>
<textbox value="@bind(vm.value) @validator('bar')"/>
```

for more information please consult the [developer's
reference](https://www.zkoss.org/wiki/ZK_Developer&#39;s_Reference/MVVM/Data_Binding/Validator#Register_Application_Level_Validators).

# Access multiple validators

{% include edition-availability.html edition="ee" %}

Since ZK 6.0.1 a validator can set multiple messages for a component or
a self-defined key. You can get all messages from Validation Message
Holder's special property **`texts`** . In EL, `vmsgs.texts` is the same
as `vmsgs['texts']`, so you should avoid using `texts` as your
self-defined key.

**Display multiple messages of a form validator**

```xml
<div id="formdiv" form="... @validator('fooValidator')">
...
</div>
<grid id="msggrid" model="@bind(vmsgs.texts[formdiv])" visible="@bind(not empty vmsgs.texts[formdiv])">
    <template name="model" var="msg">
        <row>
            <label value="@bind(msg)" />
        </row>
    </template>
</grid>
```

- Using a grid to display multiple messages. (line 4)

You can also get all messages of the Validation Message Holder with
syntax`@bind(vmsgs.texts)` and get messages of a self-defined key with
syntax `@bind(vmsgs.texts['a_self_defined_key'])`.

For more information on validators please refer to the [developer's
reference](https://www.zkoss.org/wiki/ZK_Developer&#39;s_Reference/MVVM/Data_Binding/Validator#Display_Multiple_Messages).

# Download & other resources

- [Download ZK 6 here](http://www.zkoss.org/download/zk)
- [Take a look at ZK 6's release notes
  here](http://www.zkoss.org/product/zk/releasenote/6.0.0)
- View the
  [ZK 6: Upgrade Notes](https://www.zkoss.org/wiki/Small_Talks/2011/November/ZK_6:_Upgrade_Notes)

