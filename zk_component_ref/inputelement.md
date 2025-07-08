

# Input Element

- Demonstration: N/A
- Java API: [org.zkoss.zul.impl.InputElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/InputElement.html)
- JavaScript API:
  [zul.inp.InputWidget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.InputWidget.html)

# Employment/Purpose

InputElement is a super class for components which handle user key
input, such as
[`textbox`]({{site.baseurl}}/zk_component_ref/textbox)`,`
[`intbox`]({{site.baseurl}}/zk_component_ref/intbox)`,`
[`decimalbox`]({{site.baseurl}}/zk_component_ref/decimalbox)`,`
[`doublebox`]({{site.baseurl}}/zk_component_ref/doublebox),
[`datebox`]({{site.baseurl}}/zk_component_ref/datebox),
[`timebox`]({{site.baseurl}}/zk_component_ref/timebox),
[`spinner`]({{site.baseurl}}/zk_component_ref/spinner),
[`combobox`]({{site.baseurl}}/zk_component_ref/combobox), and
[`bandbox`]({{site.baseurl}}/zk_component_ref/bandbox).

Some features are implemented in this class, such as constraint,
disabled, maxlength, name, readonly, and so on.

You should not use this class directly, please use the inherited class.

# Example

```xml
<grid>
    <rows>
        <row>
            UserName <textbox value="Jerry" width="150px" />
        </row>
        <row>
            Password <textbox type="password" value="foo" width="150px" />
        </row>
        <row>
            Phone: <intbox constraint="no negative,no zero" width="150px" value="12345678" />
        </row>
        <row>
            Weight: <decimalbox format="###.##" value="154.32" width="150px" />
        </row>
        <row>
            Birthday: <datebox id="db" width="150px" />         
        </row>
        <row>
            E-mail:
            <textbox width="150px" value="zk@zkoss.org"
                constraint="/.+@.+\.[a-z]+/: Please enter an e-mail address" />
        </row>
    </rows>
</grid>
```

![](/zk_component_ref/images/CrInputs.png)

# Validation

There are two ways to validate the value entered by a user: implementing
[org.zkoss.zul.Constraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Constraint.html) or throwing
[org.zkoss.zk.ui.WrongValueException](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WrongValueException.html).

## Constraint

An input element can be associated with a constraint
([org.zkoss.zul.Constraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Constraint.html)) to validate the value
entered by a user. There is a default implementation called
[org.zkoss.zul.SimpleConstraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleConstraint.html) that can handle many
conditions. If it is not enough, you can implement your own constraint,
or throw [org.zkoss.zk.ui.WrongValueException](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WrongValueException.html) as
described in the next sections.

### Built-in Constraints

To use the default constraint, you could specify a list of conditions in
[org.zkoss.zul.impl.InputElement#setConstraint(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/InputElement.html#setConstraint(java.lang.String)),
such as `no positive` and `no empty`. For example,

```xml
<textbox constraint="no empty"/>
<intbox constraint="no negative,no zero"/>
```

<table>
<thead>
<tr class="header">
<th><p>Condition</p></th>
<th><p>Description |+ You can specify the following values at
<code>constraint</code> attribute to apply them</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>no empty</p></td>
<td><p>Empty is not allowed.</p></td>
</tr>
<tr class="even">
<td><p>no future</p></td>
<td><p>Date in the future is not allowed.</p></td>
</tr>
<tr class="odd">
<td><p>no negative</p></td>
<td><p>Negative numbers are not allowed.</p></td>
</tr>
<tr class="even">
<td><p>no past</p></td>
<td><p>Date in the past is not allowed.</p></td>
</tr>
<tr class="odd">
<td><p>no positive</p></td>
<td><p>Positive numbers are not allowed.</p></td>
</tr>
<tr class="even">
<td><p>no today</p></td>
<td><p>Today is not allowed.</p></td>
</tr>
<tr class="odd">
<td><p>no zero</p></td>
<td><p>Zero numbers are not allowed.</p></td>
</tr>
<tr class="even">
<td><p>between <em>yyyyMMdd</em> and <em>yyyyMMdd</em></p></td>
<td><p>Date only allowed between the specified range. The format must be
<code>yyyyMMdd</code>, such as</p>
<div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">datebox</span><span class="ot"> constraint=</span><span class="st">&quot;between 20071225 and 20071203&quot;</span>/&gt;</span></code></pre></div></td>
</tr>
<tr class="odd">
<td><p>after <em>yyyyMMdd</em></p></td>
<td><p>Date only allowed after (and including) the specified date. The
format must be <code>yyyyMMdd</code>, such as</p>
<div class="sourceCode" id="cb2"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">datebox</span><span class="ot"> constraint=</span><span class="st">&quot;after 20071225&quot;</span>/&gt;</span></code></pre></div></td>
</tr>
<tr class="even">
<td><p>before <em>yyyyMMdd</em></p></td>
<td><p>Date only allowed before (and including) the specified date. The
format must be <code>yyyyMMdd</code>, such as</p>
<div class="sourceCode" id="cb3"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">datebox</span><span class="ot"> constraint=</span><span class="st">&quot;before 20071225&quot;</span>/&gt;</span></code></pre></div></td>
</tr>
<tr class="odd">
<td><p><code>end_before</code><br />
<code>end_after</code><br />
<code>after_start</code><br />
<code>after_end</code><br />
<code>...</code></p></td>
<td><p>Specifies the position of the error box. Please refer to <a
href="{{site.baseurl}}/zk_component_ref/popup")

