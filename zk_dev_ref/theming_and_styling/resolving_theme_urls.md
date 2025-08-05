---
title: "Resolving Theme URLs"
---



Themes comprises of stylesheets and images. The URLs for those resources
must be resolved once the theme changes.

Several APIs were available to redirect theme resources to the correct
location.

[org.zkoss.web.fn.ServletFns#encodeThemeURL(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/fn/ServletFns.html#encodeThemeURL(java.lang.String))
is for translating image locations inside \*.css.dsp files.

[org.zkoss.web.fn.ServletFns#resolveThemeURL(java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/fn/ServletFns.html#resolveThemeURL(java.lang.String))
is for redirecting the retrieval of stylesheets inside a ThemeProvider.

# Example Usage (inside \*.css.dsp)

```css
tr.z-row-over > td.z-row-inner, tr.z-row-over > .z-cell {
    background-image: url(${c:encodeThemeURL('~./zul/img/grid/column-over.png')});
}
```

# Example Usage (inside a ThemeProvider):

```java
...
public String beforeWidgetCSS(Execution exec, String uri) {
    if (uri.startsWith("~./zul/css/") ||
        uri.startsWith("~./js/zul/")) {
        
        uri = ServletFns.resolveThemeURL(uri);
    }
    
    return uri;
}
...
```
