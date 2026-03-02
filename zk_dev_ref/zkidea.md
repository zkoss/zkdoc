# ZK IntelliJ IDEA Plugin

The ZK IntelliJ IDEA Plugin is a dedicated tool designed to enhance the development experience for ZK applications within the IntelliJ IDEA environment. It provides robust features such as intelligent code completion, syntax validation, and seamless navigation, helping developers to write ZK applications more efficiently and with greater accuracy.

{% include zkidea-install-button.html %}

# Features

## ZUL File Support

{% include supported-since.html version="0.1.0" %}

The plugin offers comprehensive support for ZUL files, the core of ZK's UI definition.

*   **Code Completion:** Get intelligent suggestions for ZK components, attributes, and events as you type. This helps you write code faster and avoid typos.
    ![](/zk_dev_ref/images/tag_code_completion.png)
    ![](/zk_dev_ref/images/event_code_completion.png)
*   **Class Navigation:**
    {% include supported-since.html version="0.1.2" %}
    Quickly navigate from a component tag or a view model reference in your ZUL file directly to the corresponding Java class or method declaration in your project.
    ![](/zk_dev_ref/images/go_to_declaration.png)

## ZK Configuration File Support

The plugin provides content assistance and validation for ZK's XML configuration files. To enable these features, you should either use the default filenames (`zk.xml`, `lang-addon.xml`) or add the appropriate XML namespace to your custom-named files.

*   **`zk.xml` Support:**
    {% include supported-since.html version="0.4.0" %}
    Get code completion and validation for the ZK configuration file `zk.xml`. The namespace is `xmlns="http://www.zkoss.org/2005/zk/config"`.

![](/zk_dev_ref/images/zk_config_code_completion.png)
 

*   **`lang-addon.xml` Support:**
    {% include supported-since.html version="0.4.0" %}
    The plugin also supports the language addon configuration file, `lang-addon.xml`, with code completion and validate the required elements. The namespace is `xmlns="http://www.zkoss.org/2005/zk/lang-addon"`.
    ![lang-addon.xml code completion](/zk_dev_ref/images/lang_addon_code_completion.png)
    ![lang-addon.xml validate required elements](/zk_dev_ref/images/lang_addon_missing_required_element.png)

## MVVM Development Support

{% include supported-since.html version="0.1.2" %}

For developers using the MVVM (Model-View-ViewModel) pattern, the plugin provides code completion for ZK's MVVM annotations, such as `@init`, `@load`, `@bind`, `@save`, and `@command`.

![](/zk_dev_ref/images/annotation_code_completion.png)

### Data Binding Navigation
{% include supported-since.html version="0.6.0" %}

*   **Property Navigation**: Jump directly from property references in ZUL binding expressions (e.g., `@load(vm.name)`) to their corresponding Java getter methods in the ViewModel. It supports deep object hierarchies (e.g., `vm.user.name`).
*   **ViewModel ID Navigation**: Quickly navigate from a ViewModel identifier to the corresponding Java ViewModel class.
*   **Command Navigation**: Jump from `@command` or `@global-command` annotation arguments to the server-side methods annotated with `@Command` or `@GlobalCommand`.
*   **Template URI Navigation**: Navigate to static ZUL template file paths referenced within `@load` or `@init` expressions.

### Intelligent Completion
{% include supported-since.html version="0.6.0" %}

*   **ViewModel Property Completion**: Get smart suggestions for properties and methods based on the current ViewModel's type.
*   **Command Name Completion**: Offers a list of valid `@Command` and `@GlobalCommand` names defined in the active ViewModel.
*   **Scope Variable Completion**: Suggests available variables from different ZK scopes, including ViewModel IDs, template variables (e.g., `each`), and custom attributes.

## Live Templates Support

{% include supported-since.html version="0.7.0" %}

The ZK plugin now includes a dedicated "ZK" group of IntelliJ Live Templates to accelerate your development. These templates are available automatically upon plugin installation without requiring any manual setup.

### Essential Templates

The plugin provides several "shorthand" abbreviations to quickly generate boilerplate code:

*   **`ns` (ZK Namespace)**: Inserts the four common ZK namespace aliases (`native`, `client/attribute`, `client`, and `xhtml`) into a ZUL tag.
*   **`jspatch` (JS Widget Patch)**: Scaffolds a ZK client-side widget override with a version guard and a best-practice checklist for overriding `zk.override`.

### UI Component Scaffolding

Generate the basic structure of complex ZK components instantly:

*   **`grid`**: Inserts a Grid with two Columns and a sample Row.
*   **`listbox`**: Inserts a Listbox with two Listheaders and a sample Listitem.
*   **`tree`**: Inserts a Tree with two Treecols and a sample Treeitem.

### Runtime and Customization

Plugin-provided templates merge seamlessly with your existing IntelliJ templates. If you already have a "ZK" template group, the plugin's defaults will be added alongside your own. You can customize these templates or reset them to defaults via **Settings → Editor → Live Templates**.

## Maven Project Creation

{% include supported-since.html version="0.1.3" %}

You can create new ZK projects easily using the bundled ZK Maven archetypes. This helps you set up a new ZK project with the correct structure and dependencies quickly.

![](/zk_dev_ref/images/maven_archetype.png)

## Feedback Menu

{% include supported-since.html version="0.4.0" %}

A "ZK Feedback" menu is available under the "Help" menu in IntelliJ IDEA. This provides convenient links to customer support, documentation, and a bug reporting form.

![](/zk_dev_ref/images/zk_feedback_menu.png)
