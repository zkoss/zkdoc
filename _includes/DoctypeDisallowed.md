## DOCTYPE restriction

{% include supported-since.html version="10.0.0" %}

Starting from ZK 10, the xml parser used by ZK declares `disallow-doctype-decl` to `true`. This prevents the use of DOCTYPE
declaration in xml files, such as zk.xml, lang-addon.xml, config.xml, etc. This is a security measure to prevent XXE attacks using `<!DOCTYPE ...>` as vector.
