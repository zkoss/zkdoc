# labels - java.util.Map

A map of all [internationalization
labels]({{site.baseurl}}/zk_dev_ref/Internationalization/Labels)
belonging to the current locale
(<javadoc method="getCurrent()">org.zkoss.util.Locales</javadoc>).

For example, if you have a property file as follows:

``` text
owner=Foo Inc.
application.name=Killer
application.title=Killer 2011
```

Then, you could access them with this implicit object as follows.

``` xml
<grid>
   <row>${labels.owner}</row>
   <row>${labels.application.name}</row>
   <row>${labels.application.title}</row>
</grid>
```

Notice that the key of a property could be name as *key1.key2*, and EL
expressions could retrieve them correctly. More precisely, ZK groups the
segmented labels as map. For example, `${labels.app}` was resolved as a
map containing two entries (`title` and `description`).

``` xml
app.title=Foo
app.description=A super application
```

If you have a key named as the prefix of the other keys, you have to use
`$` to access it. For example, `${labels.app.$}` is required to resolve
the label with key named `app`.

``` xml
app=Application
app.title=Foo
app.description=A super application
```

> ------------------------------------------------------------------------
>
> **Under the hood:** The `labels` object is actually the map returned
> by
> <javadoc method="getSegmentedLabels()">org.zkoss.util.resource.Labels</javadoc>.
> Furthermore, if the key of a property contains dot (**.**), all
> properties with the same prefix are grouped as another map. For
> example, `${labels.application}` (i.e.,
> `Labels.getSegmentedLables().get("application")`) will return a map
> containing two entries (`name` and `title`) in the previous example.

# Version History

| Version | Date        | Content                              |
|---------|-------------|--------------------------------------|
| 5.0.7   | March, 2011 | This implicit object was introduced. |
