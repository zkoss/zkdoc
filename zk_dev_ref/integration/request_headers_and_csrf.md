---
title: "Request headers and CSRF tokens"
---

# Request headers and CSRF tokens

## ZK Client-side header override

Starting with ZK 10.2.0, ZK request headers can be modified directly from client-side by overriding the zAu.getExtraHeaders function.

```javascript
<script><![CDATA[
/* using zk.augment */
/* chainable, since each override or augment will retrieve the original, or the previous modification if any exists */
zk.afterLoad(function () {
    const {getExtraHeaders} = zk.augment(zAu, {
        getExtraHeaders() {
            const extraHeaders = getExtraHeaders(); //obtain headers map from the original function
            extraHeaders['myKey'] = 'myFirstValue'; //add or replace the header for a given key
            return extraHeaders; //return the modified map
        }
    });
});
/* Using zk.override */
zk.afterLoad(function () {
    var _XzAu = {};
    zk.override(zAu, _XzAu, {
        getExtraHeaders: function() {
            const extraHeaders = _XzAu.getExtraHeaders.apply(this, arguments); //obtain headers map from the original function
            extraHeaders['myKey'] = 'mySecondValue'; //add or replace the header for a given key
            extraHeaders['myOtherKey'] = 'myThirdValue'; //add or replace the header for a given key
            return extraHeaders; //return the modified map
        }
    });
});
]]></script>
```

## Case study: CSRF token from an external provider (Spring)

Adding a header to traffic between a page and a server is common requirement of CSRF configuration. 

Using Spring-Security, the X-CSRF-TOKEN header can be added to a request to protect against CSRF attacks.

In a ZK page, user actions [may trigger zkau requests](/overture/architecture_overview#execution-flow-of-serving-an-ajax-request), which carry commands to the server and receive page updates in response. 

If the ZK page was opened in a Spring context, for example in an iframe located in a spring-security protected page, the outer page may need to transmit the X-CSRF-TOKEN value to the ZK client, which can then add it as a header in communications to the server.

The outer page needs to know when the ZK content is initialized inside of the iframe, then it needs to send the header value to be used for this page. From the ZK client’s side, it needs to first finish initializing, then request the header value from the outer page. Once it receives the header value, it needs to add it to subsequent zkau requests.

* ZK client initialization and header request to the outer page:

This can be done from a js script loaded in the page’s header:

```javascript
//sends immediately while processing headers
if(window.parent != null){ //looks for a parent page (the host of the iframe)
	console.log("processing document header scripts, sending event to parent window");
	window.parent.postMessage("csrfTokenValueRequest","http://localhost:8080");//notify the parent window to send the CSRF token, if a parent window exists
}
```

* In the outer page, we would have previously set a listener on the window during page initialization to receive notifications from postMessage:

```javascript
<script>
window.addEventListener("message", (event) => {
if ((event.origin !== "http://localhost:8080") || (event.data !== "csrfTokenValueRequest")) return;//only accept messages from specified inner page
    console.log("received inner page event");
    document.getElementById('myIframe').contentWindow.postMessage("csrfTokenValue","http://localhost:8080");//sends the value to the inner page
});
</script>
```

* In turn this new invocation of postMessage is listened to from the ZK page:

```javascript
window.addEventListener(
  "message",
  (event) => {
	console.log("received csrf token from parent, preparing zk afterload");
    if (event.origin !== "http://localhost:8080") return;//only accept messages from specified outer page
	zk.afterLoad(function () {
		const {getExtraHeaders} = zk.augment(zAu, {
			getExtraHeaders() {
				const extraHeaders = getExtraHeaders(); //obtain headers map from the original function
				extraHeaders['X-CSRF-TOKEN'] = event.data; //add or replace the header for a given key
				return extraHeaders; //return the modified map
			}
		});
	});
  },
  false,
);
```

This adds the 'X-CSRF-TOKEN' header to the zkau requests.

Note: Spring-security CSRF configuration details should be set according to the current Spring-Security documentation and are not the topic of this article. Please refer primarily to spring-security documentation to its specific settings and patterns. 
