---
title: "forward"
---



**Syntax:**
```xml
<?forward uri="..." [if="..."] [unless="..."]?>
```

It specifies the URI to forward the request to, and the condition to
decide whether to forward. If the condition is satisfied or not
specified, this page won't be rendered, and the request is, instead,
forwarded to the URI specified in the `uri` attribute.

Notes

- Even if the forward is effective (i.e., ZK forwards the request to the
  specified URI), the initiators specified in the `init` directives will
  still be called.
- The `createComponents` method of the Execution interface ignores the
  `forward` directives. In other words, the `forward` directives are
  evaluated only if the ZUML page is loaded directly.

# uri

`[Required][EL expressions allowed]`

The URI of the page/servlet to forward to. It may be another ZUML page,
a JSP page or any servlet.

If an EL expression is specified and it is evaluated to an empty string,
it is considered as no forwarding at all.

# if

`[Optional][Default: true][EL expressions allowed]`

The condition to forward to the specified URI. If both `if` and `unless`
are omitted, this page won't be evaluated and ZK always forwards the
request to the specified URI.

# unless

`[Optional][Default: false][EL expressions allowed]`

The condition *not* to forward to the specified URI. If both `if` and
`unless` are omitted, this page won't be evaluated and ZK always
forwards the request to the specified URI.


