

Layouts are components used to partition the display area it owns into
several sub-areas for its child components, while containers *group* its
child components into the display area it owns.

Users are allowed to nest one from another to create desired UI.

# Layouts

This section provides brief introductions for some of the layout
components in ZK. For detailed information and the complete list of
layouts, please refer to [ZK Component Reference:
Layouts](ZK_Component_Reference/Layouts).

## Hlayout and Vlayout

[Hlayout](ZK_Component_Reference/Layouts/Hlayout) and
[Vlayout](ZK_Component_Reference/Layouts/Vlayout) are simple
and light-weighted layout components that arrange their children to be
displayed horizontally and vertically respectively. Also, they are
easily customizable as they are made up of HTML DIVs.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrHlayout.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">hlayout</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;50px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:blue&quot;</span>&gt;1&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;70px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:yellow&quot;</span>&gt;2&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">hlayout</span>&gt;</span></code></pre></div></td>
</tr>
<tr class="even">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrVlayout.png)</td>
<td><div class="sourceCode" id="cb2"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">vlayout</span>&gt;</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;50px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:blue&quot;</span>&gt;1&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;70px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:yellow&quot;</span>&gt;2&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">vlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Scrolling

- To make Hlayout and Vlayout scrollable, specify "overflow:auto;" to
  "style" .
- The height of Hlayout and Vlayout depends on the size of their
  children, therefore, in order to keep the height of Hlayout and
  Vlayout constant for the scroll bar to appear, specify a fixed height
  to Hlayout and Vlayout or place them into a fixed height container,
  EX: "\<window height="100px"...".

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrHlayout_scrolling.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">hlayout</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;overflow:auto;&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;40px&quot;</span><span class="ot"> height=</span><span class="st">&quot;150px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:blue;color:white;&quot;</span>&gt;1&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;40px&quot;</span><span class="ot"> height=</span><span class="st">&quot;150px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:yellow;&quot;</span>&gt;2&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">hlayout</span>&gt;</span></code></pre></div></td>
</tr>
<tr class="even">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrVlayout_scrolling.png)</td>
<td><div class="sourceCode" id="cb2"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">vlayout</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;overflow:auto;&quot;</span>&gt;</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;80px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:blue;color:white;&quot;</span>&gt;1&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;80px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:yellow;&quot;</span>&gt;2&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">vlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Alignment

Users are allowed to change sclass to control alignment.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrHlayout_alignment.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">zk</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">hlayout</span><span class="ot"> sclass=</span><span class="st">&quot;z-valign-top&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">label</span><span class="ot"> value=</span><span class="st">&quot;Text:&quot;</span>/&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">textbox</span>/&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">window</span><span class="ot"> width=</span><span class="st">&quot;50px&quot;</span><span class="ot"> height=</span><span class="st">&quot;50px&quot;</span><span class="ot"> title=</span><span class="st">&quot;win&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span>/&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">hlayout</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">separator</span>/&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">hlayout</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">label</span><span class="ot"> value=</span><span class="st">&quot;Text:&quot;</span>/&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">textbox</span>/&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">window</span><span class="ot"> width=</span><span class="st">&quot;50px&quot;</span><span class="ot"> height=</span><span class="st">&quot;50px&quot;</span><span class="ot"> title=</span><span class="st">&quot;win&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span>/&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">hlayout</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">separator</span>/&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">hlayout</span><span class="ot"> sclass=</span><span class="st">&quot;z-valign-bottom&quot;</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">label</span><span class="ot"> value=</span><span class="st">&quot;Text:&quot;</span>/&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">textbox</span>/&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">window</span><span class="ot"> width=</span><span class="st">&quot;50px&quot;</span><span class="ot"> height=</span><span class="st">&quot;50px&quot;</span><span class="ot"> title=</span><span class="st">&quot;win&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span>/&gt;</span>
<span id="cb1-18"><a href="#cb1-18" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">hlayout</span>&gt;</span>
<span id="cb1-19"><a href="#cb1-19" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">zk</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Hbox and Vbox

