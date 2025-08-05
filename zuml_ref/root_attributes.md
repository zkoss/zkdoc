---
title: "root-attributes"
---

**Syntax:**

<?root-attributes ''any-name1''="''any-value2''" ''any-name2''="''any-value2''"?>

It specifies the additional attributes for the root element of the
generated output, which depends on the device types.

Currently, only Ajax devices support this feature and the root element
is the `html` tag. In other words, the attributes specified in the
`root-attribute` directives will become the attributes of the `html`
element of the generated output. For example,

```xml
 <?root-attributes xmlns:v="urn:schemas-microsoft-com:vml"?>
```

will cause the HTML output to be generated with the following snippet

```xml
 <html xmlns="[http://www.w3.org/1999/xhtml http://www.w3.org/1999/xhtml]"
 xmlns:v="urn:schemas-microsoft-com:vml">
```

Note:
`xmlns="`[[`http://www.w3.org/1999/xhtml`](http://www.w3.org/1999/xhtml)](http://www.w3.org/1999/xhtml)`"`
is always generated.

Note: If the value is specified with an EL expression and it is
evaluated to null, the corresponding attribute won't be generated.

# *any-name*

"*any-value*" = Any numbers of names and values are allowed. The value
could contain EL expressions.


