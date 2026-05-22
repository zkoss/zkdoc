
# Include Theme Jar

Before switching to a non-default theme, please ensure your application
**contains the corresponding theme jar** first. Using the default theme
doesn't require to include an extra jar file (it's bundled in ZK
framework jars).

Since 10, breeze is no longer supported, you can use `iceblue_c`, if you
migrate from an old theme:

```xml
<dependency>
    <groupId>org.zkoss.theme</groupId>
    <artifactId>iceblue_c</artifactId>
    <version>${zk.version}</version>
</dependency>
```

For example, since 8.6, the default theme is iceblue. If you want to use
**breeze**, you need to include its jar first:

```xml
<dependency>
    <groupId>org.zkoss.theme</groupId>
    <artifactId>breeze</artifactId>
    <version>${zk.version}</version>
</dependency>
```

Including a theme jar doesn't switch to that theme automatically. You
need to explicitly apply the theme mentioned in the following sections.

# Theme Resolution Priority

ZK determines(resolves) a theme in the following order:

1.  Cookies
2.  Library property
3.  Theme priority

# Apply a Theme for the Whole Application

Specify a theme name as a value. This will apply to the whole
application as a default theme.

**zk.xml**

```xml
<library-property>
    <name>org.zkoss.theme.preferred</name>
    <value>deepsea</value> <!-- no whitespace in theme names -->
</library-property>
```

Check the complete theme name of the theme pack at [ZK Developer's Reference/Theming and Styling/ZK Official Themes#All Theme Names of Theme
Pack]({{site.baseurl}}/zk_dev_ref/theming_and_styling/zk_official_themes#All_Theme_Names_of_Theme_Pack)

# Dynamically switching themes using Cookies

To provide different themes for different end users (sessions), you can
use cookies since it's stored in a browser.

```java
Themes.setTheme(Executions.getCurrent(), "custom");
Executions.sendRedirect("");
```

Internally, [org.zkoss.zul.theme.CookieThemeResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/theme/CookieThemeResolver.html)
provides this functionality.

# Dynamically Switching Themes Using Library Property

Library property is used to apply a preferred theme when the current
theme setting could not be obtained from Cookies. Notice that the
property change affects the whole application (all end users).

**Programmatically:**

```java
Library.setProperty("org.zkoss.theme.preferred", "custom");
Executions.sendRedirect("");
```

# Theme Priority

If the previous two options do not yield any result, the theme with the
highest priority would be applied. Theme priority is usually assigned
when registering a theme but could also be changed dynamically.

Please refer to [org.zkoss.zul.theme.Themes](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/theme/Themes.html) for its
family of register() methods.

# Customize the Theme Resolution Process

Web developers could also add other ways for setting the current theme
by writing a custom
[org.zkoss.web.theme.ThemeResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/theme/ThemeResolver.html).

The `ThemeResolver` interface defines two methods:

- **`getTheme(HttpServletRequest request)`** — Called by ZK on every request to determine which theme should be applied. Return the theme name that your logic resolves (e.g. from session, database, or a request parameter). If the returned name cannot be matched to a registered theme, ZK falls back according to its validation strategy.
- **`setTheme(HttpServletRequest request, HttpServletResponse response, String themeName)`** — Called when the user explicitly selects or changes a theme (e.g. via `Themes.setTheme()`). Use this method to persist the chosen theme name so that `getTheme()` can return it on subsequent requests.

ZK's built-in [org.zkoss.zul.theme.CookieThemeResolver](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/theme/CookieThemeResolver.html) is a good reference implementation: `setTheme()` writes the theme name to an HTTP cookie, and `getTheme()` reads it back from the cookie on the next request. You can study its source as a starting point for your own resolver.

If you would like to communicate theme name via session instead, you
would create a class like the following:

```java
package foo;

public class SessionThemeResolver implements ThemeResolver {
    @Override
    public String getTheme(HttpServletRequest request) {
        Session sess = request.getSession();
        if (sess != null) {
            return sess.getAttribute("mytheme");
        }
    }

    @Override
    public void setTheme(HttpServletRequest request, HttpServletResponse response, String themeName) {
        Session sess = request.getSession();
        if (sess != null) {
            sess.setAttribute("mytheme", themeName);
        }
    }
}
```

and configure the custom ThemeResolver in **WEB-INF/zk.xml**.

```xml
<zk>
    <desktop-config>
        <theme-resolver-class>foo.SessionThemeResolver</theme-resolver-class>
    </desktop-config>
</zk>
```

To access the current theme resolver, please refer to
[org.zkoss.web.fn.ThemeFns#getThemeResolver()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/fn/ThemeFns.html#getThemeResolver())
and
[org.zkoss.web.fn.ThemeFns#setThemeResolver(org.zkoss.web.theme.ThemeRegistry)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/fn/ThemeFns.html#setThemeResolver(org.zkoss.web.theme.ThemeRegistry)).
