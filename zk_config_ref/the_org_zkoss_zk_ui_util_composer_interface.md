**Listener:**

`org.zkoss.zk.ui.util.Composer`

A listener could implement
[org.zkoss.zk.ui.util.Composer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Composer.html), such
that it can process the creation of ZK pages like a composer specified
in [the apply attribute](zuml_ref/apply). It is also
known as *system-level composers*.

Each time a ZK page, including ZK pages and richlets, is created, ZK
will instantiate one instance for each registered system-level composer
and then invoke
[org.zkoss.zk.ui.util.Composer#doAfterCompose(org.zkoss.zk.ui.Component)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/Composer.html#doAfterCompose(org.zkoss.zk.ui.Component))
with each root component. The system-level composer is usually used to
post-process ZK pages, such as adding a trademark. If you want to
process only certain pages, you can check the request path by calling
[org.zkoss.zk.ui.Desktop#getRequestPath()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Desktop.html#getRequestPath())
(the desktop instance can be found in the given component).

If the system-level composer also implements
[org.zkoss.zk.ui.util.ComposerExt](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ComposerExt.html), it
can be used to handle more situations, such as exceptions, like any
other composer can do.

If the system-level composer also implements
[org.zkoss.zk.ui.util.FullComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/FullComposer.html),
it will be invoked when each component is created. It provides the
finest grain of control but a wrong implementation might degrade the
performance.

Notice that since a new instance of the composer is created for each
page, there is no threading issues.

  
**Richlet**

<!-- -->

  
The system-level composers are applied to richlets too. In addition, a
system-level composer can implement
[org.zkoss.zk.ui.util.ComposerExt](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/ComposerExt.html) to
handle exceptions for a richlet, such as `doCatch` and `doFinally`.
However, `doBeforeCompose` and `doBeforeComposeChildren` won't be
called.

<!-- -->

  
[org.zkoss.zk.ui.util.FullComposer](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/util/FullComposer.html) is
not applicable to richlets. In other words, system-level composers are
called only for the root components.

**Instantiation:** An independent instance of the given class is
instantiated each time before the method is invoked. It means it is
thread safe, and all information stored in non-static members will be
lost after called.
