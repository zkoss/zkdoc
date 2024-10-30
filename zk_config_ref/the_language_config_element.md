**Syntax:**

<language-config>  
`    `<addon-uri>a_uri</addon-uri>  
`    `<language-uri>`''a_uri`</language-uri>  
</language-config>

`[Optional]`

It specifies the additional [language addons and/or
definitions](ZK_Client-side_Reference/Language_Definition).

The use is the same as [ZK Configuration Reference/zk.xml/The
language-config
Element](ZK_Configuration_Reference/zk.xml/The_language-config_Element),
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
