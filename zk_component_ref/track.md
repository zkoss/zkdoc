---
title: "Track"
description: "Track: It lets you specify some timed text tracks like captions or subtitles for media components such as Audio or Video."
---

- **Demonstration:** [Track](https://www.zkoss.org/zkdemo/media/track)
- **Java API:** [org.zkoss.zul.Track](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Track.html)
- **JavaScript API:** [zul.med.Track](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.med.Track.html)

{% include supported-since.html version="9.5.0" %}

# Employment/Purpose

It lets you specify some timed text tracks like captions or subtitles
for media components such as [ Audio]({{site.baseurl}}/zk_component_ref/audio)
or [ Video]({{site.baseurl}}/zk_component_ref/video).

## Common Use Cases

**Adding captions and subtitles to a video:**

```xml
<video src="course.mp4" controls="true">
  <track kind="captions" src="transcript.vtt" srclang="en" default="true"/>
  <track kind="subtitles" src="transcript_fr.vtt" srclang="fr" label="Français"/>
  <track kind="subtitles" src="transcript_de.vtt" srclang="de" label="Deutsch"/>
</video>
```

**Adding lyrics or captions to an audio player:**

```xml
<audio src="music.wav" controls="true">
  <track kind="captions" src="lyrics.vtt" srclang="en" default="true"/>
  <track kind="subtitles" src="lyrics_zh.vtt" srclang="zh" label="中文"/>
</audio>
```

**Providing chapter navigation for a long video:**

```xml
<video src="lecture.mp4" controls="true">
  <track kind="chapters" src="chapters.vtt" srclang="en" default="true"/>
  <track kind="subtitles" src="subtitles.vtt" srclang="en" label="English"/>
</video>
```

# Example

![Player Sample](/zk_component_ref/images/Player-Sample.png)

```xml
 <video src="course.mp4" controls="true">
   <track kind="captions" src="transcript.vtt" srclang="en" default="true"/>
   <track kind="subtitles" src="transcript_fr.vtt" srclang="fr"/>
   <track kind="subtitles" src="transcript_de.vtt" srclang="de"/>
   <track kind="subtitles" src="transcript_zh.vtt" srclang="zh"/>
 </video>
```

![Audio Example](/zk_component_ref/images/ZKComRef_Audio_Example.png)

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

| Name | Description |
|---|---|
| subtitles | Closed subtitles. |
| captions | Closed captions. |
| descriptions | A textual description about what this video/audio is. |
| chapters | Chapter titles for users to navigate. |
| metadata | A track used by scripts. |

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

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`*NONE`