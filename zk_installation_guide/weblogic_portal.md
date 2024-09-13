# Introduction

Weblogic Portal provides several types of portlets, if you want to
convert an existing zul page into a portlet, you can consider using a
JSP portlet.

# Add JSP/HTML Portlet

1.  Right click on *portlet* folder \> \[New\] \> \[Portlet\]

    ![](images/ZK_Installation_Guide_WebLogic_Portal_01.png)
2.  Give a file name then click *Next*.
      
   
    ![](images/ZK_Installation_Guide_WebLogic_Portal_02.png)
    
    
3.  Select **JSP/HTML Portlet** then click *Next*.
      
   
    ![](images/ZK_Installation_Guide_WebLogic_Portal_03.png)
    
    
4.  Check *Minmizable* and *Maximizable* and you can define *title* and
    *zul page location* then click *Create*.
      
   
    ![](images/ZK_Installation_Guide_WebLogic_Portal_04.png)
    
    

# Add Zul page to your webapp

- Create myZulPage.zul in the *WebContent/portlet/myzulpage* folder.
    
 
  ![](images/ZK_Installation_Guide_WebLogic_Portal_05.png)
  
  

# Add portlet to portal page

1.  Drag *myZulPage.portlet* to "Page 1" in the index.portal.
      
   
    ![](images/ZK_Installation_Guide_WebLogic_Portal_06.png)
    
    
2.  Done.
      
   
    ![](images/ZK_Installation_Guide_WebLogic_Portal_07.png)
    
    

# Run the weblogic server

- Run the server and access your application in the following link,
  [<http://localhost:7001/myPortalWebProject/index.portal>](http://localhost:7001/myPortalWebProject/index.portal).
    
 
  ![](images/ZK_Installation_Guide_WebLogic_Portal_08.png)
  
  


