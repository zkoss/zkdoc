
- Demonstration:
  [Gmaps](http://www.zkoss.org/zkdemo/reporting/google_map)
- Java API: N/A
- JavaScript API: N/A


# Employment/Purpose

Image anchored on two specified (latitude, longitude) points(south-west
and north-east) which is zoomed and moved with the Google Maps.

# Example

![](/zk_component_ref/images/ZKComRef_Gimage_Example.png)

```xml
    <script type="text/javascript" content="zk.googleAPIkey='Your-Google-API-Key'"/>
    <gmaps id="mymap" width="500px" height="300px" showSmallCtrl="true">
        <gimage src="/img/Centigrade-Widget-Icons/Globe-128x128.png" 
swlat="37.44215478" swlng="-122.14273453" nelat="37.45033195" nelng="-122.13191986"/>
    </gmaps>
```

# Supported Events

- Inherited Supported Events:[ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events) 

# Supported Children

`*None`

