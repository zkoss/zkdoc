When an AU request fails, the default *Client Engine* implementation
will retry 3 times to resend it and ask for a confirming dialog to user.

We provide a way for developer to customize the error handling.

For example,

``` javascript
zAu.ajaxErrorHandler = function (req, status, statusText, ajaxReqTries) {
    if (ajaxReqTries == null)
        ajaxReqTries = 3; // retry 3 times
        
    // reset the resendTimeout, for more detail, please refer to 
    // http://books.zkoss.org/wiki/ZK_Configuration_Reference/zk.xml/The_client-config_Element/The_auto-resend-timeout_Element 
    zk.resendTimeout = 2000;//wait 2 seconds to resend.
    
    if (!zAu.confirmRetry("FAILED_TO_RESPONSE", status+(statusText?": "+statusText:"")))
        return 0; // no retry;
    return ajaxReqTries;
}
```

For more detail on the arguments, please take a look at
<javadoc directory="jsdoc" method="ajaxErrorHandler(java.lang.Object, int, _global_.String, int)">\_global\_.zAu</javadoc>

# Version History

| Version | Date           | Content                                                                            |
|---------|----------------|------------------------------------------------------------------------------------|
| 6.5.2   | February, 2013 | [AU response error can be handle by user](http://tracker.zkoss.org/browse/ZK-1616) |
