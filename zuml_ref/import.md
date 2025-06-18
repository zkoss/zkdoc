# Import Classes

**Syntax**

```xml
<?import ''class-name1'' ''class-name2'' ?>
```

It imports a class or a package of classes. It works like Java's import
statement. For example,

```xml
<?import com.foo.composer.FooComposer?>
<?import com.foo.init.*?>

<?init class="FooInit"?><!-- it will look for com.foo.init.FooInit  -->
<window apply="FooComposer"><!-- com.foo.composer.FooComposer will be used -->
...
```

After import, we can invoke the static method or field defined in
imported class with el statement. For example,

```xml
<?import com.foo.FooClass ?>
<!-- or we can import com.foo.* -->
<label value="${FooClass.staticMethod()}"></label>
<label value="${FooClass.staticField}"></label>
```

# Import Directives

**Syntax to Import Directives**

```xml
 <?import src="..."?>
 <?import src="..." directives="..."?>
```

It imports the directives, such as component definitions (<code>

<?component?>

</code>) and initiators (<code>

<?init?>

</code>), defined in another ZUML page.

A typical usage is that you put a set of component definitions on one
ZUML page, and then import them into another ZUML page, such that both
zul pages share the same set of component definitions, additional to the
system default.

```xml
 <!-- special.zul: Common Definitions -->
 <?init zscript="/WEB-INF/macros/special.zs"?>
 <?component name="special" macroURI="/WEB-INF/macros/special.zuml" class="Special"?>
 <?component name="another" macroURI="/WEB-INF/macros/another.zuml"?>
```

Where the `Special` class is assumed to be defined in
`/WEB-INF/macros/special.zs`.

Then, other ZUML pages can share the same set of component definitions
as follows.

```xml
 <?import src="special.zul"?>
 ...
 <special/><!-- you can use the component defined in special.zul -->
 
```

Notes

- Unlike other directives, the import directives must be at the topmost
  level, i.e., at the same level as the root element.
- The imported directives in the imported page are also imported. For
  example, if A imports B and B imports C, then A imports both C and B
  component definitions. If there is a name conflict, A overrides B,
  while B overrides C.
- Once the directives are imported, they won't be changed until the
  importing page is changed, no matter the imported page is changed or
  not.

# class

`[Required if importing a class]`

The name of a class, or a wildcard, such as `com.foo.app.*`.

# src

`[Required if importing directives]`

The URI of a ZUML page which the component definitions will be imported
from.

# directives

`[Optional]`  
`default: component, init, import`

If the `directives` attribute is omitted, only the `component`, `init`
and `import` (with class) directives are imported.

## Import specific directives

Specify a list of directive names separated by comma. For example,

```xml
 <?import src="/template/taglibs.zul" directives="taglib, xel-method"?>
 <?import src="/template/java.zul" directives="import"?><!-- only <?import class="..."?> -->
```

## Available values

The directives that can be imported include

- `component`
- `header`
- `function-mapper`
- `import`
- `init`
- `meta`: include `meta`, `link` and `script` directives
- `taglib`
- `variable-resolver`
- `xel-method`
- `*`: import all above

# Version History

| Version | Date       | Content                               |
|---------|------------|---------------------------------------|
| 6.0.0   | July, 2011 | The import of classes was introduced. |
