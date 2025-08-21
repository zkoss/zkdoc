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


#### /dist/lib/ext

This directory holds the external libraries required to run ZK. Since
these libraries are common, you might have already installed them in
your Servlet container. These jar files are optional. You can choose
whether to copy depending on your requirements.

| Filename | Description | License | Version | Shipped |
|----------|-------------|---------|---------|---------|
| commons-codec.jar | Required by zweb module. | Apache | 1.8.0 | All |
| commons-fileupload.jar<br>commons-io.jar | Required if you want to upload files with them. | Apache | 1.3.3<br>2.4 | All |
| javassist.jar | Required by zkbind, zel, and zkmax module. | MPL / LGPL / Apache | 3.18.2.GA | All |
| jcommon.jar<br>jfreechart.jar | Required if you want to use ZUL's chart component. | LGPL | 1.0.23<br>1.0.19 | ZK PE and EE only |
| gson.jar | Required by zkmax components (Fragment, GoldenLayout) and default JSON converter. | Apache | 2.7 | All |
| jasperreports.jar<br>itext.jar<br>commons-collections4.jar<br>commons-logging.jar | Required if you want to use the jasperreport component. | LGPL (jasperreports) | 6.14.0<br>2.1.7js8<br>4.4<br>1.1.1 | ZK PE and EE only |
| bsh.jar | Required if you want scripting in Java interpreter (BeanShell). | LGPL | 2.0b6 | All |
| Filters.jar | Required if you want to use the captcha component. | Apache | 2.0.235 | ZK PE and EE only |
| closure-compiler.jar | Required only if you want to use the sourcemap support while in debugging [ZK-3677](https://tracker.zkoss.org//browse/ZK-3677). **No need for production.** (See [ZK-4712](https://tracker.zkoss.org/browse/ZK-4712)) | Apache | v20200426 | All |
| slf4j-api.jar | Required by most of the ZK modules as a logging facade. | MIT | 1.7.30 | All |
| zsoup.jar | Required by zhtml module. | MIT | 1.8.2.5 | All |

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
