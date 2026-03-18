---
title: "Static Fields and Methods"
---

With [ import directive](/zuml_ref/import),
you can reference a static field or a static method of a class. So now
you can call a tag library method without declaring it.

```xml
<?import org.zkoss.xel.fn.* ?>
...
${CommonFns.formatNumber(12345, '$ ###,###,###.00', null)}
...
${Math.sqrt(16)}
```

# EL3 Static References

{% include supported-since.html version="8.0.0" %}

In EL3, you can reference a Java class's static field or static method with the syntax `Classname.Field` or `Classname.Method(args)`. For example:

```xml
<label value="@load((Math.sqrt(16)))" />
```

Note that `java.lang.*` is imported by default.

# Version History

| Version | Date | Content |
|---------|------|---------|
| 8.0.0   | October 2015 | Support static field and method references directly. |
