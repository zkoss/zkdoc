**Syntax:**

```xml
 <processing-prompt-delay>a_number_in_milliseconds</processing-prompt-delay>
```

`[Default: 900]`

It specifies the time, in milliseconds, to wait before prompting the
user with a message indicating that an AU request is in processing at a
server. If you click a button, its event listener takes a long time. A
browser will show the "processing" message if it doesn't get an AU
response in the specified time.
