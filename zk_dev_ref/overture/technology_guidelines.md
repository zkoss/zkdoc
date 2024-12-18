ZK provides end-to-end solutions from UI design, development, testing to
production. Here are the technology guidelines to help developers to
make choices along the way.

If you are new to ZK and prefer to have some prior knowledge of ZK
first, you could skip this section and come back later when you
understand more about ZK.

# [MVC]({{site.baseurl}}/zk_dev_ref/MVC) vs. [MVVM]({{site.baseurl}}/zk_dev_ref/MVVM) vs. [ZScript]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML/Scripts_in_ZUML)

They serve different purposes and could work together. However, some
developers get confused about these technologies.

## When to use MVC and/or MVVM

[MVC]({{site.baseurl}}/zk_dev_ref/MVC) (Model-View-Control;
aka., Model-View-Presenter) and
[MVVM]({{site.baseurl}}/zk_dev_ref/MVVM) (Model-View-ViewModel;
aka., Presentation Model) are both design patterns that isolate the
dependency among the domain data, the domain logic and the user
interface. They are both supported by ZK, and they are praised for their
[separation of
concerns](http://en.wikipedia.org/wiki/Separation_of_concerns) and thus
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

[Zscript]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML/Scripts_in_ZUML)
allows you to embed Java code in ZUML pages. It speeds up the design
cycle, so this can be a good approach for prototyping, POC and testing.
Zscript is also good for exploiting ZK features and reporting bugs to
ZK. However, like any other interpreter, the performance is not very
good as it tends to be error-prone. For this reason, it is *not*
suggested to use zscript for production systems.

## Documentation links

<table>
<tbody>
<tr class="odd">
<td><p>MVC:</p></td>
<td><ul>
<li><a href="ZK_Developer&#39;s_Reference/MVC" title="wikilink">ZK
Developer's Reference: MVC</a></li>
<li><a href="ZK_Developer&#39;s_Reference/MVVM" title="wikilink">ZK
Developer's Reference: MVVM</a></li>
<li><a
href="ZK_Developer&#39;s_Reference/Performance_Tips/Use_Compiled_Java_Codes"
title="wikilink">ZK Developer's Reference: Performance Tips</a></li>
<li><javadoc type="interface">org.zkoss.zk.ui.util.Composer</javadoc>
and <javadoc>org.zkoss.zk.ui.select.SelectorComposer</javadoc></li>
</ul></td>
</tr>
<tr class="even">
<td><p>ZSCRIPT:</p></td>
<td><ul>
<li><a
href="ZK_Developer&#39;s_Reference/UI_Composing/ZUML/Scripts_in_ZUML"
title="wikilink">ZK Developer's Reference: Scripts in ZUML</a></li>
<li><a
href="ZK_Studio_Essentials/Features_of_ZK_Studio/Zscript_to_MVC_Extractor"
title="wikilink">ZK Studio Essentials: MVC Extractor</a></li>
</ul></td>
</tr>
</tbody>
</table>

# [Data Binding]({{site.baseurl}}/zk_dev_ref/MVVM/Data_Binding)

## When to use

[Data Binding]({{site.baseurl}}/zk_dev_ref/MVVM/Data_Binding)
automates the data-copy plumbing code (CRUD) between UI components and
the data source. It is strongly suggested to use Data Binding whenever
applicable because it can help boost programmers' productivity and the
code is easy to read and maintain.

## When not to use

Barely. However, as Data Binding requires more time and effort to learn
than [EL
expressions]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML/EL_Expressions),
EL expressions provide an alternative for people not familiar with ZK,
especially during the UI design phase.

## Documentation links

- [ZK Developer's Reference: Data
  Binding]({{site.baseurl}}/zk_dev_ref/MVVM/Data_Binding)

# [ZUML]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML) vs. [Richlet]({{site.baseurl}}/zk_dev_ref/UI_Composing/Richlet) vs. [JSP](ZK_JSP_Docs)

## When to use ZUML

[ZUML]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML) is an
XML-based approach to declare UI. It does not require any programming
knowledge and it works well with
[MVC]({{site.baseurl}}/zk_dev_ref/MVC), [Data
Binding]({{site.baseurl}}/zk_dev_ref/MVVM/Data_Binding) and
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

A [richlet]({{site.baseurl}}/zk_dev_ref/UI_Composing/Richlet) is
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
more information, please refer to the [ZK Developer's Reference: HTML
Tags]({{site.baseurl}}/zk_dev_ref/UI_Patterns/HTML_Tags).

## Documentation links

