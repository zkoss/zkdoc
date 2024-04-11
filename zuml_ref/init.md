\_\_TOC\_\_

**Syntax:**

<?init class="..." [''arg0''="..."] [''arg1''="..."] [''arg2''="..."] [''arg3''="..."]?>
<?init zscript="..."?>

It defines an initiator that will be instantiated and called when the
ZUML document is loaded.

There are two formats. The first format is to specify a class that is
used to do the application-specific initialization. The second format is
to specify a `zscript` file to do the application-specific
initialization.

The initialization takes place before the page is evaluated and attached
to a desktop. Thus, the `getDesktop`, `getId` and `getTitle` method will
return null when initializing. To retrieve the current desktop, you
could use <javadoc type="interface">org.zkoss.zk.ui.Execution</javadoc>.

You could specify any number of the `init` directive. The specified
class must implement the
<javadoc type="interface">org.zkoss.zk.ui.util.Initiator</javadoc>
interface.

``` xml
 <?init class="MyInit1"?>
 <?init class="MyInit2"?>
```

Since 3.6.2, you can use any (readable) name instead of `arg0` and so
on. For example,

``` xml
<?init class="org.zkoss.zkplus.databind.AnnotateDataBinderInit" root="./abc"?>
```

Then,
<javadoc method="doInit(org.zkoss.zk.ui.Page, java.util.Map)" type="interface">org.zkoss.zk.ui.util.Initiator</javadoc>
will be called with a map, which contains an entry, whose name is `root`
and value `./abc`.

If you'd like to apply an initiator for every page, you don't need to
specify it on every page. Rather, you could install a system-level
initiator. For more information, please refer to [ZK Developer's
Reference: System-level
Initiators](ZK_Developer's_Reference/UI_Patterns/Page_Initialization#System-level_Initiator).

# class

`[Optional]`

A class name must implement the
<javadoc type="interface">org.zkoss.zk.ui.util.Initiator</javadoc>
interface. Unlike the `init` directive, the class name cannot be the
class that is defined in zscript codes.

An instance of the specified class is constructed and its `doInit`
method is called in the Page Initial phase (i.e., before the page is
evaluated). The `doFinally` method is called after the page has been
evaluated. The `doCatch` method is called if an exception occurs during
the evaluation.

Thus, you could also use it for cleanup and error handling.

# zscript

`[Optional]`

A `script` file that will be evaluated in the Page Initial phase.

# arg0, arg1...

`[Optional]`

You could specify any number of arguments. It will be passed to the
`doInit` method if the first format is used. Since 3.6.2, you can use
any name for the arguments, but, in the prior version, the first
argument must be named as `arg0`, the second is `arg1` and so on.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
