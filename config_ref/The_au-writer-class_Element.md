**Syntax:**

<au-writer-class>*`a_class_name`*</au-writer-class>

`[Default: `<javadoc>`org.zkoss.zk.au.http.HttpAuWriter`</javadoc>` for ZK CE and PE, or `<javadoc>`org.zkoss.zkmax.au.http.SmartAuWriter`</javadoc>` for ZK EE]`

It specifies which class is used to implement the AU writer. The AU
writer is used to generate the output and send it to the client. The
class must have a default constructor (without any argument), and
implement the
<javadoc type="interface">org.zkoss.zk.au.AuWriter</javadoc> interface.

There are two built-in implementations, `HttpAuWriter` and
`SmartAuWriter`. The former one sends the output the client after the
requests are processed completely. On the other hand, the later one will
send a partial output first if the processing is taking too long (half
of the value specified in the `resend-delay` element). By sending the
partial output, the client will know if the server is still alive.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
