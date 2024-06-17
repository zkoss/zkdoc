**Syntax:**

<engine-class>*`a_class_name`*</engine-class>

`[Default: `<javadoc>`org.zkoss.zk.ui.impl.UiEngineImpl`</javadoc>`]`

It specifies which class is used to implement the UI Engine. The class
must have a default constructor (without any argument), and implement
the <javadoc type="interface">org.zkoss.zk.ui.sys.UiEngine</javadoc>
interface.

One instance of the UI engine is created and shared for each Web
application, so you have to synchronize the access properly.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
