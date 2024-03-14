# Overview

From
[OWASP](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF))

> Cross-Site Request Forgery (CSRF) is an attack that tricks the victim
> into loading a page that contains a malicious request. It is malicious
> in the sense that it inherits the identity and privileges of the
> victim to perform an undesired function on the victim's behalf, like
> change the victim's e-mail address, home address, or password, or
> purchase something. CSRF attacks generally target functions that cause
> a state change on the server but can also be used to access sensitive
> data. For most sites, browsers will automatically include with such
> requests any credentials associated with the site, such as the user's
> session cookie, basic auth credentials, IP address, Windows domain
> credentials, etc. Therefore, if the user is currently authenticated to
> the site, the site will have no way to distinguish this from a
> legitimate user request.

In short, a successful CSRF attack uses a valid http request, but often
with malicious data to cause unwanted and unintended results, which
assumes a valid identity of end user by using above mentioned browser's
way of handling user related information.

## ZK and CSRF attack limitations

According to OWASP mentioned [CSRF
Limitations](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Limitations),
in order to mount a successful CSRF attack several things have to
happen:

> 1\. The attacker must target either a site that doesn't check the
> referrer header (which is common) or a victim with a browser or
> plug-in that allows referer spoofing (which is rare).

This can be avoided by adding a servlet filter that checks if all
request referrer and origin headers contain the appropriate values.

> 2\. The attacker must find a form submission at the target site, or a
> URL that has side effects, that does something (e.g., transfers money,
> or changes the victim's e-mail address or password).

By design ZK is an Ajax solution. Because of this design generally no
form submit nor specific URL request can cause side effects.

> 3\. The attacker must determine the right values for all the form's or
> URL's inputs; if any of them are required to be secret authentication
> values or IDs that the attacker can't guess, the attack will fail.

ZK generates unique ids for html elements that represent ZK components
on client side and these unique ids are checked on server side when data
containing them is passed via ZK's Ajax mechanism. For successful CSRF
attack, the attacker will have to guess all unique ids for those html
elements while submitting the malicious request. If the html element ids
are not the same as they were when page rendered then the data is
considered invalid by ZK and request is rejected at server side
automatically.

Also note that ZK will regenerate these ids if the components are
re-rendered via page refresh or components are re-created again.

> 4\. The attacker must lure the victim to a Web page with malicious
> code while the victim is logged into the target site.

This is more of a humane issue and depends on the end user. Application
developers should raise the awareness about CSRF by documenting this in
their application documentation which end users can refer to.

## ZK Desktop ID as CSRF token

The general recommendation to prevent CSRF is to use **Synchronizer
Token Pattern**. Generally, this is done by inserting a unique token
usually referred as **CSRF token** in the generated HTML and checking it
at the server side on form submission. ZK employs a similar technique in
the form of **desktop ID**. Each requested URL in ZK web application
associates a Desktop instance on the server side. Please refer to [
Desktop and
Pages](ZK_Developer's_Guide/Fundamental_ZK/Basic_Concepts/Page_and_Desktop)
for more details on the concept of Desktop in ZK.

ZK desktop is discarded and re-created each time a new page is loaded in
a browser or even the current page is refreshed. On each re-rendering of
a page, a new automatically generated unique id is assigned to a
desktop.

Once the page is loaded this desktop ID is carried via ZK Ajax mechanism
and on each interaction, this unique desktop ID will be passed as Ajax
request POST data.

**ZK CSRF Protection Notes:**

1.  There is no One-to-One relation between Desktop id and HTTP Session
    id.
2.  Desktop ID is unique per page per URL. Even the same URL across
    different browser tabs in the same browser instance will be assigned
    the unique desktop ID.
3.  For successful CSRF attack, the attacker not only has to guess
    unique desktop ID but also each and every unique ids assigned to the
    HTML element for corresponding ZK widgets on the client side. If
    even one is not correct then the entire request is rejected at
    server side without executing any application level code containing
    business logic.