<table>
<tbody>
<tr class="odd">
<td><p>ZUML:</p></td>
<td><ul>
<li><a href="ZK_Developer&#39;s_Reference/UI_Composing/ZUML"
title="wikilink">ZK Developer's Reference: ZUML</a></li>
<li><a href="ZK_Developer&#39;s_Reference/UI_Patterns/HTML_Tags"
title="wikilink">ZK Developer's Reference: HTML Tags</a></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Richlet:</p></td>
<td><ul>
<li><a href="ZK_Developer&#39;s_Reference/UI_Composing/Richlet"
title="wikilink">ZK Developer's Reference: Richlet</a></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>JSP:</p></td>
<td><ul>
<li><a href="ZK_Developer&#39;s_Reference/Integration/Use_ZK_in_JSP"
title="wikilink">ZK Developer's Reference: Use ZK in JSP</a> and <a
href="ZK_JSP_Docs" title="wikilink">ZK JSP Tags</a></li>
</ul></td>
</tr>
</tbody>
</table>

# [Bookmarks]({{site.baseurl}}/zk_dev_ref/UI_Patterns/Browser_History_Management) vs. Multiple Pages

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
  better to split UI into multiple pages (and turn on [the crawlable
  option](ZK_Configuration_Reference/zk.xml/The_system-config_Element/The_crawlable_Element)).

It does not matter whether the UI shares the same template (such as
header and footer) or not because it will be easy anyway to create
similar multiple pages (by the use of
[inclusion]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML/Include),
[templating]({{site.baseurl}}/zk_dev_ref/UI_Patterns/Templating)
and
[composite]({{site.baseurl}}/zk_dev_ref/UI_Composing/Composite_Component)).

## When to use bookmarks (in single page)

After grouping a set of functionality into a single page, users can
still click on the BACK and the FORWARD button to switch among the
states of the single page and even bookmark on a particular state, as if
there are multiple pages. This can be done by using [Browser History
Management]({{site.baseurl}}/zk_dev_ref/UI_Patterns/Browser_History_Management)
(aka., bookmarks). You might consider this as a technique to simulate
multiple pages (for a single page with multiple states).

## When to use multiple pages

If a set of functionality is logically independent of one another, you
could make them as separated pages. To jump from one page to another,
you could use the so-called
[send-redirect]({{site.baseurl}}/zk_dev_ref/UI_Patterns/Forward_and_Redirect)
technique.

## Documentation links

<table>
<tbody>
<tr class="odd">
<td><p>Bookmarks:</p></td>
<td><ul>
<li><a
href="ZK_Developer&#39;s_Reference/UI_Patterns/Browser_History_Management"
title="wikilink">ZK Developer's Reference: Browser History
Management</a></li>
<li><a
href="ZK_Developer&#39;s_Reference/UI_Patterns/Browser_Information_and_Control"
title="wikilink">ZK Developer's Reference: Browser Information and
Control</a></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Multiple Pages:</p></td>
<td><ul>
<li><a
href="ZK_Developer&#39;s_Reference/UI_Patterns/Forward_and_Redirect"
title="wikilink">ZK Developer's Reference: Forward and Redirect</a></li>
<li><a href="ZK_Developer&#39;s_Reference/UI_Composing/ZUML/Include"
title="wikilink">ZK Developer's Reference: Include</a>, <a
href="ZK_Developer&#39;s_Reference/UI_Patterns/Templating"
title="wikilink">Templating</a> and <a
href="ZK_Developer&#39;s_Reference/UI_Composing/Composite_Component"
title="wikilink">Composite</a> for consistent UI across multiple
pages.</li>
</ul></td>
</tr>
</tbody>
</table>

# [Native Namespace]({{site.baseurl}}/zk_dev_ref/UI_Patterns/HTML_Tags/The_native_Namespace) vs. [XHTML Components]({{site.baseurl}}/zk_dev_ref/UI_Patterns/HTML_Tags/The_XHTML_Component_Set)

ZK provides [several
ways]({{site.baseurl}}/zk_dev_ref/UI_Patterns/HTML_Tags) to use
XHTML tags in a ZUML document. Here we will discuss [native
namespace]({{site.baseurl}}/zk_dev_ref/UI_Patterns/HTML_Tags/The_native_Namespace)
vs. [XHTML
components]({{site.baseurl}}/zk_dev_ref/UI_Patterns/HTML_Tags/The_XHTML_Component_Set).
In a ZUML document, they basically mean the same thing except for the
XML namespace. Therefore it should be easy to switch between them.

## When to use native namespace

With the use of an XML namespace called [the native
namespace]({{site.baseurl}}/zk_dev_ref/UI_Patterns/HTML_Tags/The_native_Namespace),
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