Similar to [Hlayout](ZK_Component_Reference/Layouts/Hlayout)
and [Vlayout](ZK_Component_Reference/Layouts/Vlayout),
[Hbox](ZK_Component_Reference/Layouts/Hbox) and
[Vbox](ZK_Component_Reference/Layouts/Vbox) arrange their
children to be displayed horizontally and vertically respectively.
[Hbox](ZK_Component_Reference/Layouts/Hbox) and
[Vbox](ZK_Component_Reference/Layouts/Vbox) provide more
functionalities such as splitter, align and pack. However, their
**performance is slower**, so it is suggested to use
[Hlayout](ZK_Component_Reference/Layouts/Hlayout) and
[Vlayout](ZK_Component_Reference/Layouts/Vlayout) if you'd
like to use them a lot in a UI, unless you need the features that only
[Hbox](ZK_Component_Reference/Layouts/Hbox) and
[Vbox](ZK_Component_Reference/Layouts/Vbox) support.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrHbox.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">hbox</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;50px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:blue&quot;</span>&gt;1&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">splitter</span><span class="ot"> collapse=</span><span class="st">&quot;before&quot;</span>/&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;70px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:yellow&quot;</span>&gt;2&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">hbox</span>&gt;</span></code></pre></div></td>
</tr>
<tr class="even">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrVbox.png)</td>
<td><div class="sourceCode" id="cb2"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">vbox</span>&gt;</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;50px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:blue&quot;</span>&gt;1&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">splitter</span><span class="ot"> collapse=</span><span class="st">&quot;after&quot;</span>/&gt;</span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;70px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:yellow&quot;</span>&gt;2&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">vbox</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Scrolling

- Hbox and Vbox are created by a table, however, HTML tables are not
  able to show scroll bars. Hence, to achieve this, users will need to
  place them in a scrolling container.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrHlayout_scrolling.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;overflow:auto;&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">hbox</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;40px&quot;</span><span class="ot"> height=</span><span class="st">&quot;150px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:blue;color:white;&quot;</span>&gt;1&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;40px&quot;</span><span class="ot"> height=</span><span class="st">&quot;150px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:yellow;&quot;</span>&gt;2&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">hbox</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">div</span>&gt;</span></code></pre></div></td>
</tr>
<tr class="even">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrVlayout_scrolling.png)</td>
<td><div class="sourceCode" id="cb2"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;overflow:auto;&quot;</span>&gt;</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">vbox</span>&gt;</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;80px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:blue;color:white;&quot;</span>&gt;1&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;80px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:yellow;&quot;</span>&gt;2&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">vbox</span>&gt;</span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">div</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Alignment

