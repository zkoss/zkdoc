A JAR file could contain a configuration file that will override the
default configuration of a ZK application. The file must be named as
`config.xml` and placed under the `/metainfo/zk` directory. Of course,
the configuration specified in `WEB-INF/zk.xml` has higher priority. It
will override the configuration specified in `/metainfo/zk/config.xml`.

By use of `config.xml`, a JAR file could change the default
configuration without a user's notice, such as adding a desktop
listener, setting a library property, and so on. For more information,
please refer to [ZK Developer's Reference: Packing Code](ZK_Developer's_Reference/Customization/Packing_Code).

{% include DoctypeDisallowed.md %}