**Syntax:**

<theme-provider-class>*`a_class_name`*</theme-provider-class>

`[Default: `*`none`*`]`

It specifies the class to provide the theme (aka., a style sheet file)
URI dynamically if you want to determine the theme based on the current
user, cookie or locale. You can implement a class with the
<javadoc type="interface">org.zkoss.zk.ui.util.ThemeProvider</javadoc>
interface, and specify it with the `theme-provider-class` element. Then,
an instance of the class will be created. It will be called each time
when a desktop is rendered to the client to determine the theme URI.

Notice that the theme provider is called with all theme URIs that shall
be generated (including what are specified in `theme-uri` and excluding
what are specified in `disable-theme-uri`). And, only the return
collection of URIs are actually generated. In other words, the theme
provider has the highest priority.

For more information, please refer to [ZK Developer's
Reference](ZK_Developer's_Reference/Theming_and_Styling/Theme_Providers).

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