- Users are also allowed to specify align and pack to control alignment.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrHbox_align.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">window</span><span class="ot"> title=</span><span class="st">&quot;Hbox&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> width=</span><span class="st">&quot;150px&quot;</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">caption</span><span class="ot"> label=</span><span class="st">&quot;align: center&quot;</span> /&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">hbox</span><span class="ot">  height=</span><span class="st">&quot;100%&quot;</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;&quot;</span></span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a><span class="ot">        align=</span><span class="st">&quot;center&quot;</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;1&quot;</span> /&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;2&quot;</span> /&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">hbox</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">window</span>&gt;</span></code></pre></div></td>
</tr>
<tr class="even">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrHbox_pack.png)</td>
<td><div class="sourceCode" id="cb2"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">window</span><span class="ot"> title=</span><span class="st">&quot;Hbox&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> width=</span><span class="st">&quot;150px&quot;</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span>&gt;</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">caption</span><span class="ot"> label=</span><span class="st">&quot;pack: center&quot;</span> /&gt;</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">hbox</span><span class="ot">  height=</span><span class="st">&quot;100%&quot;</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;&quot;</span> </span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a><span class="ot">        pack=</span><span class="st">&quot;center&quot;</span>&gt;</span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;1&quot;</span> /&gt;</span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;2&quot;</span> /&gt;</span>
<span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">hbox</span>&gt;</span>
<span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">window</span>&gt;</span></code></pre></div></td>
</tr>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrVbox_align.png)</td>
<td><div class="sourceCode" id="cb3"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">window</span><span class="ot"> title=</span><span class="st">&quot;Vbox&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> width=</span><span class="st">&quot;150px&quot;</span><span class="ot"> height=</span><span class="st">&quot;150px&quot;</span>&gt;</span>
<span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">caption</span><span class="ot"> label=</span><span class="st">&quot;align: center&quot;</span> /&gt;</span>
<span id="cb3-3"><a href="#cb3-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">vbox</span><span class="ot">  height=</span><span class="st">&quot;100%&quot;</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;&quot;</span> </span>
<span id="cb3-4"><a href="#cb3-4" aria-hidden="true" tabindex="-1"></a><span class="ot">        align=</span><span class="st">&quot;center&quot;</span>&gt;</span>
<span id="cb3-5"><a href="#cb3-5" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;1&quot;</span> /&gt;</span>
<span id="cb3-6"><a href="#cb3-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;2&quot;</span> /&gt;</span>
<span id="cb3-7"><a href="#cb3-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">vbox</span>&gt;</span>
<span id="cb3-8"><a href="#cb3-8" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">window</span>&gt;</span></code></pre></div></td>
</tr>
<tr class="even">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrVbox_pack.png)</td>
<td><div class="sourceCode" id="cb4"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">window</span><span class="ot"> title=</span><span class="st">&quot;Vbox&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> width=</span><span class="st">&quot;150px&quot;</span><span class="ot"> height=</span><span class="st">&quot;150px&quot;</span>&gt;</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">caption</span><span class="ot"> label=</span><span class="st">&quot;pack: center&quot;</span> /&gt;</span>
<span id="cb4-3"><a href="#cb4-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">vbox</span><span class="ot">  height=</span><span class="st">&quot;100%&quot;</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;&quot;</span> </span>
<span id="cb4-4"><a href="#cb4-4" aria-hidden="true" tabindex="-1"></a><span class="ot">        pack=</span><span class="st">&quot;center&quot;</span>&gt;</span>
<span id="cb4-5"><a href="#cb4-5" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;1&quot;</span> /&gt;</span>
<span id="cb4-6"><a href="#cb4-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;2&quot;</span> /&gt;</span>
<span id="cb4-7"><a href="#cb4-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">vbox</span>&gt;</span>
<span id="cb4-8"><a href="#cb4-8" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">window</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

For more detailed information, please refer to
[Hbox](ZK_Component_Reference/Layouts/Hbox) and
[Vbox](ZK_Component_Reference/Layouts/Vbox).

- Users are also allowed to use "cell" to control each cell's alignment.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrHbox_Cell.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">hbox</span><span class="ot"> width=</span><span class="st">&quot;500px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">cell</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Help&quot;</span>/&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">cell</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">cell</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;&quot;</span></span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a><span class="ot">        hflex=</span><span class="st">&quot;6&quot;</span><span class="ot"> align=</span><span class="st">&quot;center&quot;</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Add&quot;</span>/&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Reomve&quot;</span>/&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Update&quot;</span>/&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">cell</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">cell</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;&quot;</span></span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a><span class="ot">        hflex=</span><span class="st">&quot;4&quot;</span><span class="ot"> align=</span><span class="st">&quot;right&quot;</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;OK&quot;</span>/&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Cancel&quot;</span>/&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">cell</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">hbox</span>&gt;</span></code></pre></div></td>
</tr>
<tr class="even">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrVbox_Cell.png)</td>
<td><div class="sourceCode" id="cb2"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">vbox</span><span class="ot"> width=</span><span class="st">&quot;300px&quot;</span><span class="ot"> align=</span><span class="st">&quot;stretch&quot;</span>&gt;</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">cell</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;&quot;</span>&gt;</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Help&quot;</span>/&gt;</span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">cell</span>&gt;</span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">cell</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;&quot;</span></span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a><span class="ot">        align=</span><span class="st">&quot;center&quot;</span>&gt;</span>
<span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Add&quot;</span>/&gt;</span>
<span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Reomve&quot;</span>/&gt;</span>
<span id="cb2-9"><a href="#cb2-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Update&quot;</span>/&gt;</span>
<span id="cb2-10"><a href="#cb2-10" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">cell</span>&gt;</span>
<span id="cb2-11"><a href="#cb2-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">cell</span><span class="ot"> style=</span><span class="st">&quot;border:1px solid black;&quot;</span></span>
<span id="cb2-12"><a href="#cb2-12" aria-hidden="true" tabindex="-1"></a><span class="ot">        align=</span><span class="st">&quot;right&quot;</span>&gt;</span>
<span id="cb2-13"><a href="#cb2-13" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;OK&quot;</span>/&gt;</span>
<span id="cb2-14"><a href="#cb2-14" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Cancel&quot;</span>/&gt;</span>
<span id="cb2-15"><a href="#cb2-15" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">cell</span>&gt;</span>
<span id="cb2-16"><a href="#cb2-16" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">vbox</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Borderlayout

