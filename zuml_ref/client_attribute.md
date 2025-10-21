---
title: "Client Attribute"
---

* Name: client attribute  
* Namespace URI: http://www.zkoss.org/2005/zk/client/attribute
* Namespace shortcut: client/attribute  
* JavaDoc: [org.zkoss.zk.ui.metainfo.LanguageDefinition#CLIENT_ATTRIBUTE_NAMESPACE](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/metainfo/LanguageDefinition.html#CLIENT_ATTRIBUTE_NAMESPACE)

It is the reserved namespace for specifying client-side DOM attributes.
Unlike the client namespace, which assigns something to widgets, the
client/attribute namespace assigns additional DOM attributes to the DOM
tree directly at the client.

> ------------------------------------------------------------------------
>
> Notice that if the widget's DOM output
> ([zk.Widget#redraw(_global_.Array)](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html#redraw(_global_.Array)))
> also has the same DOM attribute, both of them will be generated and it
> is technically not legal. Thus, you should prevent the DOM attributes
> that widget might output.

For example, suppose you want to listen to the `onload` event, you can
do as follows. For more information, please refer to [ZK Component Reference: iframe]({{site.baseurl}}/zk_component_ref/iframe#onload).

```xml
<iframe src="http://www.google.com"  height="300px"
  xmlns:ca="client/attribute"
  ca:onload="do_whater_you_want()"/>
```

If the attribute contains colon or other special characters, you can use
the `attribute` element as follows.

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

# Binding to client attribute from MVVM view model

Client-attributes are added to the rendering information of components and must follow the same rules as the special attributes.

The client attribute must be initialized using the EL expression e.g. `${value}`,
and doesn't support data binding syntax, e.g. `@init`, `@load` or `@bind`.

```xml
<!-- "forEach" versus children binding  -->
<div xmlns:ca="client/attribute">
    <!-- correct use for non-dynamic attribute values -->
    <checkbox ca:attribute="${vm.value}" />
    <!-- binding a referenced value or dynamic value by recreating content after triggering a binding using shadow element apply -->
    <apply refvalue="@load(vm.value)">
        <!-- apply content is recreated when the binding expression "vm.value" is notified -->
        <!-- using ${value} is correct, since expression is re-evaluated once the apply content is recreated -->
        <checkbox ca:attribute="${refvalue}" />
    </apply>
</div>
```

# Data-Attribute Handler

Developers can define their own data-handler for the client attribute to
have an extra functionality. For example, (jQuery's mask)

**Zul File:**

```xml
<textbox xmlns:ca="client/attribute" ca:data-mask="00:00:00" onChange='Clients.log(self.value)'/>
```

**zk.xml:**

```xml
<client-config> 
    <data-handler>
        <name>mask</name><!-- the attribute name, i.e. data-mask -->
        <script src="http://igorescobar.github.io/jQuery-Mask-Plugin/js/jquery.mask.min.js" />
        <script>
        function (wgt, dataValue) {
            jq(wgt.$n()).mask(dataValue);

            // unformat after onChange event.
            wgt.listen({onChange: function (event) {
                event.data.value = jq(this.$n()).cleanVal();
            }});
        }
        </script>
    </data-handler>
</client-config>
```

## Syntax Definition

- `data-handler` (required, one or more)
  - Defines a data-attribute handler.

  Children:
  - `name` (required)
    - The attribute name (example: `mask` → `data-mask`).
  - `override` (optional)
    - Boolean. If `true`, this handler overrides an existing one.
  - `link` (optional, one or more)
    - URL(s) for extra CSS files to include.
  - `script` (required, one or more)
    - Script content or references. Scripts are executed in the provided order.
    - Use `<script src="...">` to include an external JS file (can be a context-path or class-path URL). Example: `<script src="~./myscript.js" />`.
    - The last `script` entry must contain the data-handler implementation (the handler function).

Notes:
- Scripts are applied in order; include libraries first and the handler implementation last.
- `data-handler` can be declared multiple times to register multiple handlers.
- The handler function receives `(wgt, dataValue)` (widget and attribute value) as parameters and may attach listeners or transform `event.data.value` as needed.


To see more examples, please refer to [ZK8: Simple but Powerful; Using Data-handler API to Work with Front-End Technologies](http://blog.zkoss.org/index.php/2015/08/25/zk8-simple-but-powerful-using-data-handler-api-to-work-with-front-end-technologies/)
and [Github](https://github.com/zkoss/zk8-datahandler). You can design
your own data-attribute handler and contribute this project.


# Version History

| Version | Date      | Content                                                                           |
|---------|-----------|-----------------------------------------------------------------------------------|
| 5.0.3   | July 2010 | The client-attribute namespace was introduced.                                    |
| 8.0.0   | May 2015  | [Support client data attributes handler](http://tracker.zkoss.org/browse/ZK-2730) |
