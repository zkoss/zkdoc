{% include ZKComponentReferencePageHeader %}

# Audio

- Demonstration: [Audio](http://www.zkoss.org/zksandbox/userguide/#u5)
- Java API: <javadoc>org.zkoss.zul.Audio</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zul.med.Audio</javadoc>

# Employment/Purpose

An `audio` component is used to play the audio at the browser. Like
`image`, you could use the `src` property to specify an URL of an audio
resource, or the `setContent` method to specify a dynamically generated
audio. Developers might be able to control the play of an audio by the
`play`, `stop` and `pause` methods.

# Example

<figure>
<img src="ZKComRef_Audio_Example.png"
title="ZKComRef_Audio_Example.png" />
<figcaption>ZKComRef_Audio_Example.png</figcaption>
</figure>

``` xml
 <audio src="music.wav" controls="true"></audio>
```

`The audio supports controls property {% include versionSince| 7.0.0 %}`

# Supports HTML5

{% include versionSince\| 7.0.0 %}

The audio component has now been enhanced to support HTML 5, it includes
the properties like `autoplay`, `controls`, `loop`, `muted` and
`preload`.

# Multiple Sources

{% include versionSince\| 7.0.0 %} Most browsers do not support all the
audio formats,so we could specify multiple source files in different
formats for different browsers. For examples:

``` xml
 <audio src="music.wav, music.mp3, music.ogg" controls="true"></audio>
```

# StateChangeEvent

{% include versionSince\| 9.6.0 %}

When you call `play(), stop(), pause()` or the audio is played to the
end, an `StateChangeEvent` will be fired. You can check the current
state by calling event.getState(). There are 4 states:
`Audio.PLAY, Audio.STOP, Audio.PAUSE and Audio.END`.

For example:

If you want to do something after the audio starts to play, you can
write codes as shown below (MVVM pattern).

      <audio onStateChange="@command('stateChange', event=event)" />

      @Command
      public void stateChange(@BindingParam("event") StateChangeEvent event) {
        if (event.getState() == Audio.PLAY) {
          // do something...
        }
      }

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
<javadoc>org.zkoss.zk.ui.event.StateChangeEvent</javadoc> Notifies when
invoking play(), stop(), pause() or the audio is played to the
end.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement](ZK_Component_Reference/Base_Components/XulElement#Supported_Events)

# Supported Children

`* `[`Track`](ZK_Component_Reference/Multimedia_and_Miscellaneous/Track)

# Use Cases

| Version | Description | Example Location |
|---------|-------------|------------------|
|         |             |                  |

# Version History

{% include LastUpdated %}

| Version | Date           | Content                                                                                                     |
|---------|----------------|-------------------------------------------------------------------------------------------------------------|
| 7.0.0   | August, 2013   | <javadoc>org.zkoss.zul.Audio</javadoc> now supports HTML 5                                                  |
| 9.5.0   | September 2020 | [ZK-4648](https://tracker.zkoss.org/browse/ZK-4648): Audio supports to add tracks                           |
| 9.6.0   | May 2021       | [ZK-4779](https://tracker.zkoss.org/browse/ZK-4779): audio supports to fire an event upon its playing state |

{% include ZKComponentReferencePageFooter %}
