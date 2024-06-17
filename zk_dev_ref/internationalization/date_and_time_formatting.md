# Overview

By default, the format of date and time, especially the format of
[Datebox](ZK_Component_Reference/Input/Datebox) and
[Timebox](ZK_Component_Reference/Input/Timebox), is
determined by the JVM's default and [the current
locale](ZK_Developer's_Reference/Internationalization/Locale).

In this section, we will discuss how to configure ZK to use a format
other than the JVM. For example, you could configure ZK to use the
preferred format based on the user's preferences.

# The Decision Sequence of Format

The format of date and time is decided in the following sequence.

1.  It checks if an attribute called
    `org.zkoss.web.preferred.dateFormatInfo` is defined in the HTTP
    session (i.e.,
    <javadoc type="interface">org.zkoss.zk.ui.Session</javadoc>). If so,
    it will be used by assuming the value is an instance or a class of
    <javadoc type="interface">org.zkoss.text.DateFormatInfo</javadoc>.
2.  It checks if an attribute called
    `org.zkoss.web.preferred.dateFormatInfo` is defined in the servlet
    context (i.e.,
    <javadoc type="interface">org.zkoss.zk.ui.Application</javadoc>). If
    so, it will be used by assuming the value is an instance or a class
    of
    <javadoc type="interface">org.zkoss.text.DateFormatInfo</javadoc>.
3.  It checks if a property called
    `org.zkoss.web.preferred.dateFormatInfo` is defined in the library
    property (i.e., <javadoc >org.zkoss.lang.Library</javadoc>). If so,
    it will be used by assuming the value is a class of
    <javadoc type="interface">org.zkoss.text.DateFormatInfo</javadoc>.
4.  If none of them is found, it uses the JVM's default based on [the
    current
    locale](ZK_Developer's_Reference/Internationalization/Locale).

In other words, to configure ZK to use a format other than the JVM's
default, you have to:

1.  Implements
    <javadoc type="interface">org.zkoss.text.DateFormatInfo</javadoc> to
    provide the format you want.
2.  Specify the class or an instance of it in the session's attribute or
    application's attribute depending on the requirement of your
    application.

If a class or the class's name is specified, an instance of it is
instantiated each time the server receives a request from the client. It
means the implementation needs not to be thread safe, but at the cost of
instantiation. On the other hand, if an instance is specified as the
attribute value, it will be used for all requests, so it has to be
thread safe.

Also notice that you could specify `short`, `long` and other *standard*
styling in the format property of datebox and timebox, such that the
corresponding format of the styling will be used instead of the default,
`meidum`. For more information, please refer to [the Per-component
Format section](#Per-component_Format).

## Application-level Format

If you want to use the same format for all users, you could specify your
implementation of
<javadoc type="interface">org.zkoss.text.DateFormatInfo</javadoc> in the
library property. For example,

``` xml
<library-property>
    <name>org.zkoss.web.preferred.dateFormatInfo</name>
    <value>foo.MyDateFormatInfo</value>
</library-property>
```

where we assume the implementation is named `foo.MyDateFormatInfo`.

## Per-user Format

If you'd like to configure ZK to allow each user (aka., session) to have
an independent format, you could store an instance of your
implementation of
<javadoc type="interface">org.zkoss.text.DateFormatInfo</javadoc> in the
session's attribute.

For example, you could do this when a user logins.

``` java
import org.zkoss.web.Attributes;
...

 void login(String username, String password) {
     //check password
     ...
     session.setAttribute(Attributes.PREFERRED_DATE_FORMAT_INFO,
         new foo.MyDateFormatInfo(session));
     ...
 }
```

where we assume the implementation is named `foo.MyDateFormatInfo`.

## Per-component Format

[Datebox](ZK_Component_Reference/Input/Datebox) and
[Timebox](ZK_Component_Reference/Input/Timebox) allow a
developer to specify any format they prefer for any instance. For
example,

``` xml
<datebox format="MM d, yyyy"/>
<timebox format="HH:mm"/>
```

However, it is usually better to design a page that depends on the
configuration as described above, rather than specify the format
explicitly in each page. It can be done by specifying the styling rather
than the real format in the format property
(<javadoc method="setFormat(java.lang.String)">org.zkoss.zul.Datebox</javadoc>
and
<javadoc method="setFormat(java.lang.String)">org.zkoss.zul.Timebox</javadoc>).
There are four different styles: short, medium, long and full
(representing the styling defined in java.text.DateFormat, SHORT,
MEDIUM, LONG and FULL). For example,

``` xml
<datebox format="short"/>
<datebox format="long"/>
<timebox format="medium"/>
```

Then, the real format will be decided by your implementation of
<javadoc type="interface">org.zkoss.text.DateFormatInfo</javadoc>, if
any, or the JVM's default.

In addition, you could specify the date/time format in the syntax of
`styling_for_date+styling_for_time`, such as:

``` xml
<datebox format="long+medium"/>
```

which specifies the date/time format with the long styling for date and
the medium styling for time.

### Per-component Locale

In addition to [the current
locale](ZK_Developer's_Reference/Internationalization/Locale),
you could specify the locale for individual instances of datebox and
timebox. Then, the real format will depend on the locale and the format
you specified. For example,

``` xml
<datebox format="medium" locale="de"/>
<timebox format="long" locale="fr"/>
```

**Note:** the language of the format and the datebox's calendar is the
same as the locale you specified.

# Customization

ZK generates all date related strings in Java according to locale e.g.
the day of the week (Sun, Mon, Tue...). If you need a customized format
or a locale that JDK doesn't support. You can create such date related
text by yourselves.

The default values in English are:

``` javascript
zk.DOW_1ST=0;
zk.MINDAYS=1;
zk.ERA="AD";
zk.YDELTA=0;
zk.SDOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
zk.S2DOW=zk.SDOW;
zk.FDOW=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
zk.SMON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
zk.S2MON=zk.SMON;
zk.FMON=['January','February','March','April','May','June','July','August','September','October','November','December'];
zk.APM=['AM','PM'];
```

You can override just part of them like:

``` javascript
zk.afterLoad('zul.lang', function() {
    zk.SDOW=['Sun_gl','Mon_gl','Tue_gl','Wed_gl','Thr_gl','Fri_gl','Sat_gl']; //set your date string
});//zk.afterLoad
```

You can load the JavaScript file as a [ locale dependent
JavaScript](ZK_Developer's_Reference/Internationalization/Locale-Dependent_Resources)
to override the date string for a specific locale.

# Version History

| Version | Date       | Content                                                                                                      |
|---------|------------|--------------------------------------------------------------------------------------------------------------|
| 5.0.7   | April 2011 | The per-session format of datebox/timebox was introduced. Prior to 5.0.7, the format depends only on locale. |
