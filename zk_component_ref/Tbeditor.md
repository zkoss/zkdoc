# Tbeditor

- Java API:
  [Tbeditor](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Tbeditor.html)
- JavaScript API:
  [Tbeditor](https://www.zkoss.org/javadoc/latest/jsdoc/zkmax/inp/Tbeditor.html)

# Employment/Purpose

Tbeditor is a rich text editor to be used inside web pages. It's a
WYSIWYG editor, which means that the text being edited on it looks as
similar as possible to the results users have when publishing it.

The component wraps [Trumbowyg](http://alex-d.github.io/Trumbowyg/)

## Bundled Versions

| ZK     | Trumbowyg    |
|--------|--------------|
| 9.6.0+ | 2.7.2        |
| 8.5.0  | 2.6          |
| 8.0.0  | 2.0.0-beta.2 |

# Example

<figure>
<img src="Zkcompref_tbeditor.png" title="Zkcompref_tbeditor.png"
width="800" />
<figcaption>Zkcompref_tbeditor.png</figcaption>
</figure>

``` xml
<tbeditor id="tb" value="this is a demo for &lt;b&gt;trumbowy&lt;/b&gt; editor!!" />
```

# Customized Properties

Tbeditor provides a way for users to customize their own properties,
check [official
document](http://alex-d.github.io/Trumbowyg/documentation.html) for the
details. (Not all properties are supported, for example, localization,
and custom skin, are not supported.)

Here is a simple example of how to programmatic change the property:

``` java
Map config = new HashMap();
config.put("btns", new String[] {"bold", "italic", "link"});
config.put("closable", true);
tbeditor.setConfig(config);
```

- Line 1: We create a map while a key is a property name with a
  supported value. Note that we have to wrap the value into
  `JavaScriptValue` object if it's not String.

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
<td><center>
<p><code>onChange</code></p>
</center></td>
<td><p><javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc></p>
<p>Denotes that the content of the component has been modified by a
user</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onChanging</code></p>
</center></td>
<td><p><javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc></p>
<p>Denotes that a user is changing the content of an input component.
Notice that the component's content (at the server) won't be changed
until <code>onChange</code> is received. Thus, you have to invoke the
<code>getValue</code>method in the <code>InputEvent</code>class to
retrieve the temporary value.</p></td>
</tr>
</tbody>
</table>

# Supported Children

`*NONE`
