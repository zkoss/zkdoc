
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

| Name | Event Type |
|------|------------|
| onCenterChange | org.zkoss.gmaps.event.CenterChangeEvent |
| onRadiusChange | org.zkoss.gmaps.event.RadiusChangeEvent |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*None`
