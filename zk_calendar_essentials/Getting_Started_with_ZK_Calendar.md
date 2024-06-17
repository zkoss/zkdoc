Here we introduce the required setup for a web application to use ZK
Calendar.

# License

ZK Calendar is GPL/Commercial dual-licensed.

# Setup by Maven

We recommend managing your project with Maven. First, you check the
available version in [ZK Maven CE
repository](https://mavensync.zkoss.org/maven2/org/zkoss/calendar/calendar/).
Then, you can adopt ZK Calendar easily by simply adding a dependency
like the following example. (If you didn't setup zk maven repository
yet, you have to [ setup zk maven
repository](ZK_Installation_Guide/Setting_up_IDE/Maven/Use_ZK_Maven_Artifacts/Resolving_ZK_Framework_Artifacts_via_Maven#How_to_Use_ZK_Maven_Repository).)

``` xml
<dependency>
    <groupId>org.zkoss.calendar</groupId>
    <artifactId>calendar</artifactId>
    <version>${calendar.version}</version>
</dependency>
```

# Manually Installing the ZK Calendar JAR

1.  [Downloaded ZK CE 7.0.3 or
    above](http://www.zkoss.org/download/zk.dsp)
2.  [Downloaded ZK Calendar
    Binary](http://www.zkoss.org/download/zkcalendar.dsp)
3.  Extract those 2 zip files, include all JAR files by putting them
    into your project's `/WEB-INF/lib`

Depending on your IDE the steps will differ, however, the most important
part is both ZK Calendar and ZK’s JAR files are included in your
project's classpath. The easiest way to create a compatible project is
to use [ZK Studio](http://www.zkoss.org/download/zkstudio.dsp) and then
include calendar.jar as a library.

# A Very Basic Application

After setup, we can create an `index.zul` with the content below to
verify the setup works or not.

``` xml
<zk>
    <calendars/>
</zk>
```

This gives you the very first ZK Calendar application. When a server
starts, navigate to index.zul and the following page should be
displayed.

<figure>
<img src="ZKCalEss_Simple_calendar_application.png"
title=" center | 900px" />
<figcaption> center | 900px</figcaption>
</figure>

Congratulations! That is all it takes to embed ZK Calendar within your
ZK application.

# Example Project

You can find all example codes mentioned in this book at [the example
project](https://github.com/zkoss/zkcalendar/tree/master/essentials).
