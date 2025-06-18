

This section describes what a language definition and addon are. It is
required for component development. However, you could skip it if you
won't develop components. For more information about component
development, please refer to [ZK Component Development Essentials](ZK_Component_Development_Essentials).

If you would like to change the default configuration of a ZK
application, please refer to [ZK Developer's Reference: Packing Code]({{site.baseurl}}/zk_dev_ref/customization/packing_code).

# Language Definition

A language definition defines a component set (aka., a language). For
example, [ZUL](ZUML_Reference/ZUML/Languages/ZUL) and
[XHTML](ZUML_Reference/ZUML/Languages/XHTML) are two
component sets.

To define a language definition, you have to prepare a file called
`/metainfo/zk/lang.xml` and make it available to the classpath (such as
in a JAR file, or in WEB-INF/classes of a Web application). In addition,
you could specify them in
[/metainfo/zk/config.xml]({{site.baseurl}}/zk_config_ref/jar_file's_config.xml/the_language-config_element)
in the classpath. (parsed by org.zkoss.zk.ui.metainfo.DefinitionLoaders)

# Language Addon

A language addon serves to extend a language definition within the ZK
framework. You can include a language addon using any of the following
methods:

## Path Convention Loading

- **In a web application (WAR):** Ensure that the file is named
  **lang-addon.xml**. Put the file at

`/WEB-INF/classes/metainfo/zk/lang-addon.xml`.

This location makes the file accessible to the classpath.

- **In a jar file:** Put the file at

`mymodule.jar/metainfo/zk/lang-addon.xml`.

## zk.xml

Specify the file path using the `<language-config>` element in
**zk.xml**. This method allows you to use any file name for the
configuration file. Learn more about this configuration at
[\<language-config\> in zk.xml]({{site.baseurl}}/zk_config_ref/the_language-config_element).

## config.xml

For JAR files, specify the file path in the configuration file located
at `/metainfo/zk/config.xml`. This approach is useful when the
configuration file needs to be included in the classpath. Further
details can be found at
[/metainfo/zk/config.xml]({{site.baseurl}}/zk_config_ref/jar_file's_config.xml/the_language-config_element).

These methods provide flexible options for integrating language addons,
ensuring they are properly recognized and utilized by the ZK framework.

When ZK starts, it will parse all language definitions and then all
language add-ons based on their
[dependency]({{site.baseurl}}/zk_client_side_ref/language_definition/depends).
A language addon is a variant of a language definition. They are almost
the same, except for the naming and it must specify the
[<addon-name>]({{site.baseurl}}/zk_client_side_ref/language_definition/addon-name).

{% include DoctypeDisallowed.md %}