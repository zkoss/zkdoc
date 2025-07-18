## Jar Files

Packing a component as a Jar file will make it easy to deployment. This
article demonstrates the steps and requirements of it.

### Requirements of a component Jar
- Configurations
- Component classes
- Widget Resources
- Static Resources

what do they look like, example from zul.jar

![](/zk_component_dev_essentials/images/Jar_File_summary.jpg)

## Configurations

<table>
    <thead>
        <tr class="header">
            <th style="width: 70%"></th>
            <th style="width: 30%"></th>
        </tr>
    </thead>
    <tbody>
        <tr class="odd">
            <td>
                <h3 id="file_structure">File Structure</h3>
                <ul>
                    <li>/META-INF/
                        <ul>
                            <li>MANIFEST.MF</li>
                        </ul>
                    </li>
                    <li>/metainfo/
                        <ul>
                            <li>mesg/
                                <ul>
                                    <li>msg[jar name].properties<strong>(optional)</strong></li>
                                    <li>msg[jar name]_[locale].properties <strong>(optional
                                                    ...)</strong></li>
                                </ul>
                            </li>
                            <li>xml/
                                <ul>
                                    <li>[component-name].xsd <strong>(optional)</strong></li>
                                </ul>
                            </li>
                            <li>zk/
                                <ul>
                                    <li>lang.xml <strong>(optional)</strong></li>
                                    <li>lang-addon.xml <strong>(optional)</strong></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <h3 id="file_descriptions">File descriptions</h3>
                <ul>
                    <li>/META-INF/
                        <ul>
                            <li>MANIFEST.MF
                                <ul>
                                    <li><em>The file for jar defino</em></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>/metainfo/
                        <ul>
                            <li>mesg/
                                <ul>
                                    <li>msg[jar name].properties`
                                            <ul>
                                                <li>These files are i18n resource files,you can define with the
                                                        locale you want , the default file is
                                                        msg `[JAR_NAME].properties` <br />
                                                    <a href="{{site.baseurl}}/zk_dev_ref/internationalization/warning_and_error_messages"
                                                        title="wikilink">ZK Internationalization</a>
                                                </li>
                                            </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>xml/
                                <ul>
                                    <li>[jar-name].xsd
                                            <ul>
                                                <li><em>The xml schema for component tags in zul</em></li>
                                            </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>tld
                                <ul>
                                    <li>config.xml
                                        <ul>
                                            <li><em>For taglibs definition. (ex. zweb.jar use this for
                                                    dsp.)</em></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>zk/
                                <ul>
                                    <li>lang-addon.xml
                                        <ul>
                                            <li><em>The language add-on define components , and it defined the
                                                    component classes, javascript widget/mold/css.<br />
                                                    it should contains At least one lang.xml or lang-addon.xml
                                                    <strong>usually you will need a lang-addon.xml</strong> .</em></li>
                                        </ul>
                                    </li>
                                    <li>lang.xml
                                        <ul>
                                            <li><em>The language definition file with namespace (ex. <a
                                                        href="http://www.w3.org/1999/xhtml">http://www.w3.org/1999/xhtml</a>
                                                    for
                                                    zhtml)</em></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </td>
            <td>
                <p><strong>The example from zul.jar</strong>
                    ![](images{{site.baseurl}}/zk_component_dev_essentials/images/Jar_File_configuration1.jpg)
                </p>
            </td>
        </tr>
    </tbody>
</table>


## Component classes

<table>
    <thead>
        <tr class="header">
            <th style="width: 70%"></th>
            <th style="width: 30%"></th>
        </tr>
    </thead>
    <tbody>
        <tr class="odd">
            <td>
                <h3 id="file_structure_1">File Structure</h3>
                <ul>
                    <li>/package-folder
                        <ul>
                            <li>classes</li>
                        </ul>
                    </li>
                </ul>
                <h3 id="file_descriptions_1">File descriptions</h3>
                <ul>
                    <li><em>The java classes of component. just like normal jar
                            file.</em></li>
                </ul>
            </td>
            <td>
                <p><strong>The example from zul.jar</strong>
                    ![](images{{site.baseurl}}/zk_component_dev_essentials/images/Jar_File_component1.jpg)
                </p>
            </td>
        </tr>
    </tbody>
</table>


## Widget Resources

<table>
<thead>
<tr class="header">
<th style="width: 70%"></th>
<th style="width: 30%"></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><h3 id="file_structure_2">File Structure</h3>
<ul>
<li>/web/
<ul>
<li>js/
<ul>
<li>component-package/
<ul>
<li>mold/
<ul>
<li>widget-mold-js-file</li>
</ul></li>
<li>css/
<ul>
<li>widget-css-dsp-file<strong>(optional)</strong></li>
<li>widget-css-file <strong>(optional)</strong></li>
</ul></li>
<li>widget-class-js-file</li>
<li>/zk.wpd</li>
</ul></li>
</ul></li>
</ul></li>
</ul>
<h3 id="file_descriptions_2">File descriptions</h3>
<ul>
<li>/web/
<ul>
<li>js/
<ul>
<li>component-package/
<ul>
<li>mold/
<ul>
<li>widget-mold-js-file (e.xg simple-label.js )
<ul>
<li><em>Widget mold file , you can write widget's html with javascript
function here.</em></li>
</ul></li>
</ul></li>
<li>css/
<ul>
<li>widget-css-dsp-file (e.g. simple-label.css.dsp )
<ul>
<li><em>The css dsp files ,in the dsp you can use some variable with zk
enviroment to write it.</em></li>
</ul></li>
<li>widget-css-file (e.g. simple-label.css )
<ul>
<li><em>the pure css files.</em></li>
</ul></li>
</ul></li>
<li>widget-class-file (e.g. Simple-label.js)
<ul>
<li><em>The widget class you write .</em></li>
</ul></li>
<li>zk.wpd
<ul>
<li><em>Define your component's package and widgets here, and the
dependency with other package.</em></li>
</ul></li>
</ul></li>
</ul></li>
</ul></li>
</ul></td>
<td><p><strong>Example for box from zul.jar</strong> 
![](images{{site.baseurl}}/zk_component_dev_essentials/images/Jar_File_widget1.jpg)</p></td>
</tr>
</tbody>
</table>

## Static Resources

<table>
<thead>
<tr class="header">
<th style="width: 70%"></th>
<th style="width: 30%"></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><h3 id="file_structure_3">File Structure</h3>
<ul>
<li>/web/
<ul>
<li>component-package / <strong>(optional)</strong>
<ul>
<li>css /<strong>(optional)</strong>
<ul>
<li>css files <strong>(optional)</strong></li>
<li>zk.wcs<strong>(optional)</strong></li>
</ul></li>
<li>img /<strong>(optional)</strong>
<ul>
<li>img files<strong>(optional)</strong></li>
</ul></li>
</ul></li>
</ul></li>
</ul>
<h3 id="file_descriptions_3">File descriptions</h3>
<ul>
<li>/web/
<ul>
<li> component-package/
<ul>
<li>css/
<ul>
<li> css files
<ul>
<li><em>For some static css file you might need.</em></li>
</ul></li>
<li>zk.wcs
<ul>
<li><em>Let you can config the CSS file for particular
language</em></li>
</ul></li>
</ul></li>
<li>img/
<ul>
<li> img files
<ul>
<li> This is a folder for some image files , and you can access them
in xxx.css.dsp files through
`${c:encodeURL('~./img/[component-package]/xxx.png')}`</li>
</ul></li>
</ul></li>
</ul></li>
</ul></li>
</ul></td>
<td><p><strong>Example from zul.jar</strong></p>
![](images{{site.baseurl}}/zk_component_dev_essentials/images/Jar_File_static_resources1.jpg)</td>
</tr>
</tbody>
</table>
