# Be aware of using control-flow tags like <c:if>

If you are using control-flow tags like <c:if> in your ZK-Less files,
you have to be really care with the situations like below:

``` html
 .z-selector {
      border-left-color: @border;
      <c:if test="${zk.ie == 8}">
      border-left-color: @border4IE8;
      </c:if>
 }
```

If **@border** and **@border4IE8** happens to be the same, Less will
optimize them and only keep the last expression while compiling.
Therefore, the above Less expression is equivalent to the following:

``` html
 .z-selector {
  // removed by less
  <c:if test="${zk.ie == 8}">
  border-left-color: red;
  </c:if>
 }
```

So, to be safe, please change the order of your Less expressions like
this:

``` html
 .z-selector {
  <c:if test="${zk.ie == 8}">
  border-left-color: @border4IE8;
  </c:if>
  border-left-color: @border;
 }
```

Here, when **@border** and **@border4IE8** are the same, the compiled
CSS looks like:

``` html
 .z-selector {
  <c:if test="${zk.ie == 8}">
  </c:if>
  border-left-color: red;
 }
```

and if they are different, the result is:

``` html
 .z-selector {
  <c:if test="${zk.ie == 8}">
  border-left-color: red;
  </c:if>
   border-left-color: rgba(rr,gg,bb,aa); // IE8 will ignore this 
 }
```

Remember to always place your control-flow tags first to avoid any
possible errors like the example showed.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
