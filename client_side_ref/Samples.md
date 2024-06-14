\_\_TOC\_\_

# Sample of a Language Addon

Here is a sample (from zkmax's lang-addon.xml):

``` xml
<language-addon>
    <addon-name>zkmax</addon-name>
    <depends>zkex</depends>
    <language-name>xul/html</language-name>

    <version>
        <version-class>org.zkoss.zkmax.Version</version-class>
        <version-uid>5.0.5</version-uid>
        <zk-version>5.0.5</zk-version><!-- or later -->
    </version>

    <javascript package="zkmax" merge="true"/>

    <component>
        <component-name>portallayout</component-name>
        <component-class>org.zkoss.zkmax.zul.Portallayout</component-class>
        <widget-class>zkmax.layout.Portallayout</widget-class>
        <mold>
            <mold-name>default</mold-name>
            <mold-uri>mold/portallayout.js</mold-uri>
            <css-uri>css/portallayout.css.dsp</css-uri>
        </mold>
    </component>
</language-addon>
```

# Sample of a Language Definition

Here is a sample (from zul.jar/lang.xml):

``` xml
<language>
    <language-name>xul/html</language-name>
    <device-type>ajax</device-type>
    <namespace>http://www.zkoss.org/2005/zul</namespace>
    <extension>zul</extension><!-- the first extension is the major one -->
    <extension>xul</extension>

    <version>
        <version-class>org.zkoss.zul.Version</version-class>
        <version-uid>9.6.3</version-uid>
    </version>

    <javascript package="zk"/>
    <javascript package="zul.lang"/>
    <stylesheet href="~./zul/css/zk.wcs" type="text/css"/>

    <renderer-class>org.zkoss.zul.impl.PageRenderer</renderer-class>

    <label-template>
        <component-name>label</component-name>
        <component-attribute>value</component-attribute>
    </label-template>
    <macro-template>
        <macro-class>org.zkoss.zk.ui.HtmlMacroComponent</macro-class>
    </macro-template>
    <native-template>
        <native-class>org.zkoss.zk.ui.HtmlNativeComponent</native-class>
    </native-template>

    <component>
        <component-name>a</component-name>
        <component-class>org.zkoss.zul.A</component-class>
        <widget-class>zul.wgt.A</widget-class>
        <text-as>label</text-as>
        <mold>
            <mold-name>default</mold-name>
            <mold-uri>mold/a.js</mold-uri>
            <css-uri>css/a.css.dsp</css-uri>
        </mold>
    </component>
</language>
```
