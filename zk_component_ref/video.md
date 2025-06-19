

# Video

- Java API: [org.zkoss.zkmax.zul.Video](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/Video.html)
- JavaScript API: <javadoc directory="jsdoc">zkmax.med.Video</javadoc>

{% include edition-availability.html edition="pe" %} {% include version-badge.html version=8.6.0 %}

# Employment/Purpose

A `Video` component is used to play the video in the browser. Like
`audio`, you can either use the `src` property to specify an URL of the
video resource, or use the `setContent` method to specify a dynamically
generated video. Users can control the video by `play`, `stop` and
`pause`.

# Example

![](/zk_component_ref/images/Player-Sample.png)

```xml
 <video src="zk.mp4" controls="true" autoplay="true" loop="true" />
```

# Supports HTML5

The Video component is based on HTML 5's

<video>

tag, and supports the following properties: `src`, `autoplay`,
`controls`, `loop`, `playbackRate`, `dimBackground`, `preload`,
`clipToFit`, `poster`, `playsinline` and `crossorigin`.

## Supported Formats

[mp4, WebM, ogg](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats#File_formats)

# autoplay

Just set autoplay to `true` doesn't always work because **autoplay
policy is different among browsers**. Please refer to
[autoplay-policy-changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)
and
[auto-play-policy-changes-for-macos](https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/).

# Multiple Sources

Most browsers do not support all the video formats, so you can specify
multiple source files in different formats for different browsers. If
the first format is not supported by the browser, it will fallback to
the 2nd format. For example:

```xml
 <video src="zk.mp4, zk.webm, zk.ogg" />
```

# enableFullScreen

For security reasons, fullScreen API can only be initiated by an user
gesture. Therefore the Video component only provides a client-side
method `enableFullScreen()` to enable the full screen mode.

```xml
<video id="player" src="zk.mp4" controls="true"/>
<button xmlns:w="client" w:onClick="zk.$('$player').enableFullScreen()" />
```

# dimBackground

The Video component provides a theater mode, If dimBackground="true",
the whole page will be covered by translucent black by default except
the Video.

When the theater mode is enabled, user can click anywhere on the page
outside the Video to disable theater mode and return to the normal view.

![](/zk_component_ref/images/Player-turnOffLight.png)

```xml
 <video src="zk.mp4" dimBackground="true" />
```

By default, css of dimBackground has two properties as shown in the
following css code.

You can also customize the background in your preference by simply
overriding .z-video-dim-background in css.

```css
<style>
.z-video-dim-background {
    background: black;
    opacity: 0.8;
}
</style>
```

# playbackRate

The Video component provides setPlaybackRate(double) to control the
video playing speed. The valid value depends on the displayed browser.

Default: 1.0

```xml
 <video src="zk.mp4" playbackRate="0.5" />
```

# currentTime

The Video component provides `setCurrentTime(double)` to jump to the
specified time-point (in seconds) of the playback video.

```xml
 <video src="zk.mp4" currentTime="60" />
```

# playing

The Video component provides `setPlaying(boolean)` to play or pause the
video.

playing="true" is same as invoking `play()`; playing="false" is same as
invoking `pause()`.

```xml
 <video src="zk.mp4" playing="false" />
```

# volume

The Video component provides `setVolume(double)` to change the volume.
The value should range between 0.0 and 1.0.

Default: 1.0

```xml
 <video src="zk.mp4" volume="0.5" />
```

# muted

The Video component provides `setMuted(boolean)` to mute the video.

Default: false

```xml
 <video src="zk.mp4" muted="true" />
```

# clipToFit

The Video component provides setClipToFit(boolean) to clip the video
when the source size doesn't fit the size specified in the Video tag.

For example:

The source image used in the sample below is 450 \* 320. When you set
width="300px", height="320px", by default, blank space will be inserted
above and below the video to preserve the aspect ratio (left image);
when you set clipToFit="true", it will cut off the sides and fill up the
space (right image).

<file:ClipToFit(false).png> <file:ClipToFit(true).png>

```xml
  <video width="300px" height="320px" src="zk.mp4" style="border: 1px solid red;" />
  <video width="300px" height="320px" src="zk.mp4" style="border: 1px solid red;" clipToFit="true" />
```

# Display Subtitles

To display subtitles or captions on a video, please see [ Track]({{site.baseurl}}/zk_component_ref/multimedia_and_miscellaneous/track).

# StateChangeEvent

When you call `play(), stop(), pause()` StateChangeEvent will be
triggered. You can check the current state by calling event.getState().
Video has three states, and you can access them by using
`Video.PLAY, Video.STOP and Video.PAUSE`.

For example:

If you want to do something after the video starts to play, you can
write codes as shown below (MVVM style).

```xml
  <video onStateChange="@command('stateChange', event=event)" />
```

```java
  @Command
  public void stateChange(@BindingParam("event") StateChangeEvent event) {
    if (event.getState() == Video.PLAY) {
      // do something...
    }
  }
```

Video component also provides `isPlaying(), isPaused() and isStopped()`
methods to check the video state.

{% include version-badge.html version=9.6.0 %}

Since ZK 9.6.0, a new state - `Video.END` is added. When the video is
played to the end, the StateChangeEvent will be triggered.

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
<td><center>
<p><code>onStateChange</code></p>
</center></td>
<td><p><strong>Event:</strong>
[org.zkoss.zkmax.zul.event.StateChangeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/event/StateChangeEvent.html) Notifies
when invoking play(), stop() or pause().</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [ XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`* `[`Track`]({{site.baseurl}}/zk_component_ref/multimedia_and_miscellaneous/track)

# Version History



| Version | Date           | Content                                                                           |
|---------|----------------|-----------------------------------------------------------------------------------|
| 8.6.0   | May 2018       | [ZK-3845](https://tracker.zkoss.org/browse/ZK-3845): Provide a video component    |
| 9.5.0   | September 2020 | [ZK-4649](https://tracker.zkoss.org/browse/ZK-4649): Video supports to add tracks |


