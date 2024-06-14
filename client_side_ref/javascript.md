**Syntax:**

`<javascript package="`*`pkg_name`*`" [merge="`**`false`**`|true"]/>`  
<javascript package="''pkg_name''" merge="''a_package_to_merge_to''"/>  
`<javascript package="`*`pkg_name`*`" [ondemand="`**`false`**`|true"/>`  
<javascript src="''a_uri''"/>  
<javascript>  
*`js_code`*  
</javascript>

It specifies the JavaScript package or file that has to be loaded to the
client. It could also specify the content (the JavaScript code snippet)
directly. Notice that, if specified, it is always loaded, no matter if
it is required or not.

Example,

``` xml
<javascript package="zul.box"/>
```

# package

`[Optional]`

It specifies the package to load.

# src

`[Optional]`

It specifies the URI of the JavaScript file to load. The URI can accept
[ Classpath Web Resource
Path](ZK_Developer%27s_Reference/UI_Composing/ZUML/Include_a_Page#Classpath_Web_Resource_Path),
`~./` (such as "~./foo/whatever.js").

If this addon [ depends on another
addon](ZK_Client-side_Reference/Language_Definition/depends),
ZK generates its javaScript into a output page's <code>

<head>

</code> after the JavaScript of another addon.

# merge

`[Optional][Default: false]`

It is used with the `package` attribute to specify whether the package
should be loaded as part of the `zk` package. If not specified, each
package will be loaded separatedly. This speeds up the loading if we
merge several packages into one.

Since ZK 6, it is allowed to specify the target package in the merge
attribute. For example,

``` xml
<javascript package="foo.lang" merge="zul.lang"/>
```

In fact, `merge="true"` is the same as `merge="zk"`, i.e., merged to the
`zk` package. Notice that the target package must be a preloaded
package. In other words, it must be specified in another `javascript`
element (without the `ondemand` attribute). In most cases, you shall use
`zk` for packages that can be cached at the client, and use `zul.lang`
for packages that shall not be cached, such as your own locale-dependent
messages.

For more information, please refer to the [Performance
Tips](ZK_Developer's_Reference/Performance_Tips/Minimize_Number_of_JavaScript_Files_to_Load)
section.

# ondemand

`[Optional][Default: false]`

It is used to 'cancel' the package specified in another `javascript`
element. By default, JavaScript packages are loaded on-demand (i.e.,
when it is required). By specify \<javascript;\> in a language
definition/addon, we could force some packages to load at the beginning.
But if you change your mind, you could either remove the `javascript`
element, or specify another `javascript` element with `ondemand="true"`.

# Version History

| Version | Date           | Content                                                                                         |
|---------|----------------|-------------------------------------------------------------------------------------------------|
| 6.0.0   | September 2011 | The merge attribute could be specified with the package's name to merge to, such as `zul.lang`. |
