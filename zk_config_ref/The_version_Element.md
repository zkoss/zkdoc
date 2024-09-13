**Syntax:**

<version>  
`   `<version-class>*`a_class`*</version-class>  
`   `<version-uuid>*`a_version`*</version-uuid>  
`   `<zk-version>*`a_version`*</zk-version>  
</version>

`[Optional]`

It specifies the version of this configuration. It also controls whether
to ignore this configuration.

First, ZK checks if the specified class (\<version-calss\>) matches the
version (\<version-uuid\>). Second, it checks if ZK's version is the
same or larger than the version specified in \<zk-version\>.

The specified class, if any, must have a static field called `UID`. ZK
will compare its value with the version specified in \<version-uuid\>.
For example,

``` java
package foo;
public class MyAddon {
    public static public static final String UID = "1.0.3";
}
```

Then, you could specify it as follows.

``` xml
<version>
    <version-class>foo.MyAddon</version-class>
    <version-uid>1.0.3</version-uid>
    <zk-version>5.0.0</zk-version>
</version>
```

which means `foo.MyAddon.UID` must be 1.0.3, and
<javadoc method="getVersion()" type="interface">org.zkoss.zk.ui.WebApp</javadoc>
must be 5.0.0 or later.


