Here we discuss how to use HTML tags directly in a ZUML document. There
are several ways as described in the following sections, and you could
choose one based on your requirements.

| What to consider | html component | [native namespace](ZK_Developer's_Reference/ui_patterns/HTML_Tags/The_native_Namespace) | [XHTML components](ZK_Developer's_Reference/ui_patterns/HTML_Tags/The_XHTML_Component_Set) | [JSP](ZK_Developer's_Reference/integration/Use_ZK_in_JSP) |
|---|---|---|---|---|
| Update Content Dynamically | Yes | No[^1] | Yes | No[^2] |
| Mix with ZUL components | No | Yes | Yes | Yes/No[^3] |
| Memory Footprint | Small | Small | Large | Small |
| Support EL | Yes | Yes | Yes | Yes |
| Support Data Binding | Yes | No | Yes | No |
<aside id="footnotes" class="footnotes footnotes-end-of-document"
role="doc-endnotes">
<hr />
<ol>
<li id="fn1">We cannot update content dynamically at the server.
However, we could modify the DOM tree directly at the client. Please
refer to the <a
href="ZK_Developer&#39;s_Reference/ui_composing/Client-side_UI_Composing"
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
[iframe]({{site.baseurl}}/zk_component_ref/iframe)
to embed a complete HTML document which might be from a different
website with different technology. Or, use
[include]({{site.baseurl}}/zk_component_ref/include)
to include an HTML fragment.

> ------------------------------------------------------------------------
>
> <references/>
