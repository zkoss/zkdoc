

Themes comprises of stylesheets and images. The URLs for those resources
must be resolved once the theme changes.

Several APIs were available to redirect theme resources to the correct
location.

<javadoc class="true" method="encodeThemeURL(java.lang.String)">org.zkoss.web.fn.ServletFns</javadoc>
is for translating image locations inside \*.css.dsp files.

<javadoc class="true" method="resolveThemeURL(java.lang.String)">org.zkoss.web.fn.ServletFns</javadoc>
is for redirecting the retrieval of stylesheets inside a ThemeProvider.

# Example Usage (inside \*.css.dsp)

``` css
tr.z-row-over > td.z-row-inner, tr.z-row-over > .z-cell {
    background-image: url(${c:encodeThemeURL('~./zul/img/grid/column-over.png')});
}
```

# Example Usage (inside a ThemeProvider):

``` java
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
