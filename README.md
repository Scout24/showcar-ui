[![npm version](https://badge.fury.io/js/showcar-ui.svg)](https://badge.fury.io/js/showcar-ui)
![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=V3R5K2lFTFVkRG5Ed0p1M0tiM1lhaFJ1Wm9JSllPUFlUMHlVYlp3TVdTdz0tLVhIUFdDVHZwSVk1ME9BWUU2alY0UUE9PQ==--15b92933cc78eb4b925a0778e21e88ae4fe38065)

<img src="https://bstacksupport.zendesk.com/attachments/token/4EkFPJPvuynLZdtPX8ybIapji/?name=Logo-01.svg">

# showcar-ui

showcar-ui is the pattern library that is used to build the frontend of AutoScout24. It provides CSS classes, custom elements and components.

## Installation:

To install showcar-ui within your project use npm.

    npm install showcar-ui --save

## How to build:

We are using *node 10.16.0* version for build. Make sure you have it installed. If you are using `nvm` simply run 

    nvm use
and follow the instructions

For building on your local machine install all npm packages first. Then you can use the gulp command to run the build: 

    yarn
    gulp build

## How to run locally:

You can use the gulp default command to run the build locally:

    gulp

### Interacting w/ local changes

You can preview/interact with the local changes by running `yarn run docs:serve`. This will generate the docs & launch a server where you can look at them, running the local version of showcar-ui

## How to include:

You can either include showcar-ui as a fragment or directly include the JS, CSS and inline HTML on your page.
The library provides some HTML content that needs to be inlined on your page. Use the index.html in the dist folder as a template in order to include the inline HTML, CSS and JS on your page.

    <link rel="stylesheet" href="@@ASSET_PATH/showcar-ui.css">
    <script src="@@ASSET_PATH/showcar-ui.js"></script>

Make sure to replace the @@ASSET_PATH string with the path to the JS/CSS file.

## How to test:

You can check development state of the library on home, list and detail page with a parameter `?toguru=sc_develop%3dtrue`.

## How to test fragments with togglea

You can check any branch of the library on your page with parameter `?toguru=sc_develop%3dtest-branch` where `test-branch` is the name of the desired branch.

Locally run 

   docker-compose up

and check `localhost:8080/test/showcar-ui-toggled-fragment.html?toguru=sc_develop%3dtest-branch` where `test-branch` is the name of the branch to test

## Additional information

The showcar-ui library includes some libraries and polyfills:

### Libraries

- showcar-storage (https://github.com/Scout24/showcar-storage)
- showcar-icons (also available as standalone fragment) (https://github.com/Scout24/showcar-icons)
- showcar-tracking (also available as standalone fragment) (https://github.com/Scout24/showcar-tracking)
- Zepto (zepto-modules v1.0.1 uses Zepto v1.2.0) (https://www.npmjs.com/package/zepto-modules) (http://zeptojs.com/)
- lazysizes (https://github.com/aFarkas/lazysizes)

### Polyfills

 - document-register-element (from [document-register-element](https://www.npmjs.com/package/document-register-element))
 - dom4 (from [dom4](https://www.npmjs.com/package/dom4))
 - Array (.of, .includes, .from, .find)
 - String (.includes, .startsWith, .endsWith)
 - Object (.assign)
 - Promises (from [promiz](https://www.npmjs.com/package/promiz))
 - Fetch (from [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch))
 - URLSearchParams (from [url-search-params-polyfill](https://www.npmjs.com/package/url-search-params-polyfill))

### showcar-storage

You can access the Stroage API via the global `Storage` object. For further information see the documentation under https://github.com/AutoScout24/showcar-storage

### showcar-icons

You can use all the icons defined by showcar-icons with the custom `<as24-icon>` tag. For further information see the documentation under https://github.com/AutoScout24/showcar-icons

### Zepto

Showcar-ui includes Zepto, which is a lightweight replacement for jQuery. You can access Zepto via the global variables `$` and `Zepto`.
For a detailed usage guide, have a look at http://zeptojs.com/

## How to use:

for the use of the library have a look at the [documentation](https://scout24.github.io/showcar-ui/).

## How to contribute:

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

See [LICENSE.md](LICENSE.md)

## Z-indexes table

Published 13.03.2017

| ShowcarUI          |              |                 |         | notes                                            |
| ------------------ | ------------ | --------------- | ------- | ------------------------------------------------ |
| lightbox           | overlay      | 140             | useful  |                                                  |
|                    | modal window | 139             | useful  |                                                  |
| spy-navigation     | wrapper      | 2/21(if sticky) | useful  |                                                  |
| tooltip            |              | 2               | useful  |                                                  |
| input group        | focus        | 2               | useful  |                                                  |
| ad                 |              | 110             | useful  |                                                  |
| custom dropdown    |              | 1               | useful  |                                                  |
| sticky             |              | 2               | useful  | Could have bigger z-index but lower than overlay |
| navigation         | ::before li  | 100             | useful  | Can be 10                                        |
| notification       |              | 120             | useful  |                                                  |
| **Contentservice** |              |                 |         |                                                  |
| header             |              | 130             | useful  |                                                  |
| notification       |              | 9999            | remove! |                                                  |


## Optimizely (to be continued)
```js
window.optimizelyReady.then(() => {
    const state = window.optimizely.get("state");
    const variationMap = state.getVariationMap();

    const experiment = variationMap["11184022659"];
    console.log(experiment.name);
    console.log(experiment.index);
});


window.optimizely.push({
    type: "event",
    eventName: "favoritesAdd"
});
```
