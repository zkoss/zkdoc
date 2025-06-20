**Syntax:**

<max-pushes-per-session>a_number</max-pushes-per-session>

`[Default: -1]`

It specifies the maximum allowed number of concurrent server-push
connections per session.

A negative number (default) means no limitation at all. Zero means no
server push is allowed at all.

Notices that

- A desktop has at most one server-push connection.
- A desktop might be killed accidentally. For example, a user closes a
  browser window. In this case, the server might not be able to detect
  it. When specifying this, it is better to specify the maximum allowed
  number of desktops.


