

# Camera

- Java API: <javadoc>org.zkoss.zkmax.zul.Camera</javadoc>
- JavaScript API: <javadoc directory="jsdoc">zkmax.med.Camera</javadoc>

{% include edition-availability.html edition="pe" %} {% include version-badge.html version=8.6.0 %}

# Employment/Purpose

The `Camera` component is used to record videos and take snapshots in
the browser. Developers can control the camera by `start`, `stop`,
`pause`, `resume` and `snapshot`.

# Browser Support

This component is based on
[MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#browser_compatibility)
and
[MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder#browser_compatibility),
please check your browser compatibility via the links before using it.

# Request Permission First

To record or take a snapshot, users should first enable their camera and
microphone (as shown below.) If users reject the requests, they cannot
use the features of the Camera component.

Note that some browsers such as Google Chrome will only accept webcam
and microphone access from a trusted (HTTPS) source.

![](/zk_component_ref/images/RequestCamera.png)

The Camera component also provides a method `requestCamera()` to request
user's media devices before starting recording or taking snapshots.

```xml
  <camera id="camera" />
  <button onClick="camera.requestCamera()" />
```

## Working with non-secure development host

Chrome will automatically block Camera API requests from non-secure
hosts (non https), with the exception of localhost. If you are
developing from localhost, you can still access the camera API even if
your page is loaded through http.

If you need to force the camera API to be enabled on a non-localhost
development host, you can manually force the host to be treated as a
secure host in chrome flags. IMPORTANT NOTE: This is for development
purposes only, and shouldn't be considered as a workaround for actual
users, since it requires modifying hidden security settings in Chrome.

To activate this setting, see the [testing powerful
features](https://www.chromium.org/Home/chromium-security/deprecating-powerful-features-on-insecure-origins/#testing-powerful-features)
section in the chromium info page.

step by step:

1.  open the URL:
    **<chrome://flags/#unsafely-treat-insecure-origin-as-secure>** from
    your Chrome
2.  add the URL of the development platform to treat as secure,
    including the protocol section (ex. "<http://example.com>" )
3.  restart the browser

# recording

setRecording(true) is the same as invoking start() or resume(),
depending on camera's current state.

setRecording(false) is the same as invoking stop(), if you want to pause
recording, please invoke pause().

isRecording() can check whether the camera is recording or not.

```xml
  <camera id="camera" />
  <button onClick="camera.setRecording(true)" />
```

# audio

You can decide whether to record audio while recording the video by
specifying the value of audio; the valid value is boolean.

Default: true

```xml
  <camera audio="false" />
```

# previewRecord

Default: `true`

The Camera component provides a preview screen to preview the recorded
content.

When you turn on the preview screen, you can set the screen size by
specifying width and height in 'px'.

If you intend to take a snapshot, you must turn on the preview screen
first, or nothing will be shown.

```xml
  <camera width="600px" previewRecord="true" />
```

# maxsize

You can set the maximum size for uploading recorded video and snapshot.
The unit is "KB". Negative value means unlimited, e,g,. maxsize="-1."

When the size of the recorded video or snapshot is bigger than the
configured max size, nothing will be uploaded and it will trigger an
event. To handle this, you can listen to onMaxsizeExceed and get the
upload size from event.getData().

Default: please refer to
[max-upload-size]({{site.baseurl}}/zk_config_ref/the_system-config_element/the_max-upload-size_element)

```xml
  <camera maxsize="1024" onMaxsizeExceed="event.getData()" />
```

# lengthLimit

You can set the maximum recording length in "seconds".

When the recorded time exceeds the max length, it will stop recording
and trigger an event. To handle this, you can listen to
onLengthLimitExceed.

Default: 60

```xml
  <camera lengthLimit="120" onLengthLimitExceed="doSomething()" />
```

# constraintsString

{% include version-badge.html version=8.6.0 %} The value is passed as
[MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints)
which is used to describe a camera's capabilities.

## Use User-facing Camera

The following string requests a user-facing (front) camera of a phone;

```xml
<camera constraintsString='{"video": {"facingMode": {"exact": "user"}}}'>
```

Please refer to
[MediaTrackConstraints/facingMode](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode)

# UploadEvent

There are two types of UploadEvent to listen to data upload: one is
`onVideoUpload` and the other is `onSnapshotUpload`. Both ways can
receive uploaded data by calling `event.getMedia()`.

`onVideoUpload` will be notified after calling stop(), or when the
recorded time exceeds the maximum length.

`onSnapshotUpload` will be notified after calling snapshot().

You can easily integrate the Camera component with
[Video]({{site.baseurl}}/zk_component_ref/multimedia_and_miscellaneous/video)
and
[Image]({{site.baseurl}}/zk_component_ref/essential_components/image).

For example:

To integrate these components, you can write codes as shown below, and
after the video or snapshot is uploaded, you can see the results
immediately.

```xml
  <camera onVideoUpload='video.setContent(event.getMedia())' 
          onSnapshotUpload='image.setContent(event.getMedia())' />
  <video id="video" />
  <image id="image" />
```

# StateChangeEvent

When you call `start(), stop(), pause() or resume()`, the Camera
component will trigger a
[StateChangeEvent](https://www.zkoss.org/javadoc/latest/zk/org/zkoss/zkmax/zul/event/StateChangeEvent.html).
You can check the current state by calling `event.getState()`. The
Camera component has four states, and you can access them by using
`Camera.START, Camera.STOP, Camera.PAUSE and Camera.RESUME`.

For example:

If you want to do something after the recording starts, you can write
codes as shown below (MVVM pattern):

```xml
  <camera onStateChange="@command('stateChange', event=event)" />
```

```java
  @Command
  public void stateChange(@BindingParam("event") StateChangeEvent event) {
    if (event.getState() == Camera.START) {
      // do something...
    }
  }
```

The Camera component also provides `isRecording(), isPaused()` and
`isStopped()` methods to check camera state.

# Customize recording hint

There are 3 CSS classes that you can customize your recording hint:
`z-camera-recording, z-camera-stop` and `z-camera-pause`.

Inspect DOM on a browser and you will see an html tag \<i\> before
\<video\>; they are both in the same container \<div\>, these class
names will apply to tag \<i\> depending on different states of the
camera.

![](/zk_component_ref/images/CameraDOM.png)

For example, if you want to customize the paused icon, you can override
css classes like the following:

![](/zk_component_ref/images/Pause.png)

```css
    .z-camera-pause {
        width: 30px;
        height: 30px;
        top: 30px;
        left: 30px;
        position: absolute;
        border-left: 10px solid red;
        border-right: 10px solid red;
    }
```

- The built-in CSS rules are different among different ZK versions,
  please check them upon your version.

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
<p><code>onVideoUpload</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.UploadEvent</javadoc> Notifies after the
video has been uploaded.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onSnapshotUpload</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.UploadEvent</javadoc> Notifies after the
snapshot has been uploaded.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onMaxsizeExceed</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Notifies if the recorded
size is bigger than the max size.</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onLengthLimitExceed</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.Event</javadoc> Notifies if the recorded
length exceeds the max length.</p></td>
</tr>
<tr class="odd">
<td><center>
<p><code>onStateChange</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zkmax.zul.event.StateChangeEvent</javadoc> Notifies
when invoking start(), stop(), pause() or resume().</p></td>
</tr>
<tr class="even">
<td><center>
<p><code>onCameraUnavailable</code></p>
</center></td>
<td><p><strong>Event:</strong>
<javadoc>org.zkoss.zk.ui.event.DOMExceptionEvent</javadoc> Notifies if
camera is unavailable after requesting media devices from user.</p></td>
</tr>
</tbody>
</table>

- Inherited Supported Events: [
  XulElement]({{site.baseurl}}/zk_component_ref/base_components/xulelement#Supported_Events)

# Supported Children

`NONE`

# Version History


