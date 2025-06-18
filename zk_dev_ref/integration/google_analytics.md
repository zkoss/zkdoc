To track the Ajax traffic with [Google
Analytics](http://www.google.com/analytics/) or other statistic
services, you have to override a client-side API:
<javadoc directory="jsdoc" method="beforeSend(_global_.String, zk.Event, zk.Desktop)">\_global\_.zAu</javadoc>.
This method will be called each time ZK Client is about to send an Ajax
request to the server. You could override it to record the requests on
any statistic service you prefer.

Here we use Google Analytics as an example to illustrate how to override
it.

```java
try {
var pageTracker = _gat._getTracker("UA-xxxx"); //whatever code your website is assigned
pageTracker._setDomainName("zkoss.org");
pageTracker._initData();
pageTracker._trackPageview();

zk.override(zAu, "beforeSend", function (uri, req) {
    try {
        var t = req.target;
        if (t && t.id && (!req.opts || !req.opts.ignorable)) {
            var data = req.data||{},
                value = data.items && data.items[0]?data.items[0].id:data.value;
            pageTracker._trackPageview(uri +"/" + t.id + "/" + req.name + (value?"/"+value:""));
        }
    } catch (e) {
    }
    return zAu.$beforeSend(uri, req);
});
}catch(e){
}
```

Of course, you could only record the information you are interested by
examining <javadoc method="name" directory="jsdoc">zk.Event</javadoc>.
