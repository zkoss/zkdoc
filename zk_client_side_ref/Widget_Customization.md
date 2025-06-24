# Override Widget's Default Behavior

There are many ways to override the default behavior of widgets or even
ZK Client Engine. JavaScript is a dynamic language and you could
override almost any methods you want.

## Override a Widget Method

This way overrides a particular widget. So, it only overrides the
widget's methods you specified and does not affect other widgets on the
same page. For example, suppose you want to change a label's CSS style
when its value is changed, then you can write the code as follows:

```xml
<zk xmlns:w="http://www.zkoss.org/2005/zk/client">
      <label>
            <attribute w:name="setValue">
            function (value) {
                  this.$setValue(value); //call the original method
                  if (this.desktop) {
                        this._flag = !this._flag;
                        this.setStyle('background:'+(this._flag ? 'red':'green'));
                  }
            }
            </attribute>
      </label>
</zk>
```

where

- We specify [client namespace](ZUML_Reference/ZUML/Namespaces/Client) to the
  `setValue` attribute to indicate the method to override

- The content of the attribute is a complete function definition of the
  method, including `function ()`

- You can access the widget by `this` in the function

- You can access the original method by `this.$xxx`, where xxx is the
  method name being overridden. If the method doesn't exist, it is null.

- To retrieve another widget, use `this.$f('anotherWidgetId')` or other
  methods as described in the previous section

- You can specify EL expressions in the content of the attribute, such
  as

```xml
<label w:setValue='function (value) { this.$setValue(value + "${whatever}")}' />
```

Notice that EL expressions are evaluated at the server-side before
sending back to the client. Thus, you can use any Java class or
variables in EL expressions.

## Override a Widget in Java

In addition to ZUML, you can override a Widget's **method** or **field**
by the use of
[org.zkoss.zk.ui.Component#setWidgetOverride(java.lang.String, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Component.html#setWidgetOverride(java.lang.String, java.lang.String))
at the server. For example,

```java
myLabel.setWidgetOverride("setValue",
    "function (value) {this.$setValue('overloaded setValue');}");
```

## Override a Default Widget Method in zul

In the previous section, we showed you how to override the method of a
particular widget. If you want to modify the behavior of all instances
of a widget class, you have to override the method in `prototype` (For
more information about JavaScript's prototype, please refer to [Using Prototype Property in JavaScript](http://www.packtpub.com/article/using-prototype-property-in-javascript)
and [JavaScript prototype Property](http://www.w3schools.com/jsref/jsref_prototype_math.asp)).

For example,

```xml
<window xmlns:w="http://www.zkoss.org/2005/zk/client">
    <label id="labelone" value="label one"/>
    <label id="labeltwo" value="label two"/>
    <script defer="true">
        var oldSV = zul.wgt.Label.prototype.setValue;
        zul.wgt.Label.prototype.setValue = function (){
            arguments[0]="modified prototype"+arguments[0];
            oldSV.apply(this, arguments);
        }                   
    </script>
    <button label="change" onClick="labelone.setValue((new Date()).toString());
    labeltwo.setValue((new Date()).toString());"/>
</window>
```

Where we assign a new method to `zul.wgt.Label.prototype.setValue`.
Since it is `prototype`, the `setValue()` of all instances are
overriden.

## Override a Default Widget Method in JavaScript File

It's easy to include an overridden js in multiple zul files. Here is a
sample:

```js
zk.afterLoad('zul.inp', function() { //specify zk widget package name
    var exWidget = {};
    zk.override(zul.inp.ComboWidget.prototype, exWidget, { //specify zk full widget name
        doClick_: function(e){
            exWidget.doClick_.apply(this, arguments); //call the original widget's overridden function
            //implement your custom logic
        },
    });

});
```

- Line 1: this line will run `zk.override()` after the `zul.inp` widgets
  are loaded, so you don't need to take care this overridden script's
  loading order. You can include such JavaScript in any place of a zul.

## Override a Widget Field

You can override a method or a field no matter it exists or not. For
example, you can use this feature to pass an application-specific data
to a widget, such as

```xml
<label value="hello" w:myOption="'${param.enabled}'"/>
```

Notice that the content of the attribute must be a valid JavaScript
snippet. To specify a string (as shown above), you have to enclose it
with ' or " if you want to pass a string. It also means you can pass
anything, such as `new Date()`.

# Specify Your Own Widget Class

You could specify your own implementation instead of the default widget
class (at the client) as follows.

```xml
<zk xmlns:w="http://www.zkoss.org/2005/zk/client">
  ...
  <button w:use="foo.MyButton"/>
</zk>
```

where `foo.MyButton` is a widget you implement. For example,

```javascript
zk.$package("foo");
zk.afterLoad("zul.wgt", function () {
  foo.MyButton = zk.$extends(zul.wgt.Button, {
    setLabel: function (label) {
      this.$supers("setLabel", arguments);
     //do whatever you want
    }
  });
});
```

Notice that
<javadoc directory="jsdoc" method="afterLoad(_global_.String, _global_.Function)">\_global\_.zk</javadoc>
is used to defer the declaration of `foo.MyButton` until `zul.wgt` has
been loaded.

# Load JavaScript Files for Overriding Widgets

If you put your overridden js code in a separate file, you need to
include it to take effect on widgets.

## Page Scope

If you just want to override widgets on some pages, you can use one of
the following:

- \[\[{{site.baseurl}}/zk_component_ref/essential_components/script\|
  <script>

  component\]\]
- HTML <code>
  <script>

  </code>
- \[\[ZUML Reference/ZUML/Processing Instructions/script\|
  <?script ?>

  directive\]\]

## Application Scope

To override all widgets in the whole application, you need to include
the js file in every page with:

- [<embed> in zk.xml]({{site.baseurl}}/zk_config_ref/the_device_config_element/the_embed_element)
- [{{site.baseurl}}/zk_client_side_ref/language_definition/javascript]({{site.baseurl}}/zk_client_side_ref/language_definition/javascript)

# The Client-Attribute Namespace

You can specify additional **DOM attributes** that are not generated by
ZK widgets with [client-attribute namespace](ZUML_Reference/ZUML/Namespaces/Client_Attribute)
([`http://www.zkoss.org/2005/zk/client/attribute`](http://www.zkoss.org/2005/zk/client/attribute).
shortcut, `client/attribute`). In other words, whatever attributes you
specify with the client-attribute namespace will be generated directly
to the browser's DOM tree. Whether it is meaningful, it is really up to
the browser -- ZK does not handle or filter it at all.

For example, you want to listen to the `onload` event, and then you can
do as follows. Fore more information, please refer to [ZK Component Reference: iframe]({{site.baseurl}}/zk_component_ref/essential_components/iframe#onload).

```xml
<iframe src="http://www.google.com"  height="300px"
  xmlns:ca="client/attribute" ca:onload="do_whater_you_want()"/>
```

```xml
<zk xmlns:ca="client/attribute">
    HTML 5 spell check enabled:
    <textbox ca:spellcheck="true"/>
</zk>
```

If the attribute contains colon or other special characters, you can use
the `attribute` element as follows:

```xml
<div xmlns:ca="client/attribute">
  <attribute ca:name="ns:whatever">
  whatever_value_you_want
  </attribute>
</div>
```

The other use of the client-attribute namespace is to specify attributes
that are available only to certain browsers, such as accessibility and
[Section 508](http://www.section508.gov/index.cfm?FuseAction=Content&ID=12#Web).


