---
title: "jQuery"
---

ZK framework's Client Engine uses a customized
[jQuery](http://jquery.com/). So you can use *jq* or *$* as a
jQuery object like:

```javascript
$( "div" ).click(function() {
    //...
});

jq(mySelector).css( "background-color" );
```

You should consider implementing your client code with the bundled
jQuery first. For API details, please refer to [jQuery Documentation](http://docs.jquery.com/Main_Page) for details.

# Version

To obtain the jQuery version bundled with your ZK version enter
`jq.fn.jquery` into Console tab in a developer tool.

# Load a Different jQuery

You can load a different version of jQuery by `<script/>` or `<?script?>`. Because ZK always load your script later than ZK framework scripts, the
different version of jQuery will override `$`. Therefore, you can access 2 versions of jquery with different variables:

- `jq` to access ZK's bundled jQuery
- `$` to access jQuery you loaded

Notice that even you load another version of jQuery, ZK internally still uses the bundled jQuery.

Please check examples:
* [jquery.zul](https://github.com/zkoss/zkbooks/blob/master/clientreference/src/main/webapp/jquery.zul),
* [jquery2](https://github.com/zkoss/zkbooks/blob/master/clientreference/src/main/webapp/jquery2.zul)
