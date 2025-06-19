

All XHTML components are derived from
[org.zkoss.zhtml.impl.AbstractTag](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zhtml/impl/AbstractTag.html).

An XHTML component is a thin wrapper that encapsulates a native HTML
tag. It is different to a XUL component or other none-native component
in several ways.

- By implementing the
  <javadoc type="interface">org.zkoss.zk.ui.ext.RawId</javadoc>
  interface, the universal identifier, <mp>getUuid</mp>, is the same as
  the identifier <mp>getId</mp>
- By implementing the
  <javadoc type="interface">org.zkoss.zk.ui.ext.DynamicAttributes</javadoc>
  interface, all XHTML components support arbitrary attributes. In other
  words, any attribute name is legal (as long as the targeted browser
  supports)

**Notice that** the HTML component set is one of the approaches to use
HTML tags directly in a ZUML document. In most cases, it is not the best
approach. For information please refer to [ZK Developer's Reference: HTML tags]({{site.baseurl}}/zk_dev_ref/ui_patterns/html_tags).


