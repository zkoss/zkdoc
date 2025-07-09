# Install Tomcat

1.  Visit [Tomcat Official Site](http://tomcat.apache.org/)
2.  Select the correct binary distribution for your environment and
    download
    - For Windows, you might download and execute [32-bit/64-bit Windows Service Installer](http://apache.stu.edu.tw//tomcat/tomcat-6/v6.0.29/bin/apache-tomcat-6.0.29.exe),
      and then follow the instructions
    - Any download/install problem, please refer to
      <http://tomcat.apache.org/tomcat-6.0-doc/index.html>

# Deploy

## Deploy ZK demo application(optional)

The simplest way to test drive ZK existed application is to download and
install the ZK demo application.

*This step is optional. You could skip it if you prefer to start
creating your own application directly.*

1.  Download the lastest zkdemo at
    <http://sourceforge.net/projects/zk1/files/ZK/> (e.g.
    zk-sandbox-6.0.0.zip)
2.  Unzip zk-sandbox-6.0.0.zip
3.  Copy **zkdemo.war** under the <u>zk-sandbox-6.0.0</u> directory to
    \$TOMCAT_HOME/webapps.
4.  Start/ReStart the tomcat services (In some cases, you may need to
    restart your container if it is running.)
5.  Visit <http://localhost:8080/zkdemo>, and then play around with the
    demo application

> ------------------------------------------------------------------------
>
> Deploy war file to Tomcat is very easy but there're something you need
> to know
>
> - Tomcat will unzip the war file to <u>filename\\</u> directory
>   automatically
> - You can *NOT* modify the content of <u>filename\\</u> directory
>   unless you remove the war file, or your modification will not work.
> - For more information about Tomcat's deployer, please refer to
>   <http://tomcat.apache.org/tomcat-6.0-doc/deployer-howto.html>

## Deploy your application with IDE

When developing an application, we usually use IDE to deploy it. For
more information, please refer to the document of your IDE.

If you are new to Java IDE, you might take a look at [Setting up Eclipse with ZK Studio](setting_up_ide/eclipse_with_zk_studio).


