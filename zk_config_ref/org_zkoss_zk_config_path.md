**Property:**

`org.zkoss.zk.config.path`

`Default: `none

It specifies another configuration file in addition to `WEB-INF/zk.xml`.
This is useful if you have two or more environments, such as testing and
production. Then, you could put the different configurations into
separate files and load the required files based on the requirement.

The value can be one of the following:

- **A servlet path**: a path that
  [ServletContext.getResourceAsStream()](https://docs.oracle.com/javaee/7/api/javax/servlet/ServletContext.html#getResource-java.lang.String-)
  can accept, such as:
  - a path under web context path
  - a path under `/WEB-INF/`, e.g. `/WEB-INF/config/zk-extra.xml`
  - relative to the `/META-INF/resources` directory of a JAR file inside
    the web application's /WEB-INF/lib directory
- **A file path**, such as
  [`file:///home/http/zk.xml`](file:///home/http/zk.xml) and
  [`file:///C:/test/zk.xml`](file:///C:/test/zk.xml), if you use
  Windows. Notice it must start with [`file://`](file://) (For more
  information about the URI of a file, please refer to [File URI
  scheme](http://en.wikipedia.org/wiki/File_URI_scheme).)
- **A URL**, such as `http://foo.com/config/zk.xml`. Notice it must
  starts with [`http://`](http://), [`https://`](https://), and
  [`ftp://`](ftp://).
- 

Notice that `WEB-INF/zk.xml` is always loaded, and it is loaded before
the configuration file specified in this system property. Thus, you
could put the configurations common to each environment in
`WEB-INF/zk.xml`, and put the difference to the extra configuration
file.

For example, assume you put the configuration in a file called
`/configs/zk-production.xml`, then you could specify
`-Dorg.zkoss.zk.config.path=`[`file:/configs/zk-production.xml`](file:/configs/zk-production.xml)
as one of the arguments when starting the Web server.

Another example is to provide an ID generator for the testing purpose.
For more information, please refer to [ZK Developer's Reference: Testing
Tips]({{site.baseurl}}/zk_dev_ref/Testing/Testing_Tips#Different_Configuration_for_Different_Environment).

# Version History

| Version | Date        | Content    |
|---------|-------------|------------|
| 5.0.7   | April, 2011 | Introduced |
