

# ThemeProvider

After switching to another theme, a
[org.zkoss.zk.ui.util.ThemeProvider](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ThemeProvider.html)
allows you the full control of CSS styling, including but not limited to

- Switch among multiple sets of stylesheets based on, say, the user's
  preference, cookie, locale, or others
- Replace the CSS styling of component(s) with your own custom styling
- Inject additional CSS files

Standard implementations of ThemeProvider are available for each of ZK
editions (CE, PE, and EE).

| Edition | ThemeProvider                                                                                                                          |
|---------|----------------------------------------------------------------------------------------------------------------------------------------|
| ZK CE   | [org.zkoss.zul.theme.StandardThemeProvider](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/theme/StandardThemeProvider.html)     |
| ZK PE   | [org.zkoss.zkex.theme.StandardThemeProvider](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkex/theme/StandardThemeProvider.html)   |
| ZK EE   | [org.zkoss.zkmax.theme.StandardThemeProvider](http://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/theme/StandardThemeProvider.html) |

We will illustrate the theme provider with two examples. One is
straightforward: set the corresponding attributes based on the cookie.
The other **injects** a fragment to the URI such that we can allow the
browser to cache the CSS file.

> ------------------------------------------------------------------------
>
> For information of 3.6 and earlier, please refer to [ ZK 3 Theme > Provider](ZK_Developer's_Guide/ZK_in_Depth/Style_customization/Theme#ZK_3_Theme_Provider).

# Examples

## A Simple Example

In the following example, we store the preferred font size and the skin
(theme) in the cookie and retrieve them when required.

**`Since 7.0.0, the font size attributes are deprecated because of using LESS.`**

```java
package my;
public class MyThemeProvider implements ThemeProvder {
    public Collection getThemeURIs(Execution exec, List uris) {
        if ("silvergray".equals(getSkinCookie(exec))) {
            uris.add("~./silvergray/color.css.dsp");
            uris.add("~./silvergray/img.css.dsp");
        }
        return uris;
    }
    public int getWCSCacheControl(Execution exec, String uri) {
        return -1;
    }
    public String beforeWCS(Execution exec, String uri) {
        final String fsc = getFontSizeCookie(exec);
        if ("lg".equals(fsc)) {
            exec.setAttribute("fontSizeM", "15px");
            exec.setAttribute("fontSizeMS", "13px");
            exec.setAttribute("fontSizeS", "13px");
            exec.setAttribute("fontSizeXS", "12px");
        } else if ("sm".equals(fsc)) {
            exec.setAttribute("fontSizeM", "10px");
            exec.setAttribute("fontSizeMS", "9px");
            exec.setAttribute("fontSizeS", "9px");
            exec.setAttribute("fontSizeXS", "8px");
        }
        return uri;
    }
    public String beforeWidgetCSS(Execution exec, String uri) {
        return uri;
    }
    /** Returns the font size specified in cooke. */
    private static String getFontSizeCookie(Execution exec) {
        Cookie[] cookies = ((HttpServletRequest)exec.getNativeRequest()).getCookies();
        if (cookies!=null)
            for (int i=0; i<cookies.length; i++)
                if ("myfontsize".equals(cookies[i].getName()))
                    return cookies[i].getValue();
        return "";
    }
    /** Returns the skin specified in cookie. */
    private static String getSkinCookie(Execution exec) {
        Cookie[] cookies = ((HttpServletRequest)exec.getNativeRequest()).getCookies();
        if (cookies!=null)
            for (int i=0; i<cookies.length; i++)
                if ("myskin".equals(cookies[i].getName()))
                    return cookies[i].getValue();
        return "";
    }
}
```

Notice that we return -1 when
<javadoc type="interface" method="getWCSCacheControl(org.zkoss.zk.ui.Execution, java.lang.String)">org.zkoss.zk.ui.util.ThemeProvider</javadoc>
is called to disallow the browser to cache the CSS file. It is necessary
since we manipulate the content of the CSS file by setting the
attributes (based on the cookie). It means the content might be
different with the same request URL. For a cacheable example, please
refer to [the next section](#A_Cacheable_Example).

Then, you configure `WEB-INF/zk.xml` by adding the following lines.

```xml
 <desktop-config>
     <theme-provider-class>my.MyThemeProvider</theme-provider-class>
 </desktop-config>
```

## A Cacheable Example

To improve the performance, it is better to allow the browser to cache
the CSS file as often as possible. With the theme provider, it can be
done by returning a positive number when
<javadoc type="interface" method="getWCSCacheControl(org.zkoss.zk.ui.Execution, java.lang.String)">org.zkoss.zk.ui.util.ThemeProvider</javadoc>
is called. However, because the browser will use the cached version, we
have to ensure the browser gets a different URL for each different
theme. Here we illustrate a technique called **fragment injection**.

The idea is simple: when
<javadoc type="interface" method="getThemeURIs(org.zkoss.zk.ui.Execution, java.util.List)">org.zkoss.zk.ui.util.ThemeProvider</javadoc>
is called, we **inject** a special fragment to denote the content, such
that each different theme is represented with a different URL. The
injection can be done easily with the inner class called
[org.zkoss.zk.ui.util.ThemeProvider.Aide](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ThemeProvider/Aide.html). For example,

```java
final String fsc = getFontSizeCookie(exec);
if (fsc != null && fsc.length() > 0) {
    for (ListIterator it = uris.listIterator(); it.hasNext();) {
        final String uri = (String)it.next();
        if (uri.startsWith(DEFAULT_WCS)) {
            it.set(Aide.injectURI(uri, fsc));
            break;
        }
    }
}
```

Then, we can retrieve the fragment we encoded into the URI later when
<javadoc type="interface" method="beforeWCS(org.zkoss.zk.ui.Execution, java.lang.String)">org.zkoss.zk.ui.util.ThemeProvider</javadoc>
is called. It can be done easily by use of
<javadoc method="decodeURI(java.lang.String)">org.zkoss.zk.ui.util.ThemeProvider.Aide</javadoc>.
<javadoc method="decodeURI(java.lang.String)">org.zkoss.zk.ui.util.ThemeProvider.Aide</javadoc>
returns a two-element array if the fragment is found. The first element
is the URI without fragment, and the second element is the fragment. For
example,

```java
public String beforeWCS(Execution exec, String uri) {
    final String[] dec = Aide.decodeURI(uri);
    if (dec != null) {
        if ("lg".equals(dec[1])) {
            exec.setAttribute("fontSizeM", "15px");
            exec.setAttribute("fontSizeMS", "13px");
            exec.setAttribute("fontSizeS", "13px");
            exec.setAttribute("fontSizeXS", "12px");
        } else if ("sm".equals(dec[1])) {
            exec.setAttribute("fontSizeM", "10px");
            exec.setAttribute("fontSizeMS", "9px");
            exec.setAttribute("fontSizeS", "9px");
            exec.setAttribute("fontSizeXS", "8px");
        }
        return dec[0];
    }
    return uri;
}
```

Here is a complete example:

```java
public class CacheableThemeProvider implements ThemeProvider{
    private static String DEFAULT_WCS = "~./zul/css/zk.wcs";

    public Collection getThemeURIs(Execution exec, List uris) {
        //font-size
        final String fsc = getFontSizeCookie(exec);
        if (fsc != null && fsc.length() > 0) {
            for (ListIterator it = uris.listIterator(); it.hasNext();) {
                final String uri = (String)it.next();
                if (uri.startsWith(DEFAULT_WCS)) {
                    it.set(Aide.injectURI(uri, fsc));
                    break;
                }
            }
        }

        //slivergray
        if ("silvergray".equals(getSkinCookie(exec))) {
            uris.add("~./silvergray/color.css.dsp");
            uris.add("~./silvergray/img.css.dsp");
        }
        return uris;
    }

    public int getWCSCacheControl(Execution exec, String uri) {
        return 8760; //safe to cache
    }
    public String beforeWCS(Execution exec, String uri) {
        final String[] dec = Aide.decodeURI(uri);
        if (dec != null) {
            if ("lg".equals(dec[1])) {
                exec.setAttribute("fontSizeM", "15px");
                exec.setAttribute("fontSizeMS", "13px");
                exec.setAttribute("fontSizeS", "13px");
                exec.setAttribute("fontSizeXS", "12px");
            } else if ("sm".equals(dec[1])) {
                exec.setAttribute("fontSizeM", "10px");
                exec.setAttribute("fontSizeMS", "9px");
                exec.setAttribute("fontSizeS", "9px");
                exec.setAttribute("fontSizeXS", "8px");
            }
            return dec[0];
        }
        return uri;
    }

    public String beforeWidgetCSS(Execution exec, String uri) {
        return uri;
    }

    /** Returns the font size specified in cooke. */
    private static String getFontSizeCookie(Execution exec) {
        Cookie[] cookies = ((HttpServletRequest)exec.getNativeRequest()).getCookies();
        if (cookies!=null)
            for (int i=0; i<cookies.length; i++)
                if ("myfontsize".equals(cookies[i].getName()))
                    return cookies[i].getValue();
        return "";
    }
    /** Returns the skin specified in cookie. */
    private static String getSkinCookie(Execution exec) {
        Cookie[] cookies = ((HttpServletRequest)exec.getNativeRequest()).getCookies();
        if (cookies!=null)
            for (int i=0; i<cookies.length; i++)
                if ("myskin".equals(cookies[i].getName()))
                    return cookies[i].getValue();
        return "";
    }
}
```

# How to Specify the Media Types

In addition to String instances, you can return instances of
[org.zkoss.web.servlet.StyleSheet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/servlet/StyleSheet.html) in the returned
collection of
<javadoc method="getThemeURIs(org.zkoss.zk.ui.Execution,java.util.List)">org.zkoss.zk.ui.util.ThemeProvider</javadoc>,
such that you can control more about the generated CSS link. For
example, if you want to add a CSS link for [the media type](http://www.w3.org/TR/CSS2/media.html), say, `print, handheld`,
then you can do as follows.

```java
public Collection getThemeURIs(Execution exec, List uris) {
   uris.add(new StyleSheet("/theme/foo.css", "text/css", "print, handheld", false));
   return uris;
}
```

# Version History

| Version | Date      | Content                                                                            |
|---------|-----------|------------------------------------------------------------------------------------|
| 5.0.3   | June 2010 | The media type was allowed in [org.zkoss.web.servlet.StyleSheet](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/servlet/StyleSheet.html). |
