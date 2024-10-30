**Syntax:**

<upload-charset-finder-class>a_class_name</upload-charset-finder-class>

`[Default: null]`

It specifies the finder that determines charset (aka.., encoding) for
the uploaded text files if no charset is specified with the content
type.

If the uploaded file is binary, there is no encoding issue at all.

The finder must implement the
<javadoc type="interface">org.zkoss.zk.ui.util.CharsetFinder</javadoc>
interface. Then, when a text file is uploaded, the `getCharset` method
is called and it can determines the encoding based on the content type
and/or the content of the uploaded file.

Notice that it has the higher priority than the `upload-charset`
element, see above.


