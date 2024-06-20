

`Since 1.1.0`

We usually implement file downloading through
<javadoc>org.zkoss.zul.Filedownload</javadoc> when some events are
triggered [^1]. Following is a simple implementation of downloading a
file:

**download.zul**

``` xml
<zk>
    <div apply="DownloadComposer">
        <button id="btn" label="download" />
    </div>
</zk>
```

**DownloadComposer.java**

``` java
public class DownloadComposer extends GenericForwardComposer {
    @Listen("onClick=#btn")
    public void download() throws IOException {
        Filedownload.save("/hello.txt", "application/octet-stream");
    }
}
```

The download mechanism is a process involving two steps. When you invoke
`save()`, the `Filedownload` simply notifies ZK client engine of the
download URL. Then, ZK client engine downloads such file according to
the referred URL.

**Notes**

<references/>

# Download Files in a Test Case

In order to simulate the behavior of the ZK client engine, ZATS Mimic
introduces the `Resource` interface which represents a downloadable
resource file saved on the server. General steps for testing a download
function are as follows:

1.  perform some operations to trigger the download function, e.g. click
    a button
2.  check the presence of a downloadable resource through a desktop
    agent
3.  fetch and verify the information or content of the resource

``` java
@Test
public void test() throws Exception {
    DesktopAgent desktop = Zats.newClient().connect("/essentials/download.zul");
    Assert. assertNull (desktop. getDownloadable ());
    desktop.query("#btn").click();
    Resource resource = desktop.getDownloadable();
    Assert.assertNotNull(resource);
    Assert.assertEquals("hello..txt", resource.getName());
    String content = fetchContent(resource.getInputStream());
    Assert.assertEquals("Hello world!", content);
}
```

- **Line 14**: Click the button to trigger downloading.
- **Line 15-16**: Since ZATS Mimic handles the response from ZK
  application automatically, we can retrieve current downloadable
  resource files from `DesktopAgent.getDownloadable()`. If the method
  returns a `null` when attempting to retrieve downloadable resources,
  it indicates that there are no downloadable resources after the
  previous operation.
- **Line 17-19**: We can get more information from `Resource`, or fetch
  the content of resource files in binary through the input stream to
  verify the result.

 

[^1]: For more details, please refer to
    [ZK_Component_Reference/Essential_Components/Filedownload](ZK_Component_Reference/Essential_Components/Filedownload)
