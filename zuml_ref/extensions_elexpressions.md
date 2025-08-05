---
title: "EL Expressions"
---

The default evaluator for EL expressions are derived from [Apache Commons EL](http://commons.apache.org/el/). Thus, its funcationality is
the same as JSP 2.0's EL expressions[^1].

If you prefer a more powerful EL evaluator, such as MVEL, OGNL[^2] or
your own implementation, you could specify it with the [evaluator directive](/zuml_ref/evaluator).
For example,

```xml
<?evaluator name="mvel"
    import="org.zkoss.zul.Datebox,org.zkoss.zul.Combobox"?>

<window id="w" title="MVEL Demo">
    You see a textbox appended with MVEL:
    ${new Datebox().setParent(w)}
    Another example:
    ${new org.zkoss.zul.Textbox().setParent(w)}
    Another:
    ${new Combobox().setParent(w)}
</window>
```

> ------------------------------------------------------------------------
>
> <references/>



[^1]: Notice that the package names are all changed, and the dependency
    of JSP EL is removed, so it is OK to run under any Web server
    without any conflict

[^2]: Both MVEL and OGNL are supported in ZK EE.
