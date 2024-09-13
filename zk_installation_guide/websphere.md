### IBM WebSphere

1.  IBM offers a websphere application server community edition. Please
    go to
    <http://www-128.ibm.com/developerworks/downloads/ws/wasce/?S_TACT=105AGX10&S_CMP=WASCE>
    to download it.  
2.  Follow the instruction to download, you might need to register for
    an account if you don't already have one.  
3.  Under downloads, choose Server and 32bit IBM SDK 1.4.2 SR4-1,
    procees to download.  
4.  Start the installer and accepts all defaults.  
5.  Once installation is completed, go to All Programs-\>IBM
    Websphere-\>Application Server-\>Profiles-\>Default-\>Start the
    Server, this will start the server.  
6.  Browse <http://localhost:9060/ibm/console/secure/logon.do> to deploy
    application  
7.  After deployed, applications can be access via
    <http://localhost:9080/myapp>
8.  For additional documentation and tutorials, go to
    <http://publib.boulder.ibm.com/wasce/Front_en.html>

> ------------------------------------------------------------------------
>
> ZK supports Servlet 2.3, 2.4 and later. The only difference is the
> content of WEB-INF/web.xml is a little bit different. Please refer to
> [Sample of
> web.xml](ZK_Installation_Guide/ZK_Background/Sample_of_web.xml)
> and [Sample of web.xml for Servlet
> 2.3](ZK_Installation_Guide/ZK_Background/Sample_of_web.xml_for_Servlet_2.3).

### IBM WebSphere 7

#### Import war file

1\. Applications -\> Application Types -\> WebSphere enterprise
applications -\> Click install button
![](images/wb7-step1-installApplication.png "wb7-step1-installApplication.png")
2. Select war file to import
![](images/wb7-step2-importWarFile.png "wb7-step2-importWarFile.png") 3. Select
Fast Path ![](images/wb7-step3-fastPath.png "wb7-step3-fastPath.png") 4. Go
through Steps, in Step 4, input Context Root
![](images/wb7-step4-goThroughSteps-setRoot.png "wb7-step4-goThroughSteps-setRoot.png")
5. Save configuration ![](images/wb7-step5-save.png "wb7-step5-save.png") 6.
Start application
![](images/wb7-step6-startApplication.png "wb7-step6-startApplication.png")

#### Find web application port

1\. Servers -\> Server Types -\> WebSphere application servers -\> Click
"server1"
![](images/wb7-checkApplicationPort-1.png "wb7-checkApplicationPort-1.png") 2.
Communcations -\> Click on "Ports"
![](images/wb7-checkApplicationPort-2.png "wb7-checkApplicationPort-2.png") 3.
Check WC_defaulthost
![](images/wb7-checkApplicationPort-3.png "wb7-checkApplicationPort-3.png")

#### View Web application

![](images/wb7-zkdemo.png)


