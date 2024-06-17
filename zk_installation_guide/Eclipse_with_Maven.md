# Setting up on Eclipse

Here describes how to set up [Maven](http://maven.apache.org/) on
Eclipse

## Prerequirement

- JAVA SDK :
    
  **Java 5 or above** is required to run Eclipse and Embedded Maven (you
  can still use any Java version as default in Eclipse and run external
  Maven using Java versions required by Maven)

  **Make sure Eclipse is running on JDK and not on JRE**

## Eclipse Related

- Eclipse : 3.6 or later
  - Go to [Eclipse Downloads](http://www.eclipse.org/downloads)
  - Choose **Eclipse IDE for Java EE Developers** (It included
    [WTP](http://www.eclipse.org/webtools/))

<!-- -->

- Eclipse Plugin, which can be installed by using the Eclipse Update
  Manager. The Eclipse Update Manager can be found by selecting *Install
  New Software...* from the *Help* menu. Then, click *Add*... to add the
  URL as a new update site.
  1.  M2eclipse<ref>

Official installation step

- Eclipse 3.6.\* and 3.7.\*:
  [<http://eclipse.org/m2e/download/>](http://eclipse.org/m2e/download/)
- Eclipse 3.5.\* and 3.6.\*:
  [<http://m2eclipse.sonatype.org/installing-m2eclipse.html>](http://m2eclipse.sonatype.org/installing-m2eclipse.html)

</ref>

:

\*#\*Update Site :

\*#\*:Eclipse 3.6.\* and 3.7.\*:
[<http://download.eclipse.org/technology/m2e/releases>](http://download.eclipse.org/technology/m2e/releases)
(Recommend)

\*#\*:Eclipse 3.5.\* and 3.6.\*:
[<http://m2eclipse.sonatype.org/sites/m2e>](http://m2eclipse.sonatype.org/sites/m2e)
(Please note: This version includes a Maven Archetype [
Bug](ZK_Installation_Guide/Setting_up_IDE/Maven/Use_ZK_Maven_Archetype#Add_ZK_Maven_Archetype).
Therefore it is suggested to download and install a "newer" version of
M2eclipse plugin to avoid this unresolved error.)

\*#:Install **Maven Integration for Eclipse (core feature)**

\*#: ![](ZK_Installation_Guide_m2e.png "ZK_Installation_Guide_m2e.png")

\*#(Optional but recommend) Run-Jetty-Run

\*#\*Update Site :
[<http://run-jetty-run.googlecode.com/svn/trunk/updatesite/>](http://run-jetty-run.googlecode.com/svn/trunk/updatesite/)

\*#\*An amazing plug-in which enables you to run web applications in
Eclipse using its embedded Jetty distribution. You will enjoy the
awesome redeploy speed.

\*#\*Installation and usage documentation [Run-Jetty-Run - Getting
Started](http://code.google.com/p/run-jetty-run/wiki/GettingStarted)

\*#(Optional) M2eclipse Extra[^1]

\*#\*Update Site :
[<http://m2eclipse.sonatype.org/sites/m2e-extras>](http://m2eclipse.sonatype.org/sites/m2e-extras)

\*#:Install **Maven Integration for WTP**

\*#:
![](ZK_Installation_Guide_m2e_extra.png "ZK_Installation_Guide_m2e_extra.png")

\*#(Optional) Eclipse IAM, formerly Q for Eclipse:

\*#:Eclipse Integration for Apache Maven

\*#:Q4e on [Google Code](http://code.google.com/p/q4e/)

\*#(Optional) Subeclipse

\*#: Get the latest subclipse plug-in as per plug-in instructions
[here](http://subclipse.tigris.org/install.html) (use this
<http://subclipse.tigris.org/update_1.6.x>)

\*#: Note: For 64-bit Windows & 64-bit Eclipse installation you will
need to install Silksvn client
[download](http://www.sliksvn.com/en/download) to avoid JavaHL binding
error.

------------------------------------------------------------------------

<references/>

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |

[^1]: This plugin should be installed when you use WTP as your
    development server.
