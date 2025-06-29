
## Description

hitooltip is a lightweight Javascript tooltip library

<br/>

---



## Installation

```shell
npm install hitooltip
```

<br/>

---

## Usage

```html

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <link href="dist/hitooltip.min.css" rel="stylesheet">
    </head>
    <body>
        
        <div class="example" data-hitooltip="Example">Hover examples</div>
        <br/>
        <br/>

        <script type="module">
            import {hitooltip} from "./hitooltip.mjs";
            hitooltip();
        </script>

    </body>
</html>


```

<br/>

---

## Overview

To run demo:

```shell
npm run demo
```

![Demo](https://github.com/thimpat/demos/blob/main/hitooltip/preview.gif)

---

## Options


| name                              | description                                         | default       | expect                      | HTML Attribute                |
|-----------------------------------|-----------------------------------------------------|---------------|-----------------------------|-------------------------------|
| delay                             | Delay before displaying tooltip                     | 250ms         | number                      | data-hitooltip-delay          |
| speed                             | Animation duration for the transition to happen     | 500ms         | number                      | data-hitooltip-speed          |
| timeout                           | Tooltip lifetime                                    | 3000ms        | number                      | data-hitooltip-timeout        |
| maxViews                          | Number of times a tooltip can appear on the element | 0 (unlimited) | number                      | data-hitooltip-max-views      |
| animationType                     | Animation type                                      | "smooth"      | "smooth", "fade" or "none"  | data-hitooltip-animation-type |
| dynamicMonitoring                 | Whether to consider elements added dynamically      | "body"        | string (selector)           | N/A                           |
| onHide, onHidden, onShow, onShown | callbacks                                           |               |                             | N/A                           |


example to set options globally

```javascript
import {hitooltip, setHiTooltipOptions} from "hitooltip";

setHiTooltipOptions({ speed: 250, maxViews: 10 });
setHiTooltipOptions({ dynamicMonitoring: "" });
hitooltip();
```

example to set options locally

```html
<div class="example" data-hitooltip="Example" data-hitooltip-timeout="10000" data-hitooltip-max-views="2">Hover 
    examples</div>
```

---


## Examples

### Display a tooltip with title, text and image (pre-defined layout)

```html
        <div class="example" data-hitooltip="Third example" data-hitooltip-icon="./public-domain-image.png" data-hitooltip-position="top" data-hitooltip-text="Second example" data-hitooltip-title="My title example">Hover example 3 with title, icon and text</div>
```

### Display a tooltip containing HTML code

```html
        <div class="example pushed" data-hitooltip="Fourth example" data-hitooltip-position="left" data-hitooltip-target="#zone2">Hover example 5 with custom content</div>
        <div style="visibility: hidden; display: none">
            <div id="zone2">
                <div class="zone" style="max-width: 200px">
                    <img src="./public-domain-image.png" />
                    <h1>My Title</h1>
                    <hr>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                </div>
            </div>
        </div>
```

## Package

```
📁 package                
│
└───📁 dist
│   │
│   └─📝 hitooltip.min.mjs         
│   └─📝 hitooltip.min.css         
└───📁 js
│   │
│   └─📝 hitooltip.mjs         
│   └─📝 hitooltip.css         
└───📁 css
│   │
│   └─📝 hitooltip.scss         

```

<br/>

---


