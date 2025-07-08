# Standard Namespaces

Standard namespaces are not languages. That means they are *not* used to
provide component definitions. Rather, they are used to provide special
functionality to ZUML.

> ------------------------------------------------------------------------
>
> For introduction of languages vs standard namespaces, please refer to
> [ZK Developer's > References]({{site.baseurl}}/zk_dev_ref/ui_composing/xml_namespaces).

<table>
<thead>
<tr class="header">
<th><p>Namespace</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><a href="zuml_ref/ZUML/Namespaces/ZK"
title="wikilink">zk</a></p></td>
<td><p><code>Name: zk</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2005/zk"><code>http://www.zkoss.org/2005/zk</code></a><br />
<code>Namespace shortcut: zk</code><br />
<code>Java: </code><javadoc method="ZK_NAMESPACE"><code>org.zkoss.zk.ui.metainfo.LanguageDefinition</code></javadoc></p>
<p>It is the reserved namespace for specifying ZK specific elements and
attributes, such as the zk element and the unless attribute. For more
information please refer to the <a
href="zuml_ref/ZUML/Namespaces/ZK" title="wikilink">ZK
Namespace</a> section.</p></td>
</tr>
<tr class="even">
<td><p><a href="zuml_ref/ZUML/Namespaces/Native"
title="wikilink">native</a></p></td>
<td><p><code>Name: native</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2005/zk/native"><code>http://www.zkoss.org/2005/zk/native</code></a><br />
<code>Namespace shortcut: native</code><br />
<code>Java: </code><javadoc method="NATIVE_NAMESPACE"><code>org.zkoss.zk.ui.metainfo.LanguageDefinition</code></javadoc></p>
<p>It is the reserved namespace for specifying native elements. A native
element represents a native tag at the client. For browsers, a native
element represents a HTML tag. Unlike the xhtml language, there is no
component associated with, so the performance is much better but you
cannot change it dynamically.</p>
<p>For more information please refer to the <a
href="zuml_ref/ZUML/Namespaces/Native" title="wikilink">Native
Namespace</a> section.</p></td>
</tr>
<tr class="odd">
<td><p><a href="zuml_ref/ZUML/Namespaces/Annotation"
title="wikilink">annotation</a></p></td>
<td><p><code>Name: annotation</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2005/zk/annotation"><code>http://www.zkoss.org/2005/zk/annotation</code></a><br />
<code>Namespace shortcut: annotation</code><br />
<code>Java: </code><javadoc method="ANNOTATION_NAMESPACE"><code>org.zkoss.zk.ui.metainfo.LanguageDefinition</code></javadoc></p>
<p>It is the reserved namespace for specifying annotations. For more
information please refer to the <a
href="zuml_ref/ZUML/Namespaces/Annotation"
title="wikilink">annotation</a> section.</p></td>
</tr>
<tr class="even">
<td><p><a href="zuml_ref/ZUML/Namespaces/Client"
title="wikilink">client</a></p></td>
<td><p><code>Name: client</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2005/zk/client"><code>http://www.zkoss.org/2005/zk/client</code></a><br />
<code>Namespace shortcut: client</code><br />
<code>Java: </code><javadoc method="CLIENT_NAMESPACE"><code>org.zkoss.zk.ui.metainfo.LanguageDefinition</code></javadoc></p>
<p>It is the reserved namespace for specifying a ZK JavaScript
<strong>widget's event listeners and attributes</strong>. For more
information please refer to the <a
href="zuml_ref/ZUML/Namespaces/Client" title="wikilink">Client
Namespace</a> section.</p></td>
</tr>
<tr class="odd">
<td><p><a href="zuml_ref/ZUML/Namespaces/Client_Attribute"
title="wikilink">client attribute</a></p></td>
<td><p><code>Name: client/attribute</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2005/zk/client/attribute"><code>http://www.zkoss.org/2005/zk/client/attribute</code></a><br />
<code>Namespace shortcut: client/attribute</code><br />
<code>Java: </code><javadoc method="CLIENT_ATTRIBUTE_NAMESPACE"><code>org.zkoss.zk.ui.metainfo.LanguageDefinition</code></javadoc></p>
<p>It is the reserved namespace for specifying client-side <strong>DOM
attributes</strong>. Unlike the client namespace, which assigns
something to widgets, the client/attribute namespace assigns to the DOM
tree directly.</p>
<p>For more information please refer to the <a
href="zuml_ref/ZUML/Namespaces/Client_Attribute"
title="wikilink">Client Attribute Namespace</a> section.</p></td>
</tr>
<tr class="even">
<td><p><a href="zuml_ref/ZUML/Namespaces/Client_Attribute_Prefix"
title="wikilink">client attribute prefix</a></p></td>
<td><p><code>Name: client/attribute-prefix</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2020/zk/client/attribute-prefix"><code>http://www.zkoss.org/2020/zk/client/attribute-prefix</code></a><br />
<code>Namespace shortcut: client/attribute-prefix</code><br />
<code>Java: </code><javadoc method="CLIENT_ATTRIBUTE_PREFIX_NAMESPACE"><code>org.zkoss.zk.ui.metainfo.LanguageDefinition</code></javadoc></p>
<p>It is the reserved namespace for specifying the client-side
<strong>DOM attributes</strong> including the prefix. Unlike the client
namespace, which assigns something to widgets, the
client/attribute-prefix namespace assigns to the DOM tree directly.</p>
<p>For more information please refer to the <a
href="zuml_ref/ZUML/Namespaces/Client_Attribute_Prefix"
title="wikilink">Client Attribute Prefix Namespace</a> section.</p></td>
</tr>
<tr class="odd">
<td><p><a href="zuml_ref/ZUML/Languages"
title="wikilink">xhtml</a></p></td>
<td><p><code>Name: xhtml</code><br />
<code>Namespace: </code><a
href="http://www.w3.org/1999/xhtml"><code>http://www.w3.org/1999/xhtml</code></a><br />
<code>Namespace shortcut: xhtml</code></p>
<p>It is the XHTML component set. For more information please refer to
the <a href="zuml_ref/ZUML/Languages" title="wikilink"> the
Languages section</a>.</p></td>
</tr>
<tr class="even">
<td><p><a href="zuml_ref/ZUML/Languages"
title="wikilink">zul</a></p></td>
<td><p><code>Name: xul/html</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2005/zul"><code>http://www.zkoss.org/2005/zul</code></a><br />
<code>Namespace shortcut: zul</code></p>
<p>It is the ZUL component set. For more information please refer to the
<a href="zuml_ref/ZUML/Languages" title="wikilink"> the Languages
section</a>.</p></td>
</tr>
<tr class="odd">
<td><p><a href="zuml_ref/ZUML/Languages"
title="wikilink">xml</a></p></td>
<td><p><code>Name: xml</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2007/xml"><code>http://www.zkoss.org/2007/xml</code></a><br />
<code>Namespace shortcut: xml</code></p>
<p>It is the XML component set. For more information please refer to the
<a href="zuml_ref/ZUML/Languages" title="wikilink"> the Languages
section</a>.</p></td>
</tr>
<tr class="even">
<td><p><a href="zuml_ref/ZUML/Namespaces/Shadow"
title="wikilink">shadow</a></p></td>
<td><p><br />
<code>Name: shadow</code><br />
<code>Namespace: </code><a
href="http://www.zkoss.org/2015/shadow"><code>http://www.zkoss.org/2015/shadow</code></a><br />
<code>Namespace shortcut: shadow</code></p>
<p>It is the reserved namespace for specifying shadow elements. For more
information please refer to the <a
href="zuml_ref/ZUML/Namespaces/Shadow" title="wikilink">Shadow
Namespace</a>.</p></td>
</tr>
</tbody>
</table>

For more information of XHTML, ZUL and other component sets, please
refer to [ the Languages section](zuml_ref/ZUML/Languages).
