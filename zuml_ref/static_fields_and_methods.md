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

# Version History
