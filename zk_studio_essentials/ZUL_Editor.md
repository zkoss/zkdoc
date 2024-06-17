ZUL Editor is an intelligent text editor designed for authoring \*.zul &
\*.zhtml files. When you double click the zul file or zhtml file in the
**Navigator View**, **Package Explorer View** or **Project Explorer
View** the file will be opened in the ZUL Editor automatically. The
editor provides <i>Syntax Coloring</i>, <i>Syntax Check</i>, <i>Mark
Occurrence</i>, <i>Content Assist</i>, <i>Java Doc Hovering</i>,
<i>Hyperlink Navigation</i> and <i>ZUL file formatting</i>.

# Mark Occurrences

Mark Occurrence is a useful function when you need to trace a certain
variable or component within the code. Move the cursor to a certain
variable, object, method, or class declaration, and selected token's all
occurrences (read/write access) in the currently opened zul file will be
marked.

![](mark1.png)

Mark Occurrence also works when the token is located within an EL
Expression.

![](el_mark.png)

# Syntax Checking

Syntax checking verifies the Java code within zscript against the Java
syntax and MVVM binding expressions.

The vertical ruler indicators on the right hand side will help you
discover how many errors are present in the zul file and the location of
said errors. By clicking on the marker you can jump to the line which
contains the error.

![](syntaxCheckRightBar.png)

The markers on the left hand side show an appropriate error message when
clicked.

![](syntaxCheckLeftMark.png)

Move the mouse on the occurrence of the error marked by a red wavy line
(or the warning marked by a yellow wavy line) and the error message will
be display in a tooltip.

![](syntaxCheckTooltip.png)

Syntax checking also works on data binding expressions.

![](studio-syntax-checking-mvvm.png)

# Syntax Coloring

Java code enclosed within <zscript> and <attribute> tags are colored
appropriately according to the syntax.

![](studio-syntax-coloring.png)

# Content Assist

Content Assist helps you edit a zul file by providing context-sensitive
proposals within a list for ease of insertion.

You need to press "**Ctrl + Space**" to open the content assist popup.
You can change this shortcut in the menu **\[Window\]/
\[Preferences\]**.

For basic usage scenario, please refer to Eclipse official tutorial:

- <http://help.eclipse.org/indigo/topic/org.eclipse.jdt.doc.user/gettingStarted/qs-ContentAssist.htm>
- <http://help.eclipse.org/indigo/topic/org.eclipse.wst.sse.doc.user/topics/tsrcedt005.html>

## ZUL & XML Tag Content Assist

ZUL & XML tags support content assist and can be invoked by using the
default content assist keyboard shortcut.

![](contentAssistXMLTag.png)

This feature doesn't work on those add-on components like ZK Charts and
ZK Spreadsheet.

### Tag Attribute Content Assist

The content within **use** and **apply** attributes also supports
content assist.

![](contentAssistinAttribute.png)

## Zscript Content Assist

Zscript content assist allows you to rapidly implement code by providing
auto completion functionality within **<zscript>`...`</zscript>**,
**<attribute name='onXXX'>`...`</attribute>** code blocks and event
attribute values in the ZUML tag.

![](contentAssistZscript.png)

Classes located in JAR files can also be included in content assist. In
addition to that if the JAR's source code is available, JavaDoc can be
shown beside the content assist window.

![](contentAssistJavaDoc.png)

## EL Expression Content Assist

Inside the EL Expression you can also invoke the content assist via a
keyboard shortcut.

![](contentAssistEL.png)

## MVVM Content Assist

Content assist also helps you write data binding expressions in the
following places:

### Annotation name

<figure>
<img src="studio-contentassist-mvvm-annotation.png"
title=" center | 500px" />
<figcaption> center | 500px</figcaption>
</figure>

### ViewModel's properties

When you enter a **dot** ('.'), it list a ViewModel's properties. ![
center \|
600px](studio-contentassist-mvvm-properties.png " center | 600px")

### Available variables

<figure>
<img src="studio-contentassist-mvvm-variables.png"
title=" center | 700px" />
<figcaption> center | 700px</figcaption>
</figure>

# JavaDoc Hovering

ZK Studio provides Javadoc hovering functionality. When a cursor hovers
over the code, Javadoc belonging to the element will be shown in a
tooltip.

![](JAVADocHover.png)

Please note in order for content assist and Javadoc to work with JAR
files you need to set source and/or Javadoc of said files, please refer
to [Eclipse
help](http://help.eclipse.org/indigo/index.jsp?topic=/org.eclipse.jdt.doc.user/reference/ref-properties-source-attachment.htm)
for more information on how to do this.

# Hyperlink Navigation

Hyperlink Navigation allows you to navigate through project resources
easily. To make use of this feature please follow these steps:

1.  Move your cursor to a certain element within the ZUL Editor and
    press F3.
2.  Hold the Ctrl key on your keyboard, move the mouse pointer over an
    element, if that element can be converted to a hyperlink (that is,
    if the resource supports hyperlink functionality), the element will
    be underlined and clicking the hyperlink will take you to the
    subsequent resource.

## URL Hyperlinks

All elements in the ZUL Editor that represents a URL are usable in this
manner.

## Project Resource Hyperlinks

If a literal string within a zul file is a relative path to a resource
in the projects WebContent folder, then it can be accessed using
Hyperlink Navigation. However, please note that the zul file must have
been opened by the ZUL Editor to perform this functionality.

## ZUL Tag Attribute Hyperlinks

In the ZUL Editor, you can navigate to the Java class specified in
**use="**ClassName**"** and **apply="**ClassName**"** attributes using
Hyperlink Navigation.

![ center \| 700px](studio-hyperlink.png " center | 700px") ![ center \|
700px](studio-hyperlink-class.png " center | 700px")

(For this to work you need to set a source file for that class. If the
class is within a JAR File which does not have a corresponding source
file, please refer to [ Add Source Code and Javadoc Resource to JAR
File](ZK_Studio_Essentials/Eclipse_Tips#Add_Source_Code_and_Javadoc_Resource_to_JAR_File)
for more information on how to do this.)

## Zscript Hyperlinks

Zscript hyperlink navigation also works in the same manner as Eclipse's
Java editor. Within **\<zscript\>...\</zscript\>** and **\<attribute
name = "onXXX"\>...\</attribute\>** tags you are able to navigate to
other functions using hyperlink functionality (Ctrl + click the
resource).

A ZUML tag's event attribute value is also accessible using Hyperlink
Navigation.

![](attrHyperlink.png)

# ZUL File Formatting

ZUL Editor supports zul file source formatting function, in a currently
opened zul editor, right click on a zul file and select **Source /
Format**, the source code will be formatted like a standard xml file,
but the code content in **<zscript>...</zscript>** and
**<attribute name = "onEventName">...</attribute>** will be preserved.
To format part of the content, you should make a selection first and
then follow the above instruction.

You can use a keyboard shortcut to accomplish this task, the default
source format keyboard shortcut is **'Ctrl + Shift + F**. You can
reconfigure the keyboard shortcut as described in [Configure Keyboard
Shortcuts](ZK_Studio_Essentials/Eclipse_Tips#Configure_Keyboard_Shortcuts).

![](sourceFormat.png)
