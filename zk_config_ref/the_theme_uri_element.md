**Syntax:**

<theme-uri>*`a_theme_uri`*</theme-uri>

`[Default: `*`none`*`]`

It specifies the URI of an addition theme (aka., a style sheet file).

Like other URI, it accepts `*` for loading browser and Locale dependent
style sheet. Please refer to [ZK Developer's
Reference](ZK_Developer's_Reference/Internationalization/Locale-Dependent_Resources)
for more details.

You can specify any number of `them-uri` as follows.

``` xml
 <desktop-config>
     <theme-uri>/my/blue**.css</theme-uri>
     <theme-uri>/my/second.css</theme-uri>
 </desktop-config>
```

If you want to replace a default theme, you have to use `theme-uri` with
`disable-theme-uri`. Please refer to [ZK Developer's
Reference](ZK_Developer's_Reference/Theming_and_Styling) for
more information.

**Notice:**

1.  All style sheets defined in `lang.xml` and `lang-addon.xml` are
    loaded, no matter this parameter is defined or not. It is convenient
    for developers to override certain styles.
2.  Each JAR could specify a `lang-addon.xml` file (under the
    `metainfo/zk` directory), so you can specify style sheets there if
    you have more than one style sheets.
3.  You can specify extra CSS files for individual ZUML pages by the use
    of the [`style`
    component](ZK_Component_Reference/Essential_Components/Style).


