**Syntax:**

<error-page>  
`    `<device-type>`''a_device_type|``ajax`</device-type>  
`    `<exception-type>*`a_class_name`*</exception-type>  
`    `<location>*`a_uri`*</location>  
</error-page>

It specifies an error page used when an uncaught exception is thrown in
updating a ZUML page (e.g., in an event listener). Each page is
associated with an exception type, a class deriving from
`java.lang.Throwable`. You can specify multiple error pages, each with a
different exception type. When an error occurs, ZK searches the proper
error page by examining the exception types individually. If none is
found, it will show an alert message to the client by default.

The `device-type` element is optional. If omitted, `ajax` is assumed.

For example,

``` xml
    <error-page>
        <exception-type>java.lang.Throwable</exception-type>
        <location>/WEB-INF/sys/error.zul</location>
    </error-page>
```

For more information, please refer to [ZK Developer's Reference: Error
Handling](ZK_Developer's_Reference/UI_Patterns/Error_Handling).

# Acceptable Path

You can specify one of the following paths:

1.  Web URLs. <http://example.com/>
2.  Classpath Web Resource Paths. `~./error.zul`
3.  Servlet Context Paths. `/WEB-INF/error.zul` or `/mypath/error.zul`
4.  Filesystem Path. `/var/resources/error.zul`
