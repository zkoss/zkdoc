---
title: "Gmaps"
---


- Demonstration:
  [Gmaps](http://www.zkoss.org/zkdemo/reporting/google_map)
- Java API: [in release zip](https://github.com/zkoss/zkgmapsz/releases)
- JavaScript API: N/A


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
the examples below. Also check out the [trouble shooting](#Trouble_Shooting) section. **NOTE**: You'll have
to upgrade to version **3.0.4** (older versions don't work anymore)

See [Example](#Example) below.

## Client ID

You can specify a client-id at `client` attribute: \
```xml
<gmaps client="YOUR_CLIENT_ID"/>
```

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
![](/zk_component_ref/images/ZKComRef_Gmaps_Example.png)

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

# Properties

## Protocol

{% include supported-since.html version="3.0.0" %}

Specify which protocol to load the Maps API. Currently it supports
`http` for insecure connections and `https` for secure connections.

# Supported Events

| Name | Event Type |
|---|---|
| `onSelect` | **Event:**
[org.zkoss.zk.ui.event.SelectEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/SelectEvent.html) Notifies one that
the user has selected a new item(can be <a href="{{site.baseurl}}/zk_component_ref/ginfo" title="wikilink"> Ginfo</a>, <a href="{{site.baseurl}}/zk_component_ref/gpolyline" title="wikilink"> Gpolyline</a>, or <a href="{{site.baseurl}}/zk_component_ref/gpolygon" title="wikilink"> Gpolygon</a>) in the gmaps. |
| `onInfoChange` | **Event:** <a href="{{site.baseurl}}/zk_component_ref/infochangeevent" title="wikilink">
InfoChangeEvent</a>
Notifies that the current open information window has
changed(opened/closed) |
| `onMapDrop` | **Event:** <a href="{{site.baseurl}}/zk_component_ref/mapdropevent" title="wikilink">
MapDropEvent</a>
Notifies that some component is dragged and dropped on the gmaps or
gmarker component with latitude and longitude information. |
| `onMapClick` `onMapRightClick`
`onMapDoubleClick` | **Event:** <a href="{{site.baseurl}}/zk_component_ref/mapmouseevent" title="wikilink">
MapMouseEvent</a>
Notifies that some mouse action has been applied on the gmaps or
gmarker component with latitude and longitude information. |
| `onMapMove` | **Event:** <a href="{{site.baseurl}}/zk_component_ref/mapmoveevent" title="wikilink">
MapMoveEvent</a>
Notifies that the view center (latitude, longitude) of the gmaps has
been moved. |
| `onMapTypeChange` | **Event:** <a href="{{site.baseurl}}/zk_component_ref/maptypechangeevent" title="wikilink"> MapTypeChangeEvent</a>
Notifies that the map type of the gmaps has been changed. |
| `onMapZoom` | **Event:** <a href="{{site.baseurl}}/zk_component_ref/mapzoomevent" title="wikilink">
MapZoomEvent</a>
Notifies that the zoom level of the gmaps has been changed. |

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

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

# Supported Children

`*`[` Ginfo`]({{site.baseurl}}/zk_component_ref/ginfo)`, `[` Gmarker`]({{site.baseurl}}/zk_component_ref/gmarker)`,`[` Gpolyline`]({{site.baseurl}}/zk_component_ref/gpolyline)`,`[` Gpolygon`]({{site.baseurl}}/zk_component_ref/gpolygon)`,`[` Gimage`]({{site.baseurl}}/zk_component_ref/gimage)`,`[` Gscreen`]({{site.baseurl}}/zk_component_ref/gscreen)`,`[` Gcircle`]({{site.baseurl}}/zk_component_ref/gcircle)

# Trouble Shooting

Starting from June 2016, an API key is required to use Google Maps APIs.
If you are seeing the following error in your JS console, please obtain
an API key from Google.

`Google Maps API error: MissingKeyMapError`

For more information please refer to
\[<https://developers.google.com/maps/pricing-and-plans/standard-plan-2016-update?utm_source=geoblog&utm_medium=social&utm_campaign=2016-geo-na-website-gmedia-blogs-us-blogPost&utm_content=TBC>\|
this link\].

Note that ZK GMaps integrates ZK and Google Maps, allowing developers to
include Google Maps inside a ZK application easily. Google Maps itself
is a 3rd party library and is licensed under its own terms and
conditions.


