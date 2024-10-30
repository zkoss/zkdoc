It is used to customize how ZK handles desktops. You might have multiple
`desktop-config` elements in one `zk.xml`.

``` xml
 <desktop-config>
     <desktop-timeout>3600</desktop-timeout>
     <disable-theme-uri>~./zul/css/zk.wcs</disable-theme-uri>
     <file-check-period>5</file-check-period>
     <extendlet-check-period>10</extendlet-check-period>
     <theme-uri>/my/blue**.css</theme-uri>
     <theme-uri-handler-class>my.MyThemeURIHandler</theme-uri-handler-class>
     <theme-provider-class>my.MyThemeProvider</theme-provider-class>
 </desktop-config>
```
