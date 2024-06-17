# Input Element

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zul.impl.InputElement</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zul.inp.InputWidget</javadoc>

# Employment/Purpose

InputElement is a super class for components which handle user key
input, such as
[`textbox`](ZK_Component_Reference/Input/Textbox)`,`
[`intbox`](ZK_Component_Reference/Input/Intbox)`,`
[`decimalbox`](ZK_Component_Reference/Input/Decimalbox)`,`
[`doublebox`](ZK_Component_Reference/Input/Doublebox),
[`datebox`](ZK_Component_Reference/Input/Datebox),
[`timebox`](ZK_Component_Reference/Input/Timebox),
[`spinner`](ZK_Component_Reference/Input/Spinner),
[`combobox`](ZK_Component_Reference/Input/Combobox), and
[`bandbox`](ZK_Component_Reference/Input/Bandbox).

Some features are implemented in this class, such as constraint,
disabled, maxlength, name, readonly, and so on.

You should not use this class directly, please use the inherited class.

# Example

``` xml
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

![](CrInputs.png)

# Validation

There are two ways to validate the value entered by a user: implementing
<javadoc>org.zkoss.zul.Constraint</javadoc> or throwing
<javadoc>org.zkoss.zk.ui.WrongValueException</javadoc>.

## Constraint

An input element can be associated with a constraint
(<javadoc>org.zkoss.zul.Constraint</javadoc>) to validate the value
entered by a user. There is a default implementation called
<javadoc>org.zkoss.zul.SimpleConstraint</javadoc> that can handle many
conditions. If it is not enough, you can implement your own constraint,
or throw <javadoc>org.zkoss.zk.ui.WrongValueException</javadoc> as
described in the next sections.

### Built-in Constraints

To use the default constraint, you could specify a list of conditions in
<javadoc method="setConstraint(java.lang.String)">org.zkoss.zul.impl.InputElement</javadoc>,
such as `no positive` and `no empty`. For example,

``` xml
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
href="ZK_Component_Reference/Essential_Components/Popup"
title="wikilink">Popup</a> for all allowed positions.</p>
<div class="sourceCode" id="cb4"><pre
class="sourceCode xml"><code class="sourceCode xml"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">textbox</span><span class="ot"> constraint=</span><span class="st">&quot;no empty, end_after&quot;</span>/&gt;</span>
<span id="cb4-2"><a href="#cb4-2" aria-hidden="true" tabindex="-1"></a>&lt;<span class="kw">textbox</span><span class="ot"> constraint=</span><span class="st">&quot;no empty, start_before&quot;</span>/&gt;</span></code></pre></div></td>
</tr>
</tbody>
</table>

### Regular Expression

To specify a regular expression, you could have to use `/` to enclose
the regular expression as follows.

``` xml
<textbox constraint="/.+@.+\.[a-z]+/"/>
```

Notice that the above statement is XML, so do not use \\ to specify a
backslash. On the other hand, it is required, if writing in Java:

``` java
new Textbox().setContraint("/.+@.+\\.[a-z]+/");
```

#### Flags

To specify the flags to the regular expression, you could add the flags
after the ending slash of the regular expression.

For example, If you want to enable case-insensitive matching, you could
add the flag as below.

``` xml
<textbox constraint="/[A-Z]{3}/i"/>
```

The flags supported:

| flags | Description |
|-------|-------------|
| i     | ignore case |
| m     | multiline   |
| s     | dotAll      |
| u     | unicode     |

Notice: the regular expression will always use global match no matter if
the `g` flag is added or not.

### Multiple Constraints

Notice that it is allowed to mix regular expression with other
constraints by separating them with a comma.

If you prefer to display an application dependent message instead of the
default one, you could append the constraint with a colon and the
message you want to display when failed.

``` xml
<textbox constraint="/.+@.+\.[a-z]+/: e-mail address only"/>
<datebox constraint="no empty, no future: now or never"/>
of course, it supports multiple custom messages
<intbox constraint="no negative: forbid negative, no positive: forbid positive" />
```

### i18n Error Message

