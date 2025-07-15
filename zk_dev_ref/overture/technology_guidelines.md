ZK provides end-to-end solutions from UI design, development, testing to
production. Here are the technology guidelines to help developers to
make choices along the way.

If you are new to ZK and prefer to have some prior knowledge of ZK
first, you could skip this section and come back later when you
understand more about ZK.

# [MVC]({{site.baseurl}}/zk_dev_ref/mvc/mvc) vs. [MVVM]({{site.baseurl}}/zk_mvvm_ref/intro/introduction_of_mvvm) vs. [ZScript]({{site.baseurl}}/zk_dev_ref/ui_composing/scripts_in_zuml)

They serve different purposes and could work together. However, some
developers get confused about these technologies.

## When to use MVC and/or MVVM

[MVC]({{site.baseurl}}/zk_dev_ref/mvc/mvc) (Model-View-Control;
aka., Model-View-Presenter) and
[MVVM]({{site.baseurl}}/zk_mvvm_ref/intro/introduction_of_mvvm) (Model-View-ViewModel;
aka., Presentation Model) are both design patterns that isolate the
dependency among the domain data, the domain logic and the user
interface. They are both supported by ZK, and they are praised for their
[separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns) and thus
easy to collaborate, develop and maintain. For a production system, it
is strongly suggested to take either MVC or MVVM approach.

MVC separates the design into three roles: Model, View, and Controller.
The controller is the *middle-man* gluing the view and the model (aka.,
data).

On the other hand, MVVM has three roles: Model, View, and ViewModel. The
View and Model play the same roles as they do in MVC. The ViewModel in
MVVM acts like a special controller. Unlike MVC, ViewModel introduces
additional abstraction, so it can be written without any detailed
knowledge of the view. In other words, the change of the view will have
much less impact on the ViewModel. However, the extra abstraction
requires extra design thinking.

In most cases, MVVM is suggested for better separation of concerns. On
the other hand, MVC is good for small user interfaces and new ZK users,
because it is quite straightforward.

## When to use zscript

[Zscript]({{site.baseurl}}/zk_dev_ref/ui_composing/scripts_in_zuml)
allows you to embed Java code in ZUML pages. It speeds up the design
cycle, so this can be a good approach for prototyping, POC and testing.
Zscript is also good for exploiting ZK features and reporting bugs to
ZK. However, like any other interpreter, the performance is not very
good as it tends to be error-prone. For this reason, it is *not*
suggested to use zscript for production systems.

## Documentation links

| Technology | Documentation Links |
|------------|-------------------|
| MVC | <ul><li>[ZK Developer's Reference: MVC](ZK_Developer's_Reference/MVC)</li><li>[ZK Developer's Reference: MVVM](ZK_Developer's_Reference/MVVM)</li><li>[ZK Developer's Reference: Performance Tips](ZK_Developer's_Reference/Performance_Tips/Use_Compiled_Java_Codes)</li><li>[org.zkoss.zk.ui.util.Composer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Composer.html) and [org.zkoss.zk.ui.select.SelectorComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/select/SelectorComposer.html)</li></ul> |
| ZSCRIPT | <ul><li>[ZK Developer's Reference: Scripts in ZUML](ZK_Developer's_Reference/ui_composing/ZUML/Scripts_in_ZUML)</li><li>[ZK Studio Essentials: MVC Extractor]({{site.baseurl}}/zk_studio_essentials/zscript_to_mvc_extractor)</li></ul> |

# [Data Binding]({{site.baseurl}}/zk_mvvm_ref/data_binding/index)

## When to use

[Data Binding]({{site.baseurl}}/zk_mvvm_ref/data_binding/index)
automates the data-copy plumbing code (CRUD) between UI components and
the data source. It is strongly suggested to use Data Binding whenever
applicable because it can help boost programmers' productivity and the
code is easy to read and maintain.

## When not to use

