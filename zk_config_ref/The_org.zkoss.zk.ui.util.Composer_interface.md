**Listener:**

`org.zkoss.zk.ui.util.Composer`

A listener could implement
<javadoc type="interface">org.zkoss.zk.ui.util.Composer</javadoc>, such
that it can process the creation of ZK pages like a composer specified
in [the apply
attribute](ZUML_Reference/ZUML/Attributes/apply). It is also
known as *system-level composers*.

Each time a ZK page, including ZK pages and richlets, is created, ZK
will instantiate one instance for each registered system-level composer
and then invoke
<javadoc method="doAfterCompose(org.zkoss.zk.ui.Component)" type="interface">org.zkoss.zk.ui.util.Composer</javadoc>
with each root component. The system-level composer is usually used to
post-process ZK pages, such as adding a trademark. If you want to
process only certain pages, you can check the request path by calling
<javadoc method="getRequestPath()" type="interface">org.zkoss.zk.ui.Desktop</javadoc>
(the desktop instance can be found in the given component).

If the system-level composer also implements
<javadoc type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc>, it
can be used to handle more situations, such as exceptions, like any
other composer can do.

If the system-level composer also implements
<javadoc type="interface">org.zkoss.zk.ui.util.FullComposer</javadoc>,
it will be invoked when each component is created. It provides the
finest grain of control but a wrong implementation might degrade the
performance.

Notice that since a new instance of the composer is created for each
page, there is no threading issues.

  
**Richlet**

<!-- -->

  
The system-level composers are applied to richlets too. In addition, a
system-level composer can implement
<javadoc type="interface">org.zkoss.zk.ui.util.ComposerExt</javadoc> to
handle exceptions for a richlet, such as `doCatch` and `doFinally`.
However, `doBeforeCompose` and `doBeforeComposeChildren` won't be
called.

<!-- -->

  
<javadoc type="interface">org.zkoss.zk.ui.util.FullComposer</javadoc> is
not applicable to richlets. In other words, system-level composers are
called only for the root components.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
