# Install Eclipse

1.  Visit [Eclipse download page](http://www.eclipse.org/downloads/) and
    download [Eclipse IDE for Java EE Developers](http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/ganymede/SR2/eclipse-jee-ganymede-SR2-win32.zip)
2.  Uncompress it to a proper directory
3.  Then, eclipse is ready to start.
    - For example, you could double-click eclipse.exe to start Eclipse
      under Windows.

# Install ZK Studio

Follow [ZK Studio Installation Guide]({{site.baseurl}}/zk_studio_essentials/installation) to install ZK
Studio.

# Defining a Server Runtime

Before deploying and testing your application, you have to install a Web
server (such as Tomcat) and specify the server in eclipse. For
information of installing a server, please refer to [ZK Installation Guide/Setting up Servers/Tomcat](setting_up_servers/tomcat).

To specify the server in eclipse, please do as follows.

1.  From menu goto **Windows \> Preferences**...
2.  Select **Server \> Runtime Environments**, then click **Add**
3.  Select **Apache \> Apache Tomcat v6.0** and click **Next**
4.  Browse to and select the root directory of the Web server installed
    in your computer
    - For example, the root directory of **Apache Tomcat** might be
      `C:\Program Files\Apache Software Foundation\Tomcat 6.0`
    - For how to install Tomcat, please refer to [this section](setting_up_servers/tomcat)
5.  Click **Finish**

# Create and Run Your First ZK Application

After installing Eclipse and ZK Studio, please take a look at [Create and Run Your First ZK Application with Eclipse and ZK Studio](quick_start/create_and_run_your_first_zk_application_with_eclipse_and_zk_studio).


