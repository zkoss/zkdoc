\_\_TOC\_\_

[ZK Studio](http://www.zkoss.org/product/zkstudio) is an Eclipse plugin
to simplify the development of ZK applications with Eclipse.

If you prefer to install it manually or use with other IDE, please refer
to [Create and Run Your First ZK Application
Manually](ZK_Installation_Guide/Quick_Start/Create_and_Run_Your_First_ZK_Application_Manually).

# Prepare Eclipse

You can follow [ZK Studio Installation
Guide](http://books.zkoss.org/wiki/ZK_Studio_Essentials/Installation) to
install ZK Studio. There are prerequisites you have to set up before
installing ZK Studio:

## Java SE Development Kit (JDK)

Java SE Development Kit version 1.6 or later is required in order to run
Eclipse with ZK Studio, you can download them from [Oracle official
website](http://www.oracle.com/technetwork/java/javase/downloads). Note
that if you are with ZK 9+ then JDK 1.8 or later is required.

## Eclipse IDE for Java EE Developers

ZK Studio is an Eclipse Plug-in so you must install Eclipse in advance.

1.  Visit [Eclipse download page](http://www.eclipse.org/downloads/) and
    download **Eclipse IDE for Java EE Developers**. Version 3.7
    (Indigo) and 4.2(Juno) and later versions are currently supported.
2.  Uncompress it to a proper directory
3.  Then, Eclipse is ready to start for use.
      
    You can double-click `eclipse.exe` to start Eclipse under Windows.

You can refer to [**WTP Tutorials – Building and Running a Web
Application**](http://www.eclipse.org/webtools/community/tutorials/BuildJ2EEWebApp/BuildJ2EEWebApp.html)
for a tutorial.

## Installing ZK Studio

Please follow the [ installation
guide](ZK_Studio_Essentials/Installation#Installation_Guide)
to install ZK Studio.

## Application Servers

Before developing web applications in Java with ZK, you need to install
an application server. Apache Tomcat is one of the most popular Web
containers. Tomcat versions 6 and 7 are compatible with ZK Studio and
can be downloaded from the link
[<http://tomcat.apache.org/>](http://tomcat.apache.org/).  
Download the zip file of Tomcat distribution and extract it into a
proper location (with no illegal characters or space in the path name).
Tomcat requires configuration before it works with Eclipse, please see
[ZK Studio Essentials](ZK_Studio_Essentials) for details.

## Defining a Server Runtime

Before deploying and testing your application, you have to install an
application server (such as Tomcat) and specify the server in Eclipse.
For more information on how to install an application server, please see
[ZK Installation Guide/Setting up
Servers/Tomcat](ZK_Installation_Guide/Setting_up_Servers/Tomcat).

To specify the server in Eclipse, please follow the instructions below:

1.  From menu goto **Windows \> Preferences**.
2.  Select **Server \> Runtime Environments**, then click **Add**
3.  Select **Apache \> Apache Tomcat v6.0** and then click **Next**
4.  Browse to and select the root directory of the Web server installed
    in your computer
    - For example, the root directory of **Apache Tomcat** might be
      `C:\Program Files\Apache Software Foundation\Tomcat 6.0`
    - For how to install Tomcat, please refer to [this
      section](ZK_Installation_Guide/Setting_up_Servers/Tomcat)
5.  Click **Finish**

# Create a "Hello World" application from scratch with ZK Sutdio

## Create a new "ZK Project"

Select **File \\ New \\ Project...** in Eclipse's menu and it will
display a new project wizard. Click **ZK Project** to create a new ZK
project. For detailed steps, please refer to [Create a New ZK
Project](ZK_Studio_Essentials/Features_of_ZK_Studio/New_ZK_Project)

## Create a new ZUL file

1\. In **Java EE** perspective, right click on the **WebContent** folder
in the **Project Explorer** view (or the **Package Explorer** view) and
select **New \> ZUL**.

![](studio-new-zul-step1.png)

2\. Type **test.zul** in the **File name** textbox and click **Finish**.

![](studio-new-zul-step2.png)

3\. The newly created ZUL File will be opened in the ZUL Editor.

![](studio-a-zul.png)

## Run the application

1\. Right click on the **MyApp** project in an explorer and in the Menu
dialog select **Run As \> Run on Server**

![](studio-run-on-server.png)

2\. If you have not defined a server before, Eclipse will show a dialog
with "Manually define a new server" option selected. Then select
**Apache \> Tomcat v6.0 Server** in the server type dialog and then
click **Finish**.

![](studio-run-select-server.png)

3\. Eclipse will display the result in its internal browser or you can
view the result in your browser.

![](studio-run-result.png)

# Version History

| Version | Date       | Content                 |
|---------|------------|-------------------------|
| 2.0.0   | March 2013 | Update to latest status |
