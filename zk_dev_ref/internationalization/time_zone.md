

# Overview

The time zone used to process requests and events is, by default,
determined by the JVM's default (i.e.
\[<https://docs.oracle.com/javase/7/docs/api/java/util/TimeZone.html#getDefault>()
java.util.TimeZone.getDefault()\]).

In this section, we will discuss how to configure ZK to use a time zone
other than JVM's default. For example, you might configure ZK to use the
preferred time zone that a user specified in his or her profile.

# The Decision Sequence of Server Time Zone

The time zone is decided in the following sequence.

1.  It checks if an attribute called `org.zkoss.web.preferred.timeZone`
    defined in the HTTP session (aka.,
    <javadoc type="interface">org.zkoss.zk.ui.Session</javadoc>). If so,
    use it.
2.  It checks if an attribute called `org.zkoss.web.preferred.timeZone`
    defined in the Servlet context (aka.,
    <javadoc type="interface">org.zkoss.zk.ui.Application</javadoc>). If
    so, use it.
3.  It checks if a property called `org.zkoss.web.preferred.timeZone`
    defined in the library property (i.e.,
    <javadoc>org.zkoss.lang.Library</javadoc>). If so, use it.
4.  If none of them is found, JVM's default will be used.
      
    You can enforce the time zone with JVM option:
    `-Duser.timezone="Asia/Taipei"`

With this sequence in mind, you could configure ZK to use the correct
time zone based on the application requirements.

## Application-level Time Zone

If you want to use the same time zone for all users of the same
application, you can specify the time zone in the library property. For
example, you could specify the following in `WEB-INF/zk.xml`:

``` xml
<library-property>
    <name>org.zkoss.web.preferred.timeZone</name>
    <value>GMT-8</value>
</library-property>
```

- Line 3: the value can be anything accepted by
  `java.util.TimeZone.getTimeZone()`

Alternatively, if you prefer to specify it in Java, you can invoke
<javadoc method="setProperty(java.lang.String, java.lang.String)">org.zkoss.lang.Library</javadoc>.
Furthermore, to avoid typos, you could use
<javadoc method="PREFERRED_TIME_ZONE">org.zkoss.web.Attributes</javadoc>
as follows.

``` java
Library.setProperty(Attributes.PREFERRED_TIME_ZONE, "PST");
```

## Per-user Time Zone

Because ZK will check if a session attribute is for the default time
zone, you could configure ZK to have per-user time zone by specifying
the attribute in a session.

For example, you can do this when a user logins.

``` java
 void login(String username, String password) {
     //check password
     ...
     TimeZone preferredTimeZone = ...; //decide the time zone (from, say, database)
     session.setAttribute(Attributes.PREFERRED_TIME_ZONE, preferredTimeZone);
     ...
 }
```

# Current Time Zone

[TimeZones.getCurrent()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/TimeZones.html#getCurrent--)
returns the current (server) time zone determined by the sequence
mentioned above.

# The Request Interceptor

Like configuring a locale, you can prepare the time zone for the given
session by the use of the request interceptor. Please refer to [the
Locale
section]({{site.baseurl}}/zk_dev_ref/Internationalization/Locale#The_Request_Interceptor)
for more information.
