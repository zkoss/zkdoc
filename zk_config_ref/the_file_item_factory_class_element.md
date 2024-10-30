**Syntax:**

<file-item-factory-class>`a_class_name''`</file-item-factory-class>

`[Default: null]`

It specifies the class that is used to create a file item for fileupload
or null to use the default. The class must implement the
<javadoc type="interface">org.zkoss.zk.ui.sys.DiskFileItemFactory</javadoc>
interface.

For example,

``` java
public class Foo implements DiskFileItemFactory {
    public FileItem createItem(String fieldName, String contentType,
            boolean isFormField, final String fileName, int sizeThreshold,
            File repository) {
             
        // make this upload file to store into a customized directory.
        return new DiskFileItem(fieldName, contentType, isFormField, fileName, sizeThreshold, repository) {
            protected File getTempFile() {
                return new File("/Users/foo/mypath/" + fileName);
            }
        };
    }

    public Media createMedia(FileItem fi, String contentType,
            String fileName, boolean isNative) {
        try {
            return fi.isInMemory() ? new AImage(fileName, fi.get()) :
                    new AImage(fileName, fi.getInputStream());

        } catch (Exception e) {
            // e.printStackTrace();
        }
        return null;
    }
}
```

# Version History

| Version | Date      | Content                                                               |
|---------|-----------|-----------------------------------------------------------------------|
| 8.0.2   | 2016/2/17 | [The element is introduced](http://tracker.zkoss.org/browse/ZK-3132). |
