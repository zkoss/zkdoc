---
title: "Operators"
---

EL expressions provide the following operators[^1]:

| Type | Operators | Description |
|------|-----------|-------------|
| Arithmetic | +, -<sup>1</sup>, *, /, div, %, mod, -<sup>2</sup> | - / and div are the same, while % and mod are the same. |
| Logical | and, &&, or, \|\|, not, !, empty | |
| Relational | ==, eq, !=, ne, <, lt, >, gt, <=, ge, >=, le | - Comparisons can be made against other values, or against boolean, string, integer, or floating point literals. |
| Conditional | A ? B : C | It evaluate B or C, depending on the result of the evaluation of A. |
| Index | [] | To evaluate expr-a[expr-b], evaluate expr-a into value-a and evaluate expr-b into value-b. If either value-a or value-b is null, return null.<br><br>- If value-a is a Map, return value-a.get(value-b). If !value-a.containsKey(value-b), then return null.<br>- If value-a is a List or array, coerce value-b to int and return value-a.get(value-b) or Array.get(value-a, value-b), as appropriate. If the coercion couldn't be performed, an error is returned. If the get call returns an IndexOutOfBoundsException, null is returned. If the get call returns another exception, an error is returned.<br>- If value-a is a JavaBeans object, coerce value-b to String. If value-b is a readable property of value-a, then return the result of a get call. If the get method throws an exception, an error is returned. |
| Member | . | - Properties of variables are accessed using the . operator and can be nested arbitrarily.<br>- The value of a map can be accessed by using the . operator. |
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
