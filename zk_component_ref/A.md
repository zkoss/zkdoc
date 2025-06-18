

# A

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.A</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.wgt.A</javadoc>

# Employment/Purpose

The same as HTML A tag.

# Properties

## Autodisable

<javadoc method="setAutodisable(java.lang.String)">org.zkoss.zul.A</javadoc>
is used to disable an anchor automatically, when it is clicked. It is
useful to prevent the user from clicking it twice (and firing redundant
requests), which is common if the request takes long to serve.

The simplest use is to specify it with `self` as follows. Then, the
anchor is disabled when it is clicked.

```xml
<a id="ok" label="OK" autodisable="self" />
```

If you'd like to disable several anchors, you could specify all of them
in this property by separating with a comma. For example, the following
disables both anchors, when one of them is clicked.

```xml
<a id="ok" label="OK" autodisable="ok,cancel" />
<a id="cancel" label="Cancel" autodisable="ok,cancel" />
```

The anchor will be enabled automatically, after the request has been
served (i.e., the response has been sent back to the client). If you
prefer to enable them manually (i.e., by calling
<javadoc method="setDisabled(boolean)">org.zkoss.zul.A</javadoc>
explicitly), you could prefix the ID with a plus (`+`). For example,

```xml
<a id="ok" label="OK" autodisable="+self, +cancel" />
```

Then, you could enable them manually under the situation depending on
your application's requirement, such as

```java
if (something_happens) {
   ok.setDisabled(false);
   cancel.setDisabled(false);
}
```

### Enable Autodisable for All Anchors

As described in [ZK Developer's Reference:Customization]({{site.baseurl}}/zk_dev_ref/customization/component_properties),
you could customize ZK to enable `autodisable` for all anchors by
specifying the following in the custom language addon:

```xml
<language-addon>
    <language-name>xul/html</language-name>
    <component>
        <component-name>a</component-name>
        <extends>a</extends>
        <property>
            <property-name>autodisable</property-name>
            <property-value>self</property-value>
        </property>
    </component>
</language-addon>
```

# File Download Link

When a user clicks <a/> whose `target` is `_self` (default value) will
cause a browser to trigger the event `onbeforeunload`, then ZK depends
on this event to remove a desktop. This also apply to browser-processed
links. Links that do not open a page, but provide a browser instruction
to open a different service, such as `mailto:`, `tel:`, etc.

Hence, after clicking the hyperlink, all ZK client ajax doesn't work
anymore. Here are several correct ways to create a file download link:

## open a new tab

specify `_blank` and your browser will produce a new tab and close
immediately.

\<syntaxhighlight lang='xml\>
<a href="report.pdf" target='_blank'>download</a>

</syntaxhighlight>

After clicking a link like
<a href="report.pdf" target='_self'>`download`</a>, you will find ZK
doesn't send AJAX requests anymore to the server.

## download attribute

A browser will prompt the user to save the linked URL instead of
navigating to it. \<syntaxhighlight lang='xml\>
<zk xmlns:c="client/attribute">
<a href="report.xls" c:download="" target='_self'>download</a> </zk>

</syntaxhighlight>

Please refer to [download
attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download)

## [Filedownload API]({{site.baseurl}}/zk_dev_ref/ui_patterns/file_upload_and_download#File_Download)

# Example

![](/zk_component_ref/images/ZKComRef_A_Examples.PNG)

```xml
<a href="http://www.zkoss.org" label="Visit ZK!"/>
```

In addition, you could add child components to
<javadoc>org.zkoss.zul.A</javadoc> too:

```xml
<a href="http://www.zkoss.org" label="Visit ZK!" image="zk.png">
  <grid>
    <rows>
      <row>What ever content</row>
    </rows>
  </grid>
</a>
```

Notice that a child component might also handle the mouse click, so the
final result of clicking on a child component is really up to which
child component is used.

The href attribute can be an URI. For example,

```xml
<a href="/foo" label="Foo" />
<a href="goo" label="Goo" />
```

If the URI starts with "/", ZK will encode it with the application's
context path. Otherwise the path is relative to the path given by
Desktop.getDirectory().

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  LabelImageElement]({{site.baseurl}}/zk_component_ref/base_components/labelimageelement#Supported_Events)

# Supported Children

`*ALL`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date          | Content                                                                                 |
|---------|---------------|-----------------------------------------------------------------------------------------|
| 5.0.5   | October, 2010 | <javadoc>org.zkoss.zul.A</javadoc> supports any children.                               |
| 7.0.2   | May, 2014     | [Support autodisable property for A component](http://tracker.zkoss.org/browse/ZK-2237) |


