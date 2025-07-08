This section describes what a **Widget Package Descriptor** is. This is
required for the component. However, you could skip it if you do not
have to develop components. For more information about component
development, please refer to [ZK Component Development Essentials](/zk_component_dev_essentials/zk_component_overview).

The Widget Package Descriptor (WPD) is a file describing the information
of a package, such as its widget classes and external JavaScript files.
WPD must be named **zk.wpd** and placed in the same directory as the
widget classes. For example we would place it under **web/js/com/foo**.

Below is an example `zk.wpd` of our `SimpleLabel`.

```xml
<package name="com.foo" language="xul/html">
    <widget name="SimpleLabel"/>
</package>
```

The table below describes the elements used within the above XML and
their descriptions.

| Name    | Description                                                                                                     |
|---------|-----------------------------------------------------------------------------------------------------------------|
| package | The root element denotes the package name and the language it belongs to                                        |
| widget  | The widget class name (without the package name). If the package contains multiple widgets list them one by one |

Having created the configuration the basic implementation of our
component is complete. However it doesn't have any interactive events.
Therefore the next logical step is to start adding events to the
component.

# Package Dependence

It is common for JavaScript packages to depend on another package. For
example, `zul.grid` depends on `zul.mesh` and `zul.menu`. This can
easily be specified by placing them within the `depends` attribute as
follows.

```xml
<package name="zul.grid" language="xul/html" depends="zul.mesh,zul.menu">
    <widget name="Column"/>
    <widget name="Columns"/>
    <widget name="Grid"/>
    <widget name="Row"/>
    <widget name="Rows"/>
    <widget name="Foot"/>
    <widget name="Footer"/>
</package>
```

# Including additional JavaScript files

If a JavaScript package has to include other JavaScript files, this can
be done easily by specifying the file with the `script` element. For
example, the following is the content of `zul.db`'s WPD:

```xml
<package name="zul.db" language="xul/html" depends="zk.fmt,zul.inp">
    <script src="datefmt.js"/>
    <widget name="Calendar"/>
    <widget name="Datebox"/>
</package>
```
