  
`Property:`  
`org.zkoss.zk.ui.input.grouping.allowed`

(at page scope)

`Default: `<i>`true`</i>

Turn on/off whether the user is allowed to key in the grouping character
when entering a number. The grouping character depends on the Locale.
For example, it is a comma in English, and a dot in Germany. By default,
ZK will allow the user to key in the grouping characters and the
grouping characters are simply ignored when the input is parsed to a
number.

Some people still get confused whether the application considers a comma
as a decimal point or not, when he is new to the application. By
disabling the entering of the grouping character will help in this case.

```xml
<library-property>
    <name>org.zkoss.zk.ui.input.grouping.allowed</name>
    <value>false</value>
</library-property>
```

If you want to disable it only for a particular page, you could specify
it in the page's attribute (note: the page must be the root page). For
example,

```xml
<zk>
<custom-attributes org.zkoss.zk.ui.input.grouping.allowed="false" scope="page"/>
<doublebox/>
</zk>
```
