[![npm version](https://badge.fury.io/js/showcar-ui.svg)](https://badge.fury.io/js/showcar-ui)
![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=V3R5K2lFTFVkRG5Ed0p1M0tiM1lhaFJ1Wm9JSllPUFlUMHlVYlp3TVdTdz0tLVhIUFdDVHZwSVk1ME9BWUU2alY0UUE9PQ==--15b92933cc78eb4b925a0778e21e88ae4fe38065)

<img src="https://bstacksupport.zendesk.com/attachments/token/4EkFPJPvuynLZdtPX8ybIapji/?name=Logo-01.svg">

# showcar-ui

showcar-ui is the pattern library that is used to build the frontend of AutoScout24. It provides CSS classes, custom elements and components.

## Installation:

To install showcar-ui within your project use npm.

    npm install git+https://github.com/AutoScout24/showcar-ui.git --save

## How to build:

For building on your local machine install all npm packages first. Then you can use the gulp command to run the build:

    npm install
    gulp build

## How to include:

You can either include showcar-ui as a fragment or directly include the JS, CSS and inline HTML on your page.
The library provides some HTML content that needs to be inlined on your page. Use the index.html in the dist folder as a template in order to include the inline HTML, CSS and JS on your page.

    <link rel="stylesheet" href="@@ASSET_PATH/showcar-ui.css">
    <script src="@@ASSET_PATH/showcar-ui.js"></script>

Make sure to replace the @@ASSET_PATH string with the path to the JS/CSS file.

## Additional information

The showcar-ui library includes some libraries and polyfills:

### Libraries

* showcar-storage (https://github.com/AutoScout24/showcar-storage)
* showcar-icons (also available as standalone fragment) (https://github.com/AutoScout24/showcar-icons)
* showcar-tracking (also available as standalone fragment) (https://github.com/AutoScout24/showcar-tracking)
* Zepto (zepto-browserify v1.0.0) (http://zeptojs.com/)
* lazysizes (https://github.com/aFarkas/lazysizes)


### Polyfills

* document-register-element
* dom4
* es6-collections
* whatwg-fetch (fetch)
* promiz (promises)



### showcar-storage

You can access the Stroage API via the global `Storage` object. For further information see the documentation under https://github.com/AutoScout24/showcar-storage

### showcar-icons

You can use all the icons defined by showcar-icons with the custom `<as24-icon>` tag. For further information see the documentation under https://github.com/AutoScout24/showcar-icons

### Zepto

Showcar-ui includes Zepto, which is a lightweight replacement for jQuery. You can access Zepto via the global variables `$` and `Zepto`.
For a detailed usage guide, have a look at http://zeptojs.com/

## How to use:

for the use of the library have a look at the [documentation](https://autoscout24.github.io/showcar-ui/).

## How to contribute:

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

See [LICENSE.md](LICENSE.md)

## Changelog / History

See [History.md](History.md)

## Z-indexes table

Published 13.03.2017

| ShowcarUI       |               |       |      |notes    |
| --------------- |---------------|-------|------|---------|
| lightbox        | overlay       |  140  |useful|         |
|                 | modal window  |  139  |useful|         |
| spy-navigation  | wrapper       |  21   |useful|         |
| tooltip         |               |  2    |useful|         |
| input group     | focus         |  2    |useful|         |
| ad              |               |  110  |useful|         |
| custom dropdown |               |  1    |useful|         |
| sticky          |               |  2    |useful| Could have bigger z-index but lover than overlay        |
| navigation      | ::before li   |  100  |useful| Can be 10        |
| notification    |               |  120  |useful|         |
| **Contentservice**     |        |       |      |         |
| header          |               |  130  |useful|         |
| notification    |               |  9999 |remove!|         |
