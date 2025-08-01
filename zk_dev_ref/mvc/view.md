The view is the UI of an application. It totally depends on the
application's requirements.

As described in
[mvc/Model]({{site.baseurl}}/zk_dev_ref/mvc/model), some ZK
components support Model-driven rendering, such as
[org.zkoss.zul.Listbox](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Listbox.html). There are two approaches you
can customize the rendering of each item in a model:

- [Template]({{site.baseurl}}/zk_dev_ref/mvc/template): you
  define a template which is a fragment of the ZUML document to define
  how to render each item. It's more readable and easy to use.

<!-- -->

- [Renderer]({{site.baseurl}}/zk_dev_ref/mvc/renderer): you
  create a Java class that implements a specific interface to render
  each item. If you need to render items according to conditions in the
  runtime, this approach is suggested.

> ------------------------------------------------------------------------
>
> <references/>
