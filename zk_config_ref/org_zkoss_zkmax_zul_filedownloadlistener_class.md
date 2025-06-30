**Property:**

`org.zkoss.zkmax.zul.FiledownloadListener.class`

Default:  `none`  
`[Since 3.5.0]`

It specifies the name of the class that will be notified when a file
download is happening. The class must implement the
[org.zkoss.zkmax.zul.FiledownloadListener](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/FiledownloadListener.html)
interface.

A developer usually uses it to reject a download if the user tried to
resume it in an unacceptable situation. For example, a developer can
limit the user from downloading within the upcoming 24 hours.