[Borderlayout](ZK_Component_Reference/Layouts/Borderlayout)
divides its child components into to five areas: North, South, East,
West and Center. The heights of North and South are first decided, the
remaining space is then given to Center as its height. Note that East
and West also take on the height of Center.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrBorderlayout.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">borderlayout</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">north</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#008db7;color:white;&quot;</span>&gt;N&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">north</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">south</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#112f37;color:white;&quot;</span>&gt;S&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">south</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">center</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span>&gt;C&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">center</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">east</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;E&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">east</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">west</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;W&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">west</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">borderlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### flex

Layout region shares the height of Borderlayout with a distributing
sequence of: North, South and Center while the heights of East and West
take on the height of Center. In the previous sample, the div in the
layout region does not take up all of layout region's space. In order
for the child to occupy the whole area, please set vflex="1" to the
child component.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrBorderlayout_flex.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">borderlayout</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">north</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#008db7;color:white;&quot;</span>&gt;N&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">north</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">south</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background:#112f37;color:white;&quot;</span>&gt;S&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">south</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">center</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span>&gt;C&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">center</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">east</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> vflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;E&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">east</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">west</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> vflex=</span><span class="st">&quot;1&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;W&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">west</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">borderlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Scrolling

- The height of Center depends on Borderlayout but not on its child,
  therefore, the height of Center will not be expanded by the growing
  size of its child components. If Center's height is too short for its
  child, Center will cut out the contents of its child, hence, to avoid
  this, specify autoscroll="true" to Center in order to assign Center to
  handle the scrolling.

