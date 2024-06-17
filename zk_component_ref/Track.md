# Track

- Java API: <javadoc>org.zkoss.zul.Track</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.med.Track</javadoc>

# Employment/Purpose

It lets you specify some timed text tracks like captions or subtitles
for media components such as [
Audio](ZK_Component_Reference/Multimedia_and_Miscellaneous/Audio)
or [
Video](ZK_Component_Reference/Multimedia_and_Miscellaneous/Video).

# Example

![](Player-Sample.png)

``` xml
 <video src="course.mp4" controls="true">
   <track kind="captions" src="transcript.vtt" srclang="en" default="true"/>
   <track kind="subtitles" src="transcript_fr.vtt" srclang="fr"/>
   <track kind="subtitles" src="transcript_de.vtt" srclang="de"/>
   <track kind="subtitles" src="transcript_zh.vtt" srclang="zh"/>
 </video>
```

<figure>
<img src="ZKComRef_Audio_Example.png"
title="ZKComRef_Audio_Example.png" />
<figcaption>ZKComRef_Audio_Example.png</figcaption>
</figure>

``` xml
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

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`*NONE`

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

| Version | Date           | Content                                                                                                                                                             |
|---------|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 9.5.0   | September 2020 | [ZK-4648](https://tracker.zkoss.org/browse/ZK-4648): Audio supports to add tracks [ZK-4649](https://tracker.zkoss.org/browse/ZK-4649): Video supports to add tracks |
