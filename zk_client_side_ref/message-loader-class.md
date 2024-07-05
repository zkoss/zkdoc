

**Syntax:**
<message-loader-class>*class.qualified.name*</message-loader-class>

Specifies an additional message loader class to load extra messages or
customize default msgzk or msgzul entries. If the message loader declare
a file pattern using wildcard "\*", multiple Locale-based files can be
defined and will be loaded according to the current user locale.

If the syntax "~./" is used, the resources can be loaded from the
resources classpath (default in /src/main/resources/web/). Note: only a
directory localed in the actual classpath can be used for this purposes
for localized files.

Example,

- Lang-addon.xml

``` xml
<message-loader-class>foo.bar.MyCustomMessageLoader</message-loader-class>
```

- foo.bar.MyCustomMessageLoader.java

``` java
public class MyCustomMessageLoader implements MessageLoader {

    @Override
    public void load(StringBuffer out, Execution exec) throws IOException {
        out.append(Devices.loadJavaScript(exec, "~./mycustom-msgzk*.js"));
    }

}
```

- \[/src/main/resources/web\]/mycustom-msgzk.js

``` javascript
msgzk.MYCUSTOM='customized';
```

- \[/src/main/resources/web\]/mycustom-msgzk_de.js

``` javascript
msgzk.MYCUSTOM='angepasst';
```

# message-loader-class

`[Required]`

The message loader class. It must implement
org.zkoss.zk.ui.metainfo.MessageLoader The loader .load(StringBuffer
out, Execution exec) need to load the additional client-side messages
and append them to the output buffer.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
