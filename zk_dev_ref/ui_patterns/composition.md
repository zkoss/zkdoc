

<javadoc>org.zkoss.zk.ui.util.Composition</javadoc> is one of the
built-in templating implementations. The concept is simple:

1.  Define a template (a ZUML document representing a complete UI)
2.  Define a ZUML document that contains a collection of fragments that
    a template might reference

Notice that the user shall visit the ZUML document with a collection of
fragments rather than the template document.

The advantage of <javadoc>org.zkoss.zk.ui.util.Composition</javadoc> is
that you don't need additional configuration file.

**Note**: the composition doesn't support mixing up ZUML and ZHTML
language, that is, if you define a ZHTML template as the HTML content
that contains *Html* and *Body* tags, you cannot use that template in a
ZUML page.

# Defines a Template

A template document is a ZUML document that defines how to assemble the
fragments. For example,

```xml
<!-- /WEB-INF/layout/template.zul -->
<vbox>
  <hbox self="@insert(content)"/>
  <hbox self="@insert(detail)"/>
</vbox>
```

As shown, the anchor (i.e., the component that a fragment will insert as
children) is defined by specifying an annotation as
`@insert(`*`name`*`)`. Then, when
<javadoc>org.zkoss.zk.ui.util.Composition</javadoc> is applied to a ZUML
document with a collection of fragments, the matched fragment will
become the child of the annotated component (such as `hbox` in the above
example).

# Define Fragments

To apply a template to a ZUML document that a user visits, you have to
define a collection of fragments that a template might use, and then
specify <javadoc>org.zkoss.zk.ui.util.Composition</javadoc> as one of
the initiators of the document:

```xml
<!-- foo/index.zul -->
<?init class="org.zkoss.zk.ui.util.Composition"
arg0="/WEB-INF/layout/template.zul"?>
<zk>
  <window self="@define(content)" title="window1" width="100px"/>
  <window self="@define(content)" title="window2" width="200px"/>
  <grid self="@define(detail)" width="300px" height="100px"/>
</zk>
```

As shown, a fragment is defined by specifying an annotation as
`self="@define(`*`name`*`)"`. Furthermore, the template is specified in
[the init directive](ZUML_Reference/ZUML/Processing_Instructions/init).

Then, when the user visits this page (`foo/index.zul` in the above
example), <javadoc>org.zkoss.zk.ui.util.Composition</javadoc> will:

1.  Load the template, and render it as the root components of this
    page(`foo/index.zul`)
2.  Move the fragments specified in this page to become the children of
    the anchor component with the same annotation name

Thus, here is the result

```xml
<vbox>
  <hbox>
    <window title="window1" width="100px"/>
    <window title="window2" width="200px"/>
  </hbox>
  <hbox>
    <grid width="300px" height="100px"/>
  </hbox>
</vbox>
```

## Multiple Templates

You could apply multiple templates to a single page too:

```xml
<?init class="org.zkoss.zk.ui.util.Composition"
arg0="/WEB-INF/layout/template0.zul" arg1="/WEB-INF/layout/template1.zul"?>
```

The templates specified in `arg0` and `arg1` (etc.) will be loaded and
rendered one-by-one.

## Grouping Fragments into Separated Files

In a complex templating environment, it might not be appropriate to put
fragments in the target page (e.g., `foo/index.zul` in the above
example), since you might want to use the same collection of fragments
in several target pages. It can be easily by use of [the include component]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/include)
as follows.

```xml
<!-- foo/index.zul -->
<?init class="org.zkoss.zk.ui.util.Composition"
arg0="/WEB-INF/layout/template.zul"?>
<include src="/WEB-INF/layout/fragments.zul"/>
```

Then, you could group fragments into one or multiple individual ZUL
documents, such as

```xml
<!-- /WEB-INF/layout/fragments.zul -->
<zk>
  <window self="@define(content)" title="window1" width="100px"/>
  <window self="@define(content)" title="window2" width="200px"/>
  <grid self="@define(detail)" width="300px" height="100px"/>
</zk>
```

## Positioning

If you want to use <javadoc>org.zkoss.zk.ui.util.Composition</javadoc>
inside any of the containers (like Div, Window, Tabbox), you have to use
[the include component]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/include)
and set its mode *Defer* :  
**Note**: You have to specify
<javadoc>org.zkoss.zk.ui.util.Composition</javadoc> as of the initiators
of the 'fragments')

```xml
<!-- foo/index.zul -->
<window title="This is a window" border="normal">
  <include src="/WEB-INF/layout/fragments.zul" mode="defer" />
</window>
```

```xml
<!-- /WEB-INF/layout/fragments.zul -->
<?init class="org.zkoss.zk.ui.util.Composition" arg0="/WEB-INF/layout/template.zul"?>
<zk>
  <window self="@define(content)" title="window1" width="100px"/>
  <window self="@define(content)" title="window2" width="200px"/>
  <grid self="@define(detail)" width="300px" height="100px"/>
</zk>
```
