**Listener:**

`org.zkoss.zk.ui.util.Initiator`

A listener could implement
<javadoc type="interface">org.zkoss.zk.ui.util.Initiator</javadoc> to
handle the initialization of a ZUML page and richlets, as if it is
specified in [the init directive](ZUML_Reference/ZUML/Processing_Instructions/init).
This kind of listeners is called system-level initiators.

Each time a ZK page is created, ZK will instantiate one instance for
each registered system-level initiator and the invoke
<javadoc method="doInit(org.zkoss.zk.ui.Page, java.util.Map)" type="interface">org.zkoss.zk.ui.util.Initiator</javadoc>
and other methods.

If you want to process only certain pages, you can check the request
path by calling
<javadoc method="getRequestPath()" type="interface">org.zkoss.zk.ui.Desktop</javadoc>
(the desktop instance can be found in the given component).

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.

# Version History

| Version | Date       | Content                                                   |
|---------|------------|-----------------------------------------------------------|
| 5.0.8   | July, 2011 | The system-level initiators were applied to richlets too. |
| 5.0.7   | May, 2011  | The system-level initiators were introduced.              |
