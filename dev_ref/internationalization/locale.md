\_\_TOC\_\_

# Overview

The locale used to process requests and events is, by default,
determined by the browser's preferences (by
`javax.servlet.ServletRequest.getLocale()`). For example, `DE` is
assumed if a user is using a DE-version browser (unless they changed the
setting).

In this section, we'd like to introduce how to configure ZK to handle
the locale differently. For example, you can configure ZK to use the
same Locale for all users no matter how the browser is configured.
Another example is that you can configure ZK to use the preferred locale
that a user specifies in his or her profile if you maintain the user
profiles in the server.

# Current Locale

[Locales.getCurrent()](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/util/Locales.html#getCurrent--)
returns the current locale that ZK detected in the below precedence.

# The Decision Sequence of Locale

ZK determines the current locale in the following sequence:

1.  It checks if an attribute called `org.zkoss.web.preferred.locale`
    defined in the HTTP session (or
    <javadoc type="interface">org.zkoss.zk.ui.Session</javadoc>). If so,
    use it.
2.  It checks if an attribute called `org.zkoss.web.preferred.locale`
    defined in the Servlet context (or
    <javadoc type="interface">org.zkoss.zk.ui.Application</javadoc>). If
    so, use it.
3.  It checks if a property called `org.zkoss.web.preferred.locale`
    defined in the library property (i.e.,
    <javadoc>org.zkoss.lang.Library</javadoc>). If so, use it.
4.  If none of them is found, it uses the locale defined in the Servlet
    request (i.e., `ServletRequest.getLocale()`). This is determined by
    [the browser language
    setting](https://support.google.com/chrome/answer/173424?hl=en&co=GENIE.Platform%3DDesktop).

With this sequence in mind, you could configure ZK to use the correct
locale based on the application requirements.

## Application-level Locale

If you want to use the same locale for all users, you can specify the
locale in the library property. For example, you could specify the
following in `WEB-INF/zk.xml`:

``` xml
<library-property>
    <name>org.zkoss.web.preferred.locale</name>
    <value>de</value>
</library-property>
```

Alternatively, if you prefer to specify it in Java, you could invoke
<javadoc method="setProperty(java.lang.String, java.lang.String)">org.zkoss.lang.Library</javadoc>.
Furthermore, to avoid typos, you could use
<javadoc method="PREFERRED_LOCALE">org.zkoss.web.Attributes</javadoc> as
follows.

``` java
Library.setProperty(Attributes.PREFERRED_LOCALE, "de");
```

## Per-user Locale

Because ZK will check if there is a session attribute for the default
locale, you could configure ZK to have a per-user locale by specifying
the attribute in a session.

For example, you can do this when a user logins.

``` java
import org.zkoss.web.Attributes;
...

 void login(String username, String password) {
     //check password
     ...
     Locale preferredLocale = ...; //decide the locale (from, say, database)
     session.setAttribute(Attributes.PREFERRED_LOCALE, preferredLocale);
     ...
 }
```

# The Request Interceptor

Deciding the locale after the user logins may be a bit late for some
applications. For example, you might want to use the same Locale that
was used in the previous session, before the user logins. For a Web
application, it is usually done by storing the information in a cookie.
It can be done by registering a request interceptor, and then
manipulating the cookies when the interceptor is called.

A request interceptor is used to intercept each request being processed.
It must implement the
<javadoc type="interface">org.zkoss.zk.ui.util.RequestInterceptor</javadoc>
interface. For example,

``` java
import java.util.Locale;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.zkoss.web.Attributes;

public class MyLocaleProvider implements org.zkoss.zk.ui.util.RequestInterceptor {
     public void request(org.zkoss.zk.ui.Session sess,
     Object request, Object response) {
        final Cookie[] cookies = ((HttpServletRequest)request).getCookies();
         if (cookies != null) {
             for (int j = cookies.length; --j >= 0;) {
                if (cookies[j].getName().equals("my.locale")) {
                     //determine the locale
                     String val = cookies[j].getValue();
                     Locale locale = org.zkoss.util.Locales.getLocale(val);
                     sess.setAttribute(Attributes.PREFERRED_LOCALE, locale);
                     return;
                 }
             }
         }
     }
}
```

To make it effective, you have to register it in WEB-INF/zk.xml as a
listener. Once registered, the request method is called each time ZK
receives a request.

``` xml
<listener>
    <listener-class>MyLocaleProvider</listener-class>
</listener>
```

**Note**: An instance of the interceptor is instantiated when it is
registered. It is then shared among all requests in the same
application. Thus, you have to make sure it can be accessed concurrently
(i.e., thread-safe).

**Note**: The `request` method is called at very early stage, before the
request parameters are parsed. Thus, it is recommended to access them in
this method, unless you configured the locale and character encoding
properly for the request.

# Change Locale at Run-time

When changing the locale dynamically at the run-time (i.e., under an AU
request), it is important to notice:

1.  The Locale-dependent messages have been sent to the client, and they
    have to be reloaded.
2.  The current thread's default locale has to be changed since
    Locale-dependent components and functionality depend on it.

## Reload with sendRedirect

The simplest way to solve the issues is to ask the browser to reload the
whole page by use of
<javadoc method="sendRedirect(java.lang.String)">org.zkoss.zk.ui.Executions</javadoc>.

For example,

``` java
session.setAttribute(Attributes.PREFERRED_LOCALE, locale);
Executions.sendRedirect(null); //reload the same page
```

Notice that
<javadoc method="sendRedirect(java.lang.String)">org.zkoss.zk.ui.Executions</javadoc>
will cause the client to reload the page, so any updates to the current
desktop will be lost.

## Change without Reloading

If you prefer to keep the current desktop, you have to ask the browser
to reload the messages, and change the default locale used by the
current thread if you're going to access any component and functionality
that depends on it. The reloading of messages can be done by invoking
<javadoc method="reloadMessages(java.util.Locale)">org.zkoss.zk.ui.util.Clients</javadoc>,
while the setting of the default locale can be done by the use of
<javadoc method="setThreadLocal(java.util.Locale)">org.zkoss.util.Locales</javadoc>

For example,

``` java
session.setAttribute(Attributes.PREFERRED_LOCALE, locale);
Clients.reloadMessages(locale);
Locales.setThreadLocal(locale);
```
