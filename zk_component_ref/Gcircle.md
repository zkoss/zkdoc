

# Gcircle

- Demonstration: N/A
- Java API: [in release zip](https://github.com/zkoss/zkgmapsz/releases)
- JavaScript API: N/A


# Employment/Purpose

Circle drawn on the Google Maps per the given (latitude, longitude)
points, fill color, etc..

# Example

```xml
<window title="Google Maps" border="normal" width="520px">
    <script type="text/javascript" content="zk.googleAPIkey='Your-Google-API-Key'"/>
    <gmaps id="mymap" width="500px" height="300px" showSmallCtrl="true">
        <gcircle id="cmarker" lat="0" lng="0" radius="10000" strokeColor="red" fillColor="red"></gcircle>
    </gmaps>
</window>
```

# Supported Events

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Event Type</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>onCenterChange</p></td>
<td><p>org.zkoss.gmaps.event.CenterChangeEvent</p></td>
</tr>
<tr class="even">
<td><p>onRadiusChange</p></td>
<td><p>org.zkoss.gmaps.event.RadiusChangeEvent</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*None`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date | Content |
|---------|------|---------|
|         |      |         |


