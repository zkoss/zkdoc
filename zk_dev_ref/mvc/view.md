The view is the UI of an application. It totally depends on the
application's requirements.

As described in
[MVC/Model](ZK_Developer's_Reference/MVC/Model), some ZK
components support Model-driven rendering, such as
<javadoc>org.zkoss.zul.Listbox</javadoc>. There are two approaches you
can customize the rendering of each item in a model:

- [Template](ZK_Developer's_Reference/MVC/View/Template): you
  define a template which is a fragment of the ZUML document to define
  how to render each item. It's more readable and easy to use.

<!-- -->

- [Renderer](ZK_Developer's_Reference/MVC/View/Renderer): you
  create a Java class that implements a specific interface to render
  each item. If you need to render items according to conditions in the
  runtime, this approach is suggested.

> ------------------------------------------------------------------------
>
> <references/>
