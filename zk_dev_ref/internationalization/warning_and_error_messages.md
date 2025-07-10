

# Overview

ZK's system locale dependent messages (such as warnings and errors) are
stored in ZK jar with 2 formats:

1.  \[ZK-JAR\]`/metainfo/mesg/*.properties`, Java properties files
      
    \[ZK-JAR\] could be zcommon.jar, zweb.jar, zk.jar or zul.jar.
2.  `zk.jar /web/js/zk/lang/*.js`
3.  `zul.jar/web/js/zul/lang/*.js`

These files are Locale depedent. For example, the message file in
`zk.jar` for German messages are

- `/metainfo/mesg/msgzk_de.properties`,
- `/web/js/zk/lang/msgzk_de.js`

# Translate messages to another language

If you want to translate messages to another language, you can add your
own property files named with the correct Locale, and put them to the
`/metainfo/mesg` directory of the classpath. Of course, it is always
better to contribute back. Please take a look at [ZK Messages](zk_messages) for all available translations. If
you'd like to contribute, just add the language to it and notify us at
info@zkoss.org.

# Change particular message

Look for the specific message you want to change at [ZK Messages](zk_messages) first. Then, override it according to
the following sections.

## Defined in a Properties File

If you want to change a particular message, you need to create
`WEB-INF/zk-label.properties` (or
`WEB-INF/zk-label_[LOCALE].properties`) and add key-value pairs in it.
For example, assuming you want to customize `MZk.NOT_FOUND` in German
translation (`msgzk_de.properties`), then you can add the following to
`WEB-INF/zk-label_de.properties`:

```xml
MZk.3000=my customized message here
```

Notice the prefix `MZk`, and `3000` is the error code and you can find
it at
[ZK_Messages/German/msgzk_de.properties](zk_messages/german/msgzk_de.properties)

The same pattern applies to the [ other message files](zk_messages/german) such as

<table>
<thead>
<tr class="header">
<th><center>
<p>File</p>
</center></th>
<th><center>
<p>Prefix of a Key</p>
</center></th>
<th><center>
<p>Key Example</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>msgzk_[LOCALE].properties</p></td>
<td><p><code>MZk</code></p></td>
<td><p>MZk.1000= my text</p></td>
</tr>
<tr class="even">
<td><p>msgzul_[LOCALE].properties</p></td>
<td><p><code>MZul</code></p></td>
<td><p>MZul.2400=mytext</p></td>
</tr>
<tr class="odd">
<td><p>msgcommon_[LOCALE].properties</p></td>
<td><p><code>MCommon</code></p></td>
<td><p>MCommon.1234= my text</p></td>
</tr>
<tr class="even">
<td><p>msgweb_[LOCALE].properties</p></td>
<td><p><code>MWeb</code></p></td>
<td><p>MWeb.1234= my test</p></td>
</tr>
</tbody>
</table>

## Defined in a JS File

### Using local override

For messages defined in `msgzk.js / msgzul.js` you can create a js file
and include it via `lang-addon.xml`. For example for overriding
`msgzk.LOADING` for CEZH language create a file `test_cs.js` and
override particular message
`msgzk.LOADING=CS langauge specific message"` and include this js file
via `lang-addon.xml` as below

```xml
<language-addon>
  <addon-name>test</addon-name>
  <language-name>xul/html</language-name>

  <javascript src="/js/test*.js" />
</language-addon>
```

Note: You can use any prefix other than "test" and add language-specific
suffixes to your js files and include all of them by using `*` wild card
as shown above

Finally include your lang-addon.xml in zk.xml using language-config
element as shown below

```xml
<language-config>
    <addon-uri>/WEB-INF/lang-addon.xml</addon-uri>
</language-config>
```

Note: messages updated by a custom javascript will override the default
once. If the messages are reloaded using Clients.reloadMessages(Locale),
the customization will be lost. To support locale reload, please refer
to the next section.

### Adding a custom language loader

A custom language loader will find matching messages depending on the
user locale, and will be reloaded even if the
Clients.reloadMessages(Locale) is triggered.

It can be defined in a language addon using the <message-loader-class>
element. Please refer to the [client-side reference]({{site.baseurl}}/zk_client_side_ref/message-loader-class)
documentation for more details.

# Version History

| Version | Date | Content                                                               |
|---------|------|-----------------------------------------------------------------------|
| 6.0.0   | n/a  | Allows applications to override a particular message with `zk-label`. |
