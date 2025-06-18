

Before creating a new ZK theme, web designers need to understand its
directory structure, let's start off by discovering where the default
theme (a.k.a. breeze) is. Basically, the default theme is contained
inside three java archive files: zul.jar ([ZK CE](http://www.zkoss.org/product/edition.dsp)), zkex.jar ([ZK PE](http://www.zkoss.org/product/edition.dsp)) and zkmax.jar ([ZK EE](http://www.zkoss.org/product/edition.dsp)). **Note:** freshly or
evaluation versions will have a special suffix to indicate the zk
version and the build date. (e.g. zul-6.5.1.FL.20121204.jar).

As mentioned previously, a 'theme' is a collection of stylesheets and
associated images for ZK's component set. Stylesheets are the files with
an extension of ".css.dsp". Think of them as normal CSS files that could
utilize JSP taglib functionality. Associated images all have file
extension either of ".gif" or ".png".

In ZK EE, users will also have access to a tablet-enhanced theme in
zkmax.jar. In addition to the stylesheets and associated images, the
tablet-enhanced theme also contains a property file
(**default.theme-properties**) that could be used to easily customize
attributes such as font-sizes and color values.

Once those resources are extracted from the respective java archives
while preserving the original directory structure, they can become a
basis for a new theme, and be ready to be packaged inside a jar file.

The top-level subdirectories for this folder should look similar to the
figure below.

![]({{site.baseurl}}/zk_dev_ref/images/theme_skeleton.png)

# Create an Archive-based Theme

Creating an archive-based theme can be broken down into the following
steps.

1.  Create a theme project skeleton
2.  Modify the theme resources

## Create a theme project skeleton

The general idea is described in the introductory paragraph. Since
sapphire and silvertail [^1] are two official examples of archive-based
themes, web developers could simply clone the zkthemes[^2] project, and
use one of these themes as a starting point. Nonetheless, please note
that the two official standard themes are desktop-only themes. If you
also want to tailor the view for tablet-clients, you would need the
complete set of files that makes up the default theme.

Although manually collecting the files directly from the ZK library
files is possible, the process is tedious and error-prone. Hence, this
step should be performed using a tool such as the **ZK Default Theme
Extractor Utility (ztx.bat)**[^3].

Following are the steps:

1.  Download ZK library into a directory.  
    **Note:** ZK library can also be found inside an existing ZK
    project.
2.  Execute **ztx.bat** to extract the default theme into an archive

After a typical ztx session has been executed, an archive would be
generated that contains the exact replica of the default theme in the
folder structure required by ZK theming support. This generated archive
becomes the basis where the new theme could be derived.

`Since 7.0.0, we provide a maven-archetype that can easily create a ZK theme maven project, refer to the `[`blog`](http://blog.zkoss.org/index.php/2013/09/17/zk7-create-a-new-a-theme-project/)`.`

## Modify the theme resources

Now it is just a matter of modifying the relevant stylesheets and
importing associated image files.

Instead of creating a theme project from scratch, it is easier to use
one of the existing standard theme as a template.

Setting up the environment:

1.  Clone zkthemes [^4] from github, if haven't done so.
2.  Import Sapphire as an Existing Maven Project into Eclipse.
3.  Rename all the file names and folder names that contains the word
    *sapphire* to the theme name of your choice
4.  Unpack the generated archive to replace the content originally
    inside the folder **src/archive/web/sapphire**

Next, the new theme will need to be registered first before it could be
used by the ZK application. For archive-based themes, this is done by
providing an implementation of the
<javadoc type="interface">org.zkoss.zk.ui.util.WebAppInit</javadoc>
interface.

**`Note:`**` the registered name should match the folder name.`

For example, assume the custom theme is named **darkstar**,

```java
package foo;

public class DarkstarThemeWebAppInit implements WebAppInit {
    @Override
    public void init(WebApp webapp) throws Exception {
        Themes.register("darkstar");
        // Only ZK EE users could use tablet theme
        if ("EE".equals(WebApps.getEdition()) {
            Themes.register("tablet:darkstar");
        }    
    }
}
```

Also, make sure that **metainfo/zk/config.xml** contained the following
configuration.

```xml
<config>
...
    <listener>
        <listener-class>foo.DarkstarThemeWebInit</listner-class>
    </listener>
...
</config>
```

Now, the component style modifications shall begin. Please refer to this
[smalltalk](http://http://books.zkoss.org/index.php?title=Small_Talks/2013/January/Packaging_Themes_Inside_Folders_in_ZK_6.5.2)
for a more detailed example on doing this. Even though the smalltalk is
about folder-based themes, as far as modifying theme resources is
concerned, the procedure is the same.

Here would just summarize the steps.

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

```css
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
[article]({{site.baseurl}}/zk_dev_ref/theming_and_styling/understanding_the_theming_subsystem/switching_themes)

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

```java
Themes.register("tablet:dark");
```

In addition, the default tablet-enhanced theme has refactored many
attributes such as color values, font-sizes, border-widths, ... into a
property file in **~./zkmax/default.theme-properties**. Changing the
attribute values inside this property file could quickly alter the
appearance of the components without touching their stylesheets.
Nevertheless, developers may also combine these two approaches to suit
their needs.

After the new theme is developed, the theme project can be packaged as a
jar file for distribution, say **darkstar.jar**. This could be done by
executing the command **mvn clean package** at the project root.

# Use an Archive-based Theme

Using an archive-based theme in a ZK Application is simple. Simply put
the theme jar file inside the **WEB-INF/lib** folder of your ZK
application. During the startup of your application, the new custom
theme would be automatically registered, and available to use.

The process can be summarized as follows:

1.  Put the theme jar file inside **WEB-INF/lib** folder
2.  Ready to use

# References

<references/>

[^1]: ZK Themes [1](https://github.com/zkoss/zkthemes)

[^2]:

[^3]: ZK Default Theme Extractor Utility. Please download at
    [github](https://gist.github.com/raw/4334775/e5d669bb873443aa03f8febffccd3fc4b2518ecb/ztx.bat).

[^4]:
