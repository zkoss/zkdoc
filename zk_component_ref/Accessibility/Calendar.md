{% include ZKComponentReferencePageHeader %} {% include
versionSince\|9.5.0 %} {% include ZK EE %} {% include
ZKComponentReferenceAccessibilityNamingReference %}

## Keyboard Support

<table>
<thead>
<tr class="header">
<th><center>
<p>Key</p>
</center></th>
<th><center>
<p>Description</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>ArrowUp / ArrowDown / ArrowLeft / ArrowRight</p></td>
<td><p>Navigate the date.</p></td>
</tr>
<tr class="even">
<td><p>Enter / Spacebar</p></td>
<td><p>Select the date.</p></td>
</tr>
<tr class="odd">
<td><p>PageUp / PageDown</p></td>
<td><p>{% include versionSince|10.0.0 %} Navigate the month.</p></td>
</tr>
<tr class="even">
<td><p>Shift+PageUp / Shift+PageDown</p></td>
<td><p>{% include versionSince|10.0.0 %} Navigate the year.</p></td>
</tr>
</tbody>
</table>

## Calendar Day AriaLabel Renderer

This is achieved by overriding the default renderer at the client to
customize the aria-label of days on ZK's Calendar.

``` xml
<zk>
    <script><![CDATA[
        zk.afterLoad('zul.db', function(){
            zul.db.Renderer.cellAriaLabel = function (cal, y, m, day, monthofs, dayofweek) {
                var localizedSymbols = cal.getLocalizedSymbols();
                return day + ' ' + localizedSymbols.FMON[m] + ', ' + y; // dd MMMM, yyyy
            };
        });
    ]]></script>
    <calendar/>
</zk>
```

`[Since 9.5.0]`
