

# Fragment

- Demonstration: N/A
- Java API: <javadoc>org.zkoss.zkmax.zul.Fragment</javadoc>
- JavaScript API:
  <javadoc directory="jsdoc">zkmax.wgt.Fragment</javadoc>


{% include edition-availability.html edition="pe" %}

# Purpose

`Fragment` is a ZK component which developers can combine native HTML
elements with ZK data binding syntax to make the static page to be
dynamic.

## Alternative

To manipulate HTML elements dynamically, ZK supports several ways in
addition to this component. Please refer to
[{{site.baseurl}}/zk_dev_ref/ui_patterns/html_tags]({{site.baseurl}}/zk_dev_ref/ui_patterns/html_tags)
for more details.

# Example

![](/zk_component_ref/images/ZKComRef_Fragment_Example.png)

```xml
<zk>
    <fragment viewModel="@id('vm') @init('org.zkoss.fragment.demo.VM2')" validationMessages="@id('vmsgs')"
              form="@id('fx') @load(vm) @save(vm, before='submit') @validator(vm.formValidator)"
              prop1="@bind(fx.prop1)" prop1err="@bind(vmsgs['fkey1'])"
              prop2="@bind(fx.prop2)" prop2err="@bind(vmsgs['fkey2'])"><![CDATA[
        <p><input type="text" value="@bind(prop1)"/><span textContent="@load(prop1err)"/></p>
        <p><input type="text" value="@bind(prop2)"/><span textContent="@load(prop2err)"/></p>
        <button onclick="@command('submit')">Submit</button>
    ]]></fragment>
</zk>
```

# Data Binding

With Fragment Component, you can bind the properties of ViewModel. For
instance, you can use ZK MVVM data binding to access the ViewModel on
the native HTML elements.

## Enclose with CDATA

Remember to mark the fragment content with the CDATA section to avoid
being parsed by server-side binder and causing problems:

```xml
    <fragment><![CDATA[
        ...
    ]]></fragment>
```

## Supported Bindings

These are the supported annotations:

- **@save**

` syntax: @save([limited EL-expression])`

- **@load**

` syntax: @load(limited EL-expression)`

- **@bind**

` syntax: @bind(limited EL-expression)`

- **@command**

` syntax: @command(mybean.myproperty, [arbitraryKey]=[limited EL-expression])`

- **@global-command**

` syntax: @global-command(mybean.myproperty, [arbitraryKey]=[limited EL-expression])`

## Limited EL-expression

Inside a fragment, it only supports partially, limited data binding
expressions including bean dot notation, arithmetic operator, `!`, and
`==`

# Put HTML as text content

This component also provides a virtual `textContent` attribute for HTML
elements to insert data into the tag.

```xml
<zk>
    <fragment viewModel="@id('vm') @init('org.zkoss.zktest.test2.F85_ZK_3681_Command_VM')"
              status="@bind(vm.status)"><![CDATA[
        <div>
            <input type="checkbox" onchange="@command('onCheck', checked=event.checked)" />
            Check this checkbox: <span textContent="@load(status)"/>
        </div>

        <div>
            <button onclick="@global-command('callGlobal', text='Hello', num=1)">Call global (1)</button>
            <button onclick="@global-command('callGlobal', text='World', num=2)">Call global (2)</button>
        </div>
    ]]></fragment>
</zk>
```

# Shadow Elements

In this example, we use `if` and `forEach` tags together for condition
and collection rendering.

```xml
<zk>
    <fragment viewModel="@id('vm') @init('org.zkoss.zktest.test2.F85_ZK_3681_Shadow_VM')"
        issues="@bind(vm.issues)"><![CDATA[
        <section>
            <h1>My Issue List</h1>
            <ul>
                <forEach items="@load(issues)">
                    <!-- There's a pre-defined variable "each" for convenience. -->
                    <li>
                        <!-- @bind(each) is wrong because each is just a temp variable in loops. -->
                        <input type="checkbox" checked="@load(each.isDone)" />
                        <if test="@load(each.isDone)">
                            <strike>[<span textContent="@load(each.id)"/>]
                            <span textContent="@load(each.description)"/></strike>
                        </if>
                        <!-- No else for now. -->
                        <if test="@load(!each.isDone)">
                            [<span textContent="@load(each.id)"/>]
                            <span textContent="@load(each.description)"/>
                        </if>
                    </li>
                </forEach>
            </ul>
        <section>
    ]]></fragment>
</zk>
```

