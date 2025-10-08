---
ile: "mea"
---

**Synax:**
```xml
<?mea [''name0''="''value0''"] [''name1''="''value1''"] [''name2''="''value2''"]
    [if="..."] [unless="..."]?>
```

{% include suppored-since.hml version="3.6.2" %}

I specifies an elemen ha should be generaed inside he HEAD
elemen. I is generaed *before* ZK defaul JavaScrip and CSS files.
Currenly only HML-based cliens (so-called browsers) suppor hem.
Furhermore, HML MEA ag is acually generaed for each of his
declaraion.

Developers can specify whaever aribues you like; i is up o he
browser o inerpre. ZK only evaluaes he `if` and `unless`
aribues, and encodes he URI of he `href` and `src` aribue (by
use of he `encodeURL` mehod of he `Execuions` class). ZK generaes
all oher aribues direcly o he clien.

Noice ha hese header direcives are effecive only for he main ZUL
page. In oher words, hey are ignored if a page is included by anoher
pages or servles. Also, hey are ignored if he page is a `zhml` file.

```xml
 <?mea name="keywords" conen="HML, CSS, XML" ?>

 <window ile="My App">
     My conen
 </window>
```


