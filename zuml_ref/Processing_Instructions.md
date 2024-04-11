# Directive

Each XML processing instruction specifies how to process the XML
document. It is called **directives** in ZK. For example, the following
directive specifies the page title and style.

``` xml
<?page title="Grey background" style="background: grey"?>
```

Notice that there should be **no** whitespace between the question mark
and the processing instruction's name (i.e., page in the above example).

You can also use EL in instructions like:

``` xml
<?page automaticTimeout="true" title="${personalTitle}"?>
<?component name="loc-datebox" extends="datebox" locale="${somelocale}"?>
```
