# Directory Structure

The content of the ZK binary distribution is as follows.

## /doc

  
This directory holds the documents including release notes and license.

## /dist

### /dist/lib

  
This directory holds the ZK libraries

| Filename                           | Description                                                                            | License    | Shipped           |
|------------------------------------|----------------------------------------------------------------------------------------|------------|-------------------|
| zcommon.jar                        | ZK's common library that ZK depends on (`org.zkoss.*`)                                 | LGPL       | All               |
| zweb.jar                           | ZK's Web library that ZK depends on (`org.zkoss.web.*`)                                | LGPL       | All               |
| zweb-dsp.jar (**Deprecated**)      | ZK's Web library (DSP) that ZK depends on (`org.zkoss.web.servlet.dsp.*`)              | LGPL       | All               |
| zk.jar                             | ZK core functions, such as ZK Loader and Update Engine. (`org.zkoss.zk.*`)             | LGPL       | All               |
| zkwebfragment.jar                  | ZK web-fragment.xml (Servlet 3.0)                                                      | LGPL       | All               |
| zul.jar                            | ZUL components (`org.zkoss.zul.*`)                                                     | LGPL       | All               |
| zhtml.jar                          | ZK HTML (ZHTML) components (`org.zkoss.zhtml.*`)                                       | LGPL       | All               |
| zkbind.jar                         | ZK Bind, including data binding and MVVM.                                              | LGPL       | All               |
| zkplus.jar                         | ZK extra utilities integrated easily with other frameworks. (`org.zkoss.zkplus.*`)     | LGPL       | All               |
| zkplus-legacy.jar (**Deprecated**) | ZK old databind before ZK 6. (`org.zkoss.zkplus.databind.*`)                           | LGPL       | All               |
| zel.jar                            | ZK's implementation of EL 2.2. It is based on Apache Tomcat 7's EL 2.2 implementation. | Apache     | All               |
| zkex.jar                           | ZK professional ZUL components and utilities (`org.zkoss.zkex.*`)                      | Commercial | ZK PE and EE only |
| zml.jar                            | ZK XML components for generating XML output (`org.zkoss.zml.*`)                        | Commercial | ZK PE and EE only |
| zkmax.jar                          | ZK enterprise components and utilities (`org.zkoss.*`)                                 | Commercial | ZK EE only        |
| zuti.jar                           | Shadow elements                                                                        | Commercial | ZK EE only        |
| za11y.jar                          | ZK web accessibility (A11y) support (WCAG 2.0)                                         | Commercial | ZK EE only        |
| client-bind.jar                    | Client MVVM                                                                            | Commercial | ZK EE only        |
| stateless.jar                      | Core of stateless components                                                           | Commercial | ZK EE only        |
| stateless-immutable.jar            | Custom annotation of the immutables for stateless components                           | Commercial | ZK EE only        |
|                                    |                                                                                        |            |                   |

> ------------------------------------------------------------------------
>
> <references/>

#### /dist/lib/theme

  
This directory holds additional ZK themes. It is optional depending on
whether you need them.

<!-- -->

  
There are three kinds of binary distributions: CE, PE and EE. If not
stated explicitly, it is shipped in all distributions.

| Filename       | Description                                            | License | Shipped |
|----------------|--------------------------------------------------------|---------|---------|
| breeze.jar     | Required if you want to use the Breeze theme.          | LGPL    | All     |
| iceblue_c.jar  | Required if you want to use the Iceblue Compact theme. | LGPL    | All     |
| sapphire.jar   | Required if you want to use the Sapphire theme.        | LGPL    | All     |
| silvertail.jar | Required if you want to use the Silvertail theme.      | LGPL    | All     |

> ------------------------------------------------------------------------
>
> <references/>

#### /dist/lib/zkforge

  
This directory holds the additional components and libraries. It is
optional depending on whether you need them.

<!-- -->

  
There are three kinds of binary distributions: CE, PE and EE. If not
stated explicitly, it is shipped in all distributions.

| Filename       | Description                                               | License | Shipped           |
|----------------|-----------------------------------------------------------|---------|-------------------|
| flashchart.jar | Required if you want to use **ZK Flashchart** component.  | LGPL    | All               |
| gmapsz.jar     | Required if you want to use **ZK Google Maps** component. | GPL     | ZK EE only        |
| timelinez.jar  | Required if you want to use **ZK Timeline** component.    | GPL     | ZK PE and EE only |
| timeplotz.jar  | Required if you want to use **ZK Timeplot** component.    | GPL     | ZK EE only        |
| zuljsp.jar     | Required if you want to use **ZK JSP** Tags.              | GPL     | ZK EE only        |

