**Syntax:**

<auto-resend-timeout>*`a_number`*</auto-resend-timeout>

`[Default: 200]`  
`[Since ZK 6.5.2]`

It specifies the timeout, in milliseconds, to re-send the AU request
when the server's service unavailable or timeout.

# Version History

| Version | Date          | Content                                                                                                                               |
|---------|---------------|---------------------------------------------------------------------------------------------------------------------------------------|
| 6.5.2   | January, 2013 | [ZK-1545: Make "request auto-send" timeout and number of times a retry is made configurable](http://tracker.zkoss.org/browse/ZK-1545) |
