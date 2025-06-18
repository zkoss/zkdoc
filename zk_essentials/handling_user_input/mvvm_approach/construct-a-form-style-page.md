# Construct a Form Style Page

Building a user interface using the MVVM approach is not different from
the [MVC approach](../mvc_approach/construct-a-form-style-page.md).


**Extracted from chapter3/profile-mvvm-property.zul**
```xml
<?link rel="stylesheet" type="text/css" href="/style.css"?>
<window border="normal" hflex="1" vflex="1" contentStyle="overflow:auto">
    <caption src="/imgs/profile.png" sclass="fn-caption"
             label="Profile (MVVM)"/>
    <vlayout>
        <grid width="500px" >
            <columns>
                <column align="right" hflex="min"/>
                <column/>
            </columns>
            <rows>
                <row>
                    <cell sclass="row-title">Account :</cell>
                    <cell><label/></cell>
                </row>
                <row>
                    <cell sclass="row-title">Full Name :</cell>
                    <cell>
                    <textbox
                             width="200px"/>
                    </cell>
                </row>
                <row>
                    <cell sclass="row-title">Email :</cell>
                    <cell>
                    <textbox
                    width="200px"/>
                    </cell>
                </row>
                <row>
                    <cell sclass="row-title">Birthday :</cell>
                    <cell><datebox  width="200px"/>
                    </cell>
                </row>
                <row>
                    <cell sclass="row-title">Country :</cell>
                    <cell>
                        <listbox  mold="select" width="200px">
                        </listbox>
                    </cell>
                </row>
                <row>
                    <cell sclass="row-title">Bio :</cell>
                    <cell>
                    <textbox
                    multiline="true" hflex="1" height="200px" />
                    </cell>
                </row>
            </rows>
        </grid>
        <div>You are editing <label />'s profile.</div>
        <hlayout>
            <button  label="Save"/>
            <button  label="Reload"/>
        </hlayout>
    </vlayout>
</window>
```



{% include input_validation.md %}