Barely. However, as Data Binding requires more time and effort to learn
than [EL expressions]({{site.baseurl}}/zk_dev_ref/ui_composing/el_expressions),
EL expressions provide an alternative for people not familiar with ZK,
especially during the UI design phase.

## Documentation links

- [ZK Developer's Reference: Data Binding]({{site.baseurl}}/zk_mvvm_ref/data_binding/index)

# [ZUML]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml) vs. [Richlet]({{site.baseurl}}/zk_dev_ref/ui_composing/richlet) vs. [JSP](/zk_jsp_tags_essentials/before_you_start)

## When to use ZUML

[ZUML]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml) is an
XML-based approach to declare UI. It does not require any programming
knowledge and it works well with
[MVC]({{site.baseurl}}/zk_dev_ref/mvc/mvc), [Data Binding]({{site.baseurl}}/zk_mvvm_ref/data_binding/index) and
others. ZUML is strongly suggested for usage unless you have different
preferences (such as pure Java and JSP).

However, if most parts of a page are in HTML scripts (such as header and
footer) and the UI designer is not familiar with ZUML, you could still
use JSP to define the page and then include ZUML page(s) for the part
that requires ZK components.

Notice that using ZUML does not prevent you from creating components
dynamically in Java. In fact, it is a common practice to use ZUML to
layout the theme of a Web application, and then use pure Java to
manipulate it dynamically.

## When to use Richlet

A [richlet]({{site.baseurl}}/zk_dev_ref/ui_composing/richlet) is
a small Java program that composes a user interface in Java for serving
a user's request. You could try to use it if you prefer to compose UI in
pure Java (like Swing).

## When to use JSP

If you would like to use ZK in legacy JSP pages, you could try one of
following approaches:

