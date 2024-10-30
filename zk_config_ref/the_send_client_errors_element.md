**Syntax:**

<send-client-errors>`true|``false`</send-client-errors>

`[Default: `false`]`

It specifies whether client errors should be sent to the server for
logging the page url where the error occurred and its stack trace. By
default, this element is set to false to mitigate potential Denial of
Service (DoS) attacks, as enabling it could allow clients to flood the
server with errors.
