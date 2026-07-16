---
title: "Gmaps"
---

- **Demonstration:** [Gmaps](http://www.zkoss.org/zkdemo/reporting/google_map)
- **Java API:** [in release zip](https://github.com/zkoss/zkgmapsz/releases)

Check [our Maven repository](https://mavensync.zkoss.org/maven2/org/zkoss/zkforge/gmapsz/) for the latest version.

# Employment/Purpose

Components:
`gmaps, ginfo, gmarker, gpolyline, gpolygon, gimage, and gscreen.`

A `gmaps` is a maps component that wraps the famous Google Maps service
that you can control it and embedded it in your ZK web application page
in pure Java. Inside the `gmap`, you can manipulate your maps and add
contents to the maps to create convenient locality related web
application. You can add `ginfo` to represent an anchored information
window for the maps. You can add multiple `gmarker`s to indicate a
special location. You can add `gpolyline` and `gpolygon` to indicate a
path or an area. You can also overlay `gimage` and `gscreen` to indicate
very special places.

## Common Use Cases

- Embed an interactive Google Map in a ZK page with markers, info windows, polylines, and polygons.
- Display location-aware data by binding a `MapModel` to the map so pins are added/removed as the viewport changes.
- Let users pick a location: listen to `onMapClick` to capture the clicked latitude/longitude.
- Restrict the visible area with `swlat`/`swlng`/`nelat`/`nelng` to fit the map to a known bounding box.

# Example
## Basic

```xml
<gmaps width="500px" height="300px"/>
```

## Init the center of the Map

```xml
<gmaps width="500px" height="300px" lat="37.7765" lng="-122.4140"/>
```

## Map Movement and Animation

To move the Maps center smoothly, you can control it by calling `Gmaps.panTo()` Java method as follows:

```xml
<gmaps id="map" width="500px" height="300px"/>
<button label="panTo" onClick="map.panTo(37.4569, -122.1569)"/>
```

## Change the Zoom Level

```xml
<gmaps id="map" width="500px" height="300px"/>
<slider maxpos="17" curpos="${map.zoom}" onScroll="map.setZoom(self.curpos)"/>
```

## Adding Controls to the Map

```xml
<gmaps width="500px" height="300px" showSmallCtrl="true"/>
```

## Use with Ginfo and Gmarker
![Gmaps Example](/zk_component_ref/images/ZKComRef_Gmaps_Example.png)

```xml
    <!-- you may wish to specify the version of google map API manually for some reason, 
        use version="[version]" to do it.
        ex: <gmaps version="3.25" id="mymap" ... /> -->
    <gmaps id="mymap" width="500px" height="300px" showSmallCtrl="true">
        <ginfo id="myinfo" open="true">
            <![CDATA[
                Hello, <a href="http://www.zkoss.org">ZK</a>.
            ]]>
        </ginfo>
        
        <gmarker id="mymark" lat="37.4410" lng="-122.1490">
            <![CDATA[
                Hello, <a href="http://www.zkoss.org">ZK</a> on top of Gmarker.
            ]]>
        </gmarker>
        
        <attribute name="onMapClick">
            Gmarker gmarker = event.getGmarker();
            if (gmarker != null) {
                gmarker.setOpen(true);
            }
        </attribute>
    </gmaps>
```

# Setup

This component requires you to include a separate dependency before using it:

```xml
		<dependency>
			<groupId>org.zkoss.zkforge</groupId>
			<artifactId>gmapsz</artifactId>
			<version>${gmap.version}</version>
		</dependency>
```

Check [CE repository](https://mavensync.zkoss.org/maven2/org/zkoss/zkforge/gmapsz/) for available version.

# Authentication

## Configure in Application Scope

{% include supported-since.html version="4.0.0" %}

In zk.xml

```xml
<library-property>
    <name>org.zkoss.gmaps.apiKey</name>
    <value>your_key</value>
</library-property>
<library-property>
    <name>org.zkoss.gmaps.clientId</name>
    <value>your_client_id</value>
</library-property>
```

## API Key

**Important:** Since 2016 an [API Key is mandatory](https://developers.google.com/maps/faq#keysystem) in order to
use the gmaps API. The APIKey is defined as a global JS variable as in
the examples below. Also check out the Troubleshooting section below. **NOTE**: You'll have
to upgrade to version **3.0.4** (older versions don't work anymore)

See [Example](#Example) above.

## Client ID

You can specify a client-id at `client` attribute:

```xml
<gmaps client="YOUR_CLIENT_ID"/>
```

## Troubleshooting

Starting from June 2016, an API key is required to use Google Maps APIs.
If you are seeing the following error in your JS console, please obtain
an API key from Google.

`Google Maps API error: MissingKeyMapError`

For more information please refer to
[Google Maps pricing and plans](https://developers.google.com/maps/pricing-and-plans/standard-plan-2016-update).

Note that ZK GMaps integrates ZK and Google Maps, allowing developers to
include Google Maps inside a ZK application easily. Google Maps itself
is a 3rd party library and is licensed under its own terms and
conditions.

# Work with MVVM

**3.0.4 already includes the `addon.xml` below**, you don't need to add
it manually.

{% include supported-since.html version="6.0.0" %}

For work with ZK6 MVVM, it is required to create an addon xml and add
the server annotation as follows:

You can download the sample project
[https://zkgmapsz.googlecode.com/svn/trunk/gmapszTest here](https://zkgmapsz.googlecode.com/svn/trunk/gmapszTest_here)

WEB-INF/gmapsz-bind-addon.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<language-addon>
    <!-- The name of this addon. It must be unique -->
    <addon-name>gmapszbind</addon-name>
    <!-- Specifies what other addon this depends
    <depends></depends>
    -->
    <!-- Which language this addon will be added to -->
    <language-name>xul/html</language-name>
    <!-- Add bind annotation to gmaps -->
    <component>
        <component-name>gmaps</component-name>
        <extends>gmaps</extends>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>mapType</property-name>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onMapTypeChange</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>LOAD_REPLACEMENT</attribute-name>
                <attribute-value>mapType</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>LOAD_TYPE</attribute-name>
                <attribute-value>java.lang.String</attribute-value>
            </attribute>
        </annotation>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>selectedItem</property-name>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onSelect</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>LOAD_REPLACEMENT</attribute-name>
                <attribute-value>selectedItem</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>LOAD_TYPE</attribute-name>
                <attribute-value>org.zkoss.zk.ui.Component</attribute-value>
            </attribute>
        </annotation>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>lat</property-name>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onMapMove</attribute-value>
            </attribute>
        </annotation>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>lng</property-name>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onMapMove</attribute-value>
            </attribute>
        </annotation>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>zoom</property-name>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onMapZoom</attribute-value>
            </attribute>
        </annotation>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>neLat</property-name>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onMapMove</attribute-value>
            </attribute>
        </annotation>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>neLng</property-name>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onMapMove</attribute-value>
            </attribute>
        </annotation>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>swLat</property-name>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onMapMove</attribute-value>
            </attribute>
        </annotation>
        <annotation>
            <annotation-name>ZKBIND</annotation-name>
            <property-name>swLng</property-name>
            <attribute>
                <attribute-name>ACCESS</attribute-name>
                <attribute-value>both</attribute-value>
            </attribute>
            <attribute>
                <attribute-name>SAVE_EVENT</attribute-name>
                <attribute-value>onMapMove</attribute-value>
            </attribute>
        </annotation>
    </component>
</language-addon>
```

then add it into WEB-INF/zk.xml

```xml
<zk>
    <language-config>
        <addon-uri>/WEB-INF/gmapsz-bind-addon.xml</addon-uri>
    </language-config>
</zk>
```

# Properties

## BaseDomain

{% include supported-since.html version="2.0" %}

**Default Value:** `null` (uses the default Google Maps domain)

Sets the base domain from which to load the Maps API. Useful when you need to load a regional variant of the API — for example, `"maps.google.cn"` for the Chinese version. When `null`, the default Google domain is used.

As an alternative for geocoding region bias, prefer [`region`](#Region).

```xml
<gmaps width="500px" height="300px" baseDomain="maps.google.cn"/>
```

## Center

{% include supported-since.html version="3.0.2" %}

**Default Value:** `37.4419, -122.1419` (Palo Alto, CA)

Sets the center of the Google Maps as a `LatLng` object. When using ZUML, set the center via the individual [`lat`](#Lat) and [`lng`](#Lng) attributes instead. This property is typically used in Java or a ViewModel.

The value is a `LatLng` object constructed in `<zscript>` or a composer/ViewModel.

```xml
<zscript>
    import org.zkoss.gmaps.LatLng;
    LatLng hq = new LatLng(37.4419, -122.1419);
</zscript>
<gmaps width="500px" height="300px" center="${hq}"/>
```

## Channel

{% include supported-since.html version="3.0.2" %}

**Default Value:** `null`

Sets the [channel parameter](https://developers.google.com/maps/documentation/javascript/get-api-key#clientID-features) of the Google Maps API. The channel is used together with a `client` ID for usage reporting under Google Maps Premium. It has no effect when using an API key.

```xml
<gmaps width="500px" height="300px" client="gme-yourcompany" channel="my-channel"/>
```

## Client

{% include supported-since.html version="3.0.2" %}

**Default Value:** `null`

Sets the [client ID parameter](https://developers.google.com/maps/premium/overview#client_id) of the Google Maps API. Use this for Google Maps Premium (Maps for Work) authentication. You should set either an API key (`key`) or a client ID, not both; if both are set, Google Maps prioritises the API key.

```xml
<gmaps width="500px" height="300px" client="gme-yourcompany"/>
```

## ContinuousZoom

{% include supported-since.html version="2.0" %}

**Default Value:** `false`

Sets whether to enable continuous (smooth, animated) zoom effects when the user changes the zoom level.

```xml
<gmaps width="500px" height="300px" continuousZoom="true"/>
```

## DoubleClickZoom

{% include supported-since.html version="2.0" %}

**Default Value:** `true`

Sets whether to enable zooming in/out via a mouse double-click on the map.

```xml
<gmaps width="500px" height="300px" doubleClickZoom="false"/>
```

## EnableDragging

{% include supported-since.html version="2.0" %}

**Default Value:** `true`

Sets whether the user can drag the map with the mouse. Set to `false` to lock the map in place.

```xml
<gmaps width="500px" height="300px" enableDragging="false"/>
```

## EnableGoogleBar

{% include supported-since.html version="2.0" %}

**Default Value:** `false`

Sets whether to show the Google Search Bar on the map.

```xml
<gmaps width="500px" height="300px" enableGoogleBar="true"/>
```

## ExtraMapOptions

{% include supported-since.html version="3.1.0" %}

**Default Value:** empty map

Passes additional [Google Maps `MapOptions`](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) that do not yet have a dedicated ZK attribute (e.g. `tilt`, `fullscreenControl`, `rotationControl`). Options are merged additively into the existing map options; existing options are not removed. Setting an option to `null`, `false`, or an empty collection clears it.

Do not use this for options that already have a ZK setter (such as `center`, `zoom`, `mapTypeId`) — doing so results in undefined behaviour.

The value is a `Map<String, Object>` constructed in `<zscript>` or a composer/ViewModel.

```xml
<zscript>
    import java.util.HashMap;
    Map opts = new HashMap();
    opts.put("tilt", 45);
    opts.put("fullscreenControl", true);
</zscript>
<gmaps width="500px" height="300px" extraMapOptions="${opts}"/>
```

## GmapsApiConfigParam

**Default Value:** `null`

Sets an arbitrary additional URL parameter/value on the Google Maps API script request (`https://maps.googleapis.com/maps/api/js?...`). Use this to pass Google API parameters that are not yet exposed as dedicated ZK attributes. Parameters are stored in an internal map and merged with ZK's own API parameters.

This property is most useful from Java — in ZUML the dedicated attributes (`key`, `language`, `libraries`, etc.) cover the common cases.

```xml
<zscript>
    // Pass a custom parameter not yet covered by ZK gmaps
    map.setGmapsApiConfigParam("callback", "initMap");
</zscript>
<gmaps id="map" width="500px" height="300px"/>
```

## Hybrid

{% include supported-since.html version="2.0" %}

**Default Value:** `true`

Sets whether the hybrid map type is available in the map type selector. When `false`, the hybrid option is removed from the type control. If `mapType` is currently `"hybrid"` when this is set to `false`, the map type falls back to the first available type (`normal`, `satellite`, or `physical`).

```xml
<gmaps width="500px" height="300px" hybrid="false"/>
```

## ItemRenderer

{% include supported-since.html version="2.0" %}

**Default Value:** `null` (default renderer — assumes each data object is already a `Mapitem`)

Sets the renderer used to convert data objects from the [`model`](#Model) into map items (`Gmarker`, `Ginfo`, etc.). Only relevant when a `MapModel` is assigned. Changing the renderer does not automatically re-render the map; re-assign the model to force a refresh.

The value is a `MapitemRenderer` object constructed in `<zscript>` or a composer/ViewModel.

```xml
<zscript>
    import org.zkoss.gmaps.MapitemRenderer;
    import org.zkoss.gmaps.Mapitem;
    import org.zkoss.gmaps.Gmarker;
    MapitemRenderer myRenderer = new MapitemRenderer() {
        public Mapitem newMapitem(Object data) {
            MyLocation loc = (MyLocation) data;
            Gmarker m = new Gmarker();
            m.setLat(loc.getLat());
            m.setLng(loc.getLng());
            return m;
        }
    };
</zscript>
<gmaps width="500px" height="300px" model="${myModel}" itemRenderer="${myRenderer}"/>
```

## Key

{% include supported-since.html version="3.0.5" %}

**Default Value:** `null`

Sets the [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key). An API key has been mandatory since June 2016. You should set either an API key or a client ID; if both are provided, Google Maps prioritises the API key.

Alternatively, configure the key application-wide via the `org.zkoss.gmaps.apiKey` library property in `zk.xml`, or set the global JS variable `zk.googleAPIkey` on the page.

```xml
<gmaps width="500px" height="300px" key="YOUR_API_KEY"/>
```

## Language

{% include supported-since.html version="2.0" %}

**Default Value:** `null` (uses the browser's preferred language)

Sets the preferred [language code](https://developers.google.com/maps/documentation/javascript/localization#Language) for map UI text such as control labels, copyright notices, and so on. When set, the specified language overrides the browser's language preference. Use BCP 47 language codes (e.g. `"en"`, `"zh-TW"`, `"fr"`).

```xml
<gmaps width="500px" height="300px" language="zh-TW"/>
```

## Lat

**Default Value:** `37.4419` (Palo Alto, CA)

Sets the latitude of the map center. Updating `lat` repositions the map; use together with [`lng`](#Lng) to set a specific location. Both `lat` and `lng` are bound via MVVM with the `onMapMove` save event.

```xml
<gmaps width="500px" height="300px" lat="35.6895" lng="139.6917"/>
```

## Libraries

{% include supported-since.html version="3.0.0" %}

**Default Value:** `"geometry,marker"`

Sets the comma-separated list of [Google Maps API libraries](https://developers.google.com/maps/documentation/javascript/libraries) to load alongside the Maps API. The default loads the `geometry` and `marker` libraries. Additional libraries such as `places`, `drawing`, or `visualization` can be added as needed.

```xml
<gmaps width="500px" height="300px" libraries="geometry,marker,places"/>
```

## Lng

**Default Value:** `-122.1419` (Palo Alto, CA)

Sets the longitude of the map center. Use together with [`lat`](#Lat) to position the map. Both `lat` and `lng` are bound via MVVM with the `onMapMove` save event.

```xml
<gmaps width="500px" height="300px" lat="35.6895" lng="139.6917"/>
```

## MapId

**Default Value:** `null`

Sets the [Map ID](https://developers.google.com/maps/documentation/javascript/advanced-markers/start) required by the Google Maps Advanced Markers API. A Map ID associates the map with a specific style and enables features such as `AdvancedMarkerElement`. The Map ID must be created in the Google Cloud Console.

```xml
<gmaps width="500px" height="300px" key="YOUR_API_KEY" mapId="YOUR_MAP_ID"/>
```

## MapType

**Default Value:** `"normal"`

Sets the currently displayed map type. Accepted values:

| Value | Meaning |
|---|---|
| `normal` | Standard road map (default) |
| `satellite` | Satellite imagery |
| `hybrid` | Satellite imagery with road overlay |
| `physical` | Terrain / physical map |

The corresponding map-type toggle must be enabled (`normal`, `satellite`, `hybrid`, or `physical` property set to `true`) for the value to take effect. If the requested type is not enabled, the setter falls back to `"normal"`.

```xml
<gmaps width="500px" height="300px" mapType="satellite"/>
```

## Model

{% include supported-since.html version="2.0" %}

**Default Value:** `null`

Sets the `MapModel` that supplies map items (markers, info windows, etc.) to the map. When the model's visible bounds change (i.e. on `onMapMove`), it is queried for items within the current viewport and the map is updated accordingly. Assigning the same model again forces a full re-render.

Set to `null` to disconnect the model; existing model-controlled children are removed.

The value is a `MapModel` object constructed in `<zscript>` or a composer/ViewModel.

```xml
<zscript>
    import org.zkoss.gmaps.SimpleMapModel;
    // assume myItems is a Collection of Mapitem objects
    SimpleMapModel model = new SimpleMapModel(myItems);
</zscript>
<gmaps width="500px" height="300px" model="${model}"/>
```

## Nelat

{% include supported-since.html version="3.0.2" %}

Returns or sets the north-east latitude of the current map viewport bounds. Setting this value calls `fitBounds` internally to adjust the visible area. Use together with [`nelng`](#Nelng), [`swlat`](#Swlat), and [`swlng`](#Swlng) to define a bounding box.

```xml
<gmaps width="500px" height="300px"
    swlat="37.0" swlng="-123.0"
    nelat="38.0" nelng="-121.0"/>
```

## Nelng

{% include supported-since.html version="3.0.2" %}

Returns or sets the north-east longitude of the current map viewport bounds. Setting this value calls `fitBounds` internally. Use together with [`nelat`](#Nelat), [`swlat`](#Swlat), and [`swlng`](#Swlng).

```xml
<gmaps width="500px" height="300px"
    swlat="37.0" swlng="-123.0"
    nelat="38.0" nelng="-121.0"/>
```

## Normal

{% include supported-since.html version="2.0" %}

**Default Value:** `true`

Sets whether the normal (road) map type is available in the map type selector. When set to `false` while `mapType` is `"normal"`, the map type falls back to the first available alternative.

```xml
<gmaps width="500px" height="300px" normal="false" satellite="true" mapType="satellite"/>
```

## Physical

{% include supported-since.html version="2.0" %}

**Default Value:** `true`

Sets whether the physical (terrain) map type is available in the map type selector. When set to `false` while `mapType` is `"physical"`, the map type falls back to the first available alternative.

```xml
<gmaps width="500px" height="300px" physical="true" mapType="physical"/>
```

## Region

{% include supported-since.html version="3.0.5" %}

**Default Value:** `null`

Sets the [region parameter](https://developers.google.com/maps/documentation/javascript/localization#Region) of the Google Maps API. The region biases geocoding results toward a specific country or territory using a Unicode region subtag (e.g. `"US"`, `"GB"`, `"TW"`). This is the preferred alternative to [`baseDomain`](#BaseDomain) for geocoding localisation.

```xml
<gmaps width="500px" height="300px" region="TW"/>
```

## Satellite

{% include supported-since.html version="2.0" %}

**Default Value:** `false`

Sets whether the satellite map type is available in the map type selector. When set to `false` while `mapType` is `"satellite"`, the map type falls back to the first available alternative.

```xml
<gmaps width="500px" height="300px" satellite="true" mapType="satellite"/>
```

## ScrollWheelZoom

{% include supported-since.html version="2.0" %}

**Default Value:** `true`

Sets whether the user can zoom in/out using the mouse scroll wheel.

```xml
<gmaps width="500px" height="300px" scrollWheelZoom="false"/>
```

## SelectedItem

**Default Value:** `null`

Sets the currently selected map item. The item must be a direct child of this `gmaps` component and may be a `Gmarker`, `Gpolyline`, or `Gpolygon`. This property is bound via MVVM with the `onSelect` save event.

The value is a `Component` (specifically a `Mapitem` child) obtained at runtime.

```xml
<zscript>
    void onSelect() {
        myVM.setSelection(map.getSelectedItem());
    }
</zscript>
<gmaps id="map" width="500px" height="300px">
    <gmarker id="m1" lat="37.44" lng="-122.14"/>
</gmaps>
```

## Sensor

> **Deprecated since 3.0.5** — the `sensor` parameter is no longer required by the Google Maps API. See the [SensorNotRequired](https://developers.google.com/maps/documentation/javascript/error-messages#sensor-not-required) notice.

{% include supported-since.html version="2.0" %}

**Default Value:** `false`

Sets whether the application uses a sensor (such as a GPS locator) to determine the user's location. This was required by older versions of the Google Maps API but is ignored since version 3.0.5.

```xml
<gmaps width="500px" height="300px" sensor="true"/>
```

## ShowLargeCtrl

**Default Value:** `false`

Sets whether to show the large pan/zoom navigation control. Enabling the large control automatically disables `showSmallCtrl` and `showZoomCtrl` (the three controls are mutually exclusive).

```xml
<gmaps width="500px" height="300px" showLargeCtrl="true"/>
```

## ShowOverviewCtrl

{% include supported-since.html version="2.0" %}

**Default Value:** `false`

Sets whether to show the overview (mini-map) control in the corner of the map.

```xml
<gmaps width="500px" height="300px" showOverviewCtrl="true"/>
```

## ShowPanCtrl

{% include supported-since.html version="3.0.1" %}

**Default Value:** `true`

Sets whether to show the pan control on the map.

```xml
<gmaps width="500px" height="300px" showPanCtrl="false"/>
```

## ShowScaleCtrl

{% include supported-since.html version="2.0" %}

**Default Value:** `false`

Sets whether to show the scale control (map scale bar) on the map.

```xml
<gmaps width="500px" height="300px" showScaleCtrl="true"/>
```

## ShowSmallCtrl

**Default Value:** `false`

Sets whether to show the small pan/zoom navigation control. Enabling the small control automatically disables `showLargeCtrl` and `showZoomCtrl` (the three controls are mutually exclusive).

```xml
<gmaps width="500px" height="300px" showSmallCtrl="true"/>
```

## ShowTypeCtrl

**Default Value:** `true`

Sets whether to show the map type selector control (the buttons that switch between Normal, Satellite, Hybrid, etc.).

```xml
<gmaps width="500px" height="300px" showTypeCtrl="false"/>
```

## ShowZoomCtrl

{% include supported-since.html version="2.0" %}

**Default Value:** `true`

Sets whether to show the small zoom-only control (plus/minus buttons). Enabling this control automatically disables `showLargeCtrl` and `showSmallCtrl` (the three navigation controls are mutually exclusive).

```xml
<gmaps width="500px" height="300px" showZoomCtrl="false"/>
```

## Swlat

{% include supported-since.html version="3.0.2" %}

Returns or sets the south-west latitude of the current map viewport bounds. Setting this value calls `fitBounds` internally. Use together with [`swlng`](#Swlng), [`nelat`](#Nelat), and [`nelng`](#Nelng) to define a bounding box.

```xml
<gmaps width="500px" height="300px"
    swlat="37.0" swlng="-123.0"
    nelat="38.0" nelng="-121.0"/>
```

## Swlng

{% include supported-since.html version="3.0.2" %}

Returns or sets the south-west longitude of the current map viewport bounds. Setting this value calls `fitBounds` internally. Use together with [`swlat`](#Swlat), [`nelat`](#Nelat), and [`nelng`](#Nelng).

```xml
<gmaps width="500px" height="300px"
    swlat="37.0" swlng="-123.0"
    nelat="38.0" nelng="-121.0"/>
```

## Version

**Default Value:** `null` (resolves to Google's `"weekly"` release)

Sets the [Google Maps API version](https://developers.google.com/maps/documentation/javascript/versions) to load. When `null`, the Google Maps JS loader selects the latest stable weekly release. Pin a specific version string (e.g. `"weekly"`, `"quarterly"`, or a numeric version like `"3.55"`) to control upgrade timing.

```xml
<!-- Pin to weekly channel explicitly -->
<gmaps width="500px" height="300px" version="weekly"/>
```

## Zoom

**Default Value:** `13`

Sets the zoom level of the map. Valid values range from `0` (fully zoomed out, world view) to `18` (maximum zoom, street level). This property is bound via MVVM with the `onMapZoom` save event.

```xml
<gmaps width="500px" height="300px" zoom="10"/>
```

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onSelect` | [org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) | Notifies when the user has selected a new item (can be Ginfo, Gpolyline, or Gpolygon) in the gmaps. |
| `onInfoChange` | [InfoChangeEvent]({{site.baseurl}}/zk_component_ref/infochangeevent) | Notifies when the current open information window has changed (opened/closed). |
| `onMapDrop` | [MapDropEvent]({{site.baseurl}}/zk_component_ref/mapdropevent) | Notifies when a component is dragged and dropped on the gmaps or gmarker component with latitude and longitude information. |
| `onMapClick` `onMapRightClick` `onMapDoubleClick` | [MapMouseEvent]({{site.baseurl}}/zk_component_ref/mapmouseevent) | Notifies when a mouse action has been applied on the gmaps or gmarker component with latitude and longitude information. |
| `onMapMove` | [MapMoveEvent]({{site.baseurl}}/zk_component_ref/mapmoveevent) | Notifies when the view center (latitude, longitude) of the gmaps has been moved. |
| `onMapTypeChange` | [MapTypeChangeEvent]({{site.baseurl}}/zk_component_ref/maptypechangeevent) | Notifies when the map type of the gmaps has been changed. |
| `onMapZoom` | [MapZoomEvent]({{site.baseurl}}/zk_component_ref/mapzoomevent) | Notifies when the zoom level of the gmaps has been changed. |

- Inherited Supported Events: [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

[Ginfo]({{site.baseurl}}/zk_component_ref/ginfo), [Gmarker]({{site.baseurl}}/zk_component_ref/gmarker), [Gpolyline]({{site.baseurl}}/zk_component_ref/gpolyline), [Gpolygon]({{site.baseurl}}/zk_component_ref/gpolygon), [Gimage]({{site.baseurl}}/zk_component_ref/gimage), [Gscreen]({{site.baseurl}}/zk_component_ref/gscreen), [Gcircle]({{site.baseurl}}/zk_component_ref/gcircle)
