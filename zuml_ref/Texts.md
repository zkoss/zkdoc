In general, a XML text is interpreted as a label component. For example,

```xml
<window>
  Begin ${foo.whatever}
</window>
```

is equivalent to

```xml
<window>
  <label value="Begin ${foo.whatever}"/>
</window>
```

# Components consider the nested content as proerty

However, a component can be designed to accept the nested text as the
value of a component property. In other words, a component designer
could decide to make ZK Loader interpret the nest text as the value of a
predefined property. For example, <javadoc>org.zkoss.zul.Html</javadoc>
is one of this kind of components, and

```xml
<html>Begin ${foo.whatever}</html>
```

is equivalent to

```xml
<html content="Begin ${foo.whatever}"/>
```

It is designed to make it easy to specify multiple-line value, so it is
usually used by particular components that requires the multi-line
value.

Here is a list of components that interprets the XML text as a
property's value.

<table>
<thead>
<tr class="header">
<th><p>Component Name</p></th>
<th><p>Property Name</p></th>
<th><p>Method</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>a</p></td>
<td><p>label</p></td>
<td><p><javadoc method="setLabel(java.lang.String)">org.zkoss.zul.A</javadoc></p></td>
</tr>
<tr class="even">
<td><p>button</p></td>
<td><p>label</p></td>
<td><p><javadoc method="setLabel(java.lang.String)">org.zkoss.zul.Button</javadoc></p></td>
</tr>
<tr class="odd">
<td><p>comboitem</p></td>
<td><p>content</p></td>
<td><p><javadoc method="setContent(java.lang.String)">org.zkoss.zul.Comboitem</javadoc></p></td>
</tr>
<tr class="even">
<td><p>html</p></td>
<td><p>content</p></td>
<td><p><javadoc method="setContent(java.lang.String)">org.zkoss.zul.Html</javadoc></p></td>
</tr>
<tr class="odd">
<td><p>label</p></td>
<td><p>value</p></td>
<td><p><javadoc method="setValue(java.lang.String)">org.zkoss.zul.Label</javadoc></p></td>
</tr>
<tr class="even">
<td><p>script</p></td>
<td><p>content</p></td>
<td><p><javadoc method="setContent(java.lang.String)">org.zkoss.zul.Script</javadoc></p></td>
</tr>
<tr class="odd">
<td><p>style</p></td>
<td><p>content</p></td>
<td><p><javadoc method="setContent(java.lang.String)">org.zkoss.zul.Style</javadoc></p></td>
</tr>
<tr class="even">
<td><p>tab</p></td>
<td><p>label</p></td>
<td><p><javadoc method="setLabel(java.lang.String)">org.zkoss.zul.Tab</javadoc>
(since 5.0.7)</p>
<p><strong>Note:</strong> Since 6.5.0, please use
<javadoc method="setLabel(java.lang.String)">org.zkoss.zul.Tab</javadoc>
instead</p></td>
</tr>
</tbody>
</table>

## The nested XML content

`[since 6.0.0]`

Since ZK 6, components that consider the text as a property's value will
accept the XML fragment. For example,

```xml
<html>
  <ol style="border: 1px solid blue">
    <li>Apple</li>
    <li>Orange</li>
  </ol>
</html>
```

In other words, you don't have to escape the special characters (\< and
\>) with `CDATA`. In addition, you could leverage the full power of ZUML
such as [the zk element](ZUML_Reference/ZUML/Elements/zk) and
[the forEach
attribute](ZUML_Reference/ZUML/Attributes/forEach). For
example,

```xml
<html>
  <ol>
    <li forEach="Apple, Orange">${each}</li>
  </ol>
</html>
```

Note that the nested content is part of the ZUML page, so it must be a
legal XML document.

# Version History

| Version | Date           | Content                                                                                             |
|---------|----------------|-----------------------------------------------------------------------------------------------------|
| 5.0.7   | April 2011     | <javadoc>org.zkoss.zul.Tab</javadoc> allow the XML text as the label.                               |
| 6.0.0   | September 2011 | The nested XML content was supported.                                                               |
| 6.5.0   | September 2012 | [The Tab component support caption component as it's label](http://tracker.zkoss.org/browse/ZK-970) |
