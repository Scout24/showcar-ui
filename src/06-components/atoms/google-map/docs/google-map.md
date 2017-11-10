<h2>Google Map<span class="status review">Needs review</span></h2>

To use google map on your page add `as24-google-map` custom element on it. Please provide following data-attributes:  
`apikey` - your google public API key (visit <a href="https://console.developers.google.com/projectselector/apis/credentials" target="_blank">https://console.developers.google.com/projectselector/apis/credentials</a> if you need to generate it)  
`query` - location (e.g. `Dingolfinger Str. 1-15 81673 München` or `48.138570, 11.573496`)  
You also have to provide height to make map interactive

```css
.sc-google-maps--example {
    height: 300px;
}
```

<style>
#google-map .sc-google-maps {
    height: 300px;
}
</style>
