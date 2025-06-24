`Name: client attribute`  
`Namespace: `[`http://www.zkoss.org/2005/zk/client/attribute`](http://www.zkoss.org/2005/zk/client/attribute)  
`Namespace shortcut: client/attribute`  
`Java: `[`org.zkoss.zk.ui.metainfo.LanguageDefinition`#CLIENT_ATTRIBUTE_NAMESPACE](https://www.zkoss.org/javadoc/latest/zk/`org/zkoss/zk/ui/metainfo/LanguageDefinition`.html#CLIENT_ATTRIBUTE_NAMESPACE)

It is the reserved namespace for specifying client-side DOM attributes.
Unlike the client namespace, which assigns something to widgets, the
client/attribute namespace assigns additional DOM attributes to the DOM
tree directly at the client.

> ------------------------------------------------------------------------
>
> Notice that if the widget's DOM output
> (<javadoc directory="jsdoc" method="redraw(_global_.Array)">zk.Widget</javadoc>)
> also has the same DOM attribute, both of them will be generated and it
> is technically not legal. Thus, you should prevent the DOM attributes
> that widget might output.

For example, suppose you want to listen to the `onload` event, you can
do as follows[^1].

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

## Binding to client attribute from MVVM view model

Client-attributes are added to the rendering information of components,
and must be follow the same rules as the special attributes.

The client attribute must be initialized using the \`\${value}\` syntax,
and doesn't support \`@init\`, \`@load\` or \`@bind\`.

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

## Data-Attribute Handler

Developer can define their own data-handler for the client attribute to
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

### Syntax Definition

- **\<data-handler\>**: a group of a data-attribute handler [^2] [^3]
  - **\<name\>**: the attribute name. (i.e. data-name) [^4]
  - **\<override\>**: true means the handler is used to override another
    existing one. [^5]
  - **\<link\>**: the url for extra CSS files [^6][^7]
  - **\<script\>** the script content [^8] [^9]
    - **\<script src="foo.js"\>** the src attribute for the script
      (Javascript library or data-handler script), it can be a url of a
      JS script from context-path or a url from class-path. For example,
          <script-uri>~./myscript</script-uri>
    - Notice that the last <code>
      <script>

      </code> tag should be your data-handler script.

To see more examples, please refer to [ZK8: Simple but Powerful; Using Data-handler API to Work with Front-End Technologies](http://blog.zkoss.org/index.php/2015/08/25/zk8-simple-but-powerful-using-data-handler-api-to-work-with-front-end-technologies/)
and [Github](https://github.com/zkoss/zk8-datahandler) (you can design
your own data-attribute handler and contribute this project).

> ------------------------------------------------------------------------
>
> <references/>

# Version History

| Version | Date      | Content                                                                           |
|---------|-----------|-----------------------------------------------------------------------------------|
| 5.0.3   | July 2010 | The client-attribute namespace was introduced.                                    |
| 8.0.0   | May 2015  | [Support client data attributes handler](http://tracker.zkoss.org/browse/ZK-2730) |

[^1]: For more information, please refer to [ZK Component Reference: iframe]({{site.baseurl}}/zk_component_ref/essential_components/iframe#onload).

[^2]: Required

[^3]: One or Many

[^4]:

[^5]: Optional

[^6]:

[^7]:

[^8]: Required

[^9]: One or Many