- [ZK Developer's Reference: HTML
  Tags]({{site.baseurl}}/zk_dev_ref/UI_Patterns/HTML_Tags)
- [ZK Developer's Reference: Performance Tips\|Native vs.
  XHTML]({{site.baseurl}}/zk_dev_ref/Performance_Tips/Use_Native_Namespace_instead_of_XHTML_Namespace)
- [ZK Developer's Reference: Performance Tips:
  Stubonly]({{site.baseurl}}/zk_dev_ref/Performance_Tips/Specify_Stubonly_for_Client-only_Components)

# [Include]({{site.baseurl}}/zk_dev_ref/UI_Composing/ZUML/Include), [Macro]({{site.baseurl}}/zk_dev_ref/UI_Composing/Macro_Component), [Composite]({{site.baseurl}}/zk_dev_ref/UI_Composing/Composite_Component) and [Templating]({{site.baseurl}}/zk_dev_ref/UI_Patterns/Templating)

They allow developers to modularize the UI such that it becomes easier
to develop, maintain and reuse.

## When to use include

[Include](ZK_Component_Reference/Essential_Components/Include)
allows you to include a ZUML page, a static page, a JSP page or the
result of a servlet. This is the most suitable for usage if you would
like to:

1.  Include a non-ZUML page
2.  Use a page (<javadoc type="interface">org.zkoss.zul.Page</javadoc>)
    to encapsulate a ZUML page[^1][^2]

The limitation of
[Include](ZK_Component_Reference/Essential_Components/Include)
is that you can not encapsulate its behavior in a Java class (like macro
or composite components do).

> <references/>

## When to use macro components

[Macro
components]({{site.baseurl}}/zk_dev_ref/UI_Composing/Macro_Component)
allow developers to define a new component with a ZUML page. So if you
would like to reuse a ZUML page across different pages, you can use it
because

1.  Though optional, you could [encapsulate the behavior in a Java
    class]({{site.baseurl}}/zk_dev_ref/UI_Composing/Macro_Component/Implement_Custom_Java_Class)
2.  It is easier to map a macro component to another URI, if necessary
3.  There is no difference between the use of a macro component and
    other components

## When to use composite components

[Composite
component]({{site.baseurl}}/zk_dev_ref/UI_Composing/Composite_Component)
is another way to define a new component. With this approach, you could
extend a new component from any existent components. However, you must
implement a Java class to represent the component[^3]. Unlike macro
components, you have to handle the component creation from a ZUML page
by yourself[^4].

Feel free to use composite components if you want to inherit the
behavior from an existent component, such as
<javadoc>org.zkoss.zul.Window</javadoc> and
<javadoc>org.zkoss.zul.Cell</javadoc>, and enhance it to have child
components defined in a ZUML document.

> ------------------------------------------------------------------------
>
> <references/>

## When to use templating

[Templating]({{site.baseurl}}/zk_dev_ref/UI_Patterns/Templating/Composition)
allows developers to define UI fragments and define how to assemble them
into a complete UI at runtime. Its use is very different from other
approaches. Feel free to use templating if you would like the overall
layout to be decided at runtime based on, let's say, users' roles or
preferences.

# Performance and Security

For production systems, it is strongly recommended to take a look at the
[Performance Tips]({{site.baseurl}}/zk_dev_ref/Performance_Tips)
and [Security Tips]({{site.baseurl}}/zk_dev_ref/Security_Tips)
sections first.

# JSF

## When to use

JSF is a page-based framework. Because it is too complicated to use, we
strongly recommend you to deploy ZK. ZK can do whatever JSF can do or
even better. However, if you have to use ZK with legacy JSF, please
refer to the [Embed ZK Component in Foreign
Framework]({{site.baseurl}}/zk_dev_ref/Integration/Embed_ZK_Component_in_Foreign_Framework)
section[^5].

> ------------------------------------------------------------------------
>
> <references/>

[^1]: You have to specify `mode="defer"` to create a
    <javadoc type="interface">org.zkoss.zul.Page</javadoc> instance.

[^2]: Whether a page is required really depends on developer's
    preference. Introducing a page is more complicated but logically
    more loosely-coupled.

[^3]: Here is an example of composite components in [ZK
    Demo](http://www.zkoss.org/zkdemo/composite/composite_component)

[^4]: There is a utility called [ZK
    Composite](https://github.com/zanyking/ZK-Composite). It allows to
    define a composite component with Java annotations. Please refer to
    [Small Talks: Define Composite Component using Java Annotation in
    ZK6](Small_Talks/2011/December/Define_Composite_Component_using_Java_Annotation_in_ZK6)
    for the details.

[^5]: Notice that [ZK JSF Components](ZK_JSF_Docs) is no
    longer supported.