1.  Include `<jsp:include>` in a ZUML page.
2.  Apply [ZK JSP Tags](http://www.zkoss.org/product/zkjsp.dsp) to a JSP
    page directly.

As described above, if most of a page consists of pure HTML code and the
UI designer is not familiar with ZUML, you could use JSP to design the
page and then include it in ZUML pages if necessary.

Notice that ZUML supports the use of HTML tags well (without JSP). For
more information, please refer to the [ZK Developer's Reference: HTML Tags]({{site.baseurl}}/zk_dev_ref/ui_patterns/html_tags).

## Documentation links

| Technology | Documentation Links |
|------------|-------------------|
| ZUML | <ul><li>[ZK Developer's Reference: ZUML](ZK_Developer's_Reference/ui_composing/ZUML)</li><li>[ZK Developer's Reference: HTML Tags](ZK_Developer's_Reference/ui_patterns/HTML_Tags)</li></ul> |
| Richlet | <ul><li>[ZK Developer's Reference: Richlet](ZK_Developer's_Reference/ui_composing/Richlet)</li></ul> |
| JSP | <ul><li>[ZK Developer's Reference: Use ZK in JSP](ZK_Developer's_Reference/integration/Use_ZK_in_JSP) and [ZK JSP Tags](/zk_jsp_tags_essentials/before_you_start)</li></ul> |

# [Bookmarks]({{site.baseurl}}/zk_dev_ref/ui_patterns/browser_history_management) vs. Multiple Pages

A traditional page-based Web framework forces developers to split an
application into pages. On the other hand, Ajax (ZK) allows developers
to group a set of functionality into a single desktop-like page that
enables a more friendly user experience.

Grouping is much better based on the functionality, unless it is a small
application. For example, it might not be a good idea to group
administration with, let's say, data entry. Here are some guidelines:

- If a set of functionality is a logical unit to use and/or to develop,
  you might want to group it into a single page.
- If SEO (i.e., able to be indexed by search engine) is important, it is
  better to split UI into multiple pages (and turn on [the crawlable option]({{site.baseurl}}/zk_config_ref/the_crawlable_element)).

It does not matter whether the UI shares the same template (such as
header and footer) or not because it will be easy anyway to create
similar multiple pages (by the use of
[inclusion]({{site.baseurl}}/zk_dev_ref/ui_composing/include_a_page),
[templating]({{site.baseurl}}/zk_dev_ref/ui_patterns/templating)
and
[composite]({{site.baseurl}}/zk_dev_ref/ui_composing/composite_component)).

## When to use bookmarks (in single page)

After grouping a set of functionality into a single page, users can
still click on the BACK and the FORWARD button to switch among the
states of the single page and even bookmark on a particular state, as if
there are multiple pages. This can be done by using [Browser History Management]({{site.baseurl}}/zk_dev_ref/ui_patterns/browser_history_management)
(aka., bookmarks). You might consider this as a technique to simulate
multiple pages (for a single page with multiple states).

## When to use multiple pages

If a set of functionality is logically independent of one another, you
could make them as separated pages. To jump from one page to another,
you could use the so-called
[send-redirect]({{site.baseurl}}/zk_dev_ref/ui_patterns/forward_and_redirect)
technique.

## Documentation links

| Technology | Documentation Links |
|------------|-------------------|
| Bookmarks | <ul><li>[ZK Developer's Reference: Browser History Management](ZK_Developer's_Reference/ui_patterns/Browser_History_Management)</li><li>[ZK Developer's Reference: Browser Information and Control](ZK_Developer's_Reference/ui_patterns/Browser_Information_and_Control)</li></ul> |
| Multiple Pages | <ul><li>[ZK Developer's Reference: Forward and Redirect](ZK_Developer's_Reference/ui_patterns/Forward_and_Redirect)</li><li>[ZK Developer's Reference: Include](ZK_Developer's_Reference/ui_composing/ZUML/Include), [Templating](ZK_Developer's_Reference/ui_patterns/Templating) and [Composite](ZK_Developer's_Reference/ui_composing/Composite_Component) for consistent UI across multiple pages.</li></ul> |

# [Native Namespace]({{site.baseurl}}/zk_dev_ref/ui_patterns/the_native_namespace) vs. [XHTML Components]({{site.baseurl}}/zk_dev_ref/ui_patterns/the_xhtml_component_set)

ZK provides [several ways]({{site.baseurl}}/zk_dev_ref/ui_patterns/html_tags) to use
XHTML tags in a ZUML document. Here we will discuss [native namespace]({{site.baseurl}}/zk_dev_ref/ui_patterns/the_native_namespace)
vs. [XHTML components]({{site.baseurl}}/zk_dev_ref/ui_patterns/the_xhtml_component_set).
In a ZUML document, they basically mean the same thing except for the
XML namespace. Therefore it should be easy to switch between them.

## When to use native namespace

With the use of an XML namespace called [the native namespace]({{site.baseurl}}/zk_dev_ref/ui_patterns/the_native_namespace),
you could declare any tags in ZUML as long as they are valid to the
client (i.e., any HTML tags for a browser). It is suggested to use this
technology if the HTML tags are static. For example, you will not be
able to change the content dynamically with Ajax. The header, sidebar,
footer and the layout elements are typical examples. It saves the memory
on the server.

## When to use XHTML components

ZK also provides a set of components to represent each XHTML tag on the
server. Unlike the native namespace, these are the 'real' ZK components.

It is suggested that you change their content dynamically because they
behave the same as other ZK components. However, since it is a
component, it consumes the server's memory.

## Documentation links

- [ZK Developer's Reference: HTML Tags]({{site.baseurl}}/zk_dev_ref/ui_patterns/html_tags)
- [ZK Developer's Reference: Performance Tips\|Native vs. XHTML]({{site.baseurl}}/zk_dev_ref/performance_tips/use_native_namespace_instead_of_xhtml_namespace)
- [ZK Developer's Reference: Performance Tips: Stubonly]({{site.baseurl}}/zk_dev_ref/performance_tips/specify_stubonly_for_client_only_components)

# [Include]({{site.baseurl}}/zk_dev_ref/ui_composing/include_a_page), [Macro]({{site.baseurl}}/zk_dev_ref/ui_composing/macro_component), [Composite]({{site.baseurl}}/zk_dev_ref/ui_composing/composite_component) and [Templating]({{site.baseurl}}/zk_dev_ref/ui_patterns/templating)

They allow developers to modularize the UI such that it becomes easier
to develop, maintain and reuse.

## When to use include

[Include]({{site.baseurl}}/zk_component_ref/include)
allows you to include a ZUML page, a static page, a JSP page or the
result of a servlet. This is the most suitable for usage if you would
like to:

1.  Include a non-ZUML page
2.  Use a page ([org.zkoss.zul.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Page.html))
    to encapsulate a ZUML page[^1][^2]

The limitation of
[Include]({{site.baseurl}}/zk_component_ref/include)
is that you can not encapsulate its behavior in a Java class (like macro
or composite components do).

> <references/>

## When to use macro components

[Macro components]({{site.baseurl}}/zk_dev_ref/ui_composing/macro_component)
allow developers to define a new component with a ZUML page. So if you
would like to reuse a ZUML page across different pages, you can use it
because

1.  Though optional, you could [encapsulate the behavior in a Java class]({{site.baseurl}}/zk_dev_ref/ui_composing/implement_custom_java_class)
2.  It is easier to map a macro component to another URI, if necessary
3.  There is no difference between the use of a macro component and
    other components

## When to use composite components

[Composite component]({{site.baseurl}}/zk_dev_ref/ui_composing/composite_component)
is another way to define a new component. With this approach, you could
extend a new component from any existent components. However, you must
implement a Java class to represent the component[^3]. Unlike macro
components, you have to handle the component creation from a ZUML page
by yourself[^4].

Feel free to use composite components if you want to inherit the
behavior from an existent component, such as
[org.zkoss.zul.Window](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Window.html) and
[org.zkoss.zul.Cell](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Cell.html), and enhance it to have child
components defined in a ZUML document.

> ------------------------------------------------------------------------
>
> <references/>

## When to use templating

[Templating]({{site.baseurl}}/zk_dev_ref/ui_patterns/composition)
allows developers to define UI fragments and define how to assemble them
into a complete UI at runtime. Its use is very different from other
approaches. Feel free to use templating if you would like the overall
layout to be decided at runtime based on, let's say, users' roles or
preferences.

# Performance and Security

For production systems, it is strongly recommended to take a look at the
[Performance Tips]({{site.baseurl}}/zk_dev_ref/performance_tips/performance_tips)
and [Security Tips]({{site.baseurl}}/zk_dev_ref/security_tips/security_tips)
sections first.

# JSF

## When to use

JSF is a page-based framework. Because it is too complicated to use, we
strongly recommend you to deploy ZK. ZK can do whatever JSF can do or
even better. However, if you have to use ZK with legacy JSF, please
refer to the [Embed ZK Component in Foreign Framework]({{site.baseurl}}/zk_dev_ref/integration/embed_zk_component_in_foreign_framework)
section.

> ------------------------------------------------------------------------
>
> <references/>

[^1]: You have to specify `mode="defer"` to create a
    [org.zkoss.zul.Page](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Page.html) instance.

[^2]: Whether a page is required really depends on developer's
    preference. Introducing a page is more complicated but logically
    more loosely-coupled.

[^3]: Here is an example of composite components in [ZK Demo](http://www.zkoss.org/zkdemo/composite/composite_component)

[^4]: There is a utility called [ZK Composite](https://github.com/zanyking/ZK-Composite). It allows to
    define a composite component with Java annotations. Please refer to
    [Small Talks: Define Composite Component using Java Annotation in ZK6](https://www.zkoss.org/wiki/Small_Talks/2011/December/Define_Composite_Component_using_Java_Annotation_in_ZK6)
    for the details.