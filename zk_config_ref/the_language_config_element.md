**Syntax:**

<language-config>  
`    `<addon-uri>a_uri</addon-uri>  
`    `<language-uri>`''a_uri`</language-uri>  
</language-config>

`[Optional]`

It specifies the additional [language addons and/or definitions]({{site.baseurl}}/zk_client_side_ref/language_definition).

The use is the same as [ZK Configuration Reference/The language-config Element]({{site.baseurl}}/zk_config_ref/the_language_config_element),
except it is specified in a JAR file's `config.xml` rather than
`WEB-INF/zk.xml`.

Notice that the URI is related to the class path, such as
`/metainfo/zk/lang-fb.xml`. In addition, `/metainfo/zk/lang.xml` and
`/metainfo/zk/lang-addon.xml` are always loaded, no matter if this
element is specified in `config.xml`.

Since `config.xml` is parsed before a Web application has been
initialized, you could specify the URI related to the resources of a Web
application.

# Version History

| Version | Date     | Content                                                  |
|---------|----------|----------------------------------------------------------|
| 5.0.7   | May 2011 | The language-config element was allowed in `config.xml`. |
