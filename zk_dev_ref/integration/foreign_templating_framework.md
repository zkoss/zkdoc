# Employment/Purpose

Here we describe how to make a ZUL page to be assembled at the client by
using Ajax to request ZUL pages separately in a foreign templating
framework[^1].

You could skip this chapter if you'd like to use ZK's templating
technology, such as [Templating: composition]({{site.baseurl}}/zk_dev_ref/ui_patterns/templating/composition),
[Servlet's inclusion]({{site.baseurl}}/zk_dev_ref/ui_composing/zuml/include)
(javax.servlet.RequestDispatcher's include) and [macro components]({{site.baseurl}}/zk_dev_ref/ui_composing/macro_component).

ZK also supports many powerful layout components, such as portallayout,
borderlayout, tablelayout, columnlayout and so on[^2]. You could use
them to have similar or better effect, and skip this chapter.

> ------------------------------------------------------------------------
>
> <references/>

# Prerequisite

## DOCTYPE

To use ZK components correctly, the templating page must specify DOCTYPE
as follows.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
...
```

## Browser Cache

Though optional, it is suggested to disable the browser to cache the
result page. It can be done as follows.

```xml
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="-1" />
```

# Make a ZUL page as a fragment

## Include a ZUL page when receiving a request

By default, if a ZUL page is requested by the browser directly, it will
generate a complete HTML structure, including HTML, HEAD and BODY tags.
On the other hand, if the assembling is done by inclusion
(javax.servlet.RequestDispatcher's include), a ZUL page will be
generated as a HTML fragment without HTML, HEAD, and BODY. For example,
if a ZUL page is included by `jsp:include`, then it won't generate
HTML/HEAD/BODY, such that the following JSP page will be rendered
correctly.

```xml
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%-- a JSP page --%>
<html>
  <body>
    <jsp:include page="frag.zul"/>
...
```

In other words, if the result page is assembled when the request is
received, you don't need to do anything specially[^3]. However, if the
assembling is done at the client side by using Ajax to request fragments
after loaded, you have to read the following section.

> ------------------------------------------------------------------------
>
> <references/>

## Load a ZUL page with an Ajax request

As described above, if a ZUL page is requested by the browser directly,
it will, by default, generate a complete HTML structure, including HTML,
HEAD and BODY tags. To disable it, you could specify a special parameter
called `zk.redrawCtrl=page`. For example, you might have a HTML page
that loads a ZUL page at the client with jQuery as follows.

```xml
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <title>Mash-up of ZUML apges</title>
        <script src="http://code.jquery.com/jquery-1.4.2.min.js">
        </script>
    </head>
    <body>
        <div id="anchor"></div>
        <button onclick="$('#anchor').load('foo.zul?zk.redrawCtrl=page')">Load the fragment</button>
    </body>
</html>
```

The `zk.redrawCtrl` parameter is used to control how a ZUL page is
specified. In this case, since `page` is specified, the generation of
HTML, HEAD and BODY tags are disabled.

### Alternative: using the request-scoped attribute called `org.zkoss.zk.ui.page.redrawCtrl`

If a ZUL page is always loaded as a fragment by the client, you could
specify the request-scoped attribute called
`org.zkoss.zk.ui.page.redrawCtrl`
(<javadoc method="PAGE_REDRAW_CONTROL">org.zkoss.zk.ui.sys.Attributes</javadoc>)
with `page`, such that the generation of HTML, HEAD and BODY tags are
always disabled no matter if the `zk.redrawCtrl` parameter is specified
or not.

For example,

```xml
<window title="whatever content you want"/>
  <custom-attributes scope="request" org.zkoss.zk.ui.page.redrawCtrl="page"/>
  ...
</window>
```

Then, you don't need to specify the `zk.redrawCtl` parameter when
loading it at the client (e.g., `$('#anchor').load('foo.zul')`).

Of course, if the fragment itself is a JSP page and then use inclusion
to include a ZUL page (or use ZK JSP Tags), then the generated HTML
structure is already a correct HTML fragment (and you don't need to
anything described above).

### Server-side memory optimization: turn off browser cache

As described in [Use ZK in JSP]({{site.baseurl}}/zk_dev_ref/integration/use_zk_in_jsp#Browser_Cache),
the memory footprint at the server can be improved by turning off the
browser cache for the HTML page that will load ZUL pages later. For
example, we could add `no-cache` and `expires` as follows (line 4 and
5):

```xml
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="-1" />
        <title>Mash-up of ZUML apges</title>
        <script src="http://code.jquery.com/jquery-1.4.2.min.js">
        </script>
    </head>
    <body>
        <div id="anchor"></div>
        <button onclick="$('#anchor').load('foo.zul')">Load the fragment</button>
    </body>
</html>
```

In addition, we have to specify a request-scoped attribute called
`org.zkoss.zk.desktop.nocache` in the ZUL page being loaded as follows:

```xml
<window title="whatever content you want"/>
  <custom-attributes scope="request" org.zkoss.zk.desktop.nocache="true"
    org.zkoss.zk.ui.page.redrawCtrl="page"/>
  ...
</window>
```

> ------------------------------------------------------------------------
>
> **Note:** since 5.0.8, assigning `page` to the `zk.redrawCtrl`
> parameter implies *no-cache*, i.e., `zk.redrawCtrl=page` implies
> `org.zkoss.zk.desktop.nocache="true"`.

## ID Generator

Each ZUL page we request by Ajax as described above will be an
independent desktop. It means the browser window will have several
desktops, if we assemble UI this way. Thus, the component's UUID must be
unique across different desktops (of the same session[^4]). The default
ID generator can handle it well.

However, if you use a customized
[org.zkoss.zk.ui.sys.IdGenerator](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/sys/IdGenerator.html), you
have to generate component's UUID
(<javadoc method="nextComponentUuid(org.zkoss.zk.ui.Desktop, org.zkoss.zk.ui.Component)" type="interface">org.zkoss.zk.ui.sys.IdGenerator</javadoc>)
correctly. A typical trick is to encode desktop's ID as part of
component's UUID.

> ------------------------------------------------------------------------
>
> <references/>

# Communicate among ZUL pages

If a ZUL page is loaded separately with Ajax, an independent desktop is
created. For example, the following HTML page will create three
desktops.

```xml
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="-1" />
<script type="text/javascript"
    src="http://code.jquery.com/jquery-1.4.2.js"></script>

<title>Assembling at the client with Ajax</title>
</head>
<body>
<table>
    <tr>
        <td id="top" colspan="2">top</td>
    </tr>
    <tr>
        <td id="left">left</td>
        <td id="right">right</td>
    </tr>
</table>
<script>
    $(function() {
        $.get("/frags/banner.zul", 
                {width : "600px"}, 
                function(response) {
                  $("#top").html(response);
            }
        );
        $.get("/frags/leftside.zul",
                {width : "300px"},
              function(response) {
                  $("#left").html(response);
              }
        );
        $.get("/frags/rightside.zul",
            {width : "300px"},
            function(response) {
              $("#right").html(response);
            }       
        );
    });
</script>
</body>
</html>
```

Since they are in different desktops, you have to use the *group-scoped*
event queue[^5] if you want to send events from one desktop (such as
leftside.zul) to another (such as rightside.zul). For more information,
please refer to [Event Queues]({{site.baseurl}}/zk_dev_ref/event_handling/event_queues).

> ------------------------------------------------------------------------
>
> <references/>

# Version History

| Version | Date          | Content                                              |
|---------|---------------|------------------------------------------------------|
| 5.0.5   | October, 2010 | ZUL page is able to be generated as a HTML fragment. |

[^1]: [Apache Tiles](http://tiles.apache.org/) is a typical templating
    framework and allows developers to assemble UI at both server and
    client.

[^2]: For more information, please refer to [ZK Component Reference](ZK_Component_Reference).

[^3]: You might take a look at [Use ZK in JSP]({{site.baseurl}}/zk_dev_ref/integration/use_zk_in_jsp)
    for more information.

[^4]: In short, component's UUID must be unquie in the same session. It
    is OK to be duplicated in different session.

[^5]: The group-scoped event queue is available only in ZK EE. For ZK
    CE, you have to use the session-scoped event queue.
