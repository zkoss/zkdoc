# Prepare Eclipse

## Install Eclipse

1.  Visit [Eclipse download page](http://www.eclipse.org/downloads/) and
    download [Eclipse IDE for Java EE
    Developers](http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/ganymede/SR2/eclipse-jee-ganymede-SR2-win32.zip)
2.  Uncompress it to a proper directory
3.  Then, eclipse is ready to start.
    - For example, you could double-click eclipse.exe to start Eclipse
      under Windows.

# Setting up Eclipse without ZK Studio

Here is the description of using ZK with Eclipse *without* ZK Studio.
However, it is recommended to use [ZK Studio for
Eclipse](http://www.zkoss.org/product/zkstudio.dsp), which is much more
powerful and easier to use.

## How to setup the zul.xsd schema into Eclipse

1.  You should have setup Eclipse to work with ZK. The details is in the
    above smalltalk.
2.  Execute the Eclipse SDK.
3.  Select **Window/Preferences...** from the menu and the
    **Preferences** dialog popup.
4.  Select **Web and XML/XML Catalog** from the left sidebar tree menu
    and the right side is the **XML Catalog** panel.
5.  Select **User Specified Entries** in the **XML Catalog Entries**
    field and press the **Add...** button.
6.  The **Add XML Catalog Entry** dialog now popup:
    - In **URI** field, type in
      **<http://www.zkoss.org/2005/zul/zul.xsd>**. Or, type in
      **ZK_HOME/dist/WEB-INF/xsd/zul/zul.xsd** (ZK_HOME is the directory
      where ZK's zip file was unziped).
    - In **Key Type** field, select **Schema Location**.
    - In **Key** field, type in
      **<http://www.zkoss.org/2005/zul/zul.xsd>**.
    - Press **OK** button.
7.  Now you should see a new entry
    **<http://www.zkoss.org/2005/zul/zul.xsd>** under the **User
    Specified Entires**.
8.  Done.

## How to generate ZUL files from the ZUL schema using Eclipse

1.  You should have setup the zul.xsd schema into Eclipse.
2.  Select **File/New/Other...** from the Eclipse SDK menu and the
    **New** dialog popup.
3.  In **Select a wizard** page, select **XML/XML** from the tree menu
    and press **Next \>** button.
4.  In **Create XML File** page, select **Create XML file from an XML
    schema file** and then press **Next \>** button.
5.  In **XML File Name** page, type or select a proper parent folder for
    your project. It is generally under the **WebContext** folder of
    your project. Then type in the ZUL file name you want to create(e.g.
    helloworld.zul) and press **Next \>** button.
6.  In **Select XML Schema File** page, select **Select XML catalog
    entry** option. You should see the
    **<http://www.zkoss.org/2005/zul/zul.xsd>** in the **XML Catalog**
    list. Now select the entry and press **Next \>** button.
7.  In **Select Root Element** page:
    - In **Root Element** field, pick a proper root element. In most ZK
      applications, it is generally a **window** or an **zk** element.
    - In **Content options** field, you can leave as it is.
    - In **Namespace Information** field, you can select the entry and
      press **edit...** button to take out the prefix or change the
      prefix.
    - Press **Finish** button.
8.  The ZUL file is created and opened on an XML editor window.
9.  Now you can start editing your ZUL file. Press **Alt-/** to open the
    **Content Assist** popup window to help you fill up proper ZUL
    elements and attributes.
10. Done.

### Add Schema to ZUL Manually

Instead of using Eclipse's XML wizard, you could specify the schema
directly in your ZUL document, such that the validation and **Content
Assist** will be enabled automatically. Here is an example.

``` xml
<zk
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="http://www.zkoss.org/2005/zul/zul.xsd">
...
</zk>
```

Notice that you have to specify the schema location in the root element,
and the root element could be any valid ZUL component, such as window.

## How to setup Eclipse to work with zhtml

1.  Select **Window/Preferences...** from the Eclipse SDK menu and the
    **Preferences** dialog will popup.
2.  Select **General** and **Content Types** Catalog from the left
    sidebar tree menu and the right side is the **Content Types** panel.
3.  Select **Text** and **XML** in the Content types and press the
    **Add...** button .
4.  Add \*.zhtml or such as \*.zul, \*.jsp, \*.html etc.
5.  Finally, you can press the **RightClick** on your file and choose
    the **XML editor** in the **Open With** menu.
6.  Done.

## How to setup the Rational Application Developer RAD version of Eclipse to work with zhtml

1.  Select **Window/Preferences...** from the SDK menu and the
    **Preferences** dialog will popup.
2.  Select **Workbench/File Assocations** then click on the top **Add**
    to add a file type \*.zhtml
3.  Click on the lower **Add** and select **HTML Source Page Editor**
    and set it to be default
4.  Done

# See Also

- [Develop ZK Applications with
  Eclipse](http://www.zkoss.org/smalltalks/eclipse/ek.html)

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
