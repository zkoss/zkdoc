

**Syntax:**

<?xel-method prefix="..." name="..." class="..." signature="..."?>

Specifies an EL function that could be used in EL expressions. For
example,

``` xml
 <?xel-method prefix="c" name="forName"
     class="java.lang.Class"
     signature="java.lang.Class forName(java.lang.String)"?>
 <textbox value="${c:forName('java.util.List')}"/>
```

# prefix

`[Required]`

Specifies the prefix used to identify this method.

# name

`[Required]`

Specifies the name used to identify this method. The full name is
"prefix:name".

# class

`[Required]`

Specifies the class that the method is defined in.

# signature

`[Required]`

The signature of the method. Note: the method must be public static. In
additions, Java 5 Generics are *not* allowed.

# Version History

| Version | Date | Content |
|---------|------|---------|
|         |      |         |
