
**Syntax:**

```xml
<?header name="..." value="..." [append="true|false"] [if="..."] [unless="..."] ?>
```

{% include supported-since.html version="5.0.2" %}
Specifies a response header. It has the same effect as the invocation of
[org.zkoss.zk.ui.Execution#setResponseHeader(java.lang.String, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Execution.html#setResponseHeader(java.lang.String, java.lang.String)).

# name

`Required`

Specifies the name of the header, such as `Pragma`.

# value

`Required, EL allowed`

Specifies the value of the header. The value could be an instance of
string or Date (java.util.Date).

# append

` Optional, EL allowed`  
Default: `false`

Specifies whether to append a response header or to replace (aka., set).
By default, it is false. It means that the previous header with the same
name will be replaced. If you want to append the value to the previous
value, specify it to true.
