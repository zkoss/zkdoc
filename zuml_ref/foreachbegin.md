---
title: "forEachBegin"
---

**Syntax:**

`forEachBegin="${`*`an-EL-expr`*`}"`

It is used with the `forEach` attribute to specify the index (starting
from 0) that the iteration should begin at. If not specified, the
iteration begins at the first element, i.e., 0 is assumed.

If `forEachBegin` is greater than or equals to the number of elements,
no iteration is performed.

Note: `forEachStatus.index` always starts from 0, no matter what
`forEachBegin` is.

#
