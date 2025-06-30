**Property:**

`org.zkoss.zk.ui.versionInfo.enabled`

Default:  `true`

It specifies whether to show ZK version on each page.

By default, each page will display the comment containing ZK version
which the current web application is using. If a user wants to hide the
info in security consideration, he can specify this library property as
`false`.

# Break Browser Cache

The value other than `true` is considered `false`. And this value will
be taken as salt to obfuscate the version info which is needed in
resource caching. For instance, "zk_is_good" can be used to hide the
version info and obfuscate it when needed.
