# Overview

ZK loads the required JavaScript files only when necessary. It is
similar to Java Virtual Machine's class loader, but ZK's JavaScript
loader loads one JavaScript package at a time. It minimizes the number
of bytes to be loaded to a browser. However, with an Internet
connection, a Web page is loaded faster if the number of files to load
is smaller (assuming the total number of bytes to transmit is the same).

ZK, by default, loads both `zul` and `zul.wgt` packages when the `zk`
package is loaded, since they are the most common packages a ZK page
might use. A ZK page generally uses more packages than that, and you, as
an application developer, can pack them together to minimize the number
of JavaScript files.

Notice that the more packages you pack, the larger the file. It will
then slow down the load time if some of the packages are not required.
Thus, you should only pack the packages that will be required by most
users.

# Minimize the Number of JavaScript Files for a ZUL Page

**Case Study: ZK Sanbox**

In
[index.zul](http://zk1.svn.sourceforge.net/viewvc/zk1/releases/5.0.7/zksandbox/src/archive/index.zul?view=log)
of [ZK Sanbox](http://www.zkoss.org/zksandbox) there are about 15
JavaScript files that will be initially loaded:

`* `[`http://www.zkoss.org/zksandbox/zkau/web/947199ea/js/zk.wpd`](http://www.zkoss.org/zksandbox/zkau/web/947199ea/js/zk.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/947199ea/js/zul.lang.wpd`](http://www.zkoss.org/zksandbox/zkau/web/947199ea/js/zul.lang.wpd)  
`* `[`http://www.zkoss.org/zksandbox/macros/category.js`](http://www.zkoss.org/zksandbox/macros/category.js)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zkmax.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zkmax.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.wgt.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.wgt.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.utl.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.utl.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.layout.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.layout.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.wnd.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.wnd.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.tab.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.tab.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.inp.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.inp.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.box.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.box.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.sel.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.sel.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zk.fmt.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zk.fmt.wpd)  
`* `[`http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.mesh.wpd`](http://www.zkoss.org/zksandbox/zkau/web/_zv2010062914/js/zul.mesh.wpd)

This means that the browser will trigger 15 requests to load the 15
JavaScript files. Even if each file is not too big, it still takes more
time to connect to the server and download it. However, we can specify a
[ DSP](ZK_Developer's_Reference/Supporting_Utilities/DSP)
file to include several JavaScript into one and declare it at the top of
the index.zul.

For example, **/macros/zksandbox.js.dsp**

``` xml
<%@ page contentType="text/javascript;charset=UTF-8" %>
<%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>
<%@ taglib uri="http://www.zkoss.org/dsp/zk/core" prefix="z" %>
${z:setCWRCacheControl()}
<c:include page="~./js/zk.fmt.wpd"/>
<c:include page="~./js/zul.mesh.wpd"/>
<c:include page="~./js/zul.utl.wpd"/>
<c:include page="~./js/zul.layout.wpd"/>
<c:include page="~./js/zul.wnd.wpd"/>
<c:include page="~./js/zul.tab.wpd"/>
<c:include page="~./js/zul.inp.wpd"/>
<c:include page="~./js/zul.box.wpd"/>
<c:include page="~./js/zul.sel.wpd"/>
<c:include page="/macros/category.js"/>
```

**Note:**

1.  The included JavaScript files have their own sequence, so you cannot
    place them in randomly.
2.  The *zk.wpd* is a ZK core JavaScript file hence you don't need to
    include it.
3.  The *zul.lang.wpd* is an I18N message, so you don't need to include
    it.
4.  In ZK 5.0.4 we introduced a new
    feature([\#System-wide_Minimizing_the_Number_of_JavaScript_Files](#System-wide_Minimizing_the_Number_of_JavaScript_Files)).
    However, since the release of this new feature the packages **zul,
    zul.wgt, and zkmax** will be merged automatically into the ZK
    package, so you don't specify them in the the *zksandbox.js.dsp*
    file.
5.  <javadoc method="setCacheControl(java.lang.String, int)">org.zkoss.zk.fn.DspFns</javadoc>
    is used to set the Cache-Control and Expires headers to 24 hours, so
    the JavaScript file will be cached for a day.

**index.zul**

``` xml
<?script type="text/javascript" src="/macros/zksandbox.js.dsp"?>
// omitted
```

# System-wide Minimizing the Number of JavaScript Files

If a package is used by all your pages, you could configure it system
wide by specifying the packages in the language add-on. Please refer to
[ZK Configuration Reference/zk.xml/The language-config
Element](ZK_Configuration_Reference/zk.xml/The_language-config_Element)
for how to specify a language add-on.

For example, if the zul.wnd package
(<javadoc directory="jsdoc">zul.wnd.Window</javadoc>) is required for
all pages, then you could add the following to the language add-on.

``` xml
<javascript package="zul.wnd" merge="true"/>
```

Notice that you have to specify the merge attribute which indicates that
the JavaScript code of the package will be loaded with the `zk` package.
In other words, the `~./js/zk.wpd` will contain all the packages
specified with the merge attribute.

Also notice that if you use several DSP/JSP files to load multiple
packages in a file as described in the previous section, you generally
don't specify them here. Otherwise, you will load the same package twice
(though it is safe, it wastes time).

**Note**: If you merge several JavaScript files into your own
lang-addon.xml, but some JavaScript files need to be counted on
*zul.lang.wpd*, such as the package *zul.inp*, you can't include this
package into your lang-addon.xml. (it will be fixed in ZK 5.0.5+)

## Turn Off the Merging of JavaScript Packages

As described above, both `zul` and `zul.wgt` packages are merged into
the `zk` package. If you prefer to load them separately, you could
disable it by specifying the ondemand attribute as follows.

``` xml
<javascript package="zul" ondemand="true"/>
<javascript package="zul.wgt" ondemand="true"/>
```

Notice that all packages are default to load-on-demand, you rarely need
to specify the ondemand attribute, unless you want to undo the package
that has been specified with the `merge` attribute.

{{ ZKDevelopersReferencePageFooter}}
