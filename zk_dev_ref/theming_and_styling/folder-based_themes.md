

Before creating a new ZK theme, web designers need to understand its
directory structure, let's start off by discovering where the default
theme (a.k.a. breeze) is. Basically, the default theme is contained
inside three java archive files: zul.jar ([ZK
CE](http://www.zkoss.org/product/edition.dsp)), zkex.jar ([ZK
PE](http://www.zkoss.org/product/edition.dsp)) and zkmax.jar ([ZK
EE](http://www.zkoss.org/product/edition.dsp)). **Note:** freshly or
evaluation versions will have special suffix to indicate the zk version
and the build date. (e.g. zul-6.5.1.FL.20121204.jar).

As mentioned previously, a 'theme' is a collection of stylesheets and
associated images for ZK's component set. Stylesheets are the files with
extension of ".css.dsp". Think of them as normal CSS files that could
utilize JSP taglib functionality. Associated images all have file
extension either of ".gif" or ".png".

In ZK EE, users will also have access to tablet-enhanced theme in
zkmax.jar. In addition to the stylesheets and associated images, the
tablet-enhanced theme also contains a property file
(**default.theme-properties**) that could be used to easily customize
attributes such as font-sizes and color values.

Once those resources are extracted from the respective java archives
while preserving the original directory structure, they can be placed
inside a folder, and become a basis for a new theme.

The top level subdirectories for this folder should look similar to the
figure below.

![](images/theme_skeleton.png)

# Create a Folder-based Theme

Introduced in ZK 6.5.2, the embodiment of a theme can come from a
sub-folder under the web application's context root. Creating a
folder-based theme can be broken down into the following steps.

1.  Create a theme folder skeleton
2.  Modify the theme resources

## Create a theme folder skeleton

The general idea is described in the introductory paragraph. However, it
is tedious and error-prone to do this step manually. Hence, these steps
should be performed using a tool such as the **ZK Default Theme
Extractor Utility (ztx.bat)**[^1].

Following are the steps:

1.  Download ZK library into a directory.  
    **Note:** ZK library can also be found inside an existing ZK
    project.
2.  Execute **ztx.bat** to extract the default theme into an archive

After a typical ztx session has been executed, an archive would be
generated that contains the exact replica of the default theme in the
folder structure required by ZK theming support. This generated archive
becomes the basis where the new theme could be derived.

## Modify the theme resources

Now it is just a matter of modifying the relevant stylesheets and
importing associated image files.

Setting up the environment:

1.  Create a ZK Application Project [^2]
2.  Create a folder named **theme** under the root folder of the web
    content.
3.  Unpack the generated archive under the folder **theme**

Also, please make sure the ZK Application is configured to process
\*.css.dsp by the following configuration in **WEB-INF/web.xml**.

``` xml
<servlet>
    <servlet-name>dspLoader</servlet-name>
    <servlet-class>org.zkoss.web.servlet.dsp.InterpreterServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>dspLoader</servlet-name>
    <url-pattern>*.dsp</url-pattern>
</servlet-mapping>
```

Next, the new theme will need to be registered first before it could be
used by the ZK application. Since the origin of the new theme is from a
folder, ZK 6.5.2 extends the theme registration API for this purpose.
ThemeOrigin is an enum defined to specify the origin of the registered
theme. It has two valid values: JAR (default) and FOLDER. Since
ThemeOrigin.JAR is the default value, the extended theme registration
API is only needed in the case of folder-based themes. Theme
registration could be done in the initialization code of the view model.

**`Note:`**` the registered name should match the folder name.`

For example,

``` java
...
import org.zkoss.zul.theme.Themes;
import org.zkoss.web.theme.StandardTheme.ThemeOrigin;
...
public class MainViewModel {
    ...
    @Init
    public void init() {
        ...
        Themes.register("dark", ThemeOrigin.FOLDER);
        ... 
    }
    ...
}
```

Now, the component style modifications shall begin. Please refer to this
[
smalltalk](Small_Talks/2013/January/Packaging_Themes_Inside_Folders_in_ZK_6.5.2)
for a more detailed example on doing this. Here would just summarize the
steps.

General steps for component style modification:

1.  Locate the stylesheet for a given component
2.  Modify existing images or add new images as needed
3.  Customize the component style by tweaking the stylesheet located in
    step 1

If a component style rule needs to refer to images within the theme
folder, please use the zk core taglib function **encodeThemeURL** for
path resolution. For example, to refer to
**zul/img/input/combo-btn.png** under the **dark** theme folder, use the
following syntax.

``` css
<%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>
...
.z-combobox {
    background-image: url(${c:encodeThemeURL('~./zul/img/input/combo-btn.png')});
}
```

Note: The special prefix **~./** will be interpreted as the theme folder
root (e.g. /theme/dark/).

After all this has been done, the components should have their views
customized. Please refer to this
[article](http://books.zkoss.org/wiki/ZK_Developer%27s_Reference/Theming_and_Styling/Understanding_the_Theming_Subsystem/Switching_Themes)

</ref>

for how to switch themes dynamically within the ZK application.

Developers could also follow the same process described above to tailor
the appearance of ZK components when viewed on tablets. When locating
the stylesheets to modify, look inside the **~./zkmax/css/tablet**
folder instead.

For ZK EE users, custom themes could support styling for desktop-only,
tablet-only, or both. Web application needs to know about the platforms
a custom theme may support. This is also accomplished through theme
registration. When a custom theme overrides the default tablet theme,
its theme name must be prefixed with **"tablet:"'' before making
registration. For example, to notify the web application that**dark'''
theme is tablet-capable, please use the following code snippet.

``` java
Themes.register("tablet:dark", ThemeOrigin.FOLDER);
```

In addition, the default tablet-enhanced theme has refactored many
attributes such as color values, font-sizes, border-widths, ... into a
property file in **~./zkmax/default.theme-properties**. Changing the
attribute values inside this property file could quickly alter the
appearance of the components without touching their stylesheets.
Nevertheless, developers may also combine these two approaches to suit
their needs.

After the new theme is developed, the entire theme folder can be
exported as a zip file for distribution, say **dark.zip**.

# Use a Folder-based Theme

Using a folder-based theme in a ZK Application is simple and versatile.
Simply adopt the same environment as the one for developing a new
folder-based theme. Furthermore, the ZK Application must be informed of
the existence of the newly installed theme.

The process can be summarized as follows:

1.  Create a theme root folder
2.  Install the folder-based theme
3.  Register the folder-based theme

Let's walk through an example of using the folder-based theme
**dark.zip** in another ZK application

## Create a theme root folder

Theme root folder is where a ZK Application stores all its folder-based
themes. By default, this folder is assumed to be named 'theme' and is
directly under the application's root directory for its web content.
This default location can be changed via the library property
**org.zkoss.theme.folder.root**. For example, to move the theme root
folder to **/view/themes**, the web developer would make the following
configuration setting in **WEB-INF/zk.xml**. Please note that the value
for the theme root folder cannot have leading and trailing forward
slashes.

``` xml
<library-property>
    <name>org.zkoss.theme.folder.root</name>
    <value>view/themes</value>
</library-property>
```

## Install the folder-based theme

Suppose the theme root folder is changed to **/view/themes** through the
configuration setting and that directory has been created. Simply
extract the theme folder under this directory would finish this step.
Since the name of the theme folder is also the name of the theme,
renaming the theme folder would also rename the theme. For instance, to
change the theme name from **dark** to **darkstar**, one would rename
the folder accordingly.

## Register the folder-based theme

Before the folder-based theme can be used, it must be registered first.
The relevant code is as follows.

``` java
Themes.register("darkstar", ThemeOrigin.FOLDER);
// For ZK EE, also make customized tablet theme available
if ("EE".equals(WebApps.getEdition()))
    Themes.register("tablet:darkstar", ThemeOrigin.FOLDER);
```

This code fragment can be written in several places. For an example
incorporating MVVM, please refer to the section [Modify the theme
resource](#Modify_the_theme_resources). To make the
folder-based theme available at application startup, write a class
implementing the
[WebAppInit](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/WebAppInit.html)
interface and place the above code inside the init() function.

``` java
public class DarkstarThemeWebAppInit implements WebAppInit {
    public void init(WebApp webapp) throws Exception {
        Themes.register("darkstar", ThemeOrigin.FOLDER);
        // For ZK EE, also make customized tablet theme available
        if ("EE".equals(WebApps.getEdition()))
            Themes.register("tablet:darkstar", ThemeOrigin.FOLDER);
    }
}
```

The configuration file **WEB-INF/zk.xml** must also include the
following configuration item.

``` xml
<listener>
    <listener-class>DarkstarThemeWebAppInit</listener-class>
</listener>
<library-property>
    <name>org.zkoss.theme.preferred</name>
    <value>darkstar</value>
</library-property>
```

# References

<references/>

[^1]: ZK Default Theme Extractor Utility. Please download at
    [github](https://gist.github.com/raw/4334775/e5d669bb873443aa03f8febffccd3fc4b2518ecb/ztx.bat).

[^2]: Please refer to [ZK Installation
    Guide](http://books.zkoss.org/wiki/ZK_Installation_Guide)
