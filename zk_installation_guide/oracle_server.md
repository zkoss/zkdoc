# Oracle OC4J and Oracle OPMN Release 3

OC4J 10.1.3 (release 3) is the first production version of Oracle
Containers to support J2EE 1.4 specification (Servlet 2.4).

1.  Download OC4J 10.1.3 or later from <http://www.oracle.com> and
    install it.
2.  You must setup OC4J to run with the -userThreads parameter at the
    command line (oc4j.cmd, on OPMN this is done inside the opmn.xml
    <data id="oc4j-options" value="-userThreads" />)
3.  Unzip zk-1.2.0-2006-04-07.zip or later version
4.  Copy dist/lib/\*.jar and dist/lib/ext/\*.jar to the
    \$OC4J_HOME/j2ee/home/applib
5.  Start OC4J server and enter a new oc4jadmin's password if prompted
    or restart the server if it is already up
6.  Open "Enterprise Manager" application - just browse to
    <http://localhost:8888/em/>
7.  Login as oc4jadmin and go to Applications --\> Deploy page
8.  Deploy zkdemo.war (follow the on-screen instructions)
9.  Browse to <http://localhost:8888/zkdemo/userguide>
    - Substitute "/zkdemo" with the context uri you entered in EM during
      deployment
    - Start OC4J Server:

  
  
`bin/oc4j -start`

## 10.1.2 and earlier

Prior versions 10.1.2.0.2, 10.1.2.0.1 supports only J2EE 1.3 (with
Servlet 2.3), WEB-INF/web.xml shall be replaced with [Sample of web.xml
for Servlet
2.3](ZK_Background/Sample_of_web.xml_for_Servlet_2.3).

Notice that ZK supports Servlet 2.3 but the web.xml configuration file
is a bit different. Also notice that ZK 6 and later no longer support
Java 1.4.


