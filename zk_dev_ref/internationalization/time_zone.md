

# Overview

The time zone used to process requests and events is, by default,
determined by the JVM's default (i.e.
[java.util.TimeZone.getDefault()](https://docs.oracle.com/javase/7/docs/api/java/util/TimeZone.html#getDefault>())).

In this section, we will discuss how to configure ZK to use a time zone
other than JVM's default. For example, you might configure ZK to use the
preferred time zone that a user specified in his or her profile.

# The Decision Sequence of Server Time Zone

The time zone is decided in the following sequence.

1.  It checks if an attribute called `org.zkoss.web.preferred.timeZone`
    defined in the HTTP session (aka.,
    [org.zkoss.zk.ui.Session](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Session.html)). If so,
    use it.
2.  It checks if an attribute called `org.zkoss.web.preferred.timeZone`
    defined in the Servlet context (aka.,
    [org.zkoss.zk.ui.Application](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/Application.html)). If
    so, use it.
3.  It checks if a property called `org.zkoss.web.preferred.timeZone`
    defined in the library property (i.e.,
    [org.zkoss.lang.Library](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/lang/Library.html)). If so, use it.
4.  If none of them is found, JVM's default will be used.
      
    You can enforce the time zone with JVM option:
    `-Duser.timezone="Asia/Taipei"`

With this sequence in mind, you could configure ZK to use the correct
time zone based on the application requirements.

## Application-level Time Zone

If you want to use the same time zone for all users of the same
application, you can specify the time zone in the library property. For
example, you could specify the following in `WEB-INF/zk.xml`:

```xml
<library-property>
    <name>org.zkoss.web.preferred.timeZone</name>
    <value>GMT-8</value>
</library-property>
```

- Line 3: the value can be anything accepted by
  `java.util.TimeZone.getTimeZone()`

Alternatively, if you prefer to specify it in Java, you can invoke
[org.zkoss.lang.Library#setProperty(java.lang.String, java.lang.String)](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/lang/Library.html#setProperty(java.lang.String, java.lang.String)).
Furthermore, to avoid typos, you could use
[org.zkoss.web.Attributes#PREFERRED_TIME_ZONE](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/web/Attributes.html#PREFERRED_TIME_ZONE)
as follows.

```java
Library.setProperty(Attributes.PREFERRED_TIME_ZONE, "PST");
```

## Per-user Time Zone

Because ZK will check if a session attribute is for the default time
zone, you could configure ZK to have per-user time zone by specifying
the attribute in a session.

For example, you can do this when a user logins.

```java
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
session by the use of the request interceptor. Please refer to [the Locale section]({{site.baseurl}}/zk_dev_ref/internationalization/locale#The_Request_Interceptor)
for more information.


# Resolving Time Zone Data Version Mismatch

ZK Framework introduced a warning to detect and flag inconsistencies between the server-side time zone data (provided by the JDK) and the client-side time zone data (used by moment.js and moment-timezone).

Maintaining synchronization between these two data sources is crucial for ensuring accurate date/time conversions for some cases, especially around Daylight Saving Time (DST) transitions and historical dates.

## Why You See the Warning

The warning, "Time zone data version mismatch," indicates that the **server's IANA Time Zone Database (tzdata) version differs from the client's moment.js tzdata version.**

### Sample Warning

You will see a message in the **browser console** similar to this:

```text
Time zone data version mismatch detected:
 - Client (moment.js) tzdb version: 2025b
 - Server (JDK) tzdb version: 2023c
Date and time values may be incorrect if time zone rules differ.
To resolve, update the moment-timezone data on the client and/or the JDK time zone data (TZUpdater or Java update) on the server so both use the same version.
```

### ZK's Date-Time Conversion Mechanism

When ZK applications send date time data between browsers and servers, date and time conversions rely on two distinct time zone databases:

* **Client (moment.js at the browser):** Relies on the tzdata version bundled within the moment-timezone.js library. This is used for all client-side rendering and local time zone interpretation.
* **Server (Timezone Data in JRE at servers):** Relies on the tzdata version bundled within the specific Java Runtime Environment (JRE/JDK). This is used for all server-side logic, persistence, and timezone conversions (e.g., when converting a user's time back to UTC for storage).

When ZK detects that the versions of these two databases are too far apart, it triggers the warning because the conversion logic on the server and client may yield different results for the same timestamp, creating a time offset error.

### Root Cause

All modern time zone handling relies on the IANA Time Zone Database (tzdata), which is constantly updated due to:

* **Government/Legislative Changes:** Countries changing their DST rules, shifting time zones, or discontinuing DST entirely. The need for historical data accuracy is a common concern, such as when historical DST rules are corrected for a specific region.
* **Client-Server Disparity:** This occurs simply because the server and client components were updated at different times.

## Possible Effects and Risk Assessment**

A time zone data mismatch does not cause immediate, universal errors, but it creates potential for subtle, intermittent bugs.

### When the Mismatch is Harmless (No Immediate Problem)

The mismatch is often harmless when:

1. **Working with current dates in stable time zones:** If the region's rules haven't changed recently (i.e., the relevant rules exist in both the old and new data sets).
2. **Using only UTC or fixed offsets:** If all date/time manipulation explicitly uses UTC or a fixed offset, the tzdata is effectively bypassed.

### When the Mismatch Causes Problems (High Risk)

The mismatch is dangerous when dealing with dates near geopolitical or DST changes:

| Scenario | Problem Description |
| :---- | :---- |
| **DST Transitions** | **The most common issue.** A server using old data might calculate a date one hour differently than the client using new data during a recent DST start or end time. For example, a meeting scheduled at a specific time might appear to shift by an hour on the client compared to the server log. |
| **New Time Zones** | A region adopts a new zone or changes its standard offset. The client or server with outdated data will fail to recognize the zone identifier or apply the wrong offset. |
| **Historical Data** | An application that handles booking, logging, or reporting based on past events may calculate an incorrect historical offset if the tzdata rules have been corrected or revised since the JDK/client library was built. For instance, an incorrect historical DST rule for a specific region (e.g., Canada/Yukon in 1967\) could result in calculation errors of several hours or more. |

**Impact:** These errors lead to data corruption, incorrect event scheduling, and a poor user experience, often confusingly appearing only for specific users or dates.

## How to Upgrade Time Zone Data

To resolve the warning, you must ensure both your server (JDK) and client (moment.js) are using the **exact same** tzdata version. While using the absolute latest version is generally recommended, the essential goal is **consistency** between the two sides. The typical approach is to upgrade the component with the older data to match the newer one.

### Upgrading JDK/JRE Time Zone Data (Server-Side)

If your client-side data is newer than your server's JDK data, you should upgrade the server component. Java Runtime Environments (JRE/JDK) often require manual updates for tzdata. There are two primary methods:

#### Method A: Recommended (Upgrade JDK)

The simplest and most robust method is to upgrade your Java version. Newer JDK releases (e.g., JDK 17, 21\) automatically include the latest tzdata available at the time of their release.

**Tip for JDK Upgrade:** You can check which tzdata version is bundled with a specific JDK release by referring to the official Oracle documentation: [Timezone Data Versions in the Java Runtime](https://www.oracle.com/java/technologies/tzdata-versions.html).

#### Method B: Using Oracle's TZUpdater Tool (Patching)

If upgrading the entire JDK is not feasible, use the **TZUpdater** tool to patch the existing JRE's time zone data file (tzdb.dat).

1. **Download:** Obtain the latest tzupdater.jar tool from Oracle's website (search for "Oracle TZUpdater").
2. **Stop:** Shut down all running Java applications and application servers using the target JRE/JDK installation.
3. **Run:** Execute the tool using the Java installation you wish to update. The `-l` flag tells it to download and apply the latest IANA data from the web (or use a local file).

```text
# Navigate to the bin directory of your JDK/JRE
cd $JAVA_HOME/bin

# Execute the update using the target JRE's Java executable (requires network access to IANA server)
./java -jar /path/to/tzupdater.jar -l
```

4. **Verify:** Check the new installed version.
```text
./java -jar /path/to/tzupdater.jar -V
```

5. **Restart:** Restart your application server (e.g., Tomcat, WildFly) to load the new tzdb.dat file.

### Upgrading Moment.js Time Zone Data (Client-Side)

If your server's JDK data is newer than your client-side data, you should upgrade the client timezone data. ZK uses moment.js and moment-timezone.js for client-side date manipulation. To update the client's tzdata, you generally need to update the ZK Framework's internal library files or provide a custom data set.

1. **Update ZK Framework:**
* The best practice is to **upgrade your ZK dependency** to the latest maintenance release of your major version (e.g., from 9.6.4 to 9.6.5), as ZK often includes the latest moment-timezone data in its new releases.
2. **Manual Data Overwrite :**
* If a ZK upgrade isn't possible, you can manually replace the moment-timezone data file used by ZK.
* check [ZK Configuration Reference/org.zkoss.zk.moment.timezone.path](/zk_config_ref/org_zkoss_zk_moment_timezone_path)  
