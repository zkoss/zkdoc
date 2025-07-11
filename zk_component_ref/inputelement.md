# ZK Component Reference: Input Element

## Input Element


- Java API: [org.zkoss.zul.impl.InputElement](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/InputElement.html)
- JavaScript API: [zul.inp.InputWidget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.inp.InputWidget.html)

## Employment/Purpose

InputElement serves as a superclass for components that handle user key input. It is utilized by various input elements in ZK, such as:
- [`Textbox`](textbox)
- [`Intbox`](intbox)
- [`Decimalbox`](decimalbox)
- [`Doublebox`](doublebox)
- [`Datebox`](datebox)
- [`Timebox`](timebox)
- [`Spinner`](spinner)
- [`Combobox`](combobox)
- [`Bandbox`](bandbox)

InputElement provides features such as constraints, disabled state, maxlength, name attribute, readonly state, and more.

Developers are encouraged not to use this class directly, but rather utilize the inherited classes for specific input components.

## Example

The following example demonstrates the usage of various input elements in a `<grid>` layout:

```xml
<grid>
	<rows>
		<row>
			UserName: <textbox value="Jerry" width="150px" />
		</row>
		<row>
			Password: <textbox type="password" value="foo" width="150px" />
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

![Input Elements Example](CrInputs.png)

Try it
*  [Input Elements](https://zkfiddle.org/sample/25n9son/1-ZK-Component-Reference-InputElement-Example?v=latest&t=Iceblue_Compact)


## Validation

There are two ways to validate the value entered by a user in ZK Input Elements: using [Constraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Constraint.html) or throwing [WrongValueException](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WrongValueException.html).

### Constraint

An input element in ZK can be associated with a [Constraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Constraint.html) to validate the user-entered value. ZK provides a default implementation called [SimpleConstraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleConstraint.html), which can handle various conditions. 

#### Built-in Constraints
ZK allows specifying conditions using constraints such as `no empty` and `no negative`. Here are some of the available values for the `constraint` attribute:

| Condition | Description |
|-----------|-------------|
| `no empty`| Empty values are not allowed.|
| `no future`| Date in the future is not allowed.|
| `no negative`| Negative numbers are not allowed.|
| `no past`| Date in the past is not allowed.|
| `no positive`| Positive numbers are not allowed.|
| `no today`| Today is not allowed.|
| `no zero`| Zero numbers are not allowed.|
| `between yyyyMMdd and yyyyMMdd`| Dates allowed only within a specified range. <br/> For example, <br/> `<datebox constraint="between 20231225 and 20241203"/>`|
| `after yyyyMMdd`| Dates allowed after the specified date. <br/> For example, <br/> `<datebox constraint="after 20231225"/>` |
| `before yyyyMMdd`| Dates allowed before the specified date. <br/> For example, <br/> `<datebox constraint="before 20231225"/>`|
| `end_before` <br/> `end_after` <br/> `after_start` <br/> `after_end` <br/> ...| Specifies the position of the error box. Please refer to [Popup](popup) for all allowed positions. <br/> For example, <br/> `<textbox constraint="no empty, end_after"/><textbox constraint="no empty, start_before"/>`|


For example,

```xml
<textbox constraint="no empty"/>
<intbox constraint="no negative,no zero"/>
```

Try it
*  [Input Constraint](https://zkfiddle.org/sample/1h7fbim/1-ZK-Component-Reference-InputElement-Constraint-Example?v=latest&t=Iceblue_Compact)


#### Regular Expression
To specify a regular expression, use `/` to enclose it.

For example:
```xml
<textbox constraint="/.+@.+\.[a-z]+/"/>
```
Notice that the above statement is XML, so do not use `\\` to specify a backslash. On the other hand, it is required, if writing in Java:

```java
new Textbox().setContraint("/.+@.+\\.[a-z]+/");
```

Try it
*  [Input Regular Expression](https://zkfiddle.org/sample/16ljcgr/1-ZK-Component-Reference-InputElement-Regular-Expressi-Example?v=latest&t=Iceblue_Compact)


#### Flags

**Since**: 9.6.0

ZK supports using flags with regular expressions. Flags available include:
- `i`: Ignore case
- `m`: Multiline
- `s`: DotAll
- `u`: Unicode

For example:
```xml
<textbox constraint="/[A-Z]{3}/i"/>
```

Try it
*  [Input Regular Expression Flag](https://zkfiddle.org/sample/1dpau85/1-ZK-Component-Reference-InputElement-Regular-Expressi-Example?v=latest&t=Iceblue_Compact)

Notice: the regular expression will always use global match no matter if the g flag is added or not.


#### Multiple Constraints

Combine regular expressions with other constraints by separating them with a comma. 
You can also customize the error message by appending the constraint with a colon and the desired message when it fails.

Example:
```xml
<textbox constraint="/.+@.+\.[a-z]+/: e-mail address only"/>
<datebox constraint="no empty, no future: now or never"/>
of course, it supports multiple custom messages
<intbox constraint="no negative: forbid negative, no positive: forbid positive" />
```

Try it
*  [Input Multiple Constraints](https://zkfiddle.org/sample/1d6mvdu/1-ZK-Component-Reference-InputElement-Multiple-Constraints?v=latest&t=Iceblue_Compact)


#### i18n Error Message

To support multilingual applications, you can use [the `l` function]({{site.baseurl}}/zuml_ref/l) in ZK to display internationalized error messages. For example, you can set an error message for a textbox constraint as shown below:

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
<textbox constraint="/.+@.+\.[a-z]+/: ${c:l('err.email.required')}"/>
```

