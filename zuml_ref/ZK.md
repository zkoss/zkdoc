# zk - java.util.Map

A map of browser and system information. For example, `${zk.gecko}`
returns the version of Firefox if the current user is using Firefox.
Here is a list of entries that the `zk` object has:

| Name      | Type     | Example                         | Description                                                                                                                                                                                   |
|-----------|----------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `browser` | `Map`    | `{version: 9.0, name: "gecko"}` | A two-entries map for the browser's name and version. Example, `${zk.browser.name}`. Possible browser names: `webkit`, `gecko`, `ie`, `opera`.                                                |
| `chrome`  | `Double` | `16.0`                          | The version of Chrome if the current user is using Chrome. Otherwise, it is null.                                                                                                             |
| `ff`      | `Double` | `9.0`                           | The version of Firefox if the current user is using Gecko-based browser, including Firefox. Otherwise, it is null. NOTICE: It is the same as `gecko` (for backward compatibility).            |
| `gecko`   | `Double` | `9.0`                           | The version of Gecko if the current user is using Gecko-based browser, including Firefox. Otherwise, it is null. It is the same as `ff`.                                                      |
| `ie`      | `Double` | `9.0`                           | The version of Internet Explorer if the current user is using Internet Explorer. Otherwise, it is null.                                                                                       |
| `ipad`    | `Double` | `5.0`                           | The version of iPad if the current user is using iPad. Otherwise, it is null.                                                                                                                 |
| `iphone`  | `Double` | `5.0`                           | The version of iPhone if the current user is using iPhone. Otherwise, it is null.                                                                                                             |
| `ipod`    | `Double` | `5.0`                           | The version of iPod if the current user is using iPod. Otherwise, it is null.                                                                                                                 |
| `ios`     | `Double` | `5.0`                           | The version of iOS if the current user is using iOS-based device. Otherwise, it is null.                                                                                                      |
| `android` | `Double` | `4.1`                           | The version of Android if the current user is using Android-based device. Otherwise, it is null.                                                                                              |
| `opera`   | `Double` | `11.52`                         | The version of Opera if the current user is using Opera. Otherwise, it is null.                                                                                                               |
| `safari`  | `Double` | `535.7`                         | The version of Safari if the current user is using Webkit-based browser, including Safari and Chrome. Otherwise, it is null. NOTICE: It is the same as `webkit` (for backward compatibility). |
| `webkit`  | `Double` | `535.7`                         | The version of Webkit if the current user is using Webkit-based browser, including Safari and Chrome. Otherwise, it is null.                                                                  |

# Version History

| Version | Date          | Content                         |
|---------|---------------|---------------------------------|
| 6.0.0   | February 2012 | The `zk` object was introduced. |
