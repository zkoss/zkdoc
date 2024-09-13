# JBoss 4.0 and above

1.  Download Jboss from <http://www.jboss.com/downloads/index> and
    install it,if you haven't installed it.
2.  Test the Jboss using link
    [http://localhost:port](http://localhost:port), if it's OK stop the
    server.
3.  Unzip zk-demo-XXX.zip or zk-demo-XXX.tar.gz
4.  Copy dist/lib/\*.jar and dist/lib/\*/\*.jar to the
    \$JBOSS_HOME/server/default/lib
5.  Copy zkdemo.war to \$JBOSS_HOME/server/default/deploy
6.  Start the server.
7.  Browse to <http://localhost/zkdemo/userguide> or
    <http://localhost:8080/zkdemo/userguide> depending on you
    configuration for JBoss.

by Juan Jose Buendia Mardones (Chile)

# JBoss 3.2.2 + tomcat 4.1

1.  Follow the instruction to install ZK Ajax on tomcat 4.1.
2.  Download the following files and copy them to the lib directory
    under default.
    - bsh-bsf-2.0b4.jar  
    - bsh-core-2.0b4.jar  
    - bsh-2.0b2.jar  
3.  Change the web.xml so that it will fit servlet 2.3 specifications.
4.  We are still working on some problems and I will update this record
    when I'll have the full solution.

When I tried the solution given by Mars Chen some of the components
built upon the Jboss platform didn't function anymore. When doing my
solution however one of the ZK components (the upload file) didn't work.
But for now I did a workaround to use tomcat 5.5 in the background.

by Yaniv Ran (USA)

2.1 There I got another simple solution: using ZK distribution's bsh.jar
into JBoss lib directory to replace bsh-core-version.jar.

Please refer BeanShell official site. ==
<http://www.beanshell.org/download.html> == The bsh-version.jar
containas all files in bsh-core-version.jar.

by Mars Chen (Taiwan)