<table>
<tbody>
<tr class="odd">
<td>![](images/DrBorderlayout_Center_scrolling.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">borderlayout</span><span class="ot"> width=</span><span class="st">&quot;300px&quot;</span><span class="ot"> height=</span><span class="st">&quot;300px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">north</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot">  style=</span><span class="st">&quot;background:#008db7;color:white;&quot;</span>&gt;N&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">north</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">south</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot">  style=</span><span class="st">&quot;background:#112f37;color:white;&quot;</span>&gt;S&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">south</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">center</span><span class="ot"> autoscroll=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;200px&quot;</span>&gt;C&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">center</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">east</span><span class="ot"> flex=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;30px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;E&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">east</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">west</span><span class="ot"> flex=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;20px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;W&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">west</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">borderlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Grown by children

- To make Borderlayout dependent on the size of its child components,
  [vflex
  feature](ZK_Developer's_Reference/UI_Patterns/Hflex_and_Vflex#Minimum_Flexibility)
  is applied. Specify vflex="min" to each layout region and
  Borderlayout.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrBorderlayout_grow.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">borderlayout</span><span class="ot"> width=</span><span class="st">&quot;300px&quot;</span><span class="ot"> vflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">north</span><span class="ot"> vflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot">  style=</span><span class="st">&quot;background:#008db7;color:white;&quot;</span>&gt;N&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">north</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">south</span><span class="ot"> vflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot">  style=</span><span class="st">&quot;background:#112f37;color:white;&quot;</span>&gt;S&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">south</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">center</span><span class="ot"> vflex=</span><span class="st">&quot;min&quot;</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;200px&quot;</span>&gt;C&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">center</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">east</span><span class="ot"> flex=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;30px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;E&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">east</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">west</span><span class="ot"> flex=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">div</span><span class="ot"> width=</span><span class="st">&quot;20px&quot;</span><span class="ot"> style=</span><span class="st">&quot;background:#f2f2f2;&quot;</span>&gt;W&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">west</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">borderlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Borderlayout in a container

- Almost all containers' heights depend on their child components,
  however, the height of Borderlayout does not expand according to the
  sizes of its child components, therefore, when placing Borderlayout in
  a container, users have to specify a fixed height in order for
  Borderlayout to be visible.

``` xml
<zk>
    <window title="win" border="normal">
        <borderlayout height="200px">
            <north>
                <div style="background:blue">N</div>
            </north>
            <south>
                <div style="background:blue">S</div>
            </south>
            <center>
                <div>C</div>
            </center>
            <east>
                <div style="background:yellow">E</div>
            </east>
            <west>
                <div style="background:yellow">W</div>
            </west>
        </borderlayout>
    </window>
</zk>
```

- The default height of Borderlayout is dependent on its parent
  component, therefore, users can also put Borderlayout in a container
  with a fixed height.

``` xml
<zk>
    <window title="win" border="normal" height="200px">
        <borderlayout>
            <north>
                <div style="background:blue">N</div>
            </north>
            <south>
                <div style="background:blue">S</div>
            </south>
            <center>
                <div>C</div>
            </center>
            <east>
                <div style="background:yellow">E</div>
            </east>
            <west>
                <div style="background:yellow">W</div>
            </west>
        </borderlayout>
    </window>
</zk>
```

## Columnlayout

[Columnlayout](ZK_Component_Reference/Layouts/Columnlayout)
places its child components into multiple columns while each column
allows any number of child components placed vertically with different
heights (but with the same widths). Unlike
[portallayout](ZK_Component_Reference/Layouts/Portallayout),
[Columnlayout](ZK_Component_Reference/Layouts/Columnlayout)
does *not allow* end users the ability to move child components to
different locations at will (although of course, developers are allowed
to use the ZK application to re-arrange the order of children
components).

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrColumnlayout.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">columnlayout</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">columnchildren</span><span class="ot"> width=</span><span class="st">&quot;30%&quot;</span><span class="ot"> style=</span><span class="st">&quot;padding: 5px 1px&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> height=</span><span class="st">&quot;60px&quot;</span><span class="ot"> title=</span><span class="st">&quot;1&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> maximizable=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;1&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> height=</span><span class="st">&quot;80px&quot;</span><span class="ot"> title=</span><span class="st">&quot;2&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> closable=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;2&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">columnchildren</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">columnchildren</span><span class="ot"> width=</span><span class="st">&quot;70%&quot;</span><span class="ot"> style=</span><span class="st">&quot;padding: 5px 1px&quot;</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot"> title=</span><span class="st">&quot;3&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> collapsible=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;3&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">columnchildren</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">columnlayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Portallayout

[Portallayout](ZK_Component_Reference/Layouts/Portallayout)
places its child components into multiple columns while each column can
allow any number of child components to be placed vertically with
different heights (but with the same widths). Users are also allowed to
move any of them to any area desired like that of a portal.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrPortallayout.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">portallayout</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">portalchildren</span><span class="ot"> width=</span><span class="st">&quot;40%&quot;</span><span class="ot"> style=</span><span class="st">&quot;padding: 5px 1px&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> height=</span><span class="st">&quot;60px&quot;</span><span class="ot"> title=</span><span class="st">&quot;1&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> maximizable=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;1&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> height=</span><span class="st">&quot;90px&quot;</span><span class="ot"> title=</span><span class="st">&quot;2&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> closable=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;2&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">portalchildren</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">portalchildren</span><span class="ot"> width=</span><span class="st">&quot;60%&quot;</span><span class="ot"> style=</span><span class="st">&quot;padding: 5px 1px&quot;</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot"> title=</span><span class="st">&quot;3&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> collapsible=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;3&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> height=</span><span class="st">&quot;55px&quot;</span><span class="ot"> title=</span><span class="st">&quot;4&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> closable=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;4&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">portalchildren</span>&gt;</span>
<span id="cb1-18"><a href="#cb1-18" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">portallayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Tablelayout

[Tablelayout](ZK_Component_Reference/Layouts/Tablelayout)
places its child components in a table. Ths implementation is based on
an HTML TABLE tag.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrTablelayout.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">tablelayout</span><span class="ot"> columns=</span><span class="st">&quot;2&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">tablechildren</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> title=</span><span class="st">&quot;1&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span></span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a><span class="ot">      collapsible=</span><span class="st">&quot;true&quot;</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;60px&quot;</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;1&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">tablechildren</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">tablechildren</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> title=</span><span class="st">&quot;2&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span></span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a><span class="ot">      collapsible=</span><span class="st">&quot;true&quot;</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;60px&quot;</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;2&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">tablechildren</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">tablechildren</span>&gt;</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> title=</span><span class="st">&quot;3&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span></span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a><span class="ot">      collapsible=</span><span class="st">&quot;true&quot;</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;60px&quot;</span>&gt;</span>
<span id="cb1-17"><a href="#cb1-17" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;3&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-18"><a href="#cb1-18" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-19"><a href="#cb1-19" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">tablechildren</span>&gt;</span>
<span id="cb1-20"><a href="#cb1-20" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">tablechildren</span>&gt;</span>
<span id="cb1-21"><a href="#cb1-21" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panel</span><span class="ot"> title=</span><span class="st">&quot;4&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span></span>
<span id="cb1-22"><a href="#cb1-22" aria-hidden="true" tabindex="-1"></a><span class="ot">      collapsible=</span><span class="st">&quot;true&quot;</span><span class="ot"> width=</span><span class="st">&quot;80px&quot;</span><span class="ot"> height=</span><span class="st">&quot;60px&quot;</span>&gt;</span>
<span id="cb1-23"><a href="#cb1-23" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">panelchildren</span>&gt;4&lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-24"><a href="#cb1-24" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panel</span>&gt;</span>
<span id="cb1-25"><a href="#cb1-25" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">tablechildren</span>&gt;</span>
<span id="cb1-26"><a href="#cb1-26" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">tablelayout</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

# Containers

This section provides a brief introduction for some of the container
components in ZK. For detailed information and a complete list of
containers, please refer to [ZK Component Reference:
Containers](ZK_Component_Reference/Containers).

## Div and Span

[Div](ZK_Component_Reference/Containers/Div) and
[span](ZK_Component_Reference/Containers/Span) are the most
light-weighted containers to group child components. They work the same
way as HTML DIV and SPAN tags respectively. Div is a block element that
would cause line break for the following sibling i.e. the child and its
sibling won't be on the same line (horizontal position). On the other
hand, span is an *inline* element which would place the child component
and its siblings on the same line (horizontal position).

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrDivSpan.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;border: 1px solid blue&quot;</span><span class="ot"> width=</span><span class="st">&quot;150px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  this is</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">span</span>&gt;inlined with &lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;Hi&quot;</span>/&gt;&lt;/<span class="kw">span</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;border: 1px solid grey&quot;</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">div</span>&gt;div is a block&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">datebox</span>/&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">div</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Scrolling

Span:

- Span is an inline element that is not scrollable.

Div:

- To make Div scrollable, specify "overflow:auto;" to "style".
- The height of Div depends on the size of its children, therefore, in
  order to keep the height of Div constant for the scroll bar to appear,
  specify a fixed height to Div.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrDiv_scrolling.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">div</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot"> width=</span><span class="st">&quot;100px&quot;</span> </span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="ot">    style=</span><span class="st">&quot;border:1px solid black;overflow:auto;&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">grid</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">rows</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">rows</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">grid</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">div</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Window

[Window](ZK_Component_Reference/Containers/Window) is a
container providing captioning, bordering, overlapping, draggable,
closable, sizable, and many other features. Window is also the owner of
[an ID
space](ZK_Developer's_Reference/UI_Composing/ID_Space), such
that each child component and its IDs are in one independent window so
as to avoid the IDs of child components conflicting with one another.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrWindow.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">window</span><span class="ot"> title=</span><span class="st">&quot;A&quot;</span><span class="ot"> closable=</span><span class="st">&quot;true&quot;</span><span class="ot"> sizable=</span><span class="st">&quot;true&quot;</span></span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span><span class="ot"> mode=</span><span class="st">&quot;overlapped&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>   &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background: yellow&quot;</span>&gt;1&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>   &lt;<span class="kw">combobox</span>/&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">window</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Scrolling

- To make Window scrollable, specify "overflow:auto;" from
  "contentStyle".
- The height of Window is dependent on the size of its children,
  therefore, in order to keep the height of Window constant for the
  scroll bar to appear, specify a fixed height to Window.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrWindow_scrolling.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">window</span><span class="ot"> title=</span><span class="st">&quot;window&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span> </span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="ot">    height=</span><span class="st">&quot;150px&quot;</span><span class="ot"> width=</span><span class="st">&quot;150px&quot;</span></span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a><span class="ot">    contentStyle=</span><span class="st">&quot;overflow:auto;&quot;</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">grid</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">rows</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">rows</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">grid</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">window</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Panel

Like [Window](ZK_Component_Reference/Containers/Window),
[panel](ZK_Component_Reference/Containers/Panel) is another
powerful container supporting captioning, bordering, overlapping and
many other features. However,
<javadoc type="interface">org.zkoss.zk.ui.IdSpace</javadoc> is not
implemented by this component, therefore, all of its children belong to
the same ID space of its parent.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrPanel.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">panel</span><span class="ot"> title=</span><span class="st">&quot;A&quot;</span><span class="ot"> framable=</span><span class="st">&quot;true&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span></span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="ot"> maximizable=</span><span class="st">&quot;true&quot;</span><span class="ot"> collapsible=</span><span class="st">&quot;true&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>   &lt;<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">div</span><span class="ot"> style=</span><span class="st">&quot;background: yellow&quot;</span>&gt;1&lt;/<span class="kw">div</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>      &lt;<span class="kw">combobox</span>/&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>   &lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">panel</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Scrolling

- To make Panel scrollable, specify "overflow:auto;" to "style" of
  "panelchildren".
- The height of Panel is dependent on the size of its children,
  therefore, in order to keep the height of the Panel constant for the
  scroll bar to appear, specify a fixed height to Panel.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrPanel_scrolling.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">panel</span><span class="ot"> title=</span><span class="st">&quot;panel&quot;</span><span class="ot"> border=</span><span class="st">&quot;normal&quot;</span> </span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="ot">    height=</span><span class="st">&quot;150px&quot;</span><span class="ot"> width=</span><span class="st">&quot;150px&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">panelchildren</span><span class="ot"> style=</span><span class="st">&quot;overflow:auto;&quot;</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">grid</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">rows</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>                &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>                &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>                &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>                &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>                &lt;<span class="kw">row</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>            &lt;/<span class="kw">rows</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">grid</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">panelchildren</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">panel</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Groupbox

[Groupbox](ZK_Component_Reference/Containers/Groupbox) is a
light-weighted way to group child components together. It supports
["caption"](ZK_Component_Reference/Containers/Caption) and
"border", however, it does not support overlapping or resizing. Like
Panel, <javadoc type="interface">org.zkoss.zk.ui.IdSpace</javadoc> is
not implemented by this component either.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrGroupbox3d.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">groupbox</span><span class="ot"> mold=</span><span class="st">&quot;3d&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">caption</span><span class="ot"> label=</span><span class="st">&quot;Fruits&quot;</span>/&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">radiogroup</span>&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">radio</span><span class="ot"> label=</span><span class="st">&quot;Apple&quot;</span>/&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">radio</span><span class="ot"> label=</span><span class="st">&quot;Orange&quot;</span>/&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">radio</span><span class="ot"> label=</span><span class="st">&quot;Banana&quot;</span>/&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">radiogroup</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">groupbox</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Scrolling

<font color="red">`3d mold only`</font>

- To make Groupbox scrollable, specify "overflow:auto" to
  "contentStyle".
- The height of the Groupbox depends on the size of its children,
  therefore, in order to keep the height of the Groupbox constant for
  the scroll bar to appear, specify a fixed height to Groupbox.

<table>
<tbody>
<tr class="odd">
<td>![](images/DrGroupbox3d_scrolling.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">groupbox</span><span class="ot"> mold=</span><span class="st">&quot;3d&quot;</span><span class="ot"> height=</span><span class="st">&quot;150px&quot;</span><span class="ot"> width=</span><span class="st">&quot;150px&quot;</span></span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a><span class="ot">    contentStyle=</span><span class="st">&quot;overflow:auto;&quot;</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">caption</span><span class="ot"> label=</span><span class="st">&quot;3d groupbox&quot;</span> /&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">grid</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">rows</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">row</span><span class="ot"> forEach=</span><span class="st">&quot;1,2,3,4,5,6&quot;</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">rows</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">grid</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">groupbox</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Tabbox

[Tabbox](ZK_Component_Reference/Containers/Tabbox) is a
container used to display a set of tabbed groups of components. A row of
tabs can be displayed at the top (or left) of the tabbox; users can
switch between each tab group by a simple click.
<javadoc type="interface">org.zkoss.zk.ui.IdSpace</javadoc> is not
implemented by this component either.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrTabbox.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">tabbox</span><span class="ot"> height=</span><span class="st">&quot;80px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">tabs</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">tab</span><span class="ot"> label=</span><span class="st">&quot;Tab 1&quot;</span>/&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">tab</span><span class="ot"> label=</span><span class="st">&quot;Tab 2&quot;</span>/&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">tabs</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>  &lt;<span class="kw">tabpanels</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">tabpanel</span>&gt;This is panel 1&lt;/<span class="kw">tabpanel</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">tabpanel</span>&gt;This is panel 2&lt;/<span class="kw">tabpanel</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>  &lt;/<span class="kw">tabpanels</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">tabbox</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Scrolling

- To make Tabpanel scrollable, specify "overflow:auto;" to "style".
- The height of Tabpanel is dependent on the size of its children,
  therefore, in order to keep the height of the Tabpanel constant for
  the scroll bar to appear, specify a fixed height to Tabbox.

<table>
<tbody>
<tr class="odd">
<td>![]({{site.baseurl}}/zk_dev_ref/images/DrTabbox_scrolling.png)</td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">tabbox</span><span class="ot"> height=</span><span class="st">&quot;100px&quot;</span><span class="ot"> width=</span><span class="st">&quot;150px&quot;</span>&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">tabs</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">tab</span><span class="ot"> label=</span><span class="st">&quot;tab&quot;</span> /&gt;</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">tabs</span>&gt;</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    &lt;<span class="kw">tabpanels</span>&gt;</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>        &lt;<span class="kw">tabpanel</span><span class="ot"> style=</span><span class="st">&quot;overflow:auto;&quot;</span>&gt;</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>            &lt;<span class="kw">grid</span>&gt;</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>                &lt;<span class="kw">rows</span>&gt;</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>                    &lt;<span class="kw">row</span><span class="ot"> forEach=</span><span class="st">&quot;1,2,3,4,5,6&quot;</span>&gt;item&lt;/<span class="kw">row</span>&gt;</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>                &lt;/<span class="kw">rows</span>&gt;</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>            &lt;/<span class="kw">grid</span>&gt;</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>        &lt;/<span class="kw">tabpanel</span>&gt;</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>    &lt;/<span class="kw">tabpanels</span>&gt;</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>&lt;/<span class="kw">tabbox</span>&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>
