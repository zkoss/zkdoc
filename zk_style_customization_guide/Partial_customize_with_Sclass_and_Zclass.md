

Partial customization is a convenient way to fast prototype the look and
feel and to change the style of a specific component. Here we will
demonstrate how to you can execute partial customization by using Sclass
and Zclass.

# Using Sclass

Using sclass is very easy, simply add another CSS class name within the
component in line 8:

``` xml
<zk>
    <style>
    .mybutton {
        border-radius: 10px;
        background: linear-gradient(to bottom, #f0f9ff 0%,#a1dbff 100%);
    }
    </style>
    <button label="Test Sclass" sclass="mybutton" />
    <button label="Default" />
</zk>
```

We can see that only the first button has been applied ***.mybutton***
style.

![](images/styleguide-sclass.png)

# Using Zclass

Normally, zclass is used to customize a totally different look and feel
to that of the default one. For example, if you only apply border-radius
and gradient background style like the following

``` xml
<zk>
    <style>
    .mybutton {
        border-radius: 10px;
        background: linear-gradient(to bottom, #f0f9ff 0%,#a1dbff 100%);
    }
    </style>
    <button label="Test Zclass" zclass="mybutton" />
    <button label="Default" />
</zk>
```

you can see that the button looses its default style such as font size
and border style as illustrated below:

![](images/styleguide-zclass.png)

**Note**: Applying zclass will lose all default styles, make sure you
really want to customize the entire look and feel of the component
before you do this.

# Advanced Usage

Some components have complex DOM structures, therefore sometimes you
cannot override the style by just using sclass as described above. For
example, if we try to style menu text color to blue and we use sclass to
do the job:

``` xml
<zk>
    <style>
    .mymenu {
        color: blue;
    }
    </style>
    <menubar id="menubar" hflex="min">
        <menu label="Custom Style" sclass="mymenu">
            <!-- omitted -->
        </menu>
        <menu label="Default Style">
            <!-- omitted -->
        </menu>
    </menubar>
</zk>
```

you can see that the style is not applied.

<figure>
<img src="images/styleguide-sclass-advanced1.png
title="styleguide-sclass-advanced1.png" />
<figcaption>styleguide-sclass-advanced1.png</figcaption>
</figure>

However, we can use CSS class rule with "***sclass zclass***" pattern to
achieve this goal. Modify the style like the following:

``` xml
<zk>
    <style>
    .mymenu .z-menu-text {
        color: blue;
    }
    </style>
    <menubar id="menubar" hflex="min">
        <menu label="Custom Style" sclass="mymenu">
            <!-- omitted -->
        </menu>
        <menu label="Default Style">
            <!-- omitted -->
        </menu>
    </menubar>
</zk>
```

the style is now correctly applied.

<figure>
<img src="images/styleguide-sclass-advanced2.png
title="styleguide-sclass-advanced2.png" />
<figcaption>styleguide-sclass-advanced2.png</figcaption>
</figure>


