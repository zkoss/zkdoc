---
title: "org.zkoss.zul.Filedownload.contentTypeAsIs"
---

**Property:**

`org.zkoss.zul.Filedownload.contentTypeAsIs`

Default:  `false`

It specifies whether to treat the Content-Type as is in `Filedownload`
class.

By default, ZK will append `;charset=UTF-8` in the `Content-Type` to
ensure everything is displayed in UTF-8. But in some cases, you don't
want ZK to add this in a binary file or you want to specify another
charset. Enable this property and ZK will respect what you set in the
`Content-Type` and use it as is.

See: [ZK-4418](https://tracker.zkoss.org/browse/ZK-4418)