- For further details, please refer to [Shadow
  components](http://books.zkoss.org/zkessentials-book/master/shadow_components/index.html)
  directly.

# Data Validation

## Server-side Property/Form Validation

To ensure data is correct and useful, we can leverage ZK's validators.

```xml
<zk>
    <fragment viewModel="@id('vm') @init('org.zkoss.fragment.demo.VM1')" validationMessages="@id('vmsgs')"
              prop1="@bind(vm.prop1) @validator(vm.validator1)"
              prop1err="@bind(vmsgs['prop1'])"><![CDATA[
        <input type="text" value="@bind(prop1)"/>
        <span textContent="@load(prop1err)"/>
    ]]></fragment>
</zk>
```

You can get the invalid message by assigning a self-defined key as an
alias. In order to access invalidate messages by HTML elements, you can
simply bind the messages onto Fragment properties.

Here we can use form-binding and form validators to validate all the
fields.

```xml
<zk>
    <fragment viewModel="@id('vm') @init('foo.BarVM')" validationMessages="@id('vmsgs')"
     form="@id('fx') @load(vm.currentUser) @save(vm.currentUser, before='submit') @validator('formBeanValidator', prefix='p_')"
     name="@bind(fx.name)" nameerror="@bind(vmsgs['p_name'])"><![CDATA[
     <input type="text" value="@bind(name)"/><span textContent="@load(nameerror)"/>
     <button onclick="@command('submit')">Submit</button>
    ]]></fragment>
</zk>
```

## Client-side Property Validation

This component also provides a new `@jsvalidator` running at client
side, accepting custom JavaScript functions for validation. The benefit
is that there is no need to send requests to the server for each
validation. However, since the validation logic will be exposed at
client side, some simple check, such as empty checking or range
checking, is recommended. The usage is like `@validator` but it is
effective only when applying HTML elements.

**@jsvalidator**

` syntax: @jsvalidator(validation_function_name)`

The following is the definition of custom JavaScript function.

`ValidationFunction(val, vmsgs)`  
`* val: The input data.`  
`* vmsgs: `  
`   The validation message holder object. You can add an invalidate message by adding a new property. `  
`   If you want to clear the specific message, assign an empty string to the property.`  
`* Returns: Boolean. True if the data is valid.`

You can use an implicit object (vmsgs) to get the client-side invalid
messages. The `@jsvalidator` has its own validation message holder not
shared with server-side.

```xml
<zk>
    <fragment viewModel="@id('vm') @init('foo.BarVM')" someprop="@bind(vm.prop1)"><![CDATA[
        <input type="text" value="@bind(someprop) @jsvalidator('validateExample')"/>
        <span textContent="@load(vmsgs['foo'])"/>
    ]]></fragment>
    <script type="text/javascript">
        function validateExample(val, vmsgs) {
            var isValid = someValidationProcess(val);
            vmsgs['foo'] = isValid ? '' : 'Invalid value';
            return isValid;
        }
    </script>
</zk>
```

## The Differences Between @validator and @jsvalidator

<div style="margin-left:auto;margin-right:auto;width:70%;">

| Catalogue                 | @validator                        | @jsvalidator             |
|---------------------------|-----------------------------------|--------------------------|
| Validate at               | Server side                       | Client side              |
| ZK form validation        | Supported                         | Not supported            |
| Validation message holder | Initialized in validationMessages | An implicit vmsgs object |

</div>

1.  `@validator` relies on the server, while `@jsvalidator` relies on
    the browser.
2.  `@jsvalidator` does not support form validation.
3.  The validation message holders are not the same.

For security concerns, we recommend you to use server-side `@validator`
in most cases and choose client-side `@jsvalidator` if the validation
needs an instant feedback such as password strength, number range, and
so on.

# Event Handling

The command of ViewModel can be invoked by attaching DOM events with
`@command` or `@global-command` on HTML elements. Once the DOM event is
triggered (i.g. clicked or changed), the command of ViewModel will be
executed and receive the corresponding event object.

You can get more details from the event object such as mouse cursor
position, pressed keys, entered text, and selected text.

| ZK Event object                                         | DOM event           |
|---------------------------------------------------------|---------------------|
| <javadoc>org.zkoss.zk.ui.event.MouseEvent</javadoc>     | onclick             |
|                                                         | oncontextmenu       |
|                                                         | ondblclick          |
|                                                         | onmousedown         |
|                                                         | onmouseenter        |
|                                                         | onmouseleave        |
|                                                         | onmouseover         |
|                                                         | onmouseout          |
|                                                         | onmouseup           |
|                                                         | ondrag              |
| <javadoc>org.zkoss.zk.ui.event.KeyEvent</javadoc>       | onkeydown           |
|                                                         | onkeypress          |
|                                                         | onkeyup             |
| <javadoc>org.zkoss.zk.ui.event.InputEvent</javadoc>     | onchange            |
|                                                         | oninput             |
| <javadoc>org.zkoss.zk.ui.event.CheckEvent</javadoc>     | onchange (checkbox) |
|                                                         | oninput (checkbox)  |
| <javadoc>org.zkoss.zk.ui.event.SelectionEvent</javadoc> | onselect            |
| <javadoc>org.zkoss.zk.ui.event.DropEvent</javadoc>      | ondrop              |
| <javadoc>org.zkoss.zk.ui.event.Event</javadoc>          | onblur              |
|                                                         | onfocus             |
|                                                         | onfocusin           |
|                                                         | onfocusout          |

- For further details about how to retrieve the event object, please
  refer to [Retrieve Event
  Object](http://books.zkoss.org/zk-mvvm-book/8.0/advanced/parameters.html#retrieve-event-object)
  directly.

# Properties

- **content**: specify the content of this component.
- **src**: specify the URI of an external content file. The file
  encoding is assumed to be UTF-8.
- **recoverId**: specify the recover ID.

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
<p><code>onRecover</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc></p>
<p>Represents an event sent back to the server caused by an offline
recovery.</p></td>
</tr>
</tbody>
</table>

# Supported Children

`None`

# Use Cases

| Version | Description                     | Example Location                                                                                                                   |
|---------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| 8.5+    | Data binding, Shadow elements   | [Client Binding with ZK MVVM for your eyes only](http://blog.zkoss.org/2016/11/15/client-binding-with-zk-mvvm-for-your-eyes-only/) |
| 8.5+    | Data validation, Event handling | [Advanced Usage of Fragment Component](https://www.zkoss.org/wiki/Small_Talks/2017/July/Advanced_Usage_of_Fragment_Component)      |

# Version History



| Version | Date       | Content                        |
|---------|------------|--------------------------------|
| 8.5     | 2017/09/21 | Add the new Fragment component |
|         |            |                                |