To support multilingual, you could use [the l
function](ZUML_Reference/EL_Expressions/Core_Methods/l) as
depicted in [ZK Developer's
Reference](ZK_Developer's_Reference/Internationalization).

``` xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
<textbox constraint="/.+@.+\.[a-z]+/: ${c:l('err.email.required')}"/>
```

### Escape a Comma

If you want to write a longer sentence with comma separator, you can
enclose your customized sentence with curly braces.

``` xml
<textbox constraint="no empty: {Sorry, no empty allowed}, /.+@.+\.[a-z]+/: email only"></textbox>
```

### Scrollable Error Messag

If you want to move an error message box by scrolling, please use
[data-scrollable
attribute](http://books.zkoss.org/wiki/ZUML_Reference/ZUML/Namespaces/Client_Attribute/Data-Scrollable).

## Custom Constraint

If you want a custom constraint, you could implement
<javadoc type="interface">org.zkoss.zul.Constraint</javadoc> and specify
it in the constraint property
(<javadoc method="setConstraint(org.zkoss.zul.Constraint)">org.zkoss.zul.impl.InputElement</javadoc>).

``` java
public class EvenNumberConstraint implements Constraint {
    public void validate(Component comp, Object value) throws WrongValueException {
        if (value != null && new Integer(value.toString()).intValue() % 2 == 1)
            throw new WrongValueException(comp, "Only even numbers are allowed, not "+value);
    }
}
```

- Line 4: If the validation fails, just throw
  <javadoc>org.zkoss.zk.ui.WrongValueException</javadoc>. Notice that
  you have to specify which component causes the exception.

To specify it to the constraint property, you have to instantiate it
first by use of [the new
function](ZUML_Reference/EL_Expressions/Core_Methods/new) as
shown below

``` xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
<textbox constraint="${c:new('foo.EvenNumberConstraint')}"/>
```

### Display Error Message in Custom Way

Instead of the default error box, you could provide a custom approach by
implementing
<javadoc type="interface">org.zkoss.zul.CustomConstraint</javadoc> (with
<javadoc type="interface">org.zkoss.zul.Constraint</javadoc>). Then,
<javadoc method="showCustomError(org.zkoss.zk.ui.Component, org.zkoss.zk.ui.WrongValueException)" type="interface">org.zkoss.zul.CustomConstraint</javadoc>
will be invoked when an exception is caught. For example,

``` xml
<window title="Custom Constraint" border="normal">
    <zscript><![CDATA[
        class MyConst implements Constraint, CustomConstraint {
            //Constraint//
            public void validate(Component comp, Object value) {
                if (value == null || ((Integer)value).intValue() < 100)
                    throw new WrongValueException(comp, "At least 100 must be specified");
            }
            //CustomConstraint//
            public void showCustomError(Component comp, WrongValueException ex) {
                errmsg.setValue(ex != null ? ex.getMessage(): "");
            }
        }
        Constraint ctt = new MyConst();
    ]]>
    </zscript>
    <hlayout>
        Enter a number at least 100:
        <intbox constraint="${ctt}" />
        <label id="errmsg" />
    </hlayout>
</window>
```

And, here is the result

![](CrCustomConstraint.png)

### Validate at Client for Better Responsiveness

Responsiveness could be improved by validating more constraints at the
client side[^1]. To do that, you have to implement
<javadoc type="interface">org.zkoss.zul.ClientConstraint</javadoc> (with
<javadoc type="interface">org.zkoss.zul.Constraint</javadoc>).

> ------------------------------------------------------------------------
>
> <references/>

## WrongValueException

In addition to throwing WrongValueException in
<javadoc method="validate(org.zkoss.zk.ui.Component, java.lang.Object)">org.zkoss.zul.Constraint</javadoc>,
you can throw WrongValueException in other situations. For example, you
can validate the user name and password when the user presses the login
button. For example,

``` java
public class CustomValidationComposer extends SelectorComposer {
  @Wire
  private Textbox username;
  @Wire
  private Textbox password;

  @Listen("onClick = #login")
  public void doLogin() {
    username.clearErrorMessage(); //important to clear the previous error, if any
    if (validate(username, password)) {
      //success
    } else {
      throw new WrongValueException(username, "Not a valid username or password. Please retry.");
    }
  }
}
```

However, notice that you have to clear the error message manually by
invoking
<javadoc method="clearErrorMessage()">org.zkoss.zul.impl.InputElement</javadoc>.
Otherwise, the error message will remain there unless
<javadoc method="setValue(java.lang.String)">org.zkoss.zul.Textbox</javadoc>
is called.

# Properties

## Inplace

All input elements can have the in-place-editing functionality, like the
combobox, textbox, datebox, and so on.

``` xml
<grid width="500px">
    <rows>
        <row>
            Textbox:
            <textbox inplace="true" value="Click me" />
        </row>
        <row>
            Combobox:
            <combobox inplace="true" value="Click me" />
        </row>
    </rows>
</grid>
```

## Instant

default: `false`

When the instant mode is on, the `onChange` event will be fired as soon
as possible as a user is typing in the input (like `onChanging` event).
The value will also be updated to the component (server-side)
immediately. Notice that it would automatically synchronize the value
(including format) in the client and server. If you want to do something
in the server while changing the value, please use `onChanging` event.

## Placeholder

ZK 6.5 introduces support for HTML5 placeholder text, a very useful
feature for telling users what they should enter in a textbox. This is a
widely regarded UI pattern.

The following image and code show the look of the placeholder as well as
the code to replicate it.

<figure>
<img src="zk_textbox_placeholder.png"
title="zk_textbox_placeholder.png" />
<figcaption>zk_textbox_placeholder.png</figcaption>
</figure>

``` xml
<textbox placeholder="Please type some text" />
```

## InputAttributes

The feature is available since 8.6.1. All input elements can set some
additional attributes to the input html tag in the component. The
inputAttributes can take a Map with attribute names as the keys or a
String separated by ";" and followed the name=value rule.

``` xml
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
<javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc> Denotes the content
of an input component has been modified by the user.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onChanging</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc> Denotes that user is
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
<javadoc>org.zkoss.zk.ui.event.SelectionEvent</javadoc> Denotes that
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
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes when a component
gets the focus. Remember event listeners execute at the server, so the
focus at the client might be changed when the event listener for
<code>onFocus</code> is executed.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onBlur</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Denotes when a component
loses the focus. Remember event listeners execute at the server, so the
focus at the client might be already changed when executing the
<code>onBlur</code> listener.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onError</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.ErrorEvent</javadoc> Denotes when a
component caused a validation error.</p></td>
</tr>
</tbody>
</table>

[ Inherited Supported Events from
XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*None`

# Use cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

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
    (<javadoc>org.zkoss.zul.SimpleConstraint</javadoc>) validates all
    constraints at the client side
