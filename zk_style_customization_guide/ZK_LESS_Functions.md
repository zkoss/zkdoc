# ZK DSP Functions

ZK provides many useful theme functions that can be used in [ DSP]({{site.baseurl}}/zk_dev_ref/supporting_utilities/dsp)
files. Here we will introduce these functions that are used for CSS
style.

## Core Functions

Core functions are defined in
[core.dsp.tld](http://github.com/zkoss/zk/blob/master/zweb/src/archive/web/WEB-INF/tld/web/core.dsp.tld).
Here we will only introduce functions that are related to CSS style. To
use these functions in a DSP page, declare tag library with it's prefix
as follows:

```html
<%-- *.css.dsp file --%>
<%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>
```

<table>
<thead>
<tr class="header">
<th
style="border: 1px inset #333333; padding: 0 4px; text-align: center;"><p>Function</p></th>
<th
style="border: 1px inset #333333; padding: 0 4px; text-align: center;"><p>Usage</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td
style="border: 1px inset #333333; padding: 0 4px; text-align: center;"><p>encodeURL</p></td>
<td style="border: 1px inset #333333; padding: 0 4px;"><div
class="sourceCode" id="cb1"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="er">&lt;</span>%-- Background image from ZK JAR file --%&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>.myDiv {</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    background: ${c:encodeURL(&#39;~./path/to/image.png&#39;)};</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="even">
<td
style="border: 1px inset #333333; padding: 0 4px; text-align: center;"><p>encodeThemeURL</p></td>
<td style="border: 1px inset #333333; padding: 0 4px;"><div
class="sourceCode" id="cb2"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="er">&lt;</span>%-- Background image from Theme JAR file --%&gt;</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>.myDiv {</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>    background: ${c:encodeThemeURL(&#39;~./path/to/image.png&#39;)};</span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="odd">
<td
style="border: 1px inset #333333; padding: 0 4px; text-align: center;"><p>if</p></td>
<td style="border: 1px inset #333333; padding: 0 4px;"><div
class="sourceCode" id="cb3"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="er">&lt;</span>%-- If Statement for Specific Browser --%&gt;</span>
<span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabindex="-1"></a>.myDiv {</span>
<span id="cb3-3"><a href="#cb3-3" aria-hidden="true" tabindex="-1"></a>    background: rgba(200, 200, 200, 0.8);</span>
<span id="cb3-4"><a href="#cb3-4" aria-hidden="true" tabindex="-1"></a>    <span class="kw">&lt;c:if</span> <span class="er">test</span><span class="ot">=</span><span class="st">&quot;${zk.ie </span><span class="er">&lt;</span><span class="st">= 8}&quot;</span><span class="kw">&gt;</span></span>
<span id="cb3-5"><a href="#cb3-5" aria-hidden="true" tabindex="-1"></a>        <span class="er">&lt;</span>%-- ie8 doesn&#39;t support rgba --%&gt;</span>
<span id="cb3-6"><a href="#cb3-6" aria-hidden="true" tabindex="-1"></a>        background: rgb(200, 200, 200); </span>
<span id="cb3-7"><a href="#cb3-7" aria-hidden="true" tabindex="-1"></a>    <span class="kw">&lt;/c:if&gt;</span></span>
<span id="cb3-8"><a href="#cb3-8" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Theme Functions

Theme functions are defined in
[theme.dsp.tld](http://github.com/zkoss/zk/blob/master/zweb/src/archive/web/WEB-INF/tld/web/theme.dsp.tld).These
functions are focused on CSS 3 supported styles. To use these functions
in a DSP page, declare tag library with it's prefix as follows:

```html
<%-- *.css.dsp file --%>
<%@ taglib uri="http://www.zkoss.org/dsp/web/theme" prefix="t" %>
```

<table>
<thead>
<tr class="header">
<th style="padding: 0 4px; text-align: center;"><p>Function</p></th>
<th style="padding: 0 4px; text-align: center;"><p>Usage</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="padding: 0 4px; text-align: center;"><p>gradient</p></td>
<td style="padding: 0 4px;"><div class="sourceCode" id="cb1"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a><span class="er">&lt;</span>%-- Gradient Background --%&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>.myDiv {</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>    ${t:gradient(&#39;ver&#39;, &#39;#FFFFFF 0%; #EEEEEE 100%&#39;)};</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="even">
<td style="padding: 0 4px; text-align: center;"><p>box<br />
box2<br />
box3</p></td>
<td style="padding: 0 4px;"><div class="sourceCode" id="cb2"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="er">&lt;</span>%-- Flexible Box Layout Module --%&gt;</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>.myDiv1 {</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>    ${t:box(&#39;box-flex&#39;, &#39;1&#39;)};</span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>.myDiv2 {</span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a>    ${t:box2(&#39;box-flex&#39;, &#39;1&#39;, &#39;box-orient&#39;, &#39;horizontal&#39;)};</span>
<span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabindex="-1"></a>.myDiv3 {</span>
<span id="cb2-9"><a href="#cb2-9" aria-hidden="true" tabindex="-1"></a>    ${t:box3(&#39;box-flex&#39;, &#39;1&#39;, &#39;box-orient&#39;, &#39;horizontal&#39;, &#39;box-pack&#39;, &#39;center&#39;)};</span>
<span id="cb2-10"><a href="#cb2-10" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="odd">
<td style="padding: 0 4px; text-align: center;"><p>boxShadow</p></td>
<td style="padding: 0 4px;"><div class="sourceCode" id="cb3"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="er">&lt;</span>%-- Box Shadows --%&gt;</span>
<span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabindex="-1"></a>.myDiv {</span>
<span id="cb3-3"><a href="#cb3-3" aria-hidden="true" tabindex="-1"></a>    ${t:boxShadow(&#39;1px 1px 0 rgba(0, 0, 0, 0.2)&#39;)};</span>
<span id="cb3-4"><a href="#cb3-4" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="even">
<td style="padding: 0 4px; text-align: center;"><p>borderRadius</p></td>
<td style="padding: 0 4px;"><div class="sourceCode" id="cb4"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="er">&lt;</span>%-- Rounded Corners --%&gt;</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a>.myDiv {</span>
<span id="cb4-3"><a href="#cb4-3" aria-hidden="true" tabindex="-1"></a>    ${t:borderRadius(&#39;5px&#39;)};</span>
<span id="cb4-4"><a href="#cb4-4" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="odd">
<td style="padding: 0 4px; text-align: center;"><p>transform</p></td>
<td style="padding: 0 4px;"><div class="sourceCode" id="cb5"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a><span class="er">&lt;</span>%-- Transform --%&gt;</span>
<span id="cb5-2"><a href="#cb5-2" aria-hidden="true" tabindex="-1"></a>.myDiv {</span>
<span id="cb5-3"><a href="#cb5-3" aria-hidden="true" tabindex="-1"></a>    ${t:transform(&#39;translate3d(0, 0, 0)&#39;)};</span>
<span id="cb5-4"><a href="#cb5-4" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="even">
<td style="padding: 0 4px; text-align: center;"><p>applyCSS3</p></td>
<td style="padding: 0 4px;"><div class="sourceCode" id="cb6"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a><span class="er">&lt;</span>%-- Apply all the other CSS 3 styles --%&gt;</span>
<span id="cb6-2"><a href="#cb6-2" aria-hidden="true" tabindex="-1"></a>.myDiv {</span>
<span id="cb6-3"><a href="#cb6-3" aria-hidden="true" tabindex="-1"></a>    ${t:applyCSS3(&#39;transition-property&#39;, &#39;opacity&#39;)};</span>
<span id="cb6-4"><a href="#cb6-4" aria-hidden="true" tabindex="-1"></a>    ${t:applyCSS3(&#39;transition-duration&#39;, &#39;350ms&#39;)}</span>
<span id="cb6-5"><a href="#cb6-5" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
</tbody>
</table>

# ZK LESS Function

Since ZK LESS engine compile LESS files into DSP pages, you can use the
DSP functions mentioned above inside a LESS file. These functions are
already defined to ZK LESS mixins. To use ZK LESS mixins, simply import
***\_zkmixins.less*** in your \*.less file.

For example,

```html
@import "~./zul/less/_zkmixins.less";

/* omitted */
```

Here we define mixins according to [ Core Functions](#Core_Functions) and [ Theme Functions](#Theme_Functions) and extra useful mixins:

## Core Functions in Mixins

<table>
<thead>
<tr class="header">
<th style="padding: 0 4px;"><p>Function</p></th>
<th style="padding: 0 4px;"><p>Usage and Output</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="padding: 0 4px;"><p>Background Image</p></td>
<td style="padding: 0 4px;"><p>Usage</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>.z-component1 {</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    .encodeURL(background-image, &#39;~./path/to/image1.png&#39;);</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>.z-component2 {</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    .encodeThemeURL(background-image, &#39;~./path/to/image2.png&#39;);</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>.z-component3 {</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    .encodeThemeURL(background, &#39;~./path/to/image3.png&#39;, center center);</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div>
<p>Output</p>
<div class="sourceCode" id="cb2"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>.z-component1 {</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>    background-image: url(${c:encodeURL(&#39;~./path/to/image.png&#39;)});</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>.z-component2 {</span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>    background-image: url(${c:encodeThemeURL(&#39;~./path/to/image.png&#39;)});</span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a>.z-component3 {</span>
<span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabindex="-1"></a>    background: url(${c:encodeThemeURL(&#39;~./path/to/image.png&#39;)}) center center;</span>
<span id="cb2-9"><a href="#cb2-9" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Theme Functions in Mixins

<table>
<thead>
<tr class="header">
<th style="padding: 0 4px;"><p>Function</p></th>
<th style="padding: 0 4px;"><p>Usage and Output</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="padding: 0 4px;"><p>Gradient Background</p></td>
<td style="padding: 0 4px;"><p>Usage</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>.z-component1 {</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    .gradient(&#39;ver&#39;, &#39;#333333 0%; #555555 50%; #666666 100%&#39;);</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>.z-component2 {</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    .horGradient(#333333, #666666);</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb1-7"><a href="#cb1-7" aria-hidden="true" tabindex="-1"></a>.z-component3 {</span>
<span id="cb1-8"><a href="#cb1-8" aria-hidden="true" tabindex="-1"></a>    .verGradient(#333333, #666666);</span>
<span id="cb1-9"><a href="#cb1-9" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb1-10"><a href="#cb1-10" aria-hidden="true" tabindex="-1"></a>.ie8 .z-component4 {</span>
<span id="cb1-11"><a href="#cb1-11" aria-hidden="true" tabindex="-1"></a>    .gradientFallback(#333333, #666666);</span>
<span id="cb1-12"><a href="#cb1-12" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb1-13"><a href="#cb1-13" aria-hidden="true" tabindex="-1"></a>.z-component1:hover {</span>
<span id="cb1-14"><a href="#cb1-14" aria-hidden="true" tabindex="-1"></a>    .resetGradient();</span>
<span id="cb1-15"><a href="#cb1-15" aria-hidden="true" tabindex="-1"></a>    background: #777777;</span>
<span id="cb1-16"><a href="#cb1-16" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div>
<p>Output</p>
<div class="sourceCode" id="cb2"><pre
class="sourceCode css"><code class="sourceCode css"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component1</span> {</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>    ${t:gradient<span class="fu">(</span><span class="st">&#39;ver&#39;</span><span class="op">,</span> <span class="st">&#39;#333333 0%; #555555 50%; #666666 100%&#39;</span><span class="fu">)</span>};</span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component2</span> {</span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a>    ${t:gradient<span class="fu">(</span><span class="st">&#39;hor&#39;</span><span class="op">,</span> <span class="st">&#39;#333333 0% #666666 100%&#39;</span><span class="fu">)</span>};</span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component3</span> {</span>
<span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabindex="-1"></a>    ${t:gradient<span class="fu">(</span><span class="st">&#39;ver&#39;</span><span class="op">,</span> <span class="st">&#39;#333333 0% #666666 100%&#39;</span><span class="fu">)</span>};</span>
<span id="cb2-9"><a href="#cb2-9" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb2-10"><a href="#cb2-10" aria-hidden="true" tabindex="-1"></a><span class="fu">.ie8</span> <span class="fu">.z-component4</span> {</span>
<span id="cb2-11"><a href="#cb2-11" aria-hidden="true" tabindex="-1"></a>    <span class="co">/* average of #333333 and #666666 */</span></span>
<span id="cb2-12"><a href="#cb2-12" aria-hidden="true" tabindex="-1"></a>    <span class="kw">background</span>: <span class="cn">#4d4d4d</span><span class="op">;</span></span>
<span id="cb2-13"><a href="#cb2-13" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb2-14"><a href="#cb2-14" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component1</span><span class="in">:hover</span> {</span>
<span id="cb2-15"><a href="#cb2-15" aria-hidden="true" tabindex="-1"></a>    <span class="kw">background</span>: <span class="dv">none</span><span class="op">;</span></span>
<span id="cb2-16"><a href="#cb2-16" aria-hidden="true" tabindex="-1"></a>    <span class="kw">filter</span>: progid:DXImageTransform.Microsoft.gradient<span class="fu">(</span>enabled=false<span class="fu">)</span><span class="op">;</span></span>
<span id="cb2-17"><a href="#cb2-17" aria-hidden="true" tabindex="-1"></a>    <span class="kw">background</span>: <span class="cn">#777777</span><span class="op">;</span></span>
<span id="cb2-18"><a href="#cb2-18" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="even">
<td style="padding: 0 4px;"><p>Rounded Corner</p></td>
<td style="padding: 0 4px;"><p>Usage</p>
<div class="sourceCode" id="cb3"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a>.z-component1 {</span>
<span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabindex="-1"></a>    .borderRadius(3px);</span>
<span id="cb3-3"><a href="#cb3-3" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb3-4"><a href="#cb3-4" aria-hidden="true" tabindex="-1"></a>.z-component2 {</span>
<span id="cb3-5"><a href="#cb3-5" aria-hidden="true" tabindex="-1"></a>    .topBorderRadius(3px);</span>
<span id="cb3-6"><a href="#cb3-6" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb3-7"><a href="#cb3-7" aria-hidden="true" tabindex="-1"></a>.z-component3 {</span>
<span id="cb3-8"><a href="#cb3-8" aria-hidden="true" tabindex="-1"></a>    .rightBorderRadius(3px);</span>
<span id="cb3-9"><a href="#cb3-9" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb3-10"><a href="#cb3-10" aria-hidden="true" tabindex="-1"></a>.z-component4 {</span>
<span id="cb3-11"><a href="#cb3-11" aria-hidden="true" tabindex="-1"></a>    .bottomBorderRadius(3px);</span>
<span id="cb3-12"><a href="#cb3-12" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb3-13"><a href="#cb3-13" aria-hidden="true" tabindex="-1"></a>.z-component5 {</span>
<span id="cb3-14"><a href="#cb3-14" aria-hidden="true" tabindex="-1"></a>    .leftBorderRadius(3px);</span>
<span id="cb3-15"><a href="#cb3-15" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div>
<p>Output</p>
<div class="sourceCode" id="cb4"><pre
class="sourceCode css"><code class="sourceCode css"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component1</span> {</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a>    ${t:borderRadius(<span class="st">&#39;3px 3px 3px 3px&#39;</span>)};</span>
<span id="cb4-3"><a href="#cb4-3" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb4-4"><a href="#cb4-4" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component2</span> {</span>
<span id="cb4-5"><a href="#cb4-5" aria-hidden="true" tabindex="-1"></a>    ${t:borderRadius(<span class="st">&#39;3px 3px 0 0&#39;</span>)};</span>
<span id="cb4-6"><a href="#cb4-6" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb4-7"><a href="#cb4-7" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component3</span> {</span>
<span id="cb4-8"><a href="#cb4-8" aria-hidden="true" tabindex="-1"></a>    ${t:borderRadius(<span class="st">&#39;0 3px 3px 0&#39;</span>)};</span>
<span id="cb4-9"><a href="#cb4-9" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb4-10"><a href="#cb4-10" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component4</span> {</span>
<span id="cb4-11"><a href="#cb4-11" aria-hidden="true" tabindex="-1"></a>    ${t:borderRadius(<span class="st">&#39;0 0 3px 3px&#39;</span>)};</span>
<span id="cb4-12"><a href="#cb4-12" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb4-13"><a href="#cb4-13" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component5</span> {</span>
<span id="cb4-14"><a href="#cb4-14" aria-hidden="true" tabindex="-1"></a>    ${t:borderRadius(<span class="st">&#39;3px 0 0 3px&#39;</span>)};</span>
<span id="cb4-15"><a href="#cb4-15" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="odd">
<td style="padding: 0 4px;"><p>Box Shadow</p></td>
<td style="padding: 0 4px;"><p>Usage</p>
<div class="sourceCode" id="cb5"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a>.z-component {</span>
<span id="cb5-2"><a href="#cb5-2" aria-hidden="true" tabindex="-1"></a>    .boxShadow(inset 1px 1px 0 #222222);</span>
<span id="cb5-3"><a href="#cb5-3" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div>
<p>Output</p>
<div class="sourceCode" id="cb6"><pre
class="sourceCode css"><code class="sourceCode css"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component</span> {</span>
<span id="cb6-2"><a href="#cb6-2" aria-hidden="true" tabindex="-1"></a>    ${t:boxShadow(<span class="st">&#39;inset 1px 1px 0 #222222&#39;</span>)};</span>
<span id="cb6-3"><a href="#cb6-3" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
</tbody>
</table>

## Other Useful Mixins

<table>
<thead>
<tr class="header">
<th style="padding: 0 4px;"><p>Function</p></th>
<th style="padding: 0 4px;"><p>Usage and Output</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="padding: 0 4px;"><p>Element Size</p></td>
<td style="padding: 0 4px;"><p>Usage</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>.z-component1 {</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>    .size(16px, 16px);</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb1-4"><a href="#cb1-4" aria-hidden="true" tabindex="-1"></a>.z-component2 {</span>
<span id="cb1-5"><a href="#cb1-5" aria-hidden="true" tabindex="-1"></a>    .displaySize(inline-block, 16px, 16px);</span>
<span id="cb1-6"><a href="#cb1-6" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div>
<p>Output</p>
<div class="sourceCode" id="cb2"><pre
class="sourceCode css"><code class="sourceCode css"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component1</span> {</span>
<span id="cb2-2"><a href="#cb2-2" aria-hidden="true" tabindex="-1"></a>    <span class="kw">width</span>:<span class="dv">16</span><span class="dt">px</span><span class="op">;</span></span>
<span id="cb2-3"><a href="#cb2-3" aria-hidden="true" tabindex="-1"></a>    <span class="kw">height</span>: <span class="dv">16</span><span class="dt">px</span><span class="op">;</span></span>
<span id="cb2-4"><a href="#cb2-4" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb2-5"><a href="#cb2-5" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component2</span> {</span>
<span id="cb2-6"><a href="#cb2-6" aria-hidden="true" tabindex="-1"></a>    <span class="kw">display</span>: <span class="dv">inline-block</span><span class="op">;</span></span>
<span id="cb2-7"><a href="#cb2-7" aria-hidden="true" tabindex="-1"></a>    <span class="kw">width</span>:<span class="dv">16</span><span class="dt">px</span><span class="op">;</span></span>
<span id="cb2-8"><a href="#cb2-8" aria-hidden="true" tabindex="-1"></a>    <span class="kw">height</span>: <span class="dv">16</span><span class="dt">px</span><span class="op">;</span></span>
<span id="cb2-9"><a href="#cb2-9" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="even">
<td style="padding: 0 4px;"><p>Font Style</p></td>
<td style="padding: 0 4px;"><p>Usage</p>
<div class="sourceCode" id="cb3"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a>@fontFamily: Arial, Sans-serif;</span>
<span id="cb3-2"><a href="#cb3-2" aria-hidden="true" tabindex="-1"></a>.z-component-text {</span>
<span id="cb3-3"><a href="#cb3-3" aria-hidden="true" tabindex="-1"></a>    .fontStyle(@fontFamily, 14px, 600, #555555);</span>
<span id="cb3-4"><a href="#cb3-4" aria-hidden="true" tabindex="-1"></a>    font-style: italic;</span>
<span id="cb3-5"><a href="#cb3-5" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb3-6"><a href="#cb3-6" aria-hidden="true" tabindex="-1"></a>.z-component-iconfont {</span>
<span id="cb3-7"><a href="#cb3-7" aria-hidden="true" tabindex="-1"></a>    .iconFontStyle(12px, #ACACAC);</span>
<span id="cb3-8"><a href="#cb3-8" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div>
<p>Output</p>
<div class="sourceCode" id="cb4"><pre
class="sourceCode css"><code class="sourceCode css"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component-text</span> {</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a>    <span class="kw">font-family</span>: Arial<span class="op">,</span> <span class="dv">Sans-serif</span><span class="op">;</span></span>
<span id="cb4-3"><a href="#cb4-3" aria-hidden="true" tabindex="-1"></a>    <span class="kw">font-size</span>: <span class="dv">14</span><span class="dt">px</span><span class="op">;</span></span>
<span id="cb4-4"><a href="#cb4-4" aria-hidden="true" tabindex="-1"></a>    <span class="kw">font-weight</span>: <span class="dv">600</span><span class="op">;</span></span>
<span id="cb4-5"><a href="#cb4-5" aria-hidden="true" tabindex="-1"></a>    <span class="kw">font-style</span>: <span class="dv">normal</span><span class="op">;</span></span>
<span id="cb4-6"><a href="#cb4-6" aria-hidden="true" tabindex="-1"></a>    <span class="kw">color</span>: <span class="cn">#555555</span><span class="op">;</span></span>
<span id="cb4-7"><a href="#cb4-7" aria-hidden="true" tabindex="-1"></a>    <span class="kw">font-style</span>: <span class="dv">italic</span><span class="op">;</span> <span class="co">/* override */</span></span>
<span id="cb4-8"><a href="#cb4-8" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb4-9"><a href="#cb4-9" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component-iconfont</span> {</span>
<span id="cb4-10"><a href="#cb4-10" aria-hidden="true" tabindex="-1"></a>    <span class="kw">font-size</span>: <span class="dv">12</span><span class="dt">px</span><span class="op">;</span></span>
<span id="cb4-11"><a href="#cb4-11" aria-hidden="true" tabindex="-1"></a>    <span class="kw">color</span>: <span class="cn">#ACACAC</span><span class="op">;</span></span>
<span id="cb4-12"><a href="#cb4-12" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
<tr class="odd">
<td style="padding: 0 4px;"><p>Opacity</p></td>
<td style="padding: 0 4px;"><p>Usage</p>
<div class="sourceCode" id="cb5"><pre
class="sourceCode html"><code class="sourceCode html"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a>.z-component1 {</span>
<span id="cb5-2"><a href="#cb5-2" aria-hidden="true" tabindex="-1"></a>    .opacity(1);</span>
<span id="cb5-3"><a href="#cb5-3" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb5-4"><a href="#cb5-4" aria-hidden="true" tabindex="-1"></a>.z-component2 {</span>
<span id="cb5-5"><a href="#cb5-5" aria-hidden="true" tabindex="-1"></a>    .opacity(0.6);</span>
<span id="cb5-6"><a href="#cb5-6" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div>
<p>Output</p>
<div class="sourceCode" id="cb6"><pre
class="sourceCode css"><code class="sourceCode css"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component1</span> {</span>
<span id="cb6-2"><a href="#cb6-2" aria-hidden="true" tabindex="-1"></a>    <span class="kw">opacity</span>: <span class="dv">1</span><span class="op">;</span></span>
<span id="cb6-3"><a href="#cb6-3" aria-hidden="true" tabindex="-1"></a>    <span class="kw">filter</span>: alpha<span class="fu">(</span>opacity=<span class="dv">100</span><span class="fu">)</span><span class="op">;</span></span>
<span id="cb6-4"><a href="#cb6-4" aria-hidden="true" tabindex="-1"></a>}</span>
<span id="cb6-5"><a href="#cb6-5" aria-hidden="true" tabindex="-1"></a><span class="fu">.z-component2</span> {</span>
<span id="cb6-6"><a href="#cb6-6" aria-hidden="true" tabindex="-1"></a>    <span class="kw">opacity</span>: <span class="dv">0.6</span><span class="op">;</span></span>
<span id="cb6-7"><a href="#cb6-7" aria-hidden="true" tabindex="-1"></a>    <span class="kw">filter</span>: alpha<span class="fu">(</span>opacity=<span class="dv">60</span><span class="fu">)</span><span class="op">;</span></span>
<span id="cb6-8"><a href="#cb6-8" aria-hidden="true" tabindex="-1"></a>}</span></code></pre></div></td>
</tr>
</tbody>
</table>


