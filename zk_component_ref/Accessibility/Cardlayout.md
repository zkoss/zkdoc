 {% include
version-badge.html version=9.5.0 %} {% include edition-availability.html edition=pe %} {% include
ZKComponentReferenceAccessibilityNamingReference.md %}

Cardlayout is often used along with other components to achieve the
carousel effect. If you are using cardlayout for carousel, check here
for [carousel
practice](https://www.w3.org/TR/wai-aria-practices/#carousel).

### Sample

Here is a simple traffic light carousel:

``` xml
    <div ca:role="region" ca:aria-roledescription="carousel" ca:aria-label="traffic light" tabindex="0">
        <div>
            <button ca:aria-label="Previous Slide" onClick="card.previous()">previous</button>
            <button ca:aria-label="Next Slide" onClick="card.next()">next</button>
        </div>
        <cardlayout id="card" width="300px" height="200px" style="border:1px solid red" selectedIndex="1" tabindex="0">
            <div ca:aria-label="red" vflex="1" hflex="1" style="background-color:red;padding:20px">red</div>
            <div ca:aria-label="yellow" vflex="1" hflex="1" style="background-color:yellow;padding:20px">yellow</div>
            <div ca:aria-label="green" vflex="1" hflex="1" style="background-color:green;padding:20px">green</div>
        </cardlayout>
    </div>
```
