

# Track

- Java API: [org.zkoss.zul.Track](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Track.html)
- JavaScript API: [zul.med.Track](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.med.Track.html)

{% include version-badge.html version=9.5.0 %}

# Employment/Purpose

It lets you specify some timed text tracks like captions or subtitles
for media components such as [ Audio]({{site.baseurl}}/zk_component_ref/multimedia_and_miscellaneous/audio)
or [ Video]({{site.baseurl}}/zk_component_ref/multimedia_and_miscellaneous/video).

# Example

![](/zk_component_ref/images/Player-Sample.png)

```xml
 <video src="course.mp4" controls="true">
   <track kind="captions" src="transcript.vtt" srclang="en" default="true"/>
   <track kind="subtitles" src="transcript_fr.vtt" srclang="fr"/>
   <track kind="subtitles" src="transcript_de.vtt" srclang="de"/>
   <track kind="subtitles" src="transcript_zh.vtt" srclang="zh"/>
 </video>
```

![](/zk_component_ref/images/ZKComRef_Audio_Example.png)

```xml
 <audio src="music.wav" controls="true">
   <track kind="captions" src="music_lyric.vtt" srclang="en" default="true"/>
   <track kind="subtitles" src="music_lyric_fr.vtt" srclang="fr"/>
   <track kind="subtitles" src="music_lyric_de.vtt" srclang="de"/>
   <track kind="subtitles" src="music_lyric_zh.vtt" srclang="zh"/>
 </audio>
```

# Supported Browsers

It is compatible with HTML5-supported browsers, like IE 10, Edge,
Firefox, Opera, Chrome, and Safari.

Tracks don't be supported in Internet Explorer 9.

# Properties

## Default

Specify if the track should be used by default. It must be used on one
track only.

## Kind

Specify what kind of track it is. Allowed values are:

<table>
<thead>
<tr class="header">
<th><center>
<p>Name</p>
</center></th>
<th><center>
<p>Description</p>
</center></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><center>
<p>subtitles</p>
</center></td>
<td><p>Closed subtitles.</p></td>
</tr>
<tr class="even">
<td><center>
<p>captions</p>
</center></td>
<td><p>Closed captions.</p></td>
</tr>
<tr class="odd">
<td><center>
<p>descriptions</p>
</center></td>
<td><p>A textual description about what this video/audio is.</p></td>
</tr>
<tr class="even">
<td><center>
<p>chapters</p>
</center></td>
<td><p>Chapter titles for users to navigate.</p></td>
</tr>
<tr class="odd">
<td><center>
<p>metadata</p>
</center></td>
<td><p>A track used by scripts.</p></td>
</tr>
</tbody>
</table>

## Label

Specify a user-readable title. Used by browsers to show on the list of
available tracks.

## Src

The URL of the source file. The file must be in WebVTT format. This
attribute is required.

## Srclang

Specify what language this track is. It's required if the kind is
`subtitles`. It must be a valid BCP 47 language tag. For instance,
`fr-FR` and `en-US` are valid.

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
<td><p>None</p></td>
<td><p>None</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History



| Version | Date           | Content                                                                                                                                                             |
|---------|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 9.5.0   | September 2020 | [ZK-4648](https://tracker.zkoss.org/browse/ZK-4648): Audio supports to add tracks [ZK-4649](https://tracker.zkoss.org/browse/ZK-4649): Video supports to add tracks |


