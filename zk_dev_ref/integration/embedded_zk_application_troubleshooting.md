# Purpose

Embedding ZK application into a non-ZK application (ex. Angular) is a
powerful way to leverage ZK's components and workflows in a larger user
interface. The embedding process relies on multiple mechanisms (CORS,
framework interactions, ZK workflows).

This guide aims to cover the most common challenges and provide tips on
how to address them and successfully embed your ZK page. It separates
these challenges into three categories: CORS challenges are related to
Cross-Origin content policies at a web server and web browser level; Outer
page challenges are related to the host page which will include the ZK
embedded page; and ZK challenges are related to the ZK page and the ZK
server themselves.

# Glossary

- Embedded app: the ZK-based web application being embedded.
- Outer app: The non-ZK-based web application which includes the
  embedded ZK app.

# Cross-Origin Resource Sharing related troubleshooting

These tips can be used when the outer app and the embedded app are being
reached through different URL contexts (domain names, ports, etc).

In this case, the security measures and restrictions associated with
CORS policies will apply to communications to the Embedded app server
from the browser.

[Further reading regarding
CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## SSL requirement

To fulfill CORS policy requirements, the embedded app must be accessible
through a URL using the https protocol, encrypted with a valid SSL
certificate.

## CORS headers requirements

The web container for the Embedded app must define the common CORS
related headers. This is commonly done at web container level, and
therefore not at ZK application level.

NOTE: Necessary headers will depend on both applications' structures and
relationships, but you will find below a general case example for a
generic web application.

For the minimum ZK headers configuration, please refer to [the main
zEmbedded
documentation]({{site.baseurl}}/zk_dev_ref/integration/miscellaneous/embedded_zk_application#Cross-Origin_Resource_Sharing)

```numberLines
Access-Control-Allow-Origin: One or more URLs allowed to load the Embedded application. 
//This should contain the full context of the Outer app, including the protocol. Ex: https://subdomain.myOuterApp.foo
Access-Control-Request-Method: GET, POST, HEAD, OPTIONS
Access-Control-Allow-Headers: Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method,Access-Control-Request-Headers, zk-sid
Access-Control-Expose-Headers: Access-Control-Allow-Origin,Access-Control-Allow-Credentials, zk-sid, zk-error
Access-Control-Allow-Credentials: true
```

This can be done by configuring your server (e.g. nginx, apache-httpd,
tomcat, spring-boot...) appropriately and is **not** ZK-specific. Please
refer to the related documentation (e.g. [MDN: Cross-Origin Resource
Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS))
and your specific server configuration guides.

## Same-site cookies and Secure cookies

ZK applications rely either on Cookies or URL parameters to retrieve the
JSessionID and locate the existing session of the user.

If the JSessionId cannot be retrieved from the request, the web
container (Tomcat, etc) will create a new session, and assign it a new
JSessionID, which will be returned to the client.

By default, browsers will reject the JSessionId cookie unless it is sent
with both the secure attribute, and same-site: none attribute.

## Authentication and redirect

Since the embedded page does not have access to a unique browser frame,
it is not able to perform actions such as redirect. Due to this, if your
authentication scheme relies on redirection to a SSO page or a login
page, you will need to pre-authenticate the user when they access the
outer page.

## Checking the JSessionId Cookie

ZK relies on the web container session. In most cases, the session is
maintained by JSESSIONID cookie.

If the embedded page encounter communication errors, use the developer
tools at client side, network panel, to check that the initial page
response headers contain the HEADER set-cookie: JSESSIONID=\[value\] and
that subsequent communications to the ZK server (such as zkau requests)
contain the request headers HEADER cookie:JSESSIONID=\[value\]

If these are missing, or if a new JSESSIONID is created for each
subsequent request, you are likely encountering a CORS issue preventing
the browser from accepting the session cookies.

## Running Chrome browser without CORS security

<span style="color:#FF0000">`WARNING: This option is for DEBUG ONLY and should never be used in a production context.`</span>

The Chrome browser can be configured to run without using CORS security.
Since it can be difficult to identify the cause of a blocking issue,
running the web browser without CORS security is a simple way to
identify if your current issue is caused by CORS or a different factor.
Since the Chrome browser’s configuration may change as the browser
updates, we simply recommend searching for “Chrome disable CORS” for
your current browser version if you want to use this debugging strategy.

# Outer page environment troubleshooting

These tips apply to configuration related to the outer page containing
the embedded ZK page

## Retrieving the ZK object from an external framework

If your outer page is created using a client-side Framework such as
Angular, you may encounter a “zk” variable undefined when you try to
access the ZK framework classes and functions from the outer
application’s logic.

ZK variables and functions are defined under the “window” object of the
browser. Frameworks such as Angular do not expose the window object by
default, and it must be retrieved or injected. As this is framework
dependent, we recommend that you check how to access the window object
in your choice of Framework.

Once you have access to the window object, you can use ZK functions such
as the lookup function located at `window.zk.$(selector)`

# ZK Related troubleshooting

These tips apply to ZK specific structures and features in the context
of an embedded application

## Page structure and navigation

The embedding process is better suited for single pages which do not
rely on URL schemes. If your page workflow requires access to updated
URL parameters, redirecting to a different page upon user action, or
similar browser actions, you should consider using an iframe instead.

Iframes will generate two documents in the web browser. The outer page
and the iframe page will both have their own frame, with a root context,
a navigation window.location, etc. This allows a degree of independence
between the outer frame and the iframe page.

In the case of embedding, the embedded application does not create a new
frame, does not have access to a separate window.location, etc. This
allows for a much closer relationship with the outer page, but also
makes navigation-based incompatible with embedding.

## External resources loading

ZK loads resources internally and externally (through a relative URL for
example). Since the page is loaded with a different browser window URL
than the page requests content, any resource served to the client with a
relative URL will point to

Loading resources with [
lang-addon]({{site.baseurl}}/zk_client_side_ref/language_definition) The
best way to globally add [
stylesheets](ZK_Client-side_Reference/Language_Definition/stylesheet)
and [
scripts](ZK_Client-side_Reference/Language_Definition/javascript)
to your application, and have these resources loaded as part of the
embedding process is to declare them in lang-addon.

This way, the resources will be loaded as part of the embedding process,
and will not rely on relative links.

Note: Once a file has been loaded this way, it can reference files
relative to itself. For example, you can use background-image:
url(‘./myImage.png’) assuming that the file is located in the same
folder as the stylesheet.

## Resolving urls

If you use a ZK component such as `<image src=”relative/url/image.png”/>`
or a `<button image=”relative/url/image.png”/>` in embedded mode, the
page will try to resolve this url relative to the outer page.

You can consider two options to resolve this image’s url.

### Using an absolute URL instead of a relative url.

This is the simpler option, but it requires you to know the absolute URL
of the file, including its domain name, context and protocol. It is also
liable to make environment changes more difficult, since changing the
domain name of your application will break the image sources.

### Using the lang-addon to load a stylesheet

From the stylesheet, you can use CSS to set the image on the component.
You will need to use the developer tools to identify the correct
location for the style in question, but the result is more robust, and
is not dependent of the application’s domain name and context.

in zul:

```xml
 <button label="" iconSclass="myimage"  .../>
```

in css:

```css
/* loaded from lang-addon*/
.myimage::after{
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url("./image.png"); //relative to the css file loaded from lang-addon
}
```

## Active desktop clearing

Since the embedded page is dependent of the outer page, it may be unable
to fulfill the standard desktop clearing, if the network conditions cause
the outer page to close before the inner page can complete the removal
workflow.

This can be mitigated with either of the following approaches: ZK
desktops will expire upon expiration of the underlying web container
session. You can proactively clear desktops by reducing the session
timeout for your web container.

Alternatively, you can implement a desktop Watchdog on the basis of the
desktop watchdog structure [\| described
here](https://gist.github.com/cor3000/b7e7d1c988c105d2bac437ddcda10601).
