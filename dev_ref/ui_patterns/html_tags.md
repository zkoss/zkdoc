Here we discuss how to use HTML tags directly in a ZUML document. There
are several ways as described in the following sections, and you could
choose one based on your requirements.

<table>
<thead>
<tr class="header">
<th><p>What to consider</p></th>
<th><p>[[ZK Developer's Reference/UI Patterns/HTML Tags/The html
Component|</p>
<html>
<p>component]]</p></th>
<th><p><a
href="ZK_Developer&#39;s_Reference/UI_Patterns/HTML_Tags/The_native_Namespace"
title="wikilink">native namespace</a></p></th>
<th><p><a
href="ZK_Developer&#39;s_Reference/UI_Patterns/HTML_Tags/The_XHTML_Component_Set"
title="wikilink">XHTML components</a></p></th>
<th><p><a href="ZK_Developer&#39;s_Reference/Integration/Use_ZK_in_JSP"
title="wikilink">JSP</a></p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Update Content Dynamically</p></td>
<td><p>Yes</p></td>
<td><p>No<a href="#fn1" class="footnote-ref" id="fnref1"
role="doc-noteref"><sup>1</sup></a></p></td>
<td><p>Yes</p></td>
<td><p>No<a href="#fn2" class="footnote-ref" id="fnref2"
role="doc-noteref"><sup>2</sup></a></p></td>
</tr>
<tr class="even">
<td><p>Mix with ZUL components</p></td>
<td><p>No</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes/No<a href="#fn3" class="footnote-ref" id="fnref3"
role="doc-noteref"><sup>3</sup></a></p></td>
</tr>
<tr class="odd">
<td><p>Memory Footprint</p></td>
<td><p>Small</p></td>
<td><p>Small</p></td>
<td><p>Large</p></td>
<td><p>Small</p></td>
</tr>
<tr class="even">
<td><p>Support EL</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
<td><p>Yes</p></td>
</tr>
<tr class="odd">
<td><p>Support Data Binding</p></td>
<td><p>Yes</p></td>
<td><p>No</p></td>
<td><p>Yes</p></td>
<td><p>No</p></td>
</tr>
</tbody>
</table>
<aside id="footnotes" class="footnotes footnotes-end-of-document"
role="doc-endnotes">
<hr />
<ol>
<li id="fn1">We cannot update content dynamically at the server.
However, we could modify the DOM tree directly at the client. Please
refer to the <a
href="ZK_Developer&#39;s_Reference/UI_Composing/Client-side_UI_Composing"
title="wikilink">Client-side UI Composing</a> section.<a href="#fnref1"
class="footnote-back" role="doc-backlink">↩︎</a></li>
<li id="fn2">Technically you could modify the browser's DOM tree
dynamically at the client.<a href="#fnref2" class="footnote-back"
role="doc-backlink">↩︎</a></li>
<li id="fn3">You could mix HTML tags with ZK components, if <a
href="http://www.zkoss.org/product/zkjsp.dsp">ZK JSP Tags</a> is used.
Otherwise, you could only have a JSP page to include other ZUL pages, or
vice versa.<a href="#fnref3" class="footnote-back"
role="doc-backlink">↩︎</a></li>
</ol>
</aside>

In addition, you could use
[iframe](ZK_Component_Reference/Essential_Components/Iframe)
to embed a complete HTML document which might be from a different
website with different technology. Or, use
[include](ZK_Component_Reference/Essential_Components/Include)
to include an HTML fragment.

> ------------------------------------------------------------------------
>
> <references/>
