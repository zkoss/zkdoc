\_\_TOC\_\_

**Syntax:**

<?evaluator [name="..."] [class="..."] [import="..."]?>

It specifies how to evaluate XEL expressions.

# name

`[Optional][Default: `*`none`*`][Case insensitive]`

The name of the implementation used to evaluate the XEL expressions.
There are two ways to specify the implementation. One is the name
attribute. The other is the class attribute.

For example, if you want to use MVEL[^1], you can specify the name as
follows.

``` xml
 <?evaluator name="mvel"?>
 <window id="w" title="MVEL Demo">
     ${new org.zkoss.zul.Textbox().setParent(w)}
 </window>
```

Here is a list of built-in implementations:

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Class / Description</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>default</p></td>
<td><p>org.zkoss.xel.el.ELFactory</p>
<p>The default implementation. It is based on ZK Commons EL
(<code>zcommons-el.jar</code>), which is a performance enhancement
version of Apache Commons EL.</p></td>
</tr>
<tr class="even">
<td><p>zel</p></td>
<td><p>org.zkoss.xel.zel.ELFactory</p>
<p>The implementation based on The ZK EL Library(<code>zel.jar</code>),
which supports new features seen in <i>Unified Expression Language
2.2</i> such as method calls and l-value.</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&#39;&#39;[Since ZK 6, ZK uses this evaluator as the default one.]&#39;&#39;</span></code></pre></div></td>
</tr>
<tr class="odd">
<td><p>mvel</p></td>
<td><p>org.zkoss.zkmax.xel.mvel.MVELFactory</p>
<p>The implementation based on MVEL, <a
href="http://mvel.codehaus.org">http://mvel.codehaus.org</a>.</p>
<div class="sourceCode" id="cb2"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>&#39;&#39;[available only if zkmax.jar is loaded]&#39;&#39;</span></code></pre></div></td>
</tr>
<tr class="even">
<td><p>ognl</p></td>
<td><p>org.zkoss.zkmax.xel.ognl.OGNLFactory</p>
<p>The implementation based on OGNL, <a
href="http://www.ognl.org/"><span>http://www.ognl.org</span></a>.</p>
<div class="sourceCode" id="cb3"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a>&#39;&#39;[available only if zkmax.jar is loaded]&#39;&#39;</span></code></pre></div></td>
</tr>
<tr class="odd">
<td><p>commons-el</p></td>
<td><p>org.zkoss.zkmax.xel.el.ApacheELFactory</p>
<p>The implementation that is based on Apache Commons EL,
org.apache.commons.el.ExpressionEvaluatorImpl.</p>
<div class="sourceCode" id="cb4"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a>&#39;&#39;[available only if zkmax.jar is loaded]&#39;&#39;</span></code></pre></div></td>
</tr>
<tr class="even">
<td><p>japser-el</p></td>
<td><p>org.zkoss.zkmax.xel.el21.ApacheELFactory</p>
<p>The implementation that is based on Apache JSP 2.1 EL,
org.apache.el.ExpressionFactoryImpl.</p>
<div class="sourceCode" id="cb5"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a>&#39;&#39;[available only if zkmax.jar is loaded]&#39;&#39;</span></code></pre></div></td>
</tr>
</tbody>
</table>

You can provide additional implementation by the use of the `class`
attribute, as described in the following section. The class must
implement the
<javadoc type="interface">org.zkoss.xel.ExpressionFactory</javadoc>
interface. Or, you can specify the following content in
`metainfo/xel/config.xml`.

``` xml
 <config>
     <xel-config>
         <evaluator-name>Super</evaluator-name><!-- case insensitive -->
         <evaluator-class>my.SuperEvaluator</evaluator-class>
     </xel-config>
 </config>
```

**Notes**

<references/>

# class

`[Optional][Default: `*`dependind on how xel-config is specified`*`]`

The implementation used to evaluate the XEL expressions. In addition to
the name attribute, you can specify the class directly. For example, you
can use MVEL by specifying class as follows.

``` xml
 <?evaluator class="org.zkoss.zkmax.xel.mvel.MVELFactory"?>
 <window id="w" title="MVEL Demo">
     ${new org.zkoss.zul.Textbox().setParent(w)}
 </window>
```

# import

`[Optiona][Default: `*`what are defined in taglib`*`]`

Specifies a list of classes separated with comma to import for
evaluating the expression in this page. For example, with MVEL:

``` xml
 <?evaluator class="org.zkoss.zkmax.xel.mvel.MVELFactory"
 import="org.zkoss.zul.Datebox,org.zkoss.zul.Combobox"?>
 <window id="w" title="MVEL Demo">
     ${new Datebox().setParent(w)}
 </window>
```

Notice that not all evaluators support the import of classes. For
example, all EL-based the evaluators, including the system default one,
do *not* support it. In other words, the `import` attribute is
meaningless to them (since they don't have the concept of
instantiation).

In addition, the class's names specified in the import attribute must be
a fully qualified name (including the package's name). In other words,
it ignores the classes imported by [the import
directive](ZUML_Reference/ZUML/Processing_Instructions/import).

# Version History

| Version | Date           | Content                                                                                              |
|---------|----------------|------------------------------------------------------------------------------------------------------|
| 6.0.0   | September 2011 | Support those new features seen in Unified Expression Language 2.2 such as method calls and l-value. |

[^1]: MVEL is a powerful expression language. Refer to
    [<http://mvel.codehaus.org/>](http://mvel.codehaus.org/) for more
    information.
