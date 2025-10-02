# ZK IntelliJ IDEA Plugin

The ZK IntelliJ IDEA Plugin is a dedicated tool designed to enhance the development experience for ZK applications within the IntelliJ IDEA environment. It provides robust features such as intelligent code completion, syntax validation, and seamless navigation, helping developers to write ZK applications more efficiently and with greater accuracy.

{% include zkidea-install-button.html %}

## Features

### ZUL File Support

{% include supported-since.html version="0.1.0" %}

The plugin offers comprehensive support for ZUL files, the core of ZK's UI definition.

*   **Code Completion:** Get intelligent suggestions for ZK components, attributes, and events as you type. This helps you write code faster and avoid typos.
    ![Code completion for ZK components in a ZUL file.]()
*   **Syntax Validation:** The plugin validates the ZUL syntax in real-time, highlighting errors and potential issues directly in the editor.
    ![Syntax error highlighting in a ZUL file.]()
*   **Class Navigation:**
    {% include supported-since.html version="0.1.2" %}
    Quickly navigate from a component tag or a view model reference in your ZUL file directly to the corresponding Java class or method declaration in your project.
    ![Navigation from a ZUL file to a Java class.]()

### ZK Configuration File Support

The plugin provides content assistance and validation for ZK's XML configuration files. To enable these features, you should either use the default filenames (`zk.xml`, `lang-addon.xml`) or add the appropriate XML namespace to your custom-named files.

*   **`zk.xml` Support:**
    {% include supported-since.html version="0.4.0" %}
    Get code completion and validation for the ZK configuration file `zk.xml`. The namespace is `xmlns="http://www.zkoss.org/2005/zk/config"`.
    ![Code completion in zk.xml file.]()

*   **`lang-addon.xml` Support:**
    {% include supported-since.html version="0.4.0" %}
    The plugin also supports the language addon configuration file, `lang-addon.xml`, with content assist and validation. The namespace is `xmlns="http://www.zkoss.org/2005/zk/lang-addon"`.
    ![Validation in lang-addon.xml file.]()

### MVVM Development Support

{% include supported-since.html version="0.1.2" %}

For developers using the MVVM (Model-View-ViewModel) pattern, the plugin provides code completion for ZK's MVVM annotations, such as `@init`, `@load`, `@bind`, `@save`, and `@command`.

![MVVM annotation code completion in a Java class.]()

### Project Creation

{% include supported-since.html version="0.1.3" %}

You can create new ZK projects easily using the bundled ZK Maven archetypes. This helps you set up a new ZK project with the correct structure and dependencies quickly.

![ZK Maven archetype selection during project creation.]()

### Feedback Menu

{% include supported-since.html version="0.4.0" %}

A "ZK Feedback" menu is available under the "Help" menu in IntelliJ IDEA. This provides convenient links to customer support, documentation, and a bug reporting form.

![The ZK Feedback menu under the Help menu.]()
