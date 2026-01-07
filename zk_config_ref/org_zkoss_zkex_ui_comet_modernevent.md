---
title: "org.zkoss.zkex.ui.comet.modernEvent"
---
**Property:**
`org.zkoss.zkex.ui.comet.modernEvent`
{% include global-scope-only.html %} 
Default: `false`
{% include supported-since.html version="10.3.0" %}
Specifies whether to enable modern XMLHttpRequest event handling (`onload`, `onerror`, `ontimeout`, and `onabort`) for Comet server push. 
By default, this is disabled (`false`), and ZK uses the legacy `onreadystatechange` handler. When enabled, it provides better event classification and allows easier client-side extensibility by introducing a dedicated [_createXHR](cci:1://file:///Users/jumperchen/prj/zk9-master/zkcml/zkex/src/main/resources/web/js/zkex/cmsp/serverpush.ts:125:1-128:2) method that can be overridden to customize XHR requests.
### Client-Side Customization
When enabled, you can customize XHR creation by overriding the `_createXHR` method:
```javascript
zk.afterLoad('zkex.cmsp', function() {
    var _xPush = {};
    zk.override(zkex.cmsp.SPush.prototype, _xPush, {
        _createXHR: function() {
            var xhr = _xPush._createXHR.apply(this, arguments);
            // Add custom configurations
            xhr.withCredentials = true;
            return xhr;
        }
    });
});
```
