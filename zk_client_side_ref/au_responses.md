An AU response is the command sent from the server to the client for
synchronizing back the server's states and performing some
functionality. In response to the [AU request]({{site.baseurl}}/zk_client_side_ref/au_requests)
sent by the client, the server could send one or multiple AU responses
to the client. Each AU response consists of a command and a sequence of
data. The command is a string, and the data could be any objects (as
long as [JSON](http://www.json.org/) can handle it).

There are two groups of commands depending on whether the command is
applied to a particular widget
([zk.Widget](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.Widget.html)), or to the whole
browser. For the sake of description, we call the first kind of commands
as the widget commands, while the second kind the global commands.

| Class                                          | Object                                                            | Description                                                                                                                                                                                                                                                                                                                   |
|------------------------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [zk.AuCmd0](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.AuCmd0.html) | [\_global\_.zAu#cmd0](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zAu.html#cmd0) | [zk.AuCmd0](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.AuCmd0.html) is the class to handle all **global** commands (i.e., applied to the whole browser). Furthermore, all global commands are handled by an instance of [zk.AuCmd0](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.AuCmd0.html) called [\_global\_.zAu#cmd0](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zAu.html#cmd0).   |
| [zk.AuCmd1](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.AuCmd1.html) | [\_global\_.zAu#cmd1](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zAu.html#cmd1) | [zk.AuCmd1](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.AuCmd1.html) is the class to handle all **widget** commands (i.e., applied to a particular widget). Furthermore, all widget commands are handled by an instance of [zk.AuCmd1](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zk.AuCmd1.html) called [\_global\_.zAu#cmd1](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zAu.html#cmd1). |

# Add a New Command

If you'd like to add a new command, you could simply add a new property
to to [\_global\_.zAu#cmd0](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zAu.html#cmd0)
or [\_global\_.zAu#cmd1](https://www.zkoss.org/javadoc/latest/jsdoc/classes/\_global\_.zAu.html#cmd1),
depending on your requirement. For example,

```javascript
zk.zAu.cmd0.bookmark = function (bk, replace) {
    //...
};
```


