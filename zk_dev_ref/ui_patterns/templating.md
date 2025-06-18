Templating is a technique that allows developers to define UI fragments,
and how to assemble them into a complete UI at runtime. With ZK, it can
be done by the use of annotations and composers (or initators,
<javadoc type="interface">org.zkoss.zk.ui.utilInitiator</javadoc>).

In general, templating can be done by specifying the name of a fragment
as [annotations]({{site.baseurl}}/zk_dev_ref/annotations) in a
ZUML document that shall represent a complete UI, and a composer that is
capable to parse annotations and replace them with the fragment. For
example,

```xml
<div apply="foo.MyTemplateManager"><!-- your template manager -->
    <include src="@header()"/><!-- you could use any component as long as your manager knows how to handle it -->
    <include src="@content()"/>
    <include src="@footer()"/>
</div>
```

Here is a list of the implementations that ZK supports by default. You
could implement your own, if it does not fulfill your requirement. If
the templating is stateful and dynamical, you might consider [ZK
Spring](http://www.zkoss.org/product/zkspring.dsp) for using Spring Web
Flow instead.
