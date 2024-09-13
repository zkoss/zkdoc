**Syntax:**

<failover-manager-class>*`a_class_name`*</failover-manager-class>

`[Default: `*`none`*`]`

It specifies which class should be used to handle the failover. This is
called to recover a desktop, when ZK cannot locate the desktop. The
class must have a default constructor (without any argument), and
implement the
<javadoc type="interface">org.zkoss.zk.ui.sys.FailoverManager</javadoc>
interface.

In most cases, you don't need to provide any implementation. Rather, you
can let Web servers to handle failover and clustering for you by
specifying the
<javadoc>org.zkoss.zk.ui.http.SerializableUiFactory</javadoc> class in
the `ui-factory-class` element as described above.


