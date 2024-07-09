# Introduction

Weblogic Portal provides several types of portlets, if you want to
convert an existing zul page into a portlet, you can consider using a
JSP portlet.

# Add JSP/HTML Portlet

1.  Right click on *portlet* folder \> \[New\] \> \[Portlet\]
      
    <figure>
    <img src="images/ZK_Installation_Guide_WebLogic_Portal_01.png
    title="ZK_Installation_Guide_WebLogic_Portal_01.png" />
    <figcaption>ZK_Installation_Guide_WebLogic_Portal_01.png</figcaption>
    </figure>
2.  Give a file name then click *Next*.
      
    <figure>
    <img src="images/ZK_Installation_Guide_WebLogic_Portal_02.png
    title="ZK_Installation_Guide_WebLogic_Portal_02.png" />
    <figcaption>ZK_Installation_Guide_WebLogic_Portal_02.png</figcaption>
    </figure>
3.  Select **JSP/HTML Portlet** then click *Next*.
      
    <figure>
    <img src="images/ZK_Installation_Guide_WebLogic_Portal_03.png
    title="ZK_Installation_Guide_WebLogic_Portal_03.png" />
    <figcaption>ZK_Installation_Guide_WebLogic_Portal_03.png</figcaption>
    </figure>
4.  Check *Minmizable* and *Maximizable* and you can define *title* and
    *zul page location* then click *Create*.
      
    <figure>
    <img src="images/ZK_Installation_Guide_WebLogic_Portal_04.png
    title="ZK_Installation_Guide_WebLogic_Portal_04.png" />
    <figcaption>ZK_Installation_Guide_WebLogic_Portal_04.png</figcaption>
    </figure>

# Add Zul page to your webapp

- Create myZulPage.zul in the *WebContent/portlet/myzulpage* folder.
    
  <figure>
  <img src="images/ZK_Installation_Guide_WebLogic_Portal_05.png
  title="ZK_Installation_Guide_WebLogic_Portal_05.png" />
  <figcaption>ZK_Installation_Guide_WebLogic_Portal_05.png</figcaption>
  </figure>

# Add portlet to portal page

1.  Drag *myZulPage.portlet* to "Page 1" in the index.portal.
      
    <figure>
    <img src="images/ZK_Installation_Guide_WebLogic_Portal_06.png
    title="ZK_Installation_Guide_WebLogic_Portal_06.png" />
    <figcaption>ZK_Installation_Guide_WebLogic_Portal_06.png</figcaption>
    </figure>
2.  Done.
      
    <figure>
    <img src="images/ZK_Installation_Guide_WebLogic_Portal_07.png
    title="ZK_Installation_Guide_WebLogic_Portal_07.png" />
    <figcaption>ZK_Installation_Guide_WebLogic_Portal_07.png</figcaption>
    </figure>

# Run the weblogic server

- Run the server and access your application in the following link,
  [<http://localhost:7001/myPortalWebProject/index.portal>](http://localhost:7001/myPortalWebProject/index.portal).
    
  <figure>
  <img src="images/ZK_Installation_Guide_WebLogic_Portal_08.png
  title="ZK_Installation_Guide_WebLogic_Portal_08.png" />
  <figcaption>ZK_Installation_Guide_WebLogic_Portal_08.png</figcaption>
  </figure>

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
