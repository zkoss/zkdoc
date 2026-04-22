---
title: "Debugging"
---

Here we discuss how to debug the client-side code. For server side
debugging, please consult the IDE manual you use.

# Developer Tool

First, it is suggested to open a developer tool in the browser you're
working with.

| Browser                               | Debugger                                                                                                                                                        |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Chrome                                | Press **F12**. Or click Chrome menu at the top-right of your browser window, then select **More Tools** \> **Developer Tools**                                  |
| Firefox                               | [developer tool](https://developer.mozilla.org/en-US/docs/Tools). Press **F12**. Or click menu at the top-right of your browser, then select **Web Developer**. |
| Safari                                | Developer Tools. Click the menu **Develop** \\ **Show Error Console**                                                                                           |
| Internet Explorer 8 , 9, 10, 11, Edge | Developer Tools It is built-in and you could start it by pressing **F12**.                                                                                      |
| Internet Explorer 7                   | Microsoft script debugger , fiddler2(network inspection) ,there's another choice is to use Develope Tool in IE8 with IE7 compatible mode                        |
| Internet Explorer 6                   | Microsoft script debugger , fiddler2(network inspection)                                                                                                        |

# Turn Off Compression and Cache

By default, the JavaScript files (ZK packages) will be compressed and
cached, which is hard to step in and debug. You can turn off the
compression and the cache of JavaScript files by specifying the
following in
[`WEB-INF/zk.xml`]({{site.baseurl}}/zk_config_ref/zk_xml):

```xml
<client-config>
    <debug-js>true</debug-js>
</client-config>
<library-property>
    <name>org.zkoss.web.classWebResource.cache</name>
    <value>false</value>
</library-property>
<library-property>
    <name>org.zkoss.zk.WPD.cache</name>
    <value>false</value>
</library-property>
```

# Get ZK and add-on Component Version

Sometimes, you need to get the product version at runtime for debugging.
Please run the following JavaScript statements in your browser's
console:

```javascript
zk.version;
zk.getVersion('gmaps');
zk.getVersion('zss');
zk.getVersion('ckez');
zk.getVersion('chart');
```
