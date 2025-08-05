---
title: "Type Coercion"
---

EL expressions will coerce the type automatically. Here is the summary
of the coercion rules.

> ------------------------------------------------------------------------
>
> **Note:** The coercion is also applied to function arguments. For
> example, `{c:doSomething(null)}` will cause `doSomething("")` being
> called if it expects a String object.

|                    | Boolean              | Character     | Number                | String         |
|--------------------|----------------------|---------------|-----------------------|----------------|
| Boolean            | obj[^1]              | ERROR         | ERROR                 | obj.toString() |
| Character          | ERROR                | obj           | (short)obj            | obj.toString() |
| Number             | obj                  | ERROR         | (char)obj             | obj.toString() |
| String (not empty) | Boolean.valueOf(obj) | obj.charAt(0) | Number[^2].valueOf(x) | obj            |
| String (empty)     | false                | (char)0       | 0                     | "" (obj)       |
| null               | false                | (char)0       | 0                     | ""             |
| Other              | ERROR                | ERROR         | ERROR                 | obj.toString() |

> ------------------------------------------------------------------------
>
> <references/>

- The handling of an empty string and null is the same



[^1]: obj represents the object being corerced

[^2]: The real class is determined at run time, such as Integer and
    Float.
