# Versioning

ZK products follow [semantic versioning](https://semver.org/), where the
three digits refer to MAJOR.MINOR.PATCH respectively. In the case where
a hotfix is required, a fourth digit is introduced. Except for major
(first digit) upgrades, compatibility is generally maintained, or a
fall-back mechanism is available.

# Upgrade References

An introductory smalltalk is published for every MAJOR and MINOR
release. For example [ New Features of ZK 9.5](https://www.zkoss.org/wiki/Small_Talks/2020/September/New_Features_of_ZK_9.5.0).
The smalltalk highlights the most important changes as well as provides
upgrade tips for upgrading to that specific version. View [all New Features articles](https://www.zkoss.org/wiki/Category:New_Features).

A detailed release note containing a list of fixed issues is available
for every new release, including hotfixes. For example, [ZK 9.0.0 release notes](https://www.zkoss.org/product/zk/releasenote/9.0.0). The
[full release history](https://www.zkoss.org/product/zk/releasenote/)
can be found here.

An “upgrade notes” section will be included at the end of a release note
when needed. The “upgrade notes” section points out API changes or
changes that developers will most likely need to take actions
accordingly.

You can follow the same naming conventions as the examples provided
above to search for the upgrade references you are looking for.

# Important/breaking changes

<table>
<thead>
<tr class="header">
<th width="70"><p>ZK Version</p></th>
<th><p>| Description</p></th>
<th width="150"><p>Reference</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>ZK 5.0</p></td>
<td><p>1. A major architectural change was made in ZK 5, affecting
theming, UI creation, and client-side rendering. Upgrading from ZK 2.x
or ZK 3.x to ZK 5 requires more effort.<br />
2. Event thread is now disabled by default. You can enable it in zk.xml
if you need to use it.</p></td>
<td><p><a href="Small_Talks/2010/January/New_Features_of_ZK_5.0"
title="wikilink"> Release Smalltalk</a><br />
<a href="Small_Talks/2010/April/Upgrading_to_ZK_5" title="wikilink">
Upgrading to ZK 5</a></p></td>
</tr>
<tr class="even">
<td><p>ZK 6.0</p></td>
<td><p>1. Requires JDK 5 or higher<br />
</p></td>
<td><p><a href="Small_Talks/2012/February/New_Features_of_ZK_6"
title="wikilink"> Release Smalltalk</a></p></td>
</tr>
<tr class="odd">
<td><p>ZK 6.5</p></td>
<td><p>1. Introduced Mobile/Tablet support, EE edition will have a
different style and behavior on a mobile device. You can turn it off in
zk.xml if that's not desired.<br />
</p></td>
<td><p><a href="Small_Talks/2012/September/New_Features_of_ZK_6.5"
title="wikilink"> Release Smalltalk</a></p></td>
</tr>
<tr class="even">
<td><p>ZK 7.0</p></td>
<td><p>1. Re-implement the theme with new client technologies including
CSS3 and LESS, and the DOM structure of components changes a lot. To
upgrade a custom theme for an older version, you will need to redo the
style customization based on the new theme. Please refer to <a
href="/zk_style_customization_guide/Upgrade_From_ZK_6.5"
title="wikilink"> Upgrade From ZK 6.5</a>.<br />
2. Drop IE6 &amp; IE7 support.<br />
3. Deprecate several legacy packages and methods relating to session and
event-thread.<br />
</p></td>
<td><p><a
href="ZK_Style_Customization_Guide/Upgrade_Customized_Style_From_other_ZK_Version"
title="wikilink"> Custom Style Upgrade Guide</a><br />
<a href="https://www.zkoss.org/product/zk/releasenote/7.0.0">Release
Notes</a></p></td>
</tr>
<tr class="odd">
<td><p>ZK 8.0</p></td>
<td><p>1. A new form binding based on proxy is introduced. If you have
been using MVVM<br />
org.zkoss.bind.SimpleForm,<br />
org.zkoss.bind.impl.FormImpl, and<br />
org.zkoss.bind.impl.FormExt<br />
you have to migrate it to the new proxy binding, or, upgrade to ZK 9.5
which supports the legacy simple form binding.</p></td>
<td><p><a
href="https://blog.zkoss.org/2015/02/03/zk8-new-form-binding-approach/">ZK
8 new form binding</a><br />
<a href="https://www.zkoss.org/product/zk/releasenote/8.0.0">Release
Notes</a></p></td>
</tr>
<tr class="even">
<td><p>ZK 8.5</p></td>
<td><p>1. A new and default theme Iceblue is introduced. The new theme
has larger margin and padding from the previous themes. If you are not
ready to use the new default theme, you can switch back to the previous
themes, or, use ZK 8.6’s compact theme.<br />
2. Drop IE8 support.</p></td>
<td><p><a href="Small_Talks/2017/October/New_Features_of_ZK_8.5.0"
title="wikilink"> Release Smalltalk</a><br />
<a href="https://www.zkoss.org/product/zk/releasenote/8.5.0">Release
Notes</a></p></td>
</tr>
<tr class="odd">
<td><p>ZK 9.0</p></td>
<td><p>1. ZK 9 requires JDK 8 or later versions.<br />
2. ZK Flex uses CSS 3 Flex instead. You can disable css flex and fall
back to the previous implementation if needed.<br />
3. Packaging change: ZK Data binding 1 is moved to "zkplus-legacy"; ZK
DSP Library is moved to a new module "zweb-dsp".<br />
</p></td>
<td><p><a href="Small_Talks/2019/December/New_Features_of_ZK_9.0.0"
title="wikilink"> Release Smalltalk</a><br />
<a href="https://www.zkoss.org/product/zk/releasenote/9.0.0">Release
Notes</a></p></td>
</tr>
<tr class="even">
<td><p>ZK 9.1</p></td>
<td><p>1. The underlying jQuery version has been upgraded from jQuery
1.12 to jQuery 3.5. If you have custom javascript code that relies on
jQuery, you may need to update accordingly.</p></td>
<td><p><a
href="https://www.zkoss.org/product/zk/releasenote/9.1.0">Release
Notes</a></p></td>
</tr>
<tr class="odd">
<td><p>ZK 9.5</p></td>
<td><p>1. Optional libraries(slf4j-jdk14 and closure-compiler-unshaded)
are no longer provided by default. You can plugin your preferred
libraries if needed.</p></td>
<td><p><a href="Small_Talks/2020/September/New_Features_of_ZK_9.5.0"
title="wikilink"> Release Smalltalk</a></p></td>
</tr>
<tr class="even">
<td><p>ZK 9.6</p></td>
<td><p>1. The default desktop ID generator was replaced by a more
secured one. If your tests depend on the previous generator, you can set
it in system-config.<br />
2. Deprecated the method of isEditionValid() and encodeWithZK() of
org.zkoss.zk.fn.ZkFns and core.dsp.tld.<br />
3. Since ZK 9.6, a JakartaEE-compatible package is released along with
the current JavaEE-compatible package. For Jakarta EE 9 support, please
use 9.6.0-jakarta version instead.<br />
4. Since 9.6.0, the transitive dependency of jasperreports was removed
in zkex. To use the jasperreport component, please add it
manually.<br />
</p></td>
<td><p><a href="Small_Talks/2021/August/New_Features_of_ZK_9.6.0"
title="wikilink"> Release Smalltalk</a></p></td>
</tr>
<tr class="odd">
<td><p>ZK 10.0</p></td>
<td><p>1. ZK 10 requires JDK 11 or later versions.<br />
2. Deprecate old themes: Breeze, Sapphire, Silvertail, and
Atlantic<br />
3. ZK 10 works with modern browsers; IE11 and lower IE versions are no
longer supported.<br />
4. Enable InaccessibleWidgetBlockService by default in the EE version.
Note that it will block Echo Event if the component is disabled or
invisible. You can configure it using the library-property
org.zkoss.zkmax.au.IWBS.disable.<br />
5. ZK's corresponding features now require Java EE 7 API level,
including Servlet 3.1, Bean Validation 1.1, EL 3.0, and JSP 2.3.<br />
6. Remove all deprecated Java APIs and the legacy module
"zkplus-legacy". Reference the release smalltalk and the linter tool for
upgrade guidance.<br />
7. ZK frontend is now typescript, if you have JS-based custom
client-side, you may need to double-check.</p></td>
<td><p><a href="Small_Talks/2024/February/New_Features_of_ZK_10.0.0"
title="wikilink"> Release Smalltalk</a></p></td>
</tr>
</tbody>
</table>

[Check all security fixes in the tracker](https://tracker.zkoss.org/issues/?jql=labels_%3D_security)

# Upgrade Process

Upgrading from ZK 5 (or later) to the latest version should be
manageable. The steps are:

Specify the version you wish to upgrade to in your maven POM file, or,
download corresponding binary files manually and put them into your
project. It is important to make sure all ZK jar files are in the same
version.

Then, fix any compilation errors and configure the required fallback
settings by referencing the [ Upgrade References](#Upgrade_References).

# Checklist

To estimate the upgrading effort, we suggest a checklist:

1.  Check Custom Components
      
    check if there is any
    [{{site.baseurl}}/zk_component_dev_essentials/the_language_addon]({{site.baseurl}}/zk_component_dev_essentials/the_language_addon)
    that might declare custom components. Since you might need to review
    it after the upgrade.
2.  Check configuration description (zk.xml)
      
    Check each property in zk.xml upon [ ZK Configuration Reference]({{site.baseurl}}/zk_config_ref/zk_xml) to see if
    there is any change in the new version.
3.  Check Custom Appearance (CSS)
      
    If you customize a component's appearance with CSS, you might need
    to review it for the new version.
4.  Check Programs Using ZK JavaScript API
      
    If you customize a component with JavaScript, you might need to
    review it for the new version.
5.  Check Bug Patches
      
    Check [Bug Tracker](https://tracker.zkoss.org/) or [release note](https://www.zkoss.org/product/zk/releasenote/) for the
    existing bug patch. If that bug is fixed in the new version, you can
    remove the patch.
6.  Check for Java Compiler Error

{{ ZKDevelopersReferencePageFooter}}
