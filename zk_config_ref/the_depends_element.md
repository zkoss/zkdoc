---
title: "The depends Element"
---

**Syntax:**

```xml
<depends>a_list_of_config_names</depends>
```

`[Optional]`

It specifies what configurations this configuration depends on. If
specified, this configuration will be parsed after all specified
configurations are parsed.

Example,

```xml
<depends>zkex, zkmax</depends>
```

which means this configuration won't be parsed until
`/metainfo/zk/config.xml` in both `zkex` and `zkmax` are parsed.


