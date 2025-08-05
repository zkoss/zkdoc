---
title: "Project Properties"
---

In the Project Explorer, Package Explorer, or Navigator view of Eclipse,
right click a project and select "Properties" to open the project's
**Properties** window. Expand the item **ZK**, you can see several
preference pages depending in which type of project you select. If the
selected project is a dynamic web project with ZK support enabled in
Project Facets, you can see all preference pages described below.
Otherwise, **Package Setting** page is invisible.

# ZK

![](images/studio-project-preference-zk.png)

This preference page lists the version number, library location, and the
add-ons currently available for the current project's ZK package.

The **Refresh the ZK Library** button is used to refresh add-on list in
case any library jar files in this project is out of sync.

## Package Setting

![](images/studio-project-preference-package.png)

This preference page allows the user to change the project's ZK package.
To change the project's ZK package, select a different ZK Package on the
list and click Apply.

- **re-associate sources jar files** button

  
Clicking this button will associate zk sources jar files (of the
selected ZK Packages ) with the binary jar files of current project. For
example, zk-sources.jar will be associated with zk.jar, and so on. This
feature will link all zk jar files to its source. Before using this
feature, make sure you have \*-sources.jar files in the
*ZK_Package_folder/libsrc* in ZKs, eg.
*/Zks/Packages/3.5.2/libsrc/zk-sources.jar*.

- **Force override project's existing resources when copying data**

  
When you change the project's applied **ZK Package**, this option
controls whether Eclipse will overwrite all ZK library files .

## ZUL Editor

This preference page lists some of the options you can turn on/off to
improve the performance of the ZUL Editor.

![](images/studio-project-preference-editor.png)

- **Enable mark occurrence**

  
Checking this option will enable the Mark Occurrence feature within the
ZUL Editor. Turn this off for a performance boost.

- **Enable syntax check**

  
Checking this option will enable syntax checking within ZUL Editor. Turn
this off for a performance boost.

- **Enable hyperlinking**

  
Checking this option will enable Hyperlink Navigation within ZUL Editor.
Turn this off for a performance boost.
