In this section, we will demonstrate how to create a ZK maven project
with the Maven plugin.

# Install Maven Plugin First

Unless your Eclipse version/edition already includes it, you have to
install the plugin first. Click **\[Help\]/\[Eclipse Marketplace...\]**
and enter "maven" in "Find" textbox to find **Maven Integration for
Eclipse**. Then click "Install" button.

![](studio-maven-plugin.png)

After completing the installation and restarting Eclipse, we can
continue the following steps.

# Create ZK Maven Project

1\. Select **\[File\]/\[New\]/\[Project\]** to open a New Project
dialog. Then choose **Maven Project** under **Maven** item and click
"Next \>". ![ center \|
500px](studio-maven-project-wizard.png " center | 500px")

2\. Select location. We usually use default workspace location. ![
center \| 500px](studio-maven-project-wizard-2.png " center | 500px")

3\. Enter "zk" in filter to search ZK maven archetypes and select what
you want. Click **Next**. ![ center \|
500px](studio-maven-archetype.png " center | 500px")

- Notice: If you cannot find ZK maven archetypes, please refer to [ Add
  ZK Maven
  Archeype](ZK_Installation_Guide/Quick_Start/Create_and_Run_Your_First_ZK_Application_with_Eclipse_and_Maven#Add_ZK_Maven_Archetype).

4\. Enter preferred ZK version in `zk-version-since` and click
**Finish**. ![ center \|
500px](studio-maven-archetype-parameter.png " center | 500px")

5\. The new ZK maven project is created with ZK dependencies added. ![
center \| 400px](studio-maven-project.png " center | 400px")

# Run ZK Maven Project

1\. Right click on your project icon and select **\[Run as\]/\[Maven
build...\]** to open run configuration dialog. ![ center \|
600px](studio-maven-run.png " center | 600px")

2\. Enter **jetty:run** in **Goals** textbox and click **Run**. ![
center \| 500px](studio-maven-run-jetty.png " center | 500px")

- Running jetty the firs time may take a while because Maven plugins
  needs to download some necessary resources, please be patient.

3\. You can see the server starting messages showing up in Console view.
![ center \| 600px](studio-maven-run-console.png " center | 600px")

Then visit <http://localhost:8080/yourprojectname> to see the result.
