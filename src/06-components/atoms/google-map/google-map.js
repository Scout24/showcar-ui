import registerElement from '../../../07-utilities/helpers.js';

const loadMap = (el) => {
    const publicKey = el.getAttribute('apikey');
    const address = el.getAttribute('query');
    const htmlTag = document.querySelector('html');
    const lang = htmlTag.getAttribute('lang') || 'en';
    const url = `https://www.google.com/maps/embed/v1/place?language=${lang}&key=${publicKey}&q=${encodeURIComponent(address)}`;
    const map = document.createElement('iframe');

    map.setAttribute('src', url);
    map.setAttribute('allowfullscreen', true);
    map.setAttribute('title', 'google-map');
    el.appendChild(map);
};

export default function (tagName) {
    let intersectionObserver;
    if (window.IntersectionObserver) {
        intersectionObserver = new IntersectionObserver(entries => { // eslint-disable-line
            // If intersectionRatio is 0, the sentinel is out of view
            // and we do not need to do anything.
            entries.filter(entry => entry.intersectionRatio > 0)
                .forEach(entry => {
                    loadMap(entry.target);
                    intersectionObserver.unobserve(entry.target);
                });
        });
    }

    function attachedCallback() {
        const sentinel = this;

        if (window.IntersectionObserver) {
            intersectionObserver.observe(sentinel);
        } else {
            window.addEventListener('load', function() {
                loadMap(sentinel);
            }, false);
        }
    }

    registerElement({
        attachedCallback,
        tagName
    });
}