#### Escape a Comma

**Since**: 8.0.0

In cases where a longer sentence with a comma separator is required, you can enclose the sentence with curly braces. This ensures that the comma is treated as part of the sentence rather than a separator. For example:

```xml
<textbox constraint="no empty: {Sorry, no empty allowed}, /.+@.+\.[a-z]+/: email only"></textbox>
```

#### Scrollable Error Message

If you need to display an error message box that moves with scrolling, you can use [the `data-scrollable` attribute]({{site.baseurl}}/zuml_ref/data_scrollable). This attribute allows the error message box to remain visible even when the page is scrolled.


### Custom Constraint

Developers can create custom constraints by implementing the [Constraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Constraint.html) interface. This custom constraint can then be applied to input elements.

Example Java Implementation:
```java
public class EvenNumberConstraint implements Constraint {
    public void validate(Component comp, Object value) throws WrongValueException {
        if (value != null && new Integer(value.toString()).intValue() % 2 == 1)
            throw new WrongValueException(comp, "Only even numbers are allowed, not "+value);
    }
}
```
To specify it to the constraint property, you have to instantiate it first by use of [the `new` function]({{site.baseurl}}/zuml_ref/new) as shown below.

```xml
<?taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c"?>
<textbox constraint="${c:new('foo.EvenNumberConstraint')}"/>
```

### Display Error Message in Custom Way

For a more customized approach to displaying error messages, developers can implement the [CustomConstraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/CustomConstraint.html) interface along with the [Constraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Constraint.html) interface. This allows for a tailored error message presentation.

```xml
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

![Custom Constraint](CrCustomConstraint.png)

Try it
*  [Input Custom Constraint](https://zkfiddle.org/sample/26fnvg1/1-ZK-Component-Reference-InputElement-Custom-Constraint?v=latest&t=Iceblue_Compact)


### Validate at Client for Better Responsiveness

To enhance responsiveness, developers can validate constraints at the client-side using the [ClientConstraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/ClientConstraint.html) interface in conjunction with the [Constraint](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Constraint.html) interface.

Note: The default constraint ([SimpleConstraint](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/SimpleConstraint.html)) validates all constraints at the client side

## WrongValueException

The WrongValueException can be thrown in various situations to handle validation errors. For instance, it can be used to validate user input when a login button is pressed.

Example Java Implementation:
```java
public class CustomValidationComposer extends SelectorComposer {
  @Wire
  private Textbox username;
  @Wire
  private Textbox password;

