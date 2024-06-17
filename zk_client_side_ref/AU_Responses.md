An AU response is the command sent from the server to the client for
synchronizing back the server's states and performing some
functionality. In response to the [AU
request](ZK_Client-side_Reference/Communication/AU_Requests)
sent by the client, the server could send one or multiple AU responses
to the client. Each AU response consists of a command and a sequence of
data. The command is a string, and the data could be any objects (as
long as [JSON](http://www.json.org/) can handle it).

There are two groups of commands depending on whether the command is
applied to a particular widget
(<javadoc directory="jsdoc">zk.Widget</javadoc>), or to the whole
browser. For the sake of description, we call the first kind of commands
as the widget commands, while the second kind the global commands.

| Class                                          | Object                                                            | Description                                                                                                                                                                                                                                                                                                                   |
|------------------------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <javadoc directory="jsdoc">zk.AuCmd0</javadoc> | <javadoc directory="jsdoc" method="cmd0">\_global\_.zAu</javadoc> | <javadoc directory="jsdoc">zk.AuCmd0</javadoc> is the class to handle all **global** commands (i.e., applied to the whole browser). Furthermore, all global commands are handled by an instance of <javadoc directory="jsdoc">zk.AuCmd0</javadoc> called <javadoc directory="jsdoc" method="cmd0">\_global\_.zAu</javadoc>.   |
| <javadoc directory="jsdoc">zk.AuCmd1</javadoc> | <javadoc directory="jsdoc" method="cmd1">\_global\_.zAu</javadoc> | <javadoc directory="jsdoc">zk.AuCmd1</javadoc> is the class to handle all **widget** commands (i.e., applied to a particular widget). Furthermore, all widget commands are handled by an instance of <javadoc directory="jsdoc">zk.AuCmd1</javadoc> called <javadoc directory="jsdoc" method="cmd1">\_global\_.zAu</javadoc>. |

# Add a New Command

If you'd like to add a new command, you could simply add a new property
to to <javadoc directory="jsdoc" method="cmd0">\_global\_.zAu</javadoc>
or <javadoc directory="jsdoc" method="cmd1">\_global\_.zAu</javadoc>,
depending on your requirement. For example,

``` javascript
zk.zAu.cmd0.bookmark = function (bk, replace) {
    //...
};
```

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
