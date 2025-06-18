# Overview

By default, the first day of the week depends on the locale (e.g.,
Sunday in US, Monday in France). More precisely, it is the value
returned by the `getFirstDayOfWeek` method of the `java.util.Calendar`
class.

However, you can configure it differently, and it will affect how
[datebox]({{site.baseurl}}/zk_component_ref/input/datebox) and
[calendar]({{site.baseurl}}/zk_component_ref/input/calendar) components
behave.

# The decision sequence of the first day of the week

The first day of the week is decided in the following sequence.

1.  It checks if an attribute called
    `org.zkoss.web.preferred.firstDayOfWeek` is defined in the HTTP
    session (aka.,
    <javadoc type="interface">org.zkoss.zk.ui.Session</javadoc>). If so,
    use it.
2.  It checks if an attribute called
    `org.zkoss.web.preferred.firstDayOfWeek` is defined in the Servlet
    context (aka.,
    <javadoc type="interface">org.zkoss.zk.ui.Application</javadoc>). If
    so, use it.
3.  It checks if a property called
    `org.zkoss.web.preferred.firstDayOfWeek` is defined in the library
    property (i.e., <javadoc>org.zkoss.lang.Library</javadoc>). If so,
    use it.
4.  If none of them is found, JVM's default will be used
    (`java.util.Calendar`).

## Application-level first-day-of-the-week

If you want to use the same first-day-of-the-week for all users of the
same application, you can specify it in the library property. The
allowed values include 1 (Sunday), 2 (Monday), .. and 7 (Saturday). For
example, you could specify the following in `WEB-INF/zk.xml`:

```xml
<library-property>
    <name>org.zkoss.web.preferred.firstDayOfWeek</name>
    <value>7</value><!-- Saturday -->
</library-property>
```

Alternatively, if you prefer to specify it in Java, you could invoke
<javadoc method="setProperty(java.lang.String, java.lang.String)">org.zkoss.lang.Library</javadoc>.
Furthermore, to avoid typos, you could use
<javadoc method="setAttribute(java.lang.String, java.lang.Object)" type="interface">org.zkoss.zk.ui.WebApp</javadoc>
and
<javadoc method="PREFERRED_FIRST_DAY_OF_WEEK">org.zkoss.web.Attributes</javadoc>
as follows.

```java
webApp.setAttribute(org.zkoss.web.Attributes.PREFERRED_FIRST_DAY_OF_WEEK, java.util.Calendar.SATURDAY);
```

As shown above, the allowed values of
<javadoc method="setAttribute(java.lang.String, java.lang.Object)" type="interface">org.zkoss.zk.ui.WebApp</javadoc>
include Calendar.SUNDAY, Calendar.MONDAY and so on.

## Per-user first-day-of-week

By specifying a value to the session attribute called
`org.zkoss.web.preferred.firstDayOfWeek` (i.e.,
<javadoc method="PREFERRED_FIRST_DAY_OF_WEEK">org.zkoss.web.Attributes</javadoc>),
you can control the first day of the week for the given session. The
allowed values include Calendar.SUNDAY, Calendar.MONDAY and so on.

```java
session.setAttribute(org.zkoss.web.Attributes.PREFERRED_FIRST_DAY_OF_WEEK, java.util.Calendar.SATURDAY);
  //then, the current session's first day of the week will be Saturday
```

For example, you can do this when a user logins.

```java
 void login(String username, String password) {
     //check password
     ...
     int preferredFDOW = ...; //decide the user's preference
     session.setAttribute(Attributes.PREFERRED_FIRST_DAY_OF_WEEK, preferredFDOW);
...
```
