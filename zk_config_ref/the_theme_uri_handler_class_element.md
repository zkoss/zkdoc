**Syntax:**

<theme-uri-handler-class>a_class_name</theme-uri-handler-class>

`[Default: `none`]`

It specifies the class to provide the theme (aka., a style sheet file)
URI dynamically if you want to determine the theme based on the current
user, cookie or locale. You can implement a class with the
[org.zkoss.zk.ui.util.ThemeURIHandler](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ThemeURIHandler.html)
interface, and specify it with the `theme-uri-handler-class` element.
Then, an instance of the class will be created. It will be called each
time when a desktop is rendered to the client to determine the theme URI
before ThemeProvider.

Different from ThemeProvider, ThemeURIHandler is composable with other
ThemeURIHandler.

Note: ThemeProvider still has the final decision. ThemeURIHandler will
always be executed.


