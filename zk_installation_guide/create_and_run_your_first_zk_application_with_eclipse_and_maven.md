

[M2eclipse](https://www.eclipse.org/m2e/) is the first and most mature
of the projects aimed at integrating [Apache
Maven](https://maven.apache.org/) within the Eclipse IDE.

# Prepare Eclipse

## Install Eclipse

Please follow the installation guide for your Eclipse:

  
[ Install
Eclipse](ZK_Installation_Guide/Quick_Start/Create_and_Run_Your_First_ZK_Application_with_Eclipse_and_ZK_Studio#Install_Eclipse)

## Install M2eclipse

Please follow the installation guide for your M2eclipse:

  
[ Install
M2eclipse](ZK_Installation_Guide/Setting_up_IDE/Maven/Setting_up_Maven_on_Eclipse)

## Add ZK Maven Archetype

- **\[Window\]** -\> **\[Preferences\]** -\> **\[Maven\]** --\>
  **\[Archetypes\]**, click *Add Remote Catalog* and type in the catalog
  file as illustrated:
    
  <figure>
  <img
  src="ZK_Installation_Guide_Quick_Start_Create_and_Run_with_Eclipse_and_Maven.png"
  title="ZK_Installation_Guide_Quick_Start_Create_and_Run_with_Eclipse_and_Maven.png" />
  <figcaption>ZK_Installation_Guide_Quick_Start_Create_and_Run_with_Eclipse_and_Maven.png</figcaption>
  </figure>

[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)

- Click **Verify** and then **OK** to add the catalog.
  - If the Remote catalog is <font color="red">empty</font>.<ref>

If an error message appears stating that the Remote catalog is empty,
this is most likely due to a bug in the m2eclipse plugin in v0.12.x,
[MNGECLIPSE-2757](http://issues.sonatype.org/browse/MNGECLIPSE-2757).
Until m2eclipse 0.13.x or newer versions are released and available,
there are two possible workarounds:

1.  Install the "*older version*" 0.10.x from the [Installing
    m2eclipse](http://m2eclipse.sonatype.org/installing-m2eclipse.html)
    website. Users will first need to uninstall m2eclipse 0.12.x,
    restart, and then install 0.10.x available from the following site:
      
    <http://m2eclipse.sonatype.org/sites/m2e/0.10.2.20100623-1649/>
2.  Install the “newer version” from the following site:
    <http://download.eclipse.org/technology/m2e/releases> You first will
    need to uninstall m2eclipse 0.12.x, restart Eclipse before you can
    install the “newer” version from the website above. (Please note:
    the newer version of M2eclipse plugin is not compatible with the old
    Maven Project. Therefore you must enable your maven project with the
    latest M2eclipse plugin from the Installing m2eclipse website.)
3.  Create the plugin from the archetype using the Maven command line
    tool mvn, then use import existing maven project to add the
    generated project to Eclipse. For more details, please refer to [
    Use the command line version of Maven to create a
    project](#Use_the_command_line_version_of_Maven_to_create_a_project).

</ref>

------------------------------------------------------------------------

<references/>

# Create a "Hello World" application with ZK Maven Archetype

## Create a Maven Project

- **\[File\]** -\> **\[New\]** -\> **\[Other\]** --\> **\[Maven
  Project\]**
    
  <figure>
  <img src="images/ZK_Installation_Guide_Quick_Start_Maven_New_project-01.png
  title="ZK_Installation_Guide_Quick_Start_Maven_New_project-01.png" />
  <figcaption>ZK_Installation_Guide_Quick_Start_Maven_New_project-01.png</figcaption>
  </figure>
- Make sure *Create a simple project* is unticked in the first screen of
  the New Maven Project wizard and click **Next \>**.
    
  <figure>
  <img src="images/ZK_Installation_Guide_Maven_Archetype_step1.png
  title="ZK_Installation_Guide_Maven_Archetype_step1.png" />
  <figcaption>ZK_Installation_Guide_Maven_Archetype_step1.png</figcaption>
  </figure>
- From the *Select an Archetype* screen, select **ZK Maven Archetype**
  from the catalog dropdown list.
    
  <figure>
  <img src="images/ZK_Installation_Guide_Quick_Start_Maven_New_project-02.png
  title="ZK_Installation_Guide_Quick_Start_Maven_New_project-02.png" />
  <figcaption>ZK_Installation_Guide_Quick_Start_Maven_New_project-02.png</figcaption>
  </figure>
- Select *zk-archetype-webapp* from the list. (At the time of writing
  this article was at version *'6.0*. Please choose the latest release
  available.').
- Next, fill in details for *group id, artifact id, version* number and
  *package* name.
    
  <figure>
  <img src="images/ZK_Installation_Guide_Quick_Start_Maven_New_project-03.png
  title="ZK_Installation_Guide_Quick_Start_Maven_New_project-03.png" />
  <figcaption>ZK_Installation_Guide_Quick_Start_Maven_New_project-03.png</figcaption>
  </figure>
- The property *zk-version-since* might be
  <font color="red">missing</font>.<ref>

Users who are running this wizard for the first time, ZK Archetype would
not have been downloaded into m2eclipse yet, and as a result may not
populate the *zk-version-since* property correctly, leading to an error
message like the following:

    Unable to create project from archetype [org.zkoss:zk-archetype-webapp:6.0 -> https://mavensync.zkoss.org/maven2/], 
    Archetype org.zkoss:zk-archetype-webapp:6.0 is not configured property ''zk-version-since'' is missing.

The simple workaround for this problem is to just try again after
clicking ‘Finish’ to end the ZK Maven web project wizard. When
re-running the wizard, the zk-version-since property should appear in
the list this time.

</ref>

- Click **Finish** and the Eclipse status bar should say ' *Creating
  zk-archetype-webapp* ' and ' *Updating Maven Dependencies* '. If this
  is the user's first time dealing with ZK libraries, Maven will
  download the necessary dependencies to compile and run this example,
  and would be stored in *.m2/repository* in the user's home directory.
    
  <figure>
  <img src="images/ZK_Installation_Guide_Quick_Start_Maven_New_project-04.png
  title="ZK_Installation_Guide_Quick_Start_Maven_New_project-04.png" />
  <figcaption>ZK_Installation_Guide_Quick_Start_Maven_New_project-04.png</figcaption>
  </figure>

------------------------------------------------------------------------

<references/>

------------------------------------------------------------------------

## Run the application

1.  Go to **Run As** \> **Maven build...**
      
    <figure>
    <img src="images/ZK_Installation_Guide_Quick_Start_Maven_run_project-01.png
    title="ZK_Installation_Guide_Quick_Start_Maven_run_project-01.png" />
    <figcaption>ZK_Installation_Guide_Quick_Start_Maven_run_project-01.png</figcaption>
    </figure>
2.  In the goals field, enter *jetty:stop jetty:run* and tick *Skip
    Tests* then click "Apply" then "Run".
      
    <figure>
    <img src="images/ZK_Installation_Guide_Quick_Start_Maven_run_project-02.png
    title="ZK_Installation_Guide_Quick_Start_Maven_run_project-02.png" />
    <figcaption>ZK_Installation_Guide_Quick_Start_Maven_run_project-02.png</figcaption>
    </figure>
3.  View the result in your browser.

[[`http://localhost:8080/mywebapp/index.zul`](http://localhost:8080/mywebapp/index.zul)](http://localhost:8080/mywebapp/index.zul)

## Packaging your project into a Web Application Archive (WAR)

1.  Go to **Run As** \> **Maven install**
      
    <figure>
    <img src="images/ZK_Installation_Guide_maven_Archetype_pak1.png
    title="ZK_Installation_Guide_maven_Archetype_pak1.png" />
    <figcaption>ZK_Installation_Guide_maven_Archetype_pak1.png</figcaption>
    </figure>
2.  The project will then be packed into a war file and a zip file with
    source code.
      
    <figure>
    <img src="images/ZK_Installation_Guide_Quick_Start_Maven_package_project.png
    title="ZK_Installation_Guide_Quick_Start_Maven_package_project.png" />
    <figcaption>ZK_Installation_Guide_Quick_Start_Maven_package_project.png</figcaption>
    </figure>

# Create a Maven Project with a Command Line Interface

Before starting, you need to [install
maven](https://maven.apache.org/download.cgi) and [set
up](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
first.

- Go to the folder in Eclipse workspace, then run the following command:

``` text
 mvn archetype:generate -DarchetypeCatalog=https://mavensync.zkoss.org/maven2/
```

Then just answer the questions the plugin asks you to create a project.

- The plugin will first ask to choose the archetype from the zk catalog,
  please just enter the number of the archetype
- It will then ask users to enter the values for *groupId*, the
  *artifactId* and the *version* of the project to create and the base
  package for the sources.
- It will then ask for confirmation of the configuration and perform the
  creation of the project.
- In the following example, webapp archetype (number 3) is selected and
  *groupId* is set to **com.foo**, *artifactId* to **mywebapp**,
  *version* to **0.8.0*and*package'' to**com.foo''''.

**NOTE**: in case your maven installation uses the latest
maven-archetype-plugin version 3.0.1 you'll have to use the following
command (using 2.4 as a fallback -
[ARCHETYPE-519](https://issues.apache.org/jira/browse/ARCHETYPE-519)):

` $ mvn org.apache.maven.plugins:maven-archetype-plugin:2.4:generate -DarchetypeCatalog=`[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)

` $ mvn archetype:generate -DarchetypeCatalog=`[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)  
` [INFO] Scanning for projects...`  
` [INFO] Searching repository for plugin with prefix: 'archetype'.`  
` [INFO] ------------------------------------------------------------------------`  
` [INFO] Building Maven Default Project`  
` [INFO]    task-segment: [archetype:generate] (aggregator-style)`  
` [INFO] ------------------------------------------------------------------------`  
` [INFO] Preparing archetype:generate`  
` [INFO] No goals needed for project - skipping`  
` [INFO] [archetype:generate {execution: default-cli}]`  
` [INFO] Generating project in Interactive mode`  
` [INFO] No archetype defined. Using maven-archetype-quickstart (org.apache.maven.`  
` archetypes:maven-archetype-quickstart:1.0)`  
` Choose archetype:`  
` 1: `[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)` -> zk-archetype-component (An archetype `  
` that generates a starter ZK component project)`  
` 2: `[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)` -> zk-archetype-extension (An archetype `  
` that generates a starter ZK extension project)`  
` 3: `[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)` -> zk-archetype-webapp (An archetype that`  
` generates a starter ZK CE webapp project)`  
` 4: `[`https://mavensync.zkoss.org/maven2/`](https://mavensync.zkoss.org/maven2/)` -> zk-ee-eval-archetype-webapp (An `  
` archetype that generates a starter ZK EE-eval webapp project)`  
` Choose a number: : 3`  
` Define value for property 'groupId': : com.foo`  
` Define value for property 'artifactId': : mywebapp`  
` Define value for property 'version': 1.0-SNAPSHOT: 0.8.0`  
` Define value for property 'package': com.foo:`  
` [INFO] Using property: zk-version-since = 6.0.1`  
` Confirm properties configuration:`  
` groupId: com.foo`  
` artifactId: mywebapp`  
` version: 0.8.0`  
` package: com.foo`  
` zk-version-since: 6.0.1`  
` Y:`  
` [INFO] ------------------------------------------------------------------------`  
` [INFO] BUILD SUCCESSFUL`  
` [INFO] ------------------------------------------------------------------------`  
` [INFO] Total time: 29 seconds`  
` [INFO] Finished at: Fri Jun 22 16:55:27 CST 2012`  
` [INFO] Final Memory: 13M/150M`  
` [INFO] ------------------------------------------------------------------------`

## Run the Project

The project created by archetypes above should have a maven jetty plugin
configured, you can just run the project with the command below:

`mvn jetty:run`

## Import a Maven project into Eclipse

- **\[File\]** -\> **\[Import\]** -\> **\[Maven\]** --\> **\[Existing
  Maven Projects\]**
    
  <figure>
  <img src="images/ZK_Installation_Guide_Quick_Start_Maven_import.png
  title="ZK_Installation_Guide_Quick_Start_Maven_import.png" />
  <figcaption>ZK_Installation_Guide_Quick_Start_Maven_import.png</figcaption>
  </figure>
- After this, the user should now get a new project in the Package
  explorer.
    
  <figure>
  <img src="images/ZK_Installation_Guide_Quick_Start_Maven_New_project-04.png
  title="ZK_Installation_Guide_Quick_Start_Maven_New_project-04.png" />
  <figcaption>ZK_Installation_Guide_Quick_Start_Maven_New_project-04.png</figcaption>
  </figure>

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
