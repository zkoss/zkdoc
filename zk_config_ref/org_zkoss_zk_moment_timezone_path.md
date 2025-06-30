**Property:** org.zkoss.zk.moment.timezone.path

`Default: empty (default data would be loaded)`

We start to use [moment.js, moment-timezone.js](https://momentjs.com/)
to support our client widgets of
`org.zkoss.zul.Datebox`,`org.zkoss.zul.Timebox`,`org.zkoss.zkmax.zul.Timepicker`.

Since timezone information changes every year for some countries, we
provide a way to update the timezone information.

1\. Download the json file from
<https://github.com/moment/moment-timezone/tree/develop/data/packed>.

2\. In zk.xml, specify file.

```xml
<library-property>
    <name>org.zkoss.zk.moment.timezone.path</name>
    <value>/data/2017a.json</value>
</library-property>
```

# Check in a Browser

To check which time zone data you loaded, open the browser developer
tool, and search the following keyword in `zk.wpd`.

Check built-in time zone data:

```js
    loadData({
        "version": "2023c",
```

Load external data by this property:

```js
var tzdata ={
    "version": "2023d",
```