  @Listen("onClick = #login")
  public void doLogin() {
    username.clearErrorMessage();
    if (validate(username, password)) {
      // success
    } else {
      throw new WrongValueException(username, "Not a valid username or password. Please retry.");
    }
  }
}
```
However, notice that you have to clear the error message manually by invoking [InputElement.clearErrorMessage()](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/impl/InputElement.html#clearErrorMessage()). Otherwise, the error message will remain there unless [Textbox.setValue(String)](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Textbox.html#setValue(java.lang.String)) is called.

## Properties

### Inplace

In-place editing functionality can be enabled for input elements like combobox, textbox, datebox, etc.

Example:
```xml
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

Try it
*  [Input Inplace](https://zkfiddle.org/sample/3dmfi4j/1-ZK-Component-Reference-InputElement-Inplace?v=latest&t=Iceblue_Compact)


### Instant
**Since**: 6.0.0

Introduced in ZK version 6.0.0, instant mode enables the `onChange` event to be triggered as the user types in the input field, similar to the `onChanging` event. The value is immediately updated on the server side and synchronized between the client and server.

The default value: `false`

### Placeholder
**Since**: 6.5.0

Starting from ZK 6.5, input elements support HTML5 placeholder text. This feature is useful for providing users with guidance on what should be entered in the input field.

![Input Placeholder](Zk_textbox_placeholder.png)

For example,
```xml
<textbox placeholder="Please type some text" />
```

### InputAttributes
**Since**: 8.6.1

Introduced in ZK version 8.6.1, input elements can now have additional attributes set for the input HTML tag in the component. These attributes can be defined as a Map or a String with name-value pairs separated by "`;`".

For example,
```xml
<bandbox inputAttributes="${map}"></bandbox>
<datebox inputAttributes="autocorrect=off;spellcheck=true"></datebox>
```

Try it
*  [Input InputAttributes](https://zkfiddle.org/sample/33i8sgb/1-ZK-Component-Reference-InputElement-InputAttributes?v=latest&t=Iceblue_Compact)

## Supported Events

| Name        | Event Type                                            | Description                                                                                             |
|-------------|-------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `onChange`  | **Event:** [InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html)       | Indicates that the content of an input component has been modified by the user.                         |
| `onChanging`| **Event:** [InputEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/InputEvent.html)       | Indicates that the user is changing the content of an input component. The content is not changed until `onChange` is received. Use `InputEvent.getValue()` to retrieve the changed value. |
| `onSelection`| **Event:** [SelectionEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectionEvent.html) | Indicates that the user is selecting a portion of the text of an input component. Allows retrieval of the start and end position of the selected text. |
| `onFocus`   | **Event:** [Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)                    | Indicates when a component gains focus. Event listeners execute at the server, potentially changing focus at the client. |
| `onBlur`    | **Event:** [Event](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/Event.html)                    | Indicates when a component loses focus. Event listeners execute at the server, potentially changing focus at the client. |
| `onError`   | **Event:** [ErrorEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/ErrorEvent.html)         | Indicates when a component triggers a validation error.                                                   |

## Supported Children
`*NONE`: This component does not support any child components.

## Browser Limitations

| Browser | Description|
|---------|------------|
|iOS Safari / Chrome| In iOS Safari and Chrome browsers, there is a specific behavior related to input elements. In mobile Safari, users need to explicitly tap on the elements within the web view to display the keyboard. This behavior impacts how users interact with input elements on mobile devices.<br/> For example, <pre><code>&lt;textbox id="test"/&gt;<br/>&lt;button label="Java Focus (No Keyboard)" onClick="test.focus()"/&gt;<br/>&lt;button xmlns:w="client" label="Client Focus" w:onClick="zk.Widget.$('$test').focus()"/&gt;</code></pre>
