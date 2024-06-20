{% include ZKComponentReferencePageHeader %} {% include
versionSince\|9.5.0 %} {% include ZK EE %} {% include
ZKComponentReferenceAccessibilityNamingReference %}

<table>
<thead>
<tr class="header">
<th><center>
<p>Attributes</p>
</center></th>
<th><center>
<p>Description</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>data-ariaStartLabel</p></td>
<td><p>Describe the the slider button (start).</p></td>
</tr>
<tr class="even">
<td><p>data-ariaEndLabel</p></td>
<td><p>Describe the the slider button (end).</p></td>
</tr>
<tr class="odd">
<td><p>data-largeStep-multiplier (optional)</p></td>
<td><p>Describe the moving step of pressing PageUp/PageDown.</p></td>
</tr>
</tbody>
</table>

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
<td><p>ArrowUp / ArrowDown</p></td>
<td><p>Move the slider button.</p></td>
</tr>
<tr class="even">
<td><p>ArrowLeft / ArrowRight</p></td>
<td><p>Move the slider button.</p></td>
</tr>
<tr class="odd">
<td><p>Home / End</p></td>
<td><p>Move the slider button to the minimum/maximum.</p></td>
</tr>
<tr class="even">
<td><p>PageUp / PageDown</p></td>
<td><p>Move the slider button in the large step.</p></td>
</tr>
</tbody>
</table>

## Example

``` xml
<zk xmlns:ca="client/attribute">
  <rangeslider ca:aria-label="range value" ca:data-ariaStartLabel="minimal range value"
      ca:data-ariaEndLabel="maximal range value"/>
</zk>
```
