

The default interpreter for the zscript elements is Java (based on
[BeanShell](http://www.beanshell.org)). Depending on your preference,
you could choose one of built-in interpreters, or implement your own
interpreter.

The built-in interpreters includes: Java, Groovy, Ruby, Python, and
JavaScript.

# Choose Interpreter for Whole Page

To change the default interpreter for the whole page, you could use the
[page
directive](ZUML_Reference/ZUML/Processing_Instructions/page)
by specifying the zscriptLanguage attribute, such as

``` xml
<?page zscriptLanguage="Groovy"?>
<window border="normal">
    <vbox id="vb">
        <label id="l" value="Hi"/>
        <button label="change label" onClick="l.value='Hi, Groovy';"/>
        <button label="add label" onClick="new Label('New').setParent(vb);"/>
    </vbox>
    <button label="alert" onClick="alert('Hi, Groovy')"/>
</window>
```

# Choose Interpreter for zscript

You could choose an interpreter for a particular zscript element by
specifying the language attribute as follows.

``` xml
<zscript language="Ruby">
(Java::Label.new 'New').parent = $vb
</zscript>
```

# Choose Interpreter for Event Handler

You could choose an interpreter for a particular event handler by
prefixing it with the language name as follows.

``` xml
<button label="alert" onClick="python:alert('Hi, Python')"/>
```

# Support More Scripting Languages

Currently ZK supports Java, JavaScript, Ruby, Groovy, and Python.
However, it is easy to extend:

1.  Provide a class that implements
    <javadoc type="interface">org.zkoss.zk.scripting.Interpreter</javadoc>.
    However, it is suggested to derive from
    <javadoc>org.zkoss.zk.scripting.util.GenericInterpreter</javadoc>
    for simplicity.
2.  Declare the scripting language in either
    [WEB-INF/zk.xml](ZK_Configuration_Reference/zk.xml/The_zscript-config_Element),
    or `zk/config.xml`.

``` xml
<zscript-config>
    <language-name>SuperJava</language-name><!-- case insensitive -->
    <interpreter-class>my.MySuperJavaInterpreter</interpreter-class>    
</zscript-config>
```

## Multi-Scope versus Single-Scope

Depending on the implementation, an interpreter might have exactly one
logical scope, or one logic scope per ID space to store these variables
and methods declared in zscript. For the sake of description, we will
call them the single-scope and multi-scope interpreters respectively.

For example, ZK's Java interpreter(BeanShell) is a multi-Scope
Interpreter. On the other hand, Ruby, Groovy and JavaScript interpreters
don't support multi-scope. It means all variables defined in, say, Ruby
are stored in one logical scope (per interpreter). To avoid confusion,
you could prefix the variable names with special prefix denoting the
window.

Notice that each page has its own interpreter to evaluate the zscript
code.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
