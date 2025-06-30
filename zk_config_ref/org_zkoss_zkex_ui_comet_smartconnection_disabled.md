**Property:**

`org.zkoss.zkex.ui.comet.smartconnection.disabled`

Default:  `false`  
`[Since 6.5.1]`

Default:  `true`  
`[Since 7.0.1]`

It specifies whether to disable the use of [HTML5's Page Visibility API](http://www.w3.org/TR/page-visibility/) for handling Comet-based
server push.

By default, ZK detects if the browser support the HTML5's Page
Visibility API, and then use the smart connection by page visibility API
if available. The connection use for the server side is much more
efficient since it doesn't hold the connection if the page is invisible.
However, if you prefer to disable it, you could specify this library
property to true.