```xml
<textbox placeholder="Please type some text" />
```

## InputAttributes

{% include version-badge.html version=8.6.1 %} The feature is available since 8.6.1.
All input elements can set some additional attributes to the input html
tag in the component. The inputAttributes can take a Map with attribute
names as the keys or a String separated by ";" and followed the
name=value rule.

```xml
<bandbox inputAttributes="${map}"></bandbox>
<datebox inputAttributes="autocorrect=off;spellcheck=ture"></datebox>
```

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p><code>onChange</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html) Denotes the content
of an input component has been modified by the user.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onChanging</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html) Denotes that user is
changing the content of an input component. Notice that the component's
content (at the server) won't be changed until <code>onChange</code> is
received. Thus, you have to invoke the
<code>InputEvent.getValue()</code> to retrieve the changed
value.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onSelection</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.SelectionEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectionEvent.html) Denotes that
user is selecting a portion of the text of an input component. You can
retrieve the start and end position of the selected text by use of the
<code>getStart</code> and <code>getEnd</code>
methods.<strong></strong></p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onFocus</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes when a component
gets the focus. Remember event listeners execute at the server, so the
focus at the client might be changed when the event listener for
<code>onFocus</code> is executed.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onBlur</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html) Denotes when a component
loses the focus. Remember event listeners execute at the server, so the
focus at the client might be already changed when executing the
<code>onBlur</code> listener.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onError</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zk.ui.event.ErrorEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ErrorEvent.html) Denotes when a
component caused a validation error.</p></td>
</tr>
</tbody>
</table>

[ Inherited Supported Events from XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*None`

# Use cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Browser Limitations

<table>
<thead>
<tr class="header">
<th><p>Browser</p></th>
<th><p>description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>iOS Safari / Chrome</p></td>
<td><div class="sourceCode" id="cb1"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">textbox</span><span class="ot"> id=</span><span class="st">&quot;test&quot;</span>/&gt;</span>
<span id="cb1-2"><a href="#cb1-2" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">button</span><span class="ot"> label=</span><span class="st">&quot;java focus (no keyboard)&quot;</span><span class="ot"> onClick=</span><span class="st">&quot;test.focus()&quot;</span>&gt;&lt;/<span class="kw">button</span>&gt;</span>
<span id="cb1-3"><a href="#cb1-3" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">button</span><span class="ot"> xmlns:w=</span><span class="st">&quot;client&quot;</span><span class="ot"> label=</span><span class="st">&quot;client focus&quot;</span><span class="ot"> w:onClick=</span><span class="st">&quot;zk.Widget.$(&#39;$test&#39;).focus();&quot;</span>&gt;&lt;/<span class="kw">button</span>&gt;</span></code></pre></div>
<p>In mobile Safari, the user must explicitly tap the elements in the
web view to display the keyboard.</p></td>
</tr>
</tbody>
</table>

# Version History

| Version | Date       | Content                                                                                                                             |
|---------|------------|-------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.8   | June, 2011 | Allow user to specify the position of error-box                                                                                     |
| 6.0.0   | Sep, 2011  | Add instant mode, which sends onChange event and updates value to component as soon as possible.                                    |
| 6.5.0   | Sep, 2012  | Support HTML5 placeholder attribute for input elements                                                                              |
| 8.5.2   | May, 2018  | [ZK-3774](http://tracker.zkoss.org/browse/ZK-3774): focus() doesn't work on mobile device                                           |
| 8.6.1   | Jan, 2019  | [ZK-4111](http://tracker.zkoss.org/browse/ZK-4111): Add autocorrect and spellcheck DOM attributes toggles to input-based components |



[^1]: The default constraint
    ([org.zkoss.zul.SimpleConstraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleConstraint.html)) validates all
    constraints at the client side