- ckez.jar not shipped with the binary distribution since ZK 6.5.1. You
  could get it from its [GitHub repository](https://github.com/zkoss/zkckeditor/releases)

> ------------------------------------------------------------------------
>
> <references/>

#### /dist/lib/ext

This directory holds the external libraries required to run ZK. Since
these libraries are common, you might have already installed them in
your Servlet container. These jar files are optional. You can choose
whether to copy depending on your requirements.

<table>
<thead>
<tr class="header">
<th width="100"><p>Filename</p></th>
<th width="360"><p>Description</p></th>
<th width="90"><p>License</p></th>
<th width="200"><p>Version</p></th>
<th width="120"><p>Shipped</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><ul>
<li>commons-codec.jar</li>
</ul></td>
<td><p>Required by zweb module.</p></td>
<td><p>Apache</p></td>
<td><p>1.8.0</p></td>
<td><p>All</p></td>
</tr>
<tr class="even">
<td><ul>
<li>commons-fileupload.jar</li>
<li>commons-io.jar</li>
</ul></td>
<td><p>Required if you want to upload files with them.</p></td>
<td><p>Apache</p></td>
<td><ul>
<li>1.3.3</li>
<li>2.4</li>
</ul></td>
<td><p>All</p></td>
</tr>
<tr class="odd">
<td><ul>
<li>javassist.jar</li>
</ul></td>
<td><p>Required by zkbind, zel, and zkmax module.</p></td>
<td><p>MPL / LGPL / Apache</p></td>
<td><p>3.18.2.GA</p></td>
<td><p>All</p></td>
</tr>
<tr class="even">
<td><ul>
<li>jcommon.jar</li>
<li>jfreechart.jar</li>
</ul></td>
<td><p>Required if you want to use ZUL's chart component.</p></td>
<td><p>LGPL</p></td>
<td><ul>
<li>1.0.23</li>
<li>1.0.19</li>
</ul></td>
<td><p>ZK PE and EE only</p></td>
</tr>
<tr class="odd">
<td><ul>
<li>gson.jar</li>
</ul></td>
<td><p>Required by zkmax components (Fragment, GoldenLayout) and default
JSON converter.</p></td>
<td><p>Apache</p></td>
<td><p>2.7</p></td>
<td><p>All</p></td>
</tr>
<tr class="even">
<td><ul>
<li>jasperreports.jar</li>
<li>itext.jar</li>
<li>commons-collections4.jar</li>
<li>commons-logging.jar</li>
</ul></td>
<td><p>Required if you want to use the jasperreport component.</p></td>
<td><p>LGPL (jasperreports)</p></td>
<td><ul>
<li>6.14.0</li>
<li>2.1.7js8</li>
<li>4.4</li>
<li>1.1.1</li>
</ul></td>
<td><p>ZK PE and EE only</p></td>
</tr>
<tr class="odd">
<td><ul>
<li>bsh.jar</li>
</ul></td>
<td><p>Required if you want scripting in Java interpreter
(BeanShell).</p></td>
<td><p>LGPL</p></td>
<td><p>2.0b6</p></td>
<td><p>All</p></td>
</tr>
<tr class="even">
<td><ul>
<li>Filters.jar</li>
</ul></td>
<td><p>Required if you want to use the captcha component.</p></td>
<td><p>Apache</p></td>
<td><p>2.0.235</p></td>
<td><p>ZK PE and EE only</p></td>
</tr>
<tr class="odd">
<td><ul>
<li>closure-compiler.jar</li>
</ul></td>
<td><p>Required only if you want to use the sourcemap support while in
debugging <a
href="https://tracker.zkoss.org//browse/ZK-3677">ZK-3677</a>. <strong>No
need for production.</strong> (See <a
href="https://tracker.zkoss.org/browse/ZK-4712">ZK-4712</a>)</p></td>
<td><p>Apache</p></td>
<td><p>v20200426</p></td>
<td><p>All</p></td>
</tr>
<tr class="even">
<td><ul>
<li>slf4j-api.jar</li>
</ul></td>
<td><p>Required by most of the ZK modules as a logging facade.</p></td>
<td><p>MIT</p></td>
<td><p>1.7.30</p></td>
<td><p>All</p></td>
</tr>
<tr class="odd">
<td><ul>
<li>zsoup.jar</li>
</ul></td>
<td><p>Required by zhtml module.</p></td>
<td><p>MIT</p></td>
<td><p>1.8.2.5</p></td>
<td><p>All</p></td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

- The interpreters for Groovy (groovy.jar), Ruby (jruby.jar), Python
  (jython.jar), JavaScript (js.jar), MVEL (mvel.jar) and OGNL (ognl.jar)
  are not shipped with the binary distribution since ZK 6. You could get
  them from their websites, or from [ZK's Git repository](https://github.com/zkoss/zk/tree/master/dist/lib/ext).

### /dist/src

This directory holds the source codes in JAR format. These JAR files are
used for debugging in IDE, such as Eclipse and NetBeans. You cannot
build the binary libraries from these. Rather, download and uncompress
zk-src-\*.tar.gz.

### /dist/xsd

This directory holds the XSD files that might be useful to develop ZK
applications.

### /dist/WEB-INF

This directory holds the sample configuration file (web.xml and
portlet.xml) and the TLD files. These TLD files are part of JAR files so
they are loaded automatically. We put them here mainly for your
reference only.

# Version History

| Version | Date          | Content                                                                                                                     |
|---------|---------------|-----------------------------------------------------------------------------------------------------------------------------|
| 9.5.1   | November 2020 | [ZK-4712](https://tracker.zkoss.org/browse/ZK-4712) closure-compiler.jar in binary download package conflicts with gson.jar |
