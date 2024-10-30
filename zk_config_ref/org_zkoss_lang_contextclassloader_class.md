**Property:**

`org.zkoss.lang.contextClassLoader.class`

`Default: `<i>`none`</i>` (it implies `*`Thread.currentThread().getContextClassLoader()`*`)`

It specifies the name of the class used to provide the customized
context class loader. The class must implement the
<javadoc type="interface">org.zkoss.lang.ContextClassLoaderFactory</javadoc>
interface.
