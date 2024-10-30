**Syntax:**

<resend-delay>*`a_number`*</resend-delay>

`[Default: -1`[^1]`]`  
`[Deprecated as of release 6.0.0]`

It specifies the time, in milliseconds, to wait before resending the AU
requests to the server. There are a couple of reasons an AU request is
not received by the server. For example, though rarely, Internet
Explorer 6 sometimes won't send the package at all. To ensure the
reliability, ZK will abort the previous request and then resend the
request, if the specified delay expires.

> ------------------------------------------------------------------------
>
> <references/>

| Version | Date           | Content                                                                                                                                                             |
|---------|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 5.0.4   | July, 2010     | resend-delay is default to -1 (i.e., disabled by default) no matter ZK CE or EE.                                                                                    |
| 6.0.0   | November, 2011 | The feature is removed and the setting has no effect, since we can't replicate IE6 issue anymore (after using a more conservative approach to send an Ajax request) |

[^1]: `The default is 9000 if ZK 5.0.3 EE or prior is used.`
