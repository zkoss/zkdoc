**Property:**

`org.zkoss.zkmax.zul.FiledownloadListener.class`

`Default: `<i>`none`</i>  
`[Since 3.5.0]`

It specifies the name of the class that will be notified when a file
download is happening. The class must implement the
<javadoc type="interface">org.zkoss.zkmax.zul.FiledownloadListener</javadoc>
interface.

A developer usually uses it to reject a download if the user tried to
resume it in an unacceptable situation. For example, a developer can
limit the user from downloading within the upcoming 24 hours.
