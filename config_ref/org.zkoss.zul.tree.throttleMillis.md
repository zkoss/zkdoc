**Property:**

`org.zkoss.zul.tree.throttleMillis`

`Default: 300`

Specifies the millisecond of scrolling throttling in Tree render
on-demand (ROD).

If you prefer to configure a particular component, you could specify it
as the custom attribute of the component or any of its ancestor
components.

``` xml
<tree>
  <custom-attributes org.zkoss.zul.tree.throttleMillis="200"/>
...
```

# Version History

| Version | Date     | Content                                                                                                           |
|---------|----------|-------------------------------------------------------------------------------------------------------------------|
| 9.6.0   | May 2021 | [ZK:4836: tree - avoid scroll timeout/delay to improve user experience](https://tracker.zkoss.org/browse/ZK-4836) |
