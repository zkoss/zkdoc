Before using a theme, it must be registered so that the system knows
about its existence and where to retrieve its resources (from a jar file
or from a folder). [org.zkoss.zul.theme.Themes](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/theme/Themes.html)
provides several static methods for registering your themes.

Registration, in its simplest form, is to tell the web application about
the name of the theme. It will be assumed that the theme is for desktop
only, and its resources should be retrieved from a jar file. For
example,

```java
Themes.register("custom");
```

Starting from ZK 6.5.2, theme resources could also be retrieved from a
folder. To indicate that a theme is folder-based, please use
[org.zkoss.web.theme.StandardTheme.ThemeOrigin](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/theme/StandardTheme/ThemeOrigin.html) to
specify the origin of the theme resources, like below.

```java
Themes.register("custom", ThemeOrigin.FOLDER);
```

In ZK EE 6.5.0+, components would appear differently when viewed on
tablet devices. A custom theme could be applicable to desktop only,
tablet only, or both. To signify that a theme also serves tablet
devices, please attach a **"tablet:"** prefix in front of the theme name
when registering. For example,

```java
Themes.register("tablet:custom");
```

## Creating a Custom Theme Registration Service

[org.zkoss.web.theme.ThemeRegistry](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/theme/ThemeRegistry.html) defines the
interface to create a repository of themes available to the web
application. [org.zkoss.zul.theme.DesktopThemeRegistry](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/theme/DesktopThemeRegistry.html)
(for ZK CE/PE) and
[org.zkoss.zkmax.theme.ResponsiveThemeRegistry](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/theme/ResponsiveThemeRegistry.html) (for ZK
EE) are the standard implementations that actually store the registered
themes.

Standard theme registries would accept all theme registrations.
Duplicate registration would update theme information. Registered themes
are available to all users. (For ZK EE, desktop clients would only have
desktop themes available, and tablet clients would only have tablet
themes available.) If you would like to modify any of these behaviors,
please provide a custom ThemeRegistry.

For example, a custom ThemeRegistry could be created by implementing
[org.zkoss.web.theme.ThemeRegistry](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/theme/ThemeRegistry.html) interface directly,
or extending one of the standard implementations, depending on the ZK
edition you are using.

```java
package foo;

public class CustomThemeRegistry implements ThemeRegistry {
    ...
}
```

And then, configure the custom ThemeRegistry in **WEB-INF/zk.xml**.

```xml
<zk>
    <desktop-config>
        <theme-registry-class>foo.CustomThemeRegistry</theme-registry-class>
    </desktop-config>
</zk>
```

To access the current theme registry, please refer to
[org.zkoss.web.fn.ThemeFns#getThemeRegistry()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/fn/ThemeFns.html#getThemeRegistry())
and
[org.zkoss.web.fn.ThemeFns#setThemeRegistry(org.zkoss.web.theme.ThemeRegistry)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/fn/ThemeFns.html#setThemeRegistry(org.zkoss.web.theme.ThemeRegistry)).
