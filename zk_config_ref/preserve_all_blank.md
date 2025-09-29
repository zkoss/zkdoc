---
title: "preserve-all-blank"
---

**Property:** preserve-all-blank
{% include global-scope-only.html %}
`Default: true`  
{% include supported-since.html version="8.0.0" %}

This property control how the zul parser interpret whitespaces (such as
line breaks and spaces) between zul elements.

Considering this source:

```xml
          <label value="text" />
          <a>link</a>
```

If preserve-all-blank is true, the result will be:

text link

If preserve-all-blank is false, the result will be:

textlink

Note: the same element will not cause whitespace if no whitespace exists
in the source.

Considering the following source:

```xml
          <label value="text" /><a>link</a>
```

will always return: textlink, since no whitespace exists between the
label and the link element.

```xml
<library-property>
    <name>preserve-all-blank</name>
    <value>false</value>
</library-property>
```
