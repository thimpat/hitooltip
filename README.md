
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

---

## Options


| name                              | description                                         | default       | expect            |   |
|-----------------------------------|-----------------------------------------------------|---------------|-------------------|---|
| delay                             | Delay before displaying tooltip                     | 250ms         | number            |   |
| speed                             | Animation duration for the transition to happen     | 500ms         | number            |   |
| timeout                           | Tooltip lifetime                                    | 3000ms        | number            |   |
| maxViews                          | Number of times a tooltip can appear on the element | 0 (unlimited) | number            |   |
| dynamicMonitoring                 | Whether to consider elements added dynamically      | undefined     | string (selector) |   |
| onHide, onHidden, onShow, onShown | callbacks                                           |               |                   |   |


examples:

```javascript
import {setHiTooltipOptions} from "hitooltip";

setHiTooltipOptions({ speed: 250, maxViews: 10 });
setHiTooltipOptions({ dynamicMonitoring: "body" });
```

---

## Package

```
📁 package                
│
└───📁 dist
│   │
│   └─📝 index.mjs         
│   └─📝 style.css         
│   
└───📁 esm
    │
    └─📝 index.mjs           ⇽ Browser (unminified)

```

<br/>

---


