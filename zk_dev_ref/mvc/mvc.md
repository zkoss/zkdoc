MVC (Model-View-Control), more precisely, it is known as MVP
(Model-View-Presenter) is a design pattern designed to separate the
model, view, and controller. It is strongly suggested to apply the MVC
pattern to your application, not only because it is easy to develop and
maintain, but also the performance is great.

![]({{site.baseurl}}/zk_dev_ref/images/mvc.png)

<div style="margin: 3px 3px 0; padding: 0px 30px; border-radius: 5px; border:1px solid #999;">

**Alternative: MVVM**

MVVM represents **Model**, **View**, and **ViewModel**. MVVM is
identical to the [Presentation Model](http://martinfowler.com/eaaDev/PresentationModel.html) introduced
by Martin Fowler. It is a variant of the MVC design pattern. Unlike MVC,
the control logic is implemented in a POJO class called the *view
model*. It provides the further abstraction that a view model assumes
*nothing* about any visual element in the view. It thus avoids mutual
programming ripple effects between UI and the view model. On the other
hand, some developers might find it not as intuitive as MVC. For more
information, please refer to
\[<http://books.zkoss.org/zk-mvvm-book/9.5/index.html>\| MVVM
Reference\].

</div>

# View

The *view* is UI -- a composition of
[components]({{site.baseurl}}/zk_dev_ref/ui_composing/component-based_ui).
As described in the [UI Composing]({{site.baseurl}}/zk_dev_ref/ui_composing) section, UI
can be implemented by [a ZUML document]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml) or [in Java]({{site.baseurl}}/zk_dev_ref/ui_composing/richlet). For the
sake of description, ZUML is used to illustrate the concept and
features.

# Controller

The *controller* is a Java program that is used to glue UI (view) and
Data (model) together.

For a simple UI, there is no need to prepare a controller. For example,
the data of a [org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html) could be
abstracted by implementing
[org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html).

For typical database access, the glue logic (i.e., control) can be
handled by a generic feature called [Data Binding]({{site.baseurl}}/zk_dev_ref/mvvm/data_binding). In
other words, the read and write operations can be handled automatically
by a generic Data Binding, and you don't need to write the glue logic at
all.

To implement a custom controller, you could extend from
[org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html), or implement
[org.zkoss.zk.ui.util.Composer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Composer.html) from
scratch. Then, specify it in the element it wants to handle in a ZUML
document.

# Model

The *model* is the data an application handles. Depending on the
application requirement, it could be anything as long as your controller
knows it. Typical objects are POJOs, beans, Spring-managed beans, and
DAOs.

In addition to handling the data in a controller, some components
support the abstraction model to uncouple UI and data. For example,
[grid]({{site.baseurl}}/zk_component_ref/grid),
[listbox]({{site.baseurl}}/zk_component_ref/listbox) and
[combobox]({{site.baseurl}}/zk_component_ref/combobox) support
[org.zkoss.zul.ListModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ListModel.html), while
[tree]({{site.baseurl}}/zk_component_ref/tree) supports
[org.zkoss.zul.TreeModel](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/TreeModel.html).
