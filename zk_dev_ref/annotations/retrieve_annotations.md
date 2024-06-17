The annotations can be retrieved back at the run-time. They are designed
to be used by tools or utilities, such as the data-binding manager,
rather than applications. In other words, applications annotate a ZUML
page to tell the tools how to handle components for a particular
purpose.

The following is an example to dump all annotations of a component:

``` java
 void dump(StringBuffer sb, Component comp) {
    ComponentCtrl compCtrl = (ComponentCtrl)comp;
     sb.append(comp.getId()).append(": ")
       .append(compCtrl .getAnnotations(null)).append('\n');

     for (String prop: compCtrl.getAnnotatedProperties()) {
         sb.append(" with ").append(prop).append(": ")
             .append(compCtrl .getAnnotations(prop)).append('\n');
     }
 }
```
