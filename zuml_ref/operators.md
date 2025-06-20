EL expressions provide the following operators[^1]:

<table>
<thead>
<tr class="header">
<th><p>Type</p></th>
<th><p>Operators</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Arithmetic</p></td>
<td><p>+, -<a href="#fn1" class="footnote-ref" id="fnref1"
role="doc-noteref"><sup>1</sup></a>, *, /, div, %, mod, -<a href="#fn2"
class="footnote-ref" id="fnref2"
role="doc-noteref"><sup>2</sup></a></p></td>
<td><ul>
<li>/ and div are the same, while % and mod are the same.</li>
</ul></td>
</tr>
<tr class="even">
<td><p>Logical</p></td>
<td><p>and, &amp;&amp;, or, <nowiki></p></td>
<td><p></nowiki>, not, !, empty</p></td>
</tr>
<tr class="odd">
<td><p>Relational</p></td>
<td><p>==, eq, !=, ne, &lt;, lt, &gt;, gt, &lt;=, ge, &gt;=, le</p></td>
<td><ul>
<li>Comparisons can be made against other values, or against boolean,
string, integer, or floating point literals.</li>
</ul></td>
</tr>
<tr class="even">
<td><p>Conditional</p></td>
<td><p>A ? B : C</p></td>
<td><p>It evaluate B or C, depending on the result of the evaluation of
A.</p></td>
</tr>
<tr class="odd">
<td><p>Index</p></td>
<td><p>[]</p></td>
<td><p>To evaluate expr-a[expr-b], evaluate expr-a into value-a and
evaluate expr-b into value-b. If either value-a or value-b is null,
return null.</p>
<ul>
<li>If value-a is a Map, return value-a.get(value-b). If
!value-a.containsKey(value-b), then return null.</li>
<li>If value-a is a List or array, coerce value-b to int and return
value-a.get(value-b) or Array.get(value-a, value-b), as appropriate. If
the coercion couldn't be performed, an error is returned. If the get
call returns an IndexOutOfBoundsException, null is returned. If the get
call returns another exception, an error is returned.</li>
<li>If value-a is a JavaBeans object, coerce value-b to String. If
value-b is a readable property of value-a, then return the result of a
get call. If the get method throws an exception, an error is
returned.</li>
</ul></td>
</tr>
<tr class="even">
<td><p>Member</p></td>
<td><p>.</p></td>
<td><ul>
<li>Properties of variables are accessed using the . operator and can be
nested arbitrarily.</li>
<li>The value of a map can be accessed by using the . operator.</li>
</ul></td>
</tr>
</tbody>
</table>
<aside id="footnotes" class="footnotes footnotes-end-of-document"
role="doc-endnotes">
<hr />
<ol>
<li id="fn1">binary<a href="#fnref1" class="footnote-back"
role="doc-backlink">↩︎</a></li>
<li id="fn2">unary<a href="#fnref2" class="footnote-back"
role="doc-backlink">↩︎</a></li>
</ol>
</aside>

> ------------------------------------------------------------------------
>
> <references/>

The relative precedence levels of operators from the highest to lowest,
left to right are as follows:

- \[\] .
- ()[^2]
- \- [^3] not ! empty
- \* / div % mod
- \+ - [^4]
- \< \> \<= \>= lt gt le ge
- == != eq ne
- && and
- \|\| or
- ? :

> ------------------------------------------------------------------------
>
> <references/>



[^1]: The information is from [JSP Tutorial](http://download.oracle.com/javaee/1.4/tutorial/doc/JSPIntro7.html).

[^2]: Used to change the precedence of operators.

[^3]: unary

[^4]: binary
