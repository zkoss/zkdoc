---
title: "root-attributes"
description: "root-attributes: It specifies the additional attributes for the root element of the generated output, which depends on the device types."
---

**Syntax:**

```xml
<?root-attributes any-name1="any-value2" any-name2="any-value2"?>
```

It specifies the additional attributes for the root element of the
generated output, which depends on the device types.

Currently, only Ajax devices support this feature and the root element
is the `html` tag. In other words, the attributes specified in the
`root-attribute` directives will become the attributes of the `<html>`
element of the generated output. For example,

# any-name*

`any-value` = Any numbers of names and values are allowed. The value can contain EL expressions.

# Examples

```xml
 <?root-attributes xmlns:v="urn:schemas-microsoft-com:vml"?>
```

will cause the HTML output to be generated with the following snippet

```xml
 <html xmlns="[http://www.w3.org/1999/xhtml http://www.w3.org/1999/xhtml]"
 xmlns:v="urn:schemas-microsoft-com:vml">
```

```xml
<?root-attributes lang="EN"?>
```

# Automatic HTML Language

{% include supported-since.html version="11.0.0" %}

When ZK renders a ZUL page as a complete HTML document, it automatically adds a `lang` attribute to the root `<html>` element. This helps screen readers select the correct reading language and removes the need to add a `root-attributes` directive to every page.

ZK resolves the language in this order:

1. A `lang` value explicitly supplied by `<?root-attributes?>`.
2. The preferred locale in session scope.
3. The preferred locale in application scope.
4. The current locale returned by `Locales.getCurrent()`.

The locale is rendered as a BCP 47 language tag. For example, `Locale.CANADA_FRENCH` produces `fr-CA`.

Use an explicit root attribute when one page intentionally uses a language different from the current ZK locale:

```xml
<?root-attributes lang="ja"?>
```

ZK detects the attribute case-insensitively and does not add a second `lang` attribute.

# Note:

* `xmlns="http://www.w3.org/1999/xhtml"` is always generated.
* If the value is specified with an EL expression, and it is
  evaluated to `null`, the corresponding attribute won't be generated into the target HTML page.
