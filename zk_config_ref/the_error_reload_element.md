---
title: "The error-reload Element"
---


**Syntax:**

```xml
<error-reload>  
    [<device-type>deviceType|ajax</device-type>]  
    <error-code>an_error_code</error-code>  
    <reload-uri>an_uri</reload-uri>  
    [<connection-type>server-push|au</connection-type>]  
</error-reload>
```

`[Default: show an error message]`

It specifies what URI to redirect the browser to. For example, if you
prefer to redirect to the login page, say, `login.zul`, you can specify
the following in zk.xml:

```xml
 <error-reload>
     <device-type>ajax</device-type>
     <error-code>402</error-code>
     <reload-uri>/login.zul</reload-uri>
 </error-reload>
 <error-reload>
     <device-type>ajax</device-type>
     <error-code>410</error-code>
     <reload-uri>/timeout.zul</reload-uri>
     <connection-type>server-push</connection-type>
 </error-reload>
```

## connection-type

`Optional`  
`Default: au`  
`Allowed: au, server-push`

Specifies the connection type. It can be either `au` or `server-push`.
By default, it is `au` which are the Ajax reqests sent by the widgets
running at the client.

If you want to specify the error page for the server push (comet-based),
you have to specify `server-push` as shown in the example [ below](#error-code)

## device-type

`Optional`  
`Default: ajax`  
{% include version-badge.html version="3.6.3" %}

Specifies the device type. By default, it is `ajax`. If you want to
configure for ZK Mobile, use `mil`.

## error-code

`Required`

Specifies the error code, aka., the server status code; see RFC 2068.

For server-push (comet-based), there is an important error code called
410. It is received when the session is timeout (or the serve is
restarted). If you want to notify user about this, you can specify
something similar to the following.

```xml
<error-reload>
    <device-type>ajax</device-type>
    <error-code>410</error-code>
    <reload-uri>/timeout.zul</reload-uri>
    <connection-type>server-push</connection-type>
</error-reload>
```

## reload-uri

`Required`

Specifies the URI to reload if the specified error occurs.

If the content of `reload-uri` is empty, the browser simply reloads the
same page again.

```xml
 <reload-uri></reload-uri>
```

If you want to show an error message instead, specify `false`.

```xml
 <reload-uri>false</reload-uri>
```
