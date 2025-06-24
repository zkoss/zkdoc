**Syntax:**

```xml
<version>  
    <version-class>a_class</version-class>  
    <version-uid>a_version</version-uid>  
    <zk-version>a_version</zk-version>  
</version>
```

`[Optional]`

It specifies the version of this language definition or addon. It also
controls whether to ignore this document.

First, ZK checks if the specified class (\<version-class\>) matches the
version (\<version-uid\>). Second, it checks if ZK's version is the same
or larger than the version specified in \<zk-version\>.

The specified class, if any, must have a static field called `UID`. ZK
will compare its value with the version specified in \<version-uid\>.
For example,

```java
package foo;
public class MyAddon {
    public static final String UID = "1.0.3";
}
```

Then, you could specify it as follows.

```xml
<version>
    <version-class>foo.MyAddon</version-class>
    <version-uid>1.0.3</version-uid>
    <zk-version>5.0.0</zk-version>
</version>
```

which means `foo.MyAddon.UID` must be 1.0.3, and
[org.zkoss.zk.ui.WebApp#getVersion()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/WebApp.html#getVersion())
must be 5.0.0 or later.


