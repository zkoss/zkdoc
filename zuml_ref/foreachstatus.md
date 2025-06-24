# forEachStatus – [org.zkoss.zk.ui.util.ForEachStatus](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ForEachStatus.html)

The status of an iteration. It is an instance of
[org.zkoss.zk.ui.util.ForEachStatus](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ForEachStatus.html).
ZK exposes the information relative to the iteration taking place when
evaluating the iterative element.

```xml
<listbox width="100px">
    <listitem label="${forEachStatus.index}: ${each}" forEach="Best, Better, Good"/>
</listbox>
```

Note: `forEachStatus.index` is absolute with respect to the underlying
collection, array or other type. For example, if `forEachBegin` is `5`,
then the first value of `forEachStatus.index` will be `5`.

To retrieve the information of the outer iterator if an iteration is
nested, you could use
[org.zkoss.zk.ui.util.ForEachStatus#getPrevious()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ForEachStatus.html#getPrevious()).

```xml
<listbox forEach="${matrix}">
    <listitem label="${forEachStatus.previous.each.label}: ${each}" forEach=${each.items}/> <!-- nested-->
</listbox>
```

[org.zkoss.zk.ui.util.ForEachStatus#getEach()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ForEachStatus.html#getEach())
has been and removed, please use
[org.zkoss.zk.ui.util.ForEachStatus#getCurrent()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ForEachStatus.html#getCurrent())
instead. For example, replace `${forEachStatus.previous.each.label}`
with `${forEachStatus.previous.current.label}`.


