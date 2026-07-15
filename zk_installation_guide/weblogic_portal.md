# Introduction

Weblogic Portal provides several types of portlets, if you want to
convert an existing zul page into a portlet, you can consider using a
JSP portlet.

# Add JSP/HTML Portlet

1.  Right click on *portlet* folder \> \[New\] \> \[Portlet\]

    ![ZK Installation Guide Web Logic Portal 01](images/ZK_Installation_Guide_WebLogic_Portal_01.png)
2.  Give a file name then click *Next*.
      
    ![ZK Installation Guide Web Logic Portal 02](images/ZK_Installation_Guide_WebLogic_Portal_02.png)
    
3.  Select **JSP/HTML Portlet** then click *Next*.
      
    ![ZK Installation Guide Web Logic Portal 03](images/ZK_Installation_Guide_WebLogic_Portal_03.png)
    
4.  Check *Minmizable* and *Maximizable* and you can define *title* and
    *zul page location* then click *Create*.
      
    ![ZK Installation Guide Web Logic Portal 04](images/ZK_Installation_Guide_WebLogic_Portal_04.png)
    
# Add Zul page to your webapp

- Create myZulPage.zul in the *WebContent/portlet/myzulpage* folder.
    
  ![ZK Installation Guide Web Logic Portal 05](images/ZK_Installation_Guide_WebLogic_Portal_05.png)
  
# Add portlet to portal page

1.  Drag *myZulPage.portlet* to "Page 1" in the index.portal.
      
    ![ZK Installation Guide Web Logic Portal 06](images/ZK_Installation_Guide_WebLogic_Portal_06.png)
    
2.  Done.
      
    ![ZK Installation Guide Web Logic Portal 07](images/ZK_Installation_Guide_WebLogic_Portal_07.png)
    
# Run the weblogic server

- Run the server and access your application in the following link,
  [<http://localhost:7001/myPortalWebProject/index.portal>](http://localhost:7001/myPortalWebProject/index.portal).
    
  ![ZK Installation Guide Web Logic Portal 08](images/ZK_Installation_Guide_WebLogic_Portal_08.png)
  