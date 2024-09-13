**Syntax:**

<crawlable>`true|`**`false`**</crawlable>

`[Default: false (disabled)]`  
`[Since 5.0.0]`  

You are not able to specify whether content is crawlable, this works by
generating tags within your content where content only exists in the
form of Javascript. This allows your content to be crawled by Google and
is similar to how the client-centric frameworks behave. However, there
is a performance penalty so this option is disabled by default. You can
enable it by using the example below.

**Suggestion** : If your website is used by external users, turn this on
for better Search Engine Optimization (SEO).

``` xml
<system-config>
   <crawlable>true</crawlable>
</system-config>
```


