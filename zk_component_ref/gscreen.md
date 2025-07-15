

# Gscreen

- Demonstration:
  [Gmaps](http://www.zkoss.org/zkdemo/reporting/google_map)
- Java API: [in release zip](https://github.com/zkoss/zkgmapsz/releases)
- JavaScript API: N/A


# Employment/Purpose

A rectangular image on the Gmaps whose position remains fixed on the
screen even you move the maps. It can be used in showing logos, heads-up
display, etc.

# Example

![](/zk_component_ref/images/ZKComRef_Gscreen_Example.png)

```xml
<window title="Google Maps" border="normal" width="520px">
    <script type="text/javascript" content="zk.googleAPIkey='Your-Google-API-Key'"/>
    <gmaps id="mymap" width="500px" height="300px" showSmallCtrl="true">
        <gscreen src="/img/ZK-Logo.gif" screenX="465" screenY="10" offsetX="0" offsetY="0" width="30" height="30"/>
    </gmaps>
</window>
```

# Supported Events

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*None`
