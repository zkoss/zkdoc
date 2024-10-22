**Syntax:**

```xml
<javascript-module name="name" version="version"/>
```

It specifies the version of a JavaScript module. The specified version
will be associated with the URL used to load Javascript packages (such
as `zul.db.wpd`), such that the browser will reload them if the version
is changed.

The name is either a package or the prefix of it. It matches any package
that starts with the given name. For example,

``` xml
<javascript-module name="foo" version="1.5.0"/>
```

Then, it matches the packages named `foo`, `foo.one`, `foo.another` or
`foo.any.subpkg`.

If you have multiple packages that don't share the same prefix, you
could specify multiple `<javascript-module>`.

# name

The name of the module. It should be the package name or the prefix of
all packages it contains.

# version

The version of the module. Notice it cannot contain slash, and it must
be legal to be part of URL. It is suggested to limit the use of number,
alphabet, dash and dot.


