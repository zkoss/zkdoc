\_\_TOC\_\_

ZK aims to be as thin as the presentation tier. In addition, as the code
executes at the server, so connecting database is no different from any
desktop applications. In other words, ZK doesn't change the way you
access the database, no matter you use JDBC or other persistence
framework, such as [Hibernate](http://www.hibernate.org/).

# Use JDBC

The simplest way to use JDBC, like any JDBC tutorial might suggest, is
to use `java.sql.DriverManager`. Here is an example to store the name
and email into a [MySQL](http://www.mysql.com/) database.

``` java
 
public class JdbcComposer extends SelectorComposer<Window> {

    private static Logger log = Logger.getLogger(JdbcComposer.class.getName());
    @Wire
    private Textbox name;
    @Wire
    private Textbox email;

    @Listen("onClick = button")
    public void submit() {
        PreparedStatement stmt = null;
        Connection conn = null;
        try {
            //load driver and get a database connection
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(
                    "jdbc:mysql://localhost/test?user=root&password=R3f@ct0r");
            stmt = conn.prepareStatement("INSERT INTO user values(?, ?)");

            //insert what end user entered into database table
            stmt.setString(1, name.getValue());
            stmt.setString(2, email.getValue());

            //execute the statement
            stmt.executeUpdate();
        } catch(Exception e){
            log.severe(e.toString());
        }finally { //cleanup
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ex) {
                    log.severe(ex.toString()); //log and ignore
                }
            }
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException ex) {
                    log.severe(ex.toString()); //log and ignore
                }
            }
        }
    }   
}
```

``` xml
<window title="JDBC demo" border="normal" apply="org.zkoss.reference.developer.integration.JdbcComposer">
     <vbox>
         <hbox>Name : <textbox id="name"/></hbox>
         <hbox>Email: <textbox id="email"/></hbox>
         <button label="submit"/>
     </vbox>
 </window>
```

Though this way is simple, but it has obvious drawback. After all, ZK
applications are web-based applications, where loading is unpredictable
and treasurable resources such as database connections have to be
managed more effectively.

Luckily, all J2EE frameworks and Web servers support a utility called
connection pooling. It is straightforward to use, while managing the
database connections well. We will discuss more in the next section.

> ------------------------------------------------------------------------
>
> **Tip:** Unlike other Web applications, it is possible to use
> `DriverManager` with ZK, though *not recommended*.

First, you could cache the connection in the desktop, reuse it for each
event, and close it when the desktop becomes invalid. It works just like
traditional Client/Server applications. Like Client/Server applications,
it works efficiently only if there are at most tens concurrent users.

To know when a desktop becomes invalid, you have to implement a listener
by use of
<javadoc type="interface">org.zkoss.zk.ui.util.DesktopCleanup</javadoc>.

# Use a Connection Pool

Connection pool is a mechanism for creating and managing a pool of
connections that are ready to use by a thread that needs them. Instead
of closing a connection immediately, it keeps them in a pool such that
the next connection request could reuse them. Connection pool, in
addition, has a lot of benefits, such as control resource usage.

It's recommended to use connection pool if you want to operate Java
Connection directly when developing web-based applications, including ZK
applications.

The usage of connection pool is simple: configure, connect and close.
The way to connect and close a connection is very similar to the ad-hoc
approach, while the configuration depends on what web server and
database server are in use.

## Connect and Close a Connection

After configuring the connection pool (which will be discussed in the
following section), you could use JNDI to retrieve an connection as
follows.

``` java
public class DatasourceComposer extends SelectorComposer<Window> {

    @Wire
    private Textbox name;
    @Wire
    private Textbox email;

    @Listen("onClick = button")
    public void submit() {

        Connection conn = null;
        PreparedStatement stmt = null;
        try {
            DataSource ds = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/MyDB");
            conn = ds.getConnection();
            //remember that we specify autocommit as false in the context.xml 
            conn.setAutoCommit(true);
            stmt = conn.prepareStatement("INSERT INTO user values(?, ?)");
            stmt.setString(1, name.getValue());
            stmt.setString(2, email.getValue());
            stmt.executeUpdate();

            stmt.close();
            stmt = null;
        } catch (SQLException e) {
            try{
                conn.rollback();
            }catch(SQLException ex){
                //log
            }
            //(optional log and) ignore
        } catch (Exception e) {
            //log
        } finally { //cleanup
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ex) {
                    //(optional log and) ignore
                }
            }
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException ex) {
                    //(optional log and) ignore
                }
            }
        }
    }   
}
```

``` xml
<window title="JDBC demo" border="normal" apply="org.zkoss.reference.developer.integration.DatasourceComposer">
     <vbox>
         <hbox>Name : <textbox id="name"/></hbox>
         <hbox>Email: <textbox id="email"/></hbox>
         <button label="submit"/>
     </vbox>
 </window>
```

**Notes:**

- It is important to close the statement and connection after use.
- You could access multiple databases at the same time with multiple
  connections. Depending on the configuration and J2EE/Web servers,
  these connections could even form a distributed transaction.

## Configure Connection Pool

The configuration of connection pool varies from one J2EE/Web/Database
server to another. Here we illustrate some of them. You have to consult
the document of the server you are using.

### Tomcat 5.5 (and above) + MySQL

To configure connection pool for Tomcat 5.5, you have to edit
`$TOMCAT_DIR/conf/context.xml`[^1], and add the following content under
the <Context> element. The information that depends on your installation
and usually need to be changed is marked in the blue color.

``` xml
 <!-- The name you used above, must match _exactly_ here!
     The connection pool will be bound into JNDI with the name
     "java:/comp/env/jdbc/MyDB"
 -->
 <Resource name="jdbc/MyDB" username="someuser" password="somepass" 
     url="jdbc:mysql://localhost:3306/test" 
     auth="Container" defaultAutoCommit="false" 
     driverClassName="com.mysql.jdbc.Driver" maxActive="20" 
     timeBetweenEvictionRunsMillis="60000" 
     type="javax.sql.DataSource" />
```

Then, in `web.xml`, you have to add the following content under the
<web-app> element as follows.

``` xml
 <resource-ref>
   <res-ref-name>jdbc/MyDB</res-ref-name>
   <res-type>javax.sql.DataSource</res-type>
   <res-auth>Container</res-auth>
 </resource-ref>
```

**Notes**

<references/>

### JBoss + MySQL

The following instructions is based on section 23.3.4.3 of the reference
manual of MySQL 5.0.

To configure connection pool for JBoss, you have to add a new file to
the directory called deploy (`$JBOSS_DIR/server/default/deploy)`. The
file name must end with "`*-ds.xml`" (\* means the database, please
refer to `$JBOSS_DIR/docs/examples/jca/`), which tells JBoss to deploy
this file as JDBC Datasource. The file must have the following contents.
The information that depends on your installation and usually need to be
changed is marked in the blue color.

`mysql-ds.xml:`

``` xml
 <datasources>
     <local-tx-datasource>
         <!-- This connection pool will be bound into JNDI with the name
              "java:/MyDB" -->
         <jndi-name>MyDB</jndi-name>
         <connection-url>jdbc:mysql://localhost:3306/test</connection-url>
         <driver-class>com.mysql.jdbc.Driver</driver-class>
         <user-name>someuser</user-name>
         <password>somepass</password>

         <min-pool-size>5</min-pool-size>

         <!-- Don't set this any higher than max_connections on your
          MySQL server, usually this should be a 10 or a few 10's
          of connections, not hundreds or thousands -->

         <max-pool-size>20</max-pool-size>

         <!-- Don't allow connections to hang out idle too long,
          never longer than what wait_timeout is set to on the
          server...A few minutes is usually okay here,
          it depends on your application
          and how much spikey load it will see -->

         <idle-timeout-minutes>5</idle-timeout-minutes>

         <!-- If you're using Connector/J 3.1.8 or newer, you can use
              our implementation of these to increase the robustness
              of the connection pool. -->

         <exception-sorter-class-name>com.mysql.jdbc.integration.jboss.ExtendedMysqlExceptionSorter</exception-sorter-class-name>
         <valid-connection-checker-class-name>com.mysql.jdbc.integration.jboss.MysqlValidConnectionChecker</valid-connection-checker-class-name>

     </local-tx-datasource>
 </datasources>
```

To specify the JNDI name at which the datasource is available , you have
to add a `jboss-web.xml` file under the WEB-INF folder.

`jboss-web.xml`

``` xml
<jboss-web>
<resource-ref> 
    <res-ref-name>jdbc/MyDB</res-ref-name> 
    <jndi-name> java:/MyDB </jndi-name> 
</resource-ref>
</jboss-web>
```

In `web.xml`, you have to add the following content under the <web-app>
element as follows.

``` xml
 <resource-ref>
   <res-ref-name>jdbc/MyDB</res-ref-name>
   <res-type>javax.sql.DataSource</res-type>
   <res-auth>Container</res-auth>
 </resource-ref>
```

### JBoss + PostgreSQL

``` xml
 <datasources>
     <local-tx-datasource>
     <!-- This connection pool will be bound into JNDI with the name
          "java:/MyDB" -->
     <jndi-name>MyDB</jndi-name>

     <!-- jdbc:postgresql://[servername]:[port]/[database name] -->
     <connection-url>jdbc:postgresql://localhost/test</connection-url>

     <driver-class>org.postgresql.Driver</driver-class>
     <user-name>someuser</user-name>
     <password>somepass</password>
     <min-pool-size>5</min-pool-size>
     <max-pool-size>20</max-pool-size>
     <track-statements>false</track-statements>
     </local-tx-datasource>
 </datasources>
```

# download

- Please download the [source(Tomcat 5.5 (and above) +
  MySQL)](https://sourceforge.net/projects/zkforge/files/Small%20Talks/JDBC%28JNDI%20sample%29/Mysql_tomcat.war/download)
- Please download the [source(JBoss +
  MySQL)](https://sourceforge.net/projects/zkforge/files/Small%20Talks/JDBC%28JNDI%20sample%29/jboss%2Bmysql.zip/download)

[^1]: Thanks Thomas Muller
    ([<http://asconet.org:8000/antville/oberinspector>](http://asconet.org:8000/antville/oberinspector))
    for correction.

    See also
    [<http://tomcat.apache.org/tomcat-5.5-doc/jndi-resources-howto.html>](http://tomcat.apache.org/tomcat-5.5-doc/jndi-resources-howto.html)
    and
    [<http://en.wikibooks.org/wiki/ZK/How-Tos/HowToHandleHibernateSessions#Working_with_the_Hibernate_session>](http://en.wikibooks.org/wiki/ZK/How-Tos/HowToHandleHibernateSessions#Working_with_the_Hibernate_session)
    for more details.
