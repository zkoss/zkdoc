# forEachStatus – <javadoc type="interface">org.zkoss.zk.ui.util.ForEachStatus</javadoc>

The status of an iteration. It is an instance of
<javadoc type="interface">org.zkoss.zk.ui.util.ForEachStatus</javadoc>.
ZK exposes the information relative to the iteration taking place when
evaluating the iterative element.

``` xml
<listbox width="100px">
    <listitem label="${forEachStatus.index}: ${each}" forEach="Best, Better, Good"/>
</listbox>
```

Note: `forEachStatus.index` is absolute with respect to the underlying
collection, array or other type. For example, if `forEachBegin` is `5`,
then the first value of `forEachStatus.index` will be `5`.

To retrieve the information of the outer iterator if an iteration is
nested, you could use
<javadoc method="getPrevious()" type="interface">org.zkoss.zk.ui.util.ForEachStatus</javadoc>.

``` xml
<listbox forEach="${matrix}">
    <listitem label="${forEachStatus.previous.each.label}: ${each}" forEach=${each.items}/> <!-- nested-->
</listbox>
```

<javadoc method="getEach()" type="interface">org.zkoss.zk.ui.util.ForEachStatus</javadoc>
has been and removed, please use
<javadoc method="getCurrent()" type="interface">org.zkoss.zk.ui.util.ForEachStatus</javadoc>
instead. For example, replace `${forEachStatus.previous.each.label}`
with `${forEachStatus.previous.current.label}`.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
