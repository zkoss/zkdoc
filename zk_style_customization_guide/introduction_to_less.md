# Introduction

[LESS](http://lesscss.org/) is the dynamic stylesheet language. LESS
extends CSS with dynamic behavior such as variables, mixins, operations,
and functions.

LESS was developed by [Alexis Sellier](http://cloudhead.io/), more
commonly known as [cloudhead](http://cloudhead.io/). It is now
[maintained and extended by the LESS core team.](http://lesscss.org/#about)

# Basic Usage

The following content demonstrates simple usages of LESS, please refer
to [LESS official site](http://lesscss.org) for more details. You can
also try it online from <http://less2css.org/>

## Variables

Define variables with "@" sign and use it as follows:

```css
@green: #46A546;

.greendiv {
    background: @green;
}
```

will output

```css
.greendiv {
    background: #46A546;
}
```

## Mixins

Define a mixins as follows:

```css
.top-border-radius(@size) {
    -webkit-border-radius: @size @size 0 0;
       -moz-border-radius: @size @size 0 0;
            border-radius: @size @size 0 0;
}

.topRoundedDiv {
    .top-border-radius(5px);
}
```

will output

```css
.topRoundedDiv {
    -webkit-border-radius: 5px 5px 0 0;
       -moz-border-radius: 5px 5px 0 0;
            border-radius: 5px 5px 0 0;
}
```


