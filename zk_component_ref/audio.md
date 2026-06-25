---
title: "Audio"
---

- **Demonstration:** [Audio](https://www.zkoss.org/zkdemo/media/audio)
- **Java API:** [org.zkoss.zul.Audio](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zul/Audio.html)
- **JavaScript API:** [zul.med.Audio](https://www.zkoss.org/javadoc/latest/jsdoc/classes/zul.med.Audio.html)

# Employment/Purpose

An `audio` component is used to play the audio at the browser. Like
`image`, you could use the `src` property to specify an URL of an audio
resource, or the `setContent` method to specify a dynamically generated
audio. Developers might be able to control the play of an audio by the
`play`, `stop` and `pause` methods.

## Common Use Cases

- **Background music**: Set `autoplay="true"` and `loop="true"` to play background music; combine with `muted="true"` to satisfy browser autoplay policies.
- **Podcast / narration player**: Set `controls="true"` and `preload="metadata"` so the duration is known before playback starts.
- **Server-generated audio**: Use the `content` property with an `org.zkoss.sound.Audio` object to serve dynamically synthesised or encrypted audio without exposing a static URL.
- **Programmatic control**: Omit `controls` and call `play()`, `pause()`, or `stop()` from a composer or ViewModel to build a custom player UI.

# Example

![](/zk_component_ref/images/ZKComRef_Audio_Example.png)

```xml
 <audio src="music.wav" controls="true"></audio>
```

`The audio supports controls property {% include supported-since.html version="7.0.0" %}`

# Supports HTML5

{% include supported-since.html version="7.0.0" %}

The audio component has now been enhanced to support HTML 5, it includes
the properties like `autoplay`, `controls`, `loop`, `muted` and
`preload`.

# Multiple Sources

{% include supported-since.html version="7.0.0" %} Most browsers do not support all the
audio formats,so we could specify multiple source files in different
formats for different browsers. For examples:

```xml
 <audio src="music.wav, music.mp3, music.ogg" controls="true"></audio>
```

# StateChangeEvent

{% include supported-since.html version="9.6.0" %}

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

# Properties

## Src

**Default Value:** `[]` (empty list)

{% include supported-since.html version="7.0.0" %}

Sets the URL (or comma-separated list of URLs) of the audio resource(s) to play. The browser tries each source in order and uses the first one it can decode, which allows you to provide fallback formats for broader browser compatibility.

Calling `setSrc` clears any content previously set via [`content`](#content). Similarly, calling `setContent` clears `src`.

```xml
<!-- Single source -->
<audio src="music.mp3" controls="true"/>

<!-- Multiple sources for cross-browser compatibility -->
<audio src="music.wav, music.mp3, music.ogg" controls="true"/>
```

## Autoplay

**Default Value:** `false`

{% include supported-since.html version="7.0.0" %}

Sets whether the audio should start playing automatically as soon as it is ready. Note that many modern browsers suppress autoplay unless the page has already received a user interaction gesture.

```xml
<audio src="music.mp3" autoplay="true" controls="true"/>
```

## Preload

**Default Value:** `null`

{% include supported-since.html version="7.0.0" %}

Hints to the browser how much of the audio file it should load before the user starts playback. Accepts one of the following values:

| Value | Meaning |
|---|---|
| `none` | Do not preload the audio. |
| `metadata` | Preload only metadata (e.g. duration). |
| `auto` | Allow the browser to preload the entire file (default fallback for any unrecognized value). |

If the attribute is omitted (`null`), the browser uses its own default.

```xml
<audio src="music.mp3" preload="metadata" controls="true"/>
```

## Controls

**Default Value:** `false`

{% include supported-since.html version="7.0.0" %}

Sets whether the browser's built-in audio controls (play/pause button, volume, seek bar) are displayed. When `false`, the audio element is invisible; you can still control playback programmatically via the `play()`, `pause()`, and `stop()` server-side methods.

```xml
<audio src="music.mp3" controls="true"/>
```

## Loop

**Default Value:** `false`

{% include supported-since.html version="3.6.1" %}

Sets whether the audio should restart automatically after it finishes playing.

```xml
<audio src="music.mp3" controls="true" loop="true"/>
```

## Muted

**Default Value:** `false`

{% include supported-since.html version="7.0.0" %}

Sets whether the audio should be silenced on initial load. This is often combined with `autoplay="true"` because browsers are more permissive about autoplaying muted media.

```xml
<audio src="music.mp3" autoplay="true" muted="true" controls="true"/>
```

## Content

**Default Value:** `null`

Sets the audio content directly as an `org.zkoss.sound.Audio` object, for cases where the audio is generated or retrieved dynamically at the server rather than served from a static URL. The value must be constructed in a `<zscript>` block, a composer, or a ViewModel and bound via EL.

Calling `setContent` clears any source previously set via [`src`](#src). Similarly, calling `setSrc` clears `content`.

```xml
<zscript>
    import org.zkoss.sound.Audio;
    // load audio bytes from your service
    byte[] data = myAudioService.getAudioBytes();
    Audio clip = new Audio("clip.mp3", data, "mp3");
</zscript>
<audio content="${clip}" controls="true"/>
```

# Supported Events

| Name | Event Type | Description |
|---|---|---|
| `onStateChange` | [org.zkoss.zk.ui.event.StateChangeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zk/ui/event/StateChangeEvent.html) | Notifies when invoking play(), stop(), pause() or the audio is played to the end. |

- Inherited Supported Events: [XulElement]({{site.baseurl}}/zk_component_ref/xulelement#Supported_Events)

# Supported Children

`* `[`Track`]({{site.baseurl}}/zk_component_ref/track)