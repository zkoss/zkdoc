---
title: "depends"
---

**Syntax:**

```xml
<depends>a_list_of_addon_names</depends>
```

It specifies which language (e.g. `zul` or `zhtml`) or language addon
(e.g. `zkex`, `zkmax`) this addon depends on. If specified, this addon
will be parsed after all the specified addons are parsed. Notice that
the dependent addon is missing, but the current addon file is still
parsed.

Example,

```xml
<depends>zkex, zkmax</depends>
```

which means this addon won't be parsed until both `zkex` and `zkmax` are
parsed.


