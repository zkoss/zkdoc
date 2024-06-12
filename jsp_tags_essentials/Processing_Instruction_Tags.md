This section outlines details on processing instruction tags. The
processing instruction tags are used to control how ZK JSP tags shall be
handled.

The shall be placed outside of <zk:page>. For example:

``` xml

<zk:init .../>
<zk:component .../>
<zk:variable-resolver .../>
...
<zk:page>
...
</zk:page>
```

Not all ZUML's [processing
instructions](ZUML_Reference/ZUML/Processing_Instructions)
are available in ZK JSP Tags. Here is a list of the supported processing
instruction tags.
