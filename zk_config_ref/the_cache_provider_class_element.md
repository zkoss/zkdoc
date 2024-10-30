**Syntax:**

<cache-provider-class>*`a_class_name`*</cache-provider-class>

`[Default: `org.zkoss.zk.ui.impl.SessionDesktopCacheProvider`]`

It specifies which class is used to implement the desktop cache. The
class must have a default constructor (without any argument), and
implement the
<javadoc type="interface">org.zkoss.zk.ui.sys.DesktopCacheProvider</javadoc>
interface.

One instance of the cache provider is created and shared for each Web
application, so you have to synchronize the access properly.

Available implementations are as follows.

<table>
<thead>
<tr class="header">
<th><center>
<p>Class</p>
</center></th>
<th><center>
<p>Description</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>`org.zkoss.zk.ui.impl.SessionDesktopCacheProvider`</p></td>
<td><p>It stores all desktops from the same session in one single cache.
It is simple and fast, but not supporting clustering by default. To
support clustering, please check the <a
href="ZK_Developer%27s_Reference/Clustering/ZK_Configuration"
title="wikilink"> configuration for clustering</a>.</p></td>
</tr>
<tr class="even">
<td><p>`org.zkoss.zk.ui.impl.GlobalDesktopCacheProvider`</p></td>
<td><p>It stores all desktops from the same Web application in one
single cache. In other words, it doesn't count on session at all.</p>
<p>It is useful because some Web server, e.g, <a
href="http://www.bea.com/">BEA WebLogic</a>, might be configured to use
independent sessions for each request.</p></td>
</tr>
</tbody>
</table>


