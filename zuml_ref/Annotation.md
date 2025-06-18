`Name: annotation`  
`Namespace: `[`http://www.zkoss.org/2005/zk/annotation`](http://www.zkoss.org/2005/zk/annotation)  
`Namespace shortcut: client`  
`Java: `<javadoc method="ANNOTATION_NAMESPACE">`org.zkoss.zk.ui.metainfo.LanguageDefinition`</javadoc>

It is the reserved namespace for specifying the annotation. By default,
the annotation is recognized by its syntax,
`@`*`name`*`(`*`arguments`*`)`, so you generally don't have to specify
the annotation namespace. For example, the following two statement are
equivalent:

```xml
<textbox value="@bind(vm.p1.firstName)"/> <!-- implies the annotation name space -->
<textbox a:value="@bind(vm.p1.firstName)" xmlns:a="annotation"/> <!-- equivalent to the above -->
```

If you have to specify both the value and annotation of a property, the
annotation namespace is useful. For example,

```xml
<textbox value="abc" a:value="@annot()" xmlns:a="annotation"/>
```

On the other hand, if a value looks like an annotation and you don't
want it to be interpreted as an annotation, you could specify the
component's namespace, such as `zul`. For example,

```xml
<textbox z:value="@thisIsValueNotAnnot()" xmlns:z="zul"/>
```

For the syntax of annotations, please refer to [ZK Developer's
Reference:
Annotations]({{site.baseurl}}/zk_dev_ref/annotations).


