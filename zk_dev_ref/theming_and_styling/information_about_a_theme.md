---
title: "Information about a Theme"
---

Apart from having a name, a theme could be associated with many
attributes. Encapsulating theme-specific attributes is defined in
[org.zkoss.web.theme.Theme](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/theme/Theme.html). Each theme should have at
least a name, which helps the web application to identify it. Web
developers should extend this abstract class to define other attributes
associated with concrete themes, such as file paths included in a theme,
or variables that could be used to parameterize a theme.

Standard themes have additional attributes like a more descriptive name
for displaying purposes, a priority value to help the system choose the
theme to use, and an origin of the theme's resources (i.e. CSS and image
files). Standard theme information is provided by
[org.zkoss.web.theme.StandardTheme](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/theme/StandardTheme.html).

## Example

```java
import org.zkoss.web.theme.Theme;

public class MyTheme extends Theme {
    // theme-specific attributes
    ...
    // getters/setters
    ...
}
```
