
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
        
        <script src="dist/hitooltip.min.js" type="module"></script>
    
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
| dynamicMonitoring                 | Whether to consider elements added dynamically      | undefined     | string (selector)           | N/A                           |
| onHide, onHidden, onShow, onShown | callbacks                                           |               |                             | N/A                           |


example to set options globally

```javascript
import {setHiTooltipOptions} from "hitooltip";

setHiTooltipOptions({ speed: 250, maxViews: 10 });
setHiTooltipOptions({ dynamicMonitoring: "body" });
```

example to set options locally

```html
<div class="example" data-hitooltip="Example" data-hitooltip-timeout="10000" data-hitooltip-max-views="2">Hover 
    examples</div>
```

---

## Package

```
📁 package                
│
└───📁 dist
│   │
│   └─📝 hitooltip.js         
│   └─📝 hitooltip.css         

```

<br/>

---


