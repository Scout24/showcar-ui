const whiteList = [
    '_asga',
    '__gads',
    '_ga',
    '_gid',
    '_gat',
    'AMP_TOKEN',
    'as24AutoAboLike2Drive',
    'as24-gtmSearchCrit',
    'as24Visitor',
    'culture',
    'testmode',
    'featurebee',
    'toguru',
    'cookieConsent',
    'cookie-layer-dismissed',
    'User',
    'cmpatt',
    'cms_fbOFF',
    'S24UT',
    'webxtest',
    'testrun',
    'as24-survey-opt-out',
    '__utma',
    '__utmz',
    '_utmz',
    'optimizelySegments',
    'optimizelyBuckets',
    'optimizelyPendingLogEvents',
    'optimizelyEndUserId',
    '_asse',
    '_asga',
    '_asga_gid',
    '_gat_ALL',
    'optimizelyRedirectData',
    'optimizelyReferrer',
    'showTsm',
    'isAdBlockerUsed3',
    'urugot-bucket',
    'PLAY_SESSION',
    'gaid',
    'asvid',
    'doi',
    'cid',
    'GUID',
    'oidcsaus',
    '.ASPXAUTH',
    '__RequestVerificationToken',
    'test-cookie',
    '__ut',
    'as24_identity',
    'noauth',
    'random',
    'as24ArticleType',
    '0d1d0abe-8984-4629-b696-ae425affff05cconsent',
    '0d1d0abe-8984-4629-b696-ae425affff05euconsent',
    '0d1d0abe-8984-4629-b696-ae425affff05faktorChecksum',
    '0d1d0abe-8984-4629-b696-ae425affff05faktorId',
    'brand-variation',
    'brand-opt-out',
    'brand-survey-was-shown',
    'brand-pageview-counter',
    'page-views-feed',
    'last-search-feed',
    'home-feed-bucket'
];

const deleteCookieByName = function(cookie) {
    const domain = window.location.hostname.replace(/.*autoscout24\./, '.autoscout24.');
    // we do it twice because some cookies are set to www.autoscout24.tld and some to .autoscout24.tld domains
    document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + domain;
    document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const getCookieName = function(cookie) {
    var cookieArray = cookie.split('=');
    return cookieArray[0].trim();
};

export const findUnneededCookies = (cookie) => {
    let isNotWhitelisted = true;
    let i = 0;

    while(isNotWhitelisted && i < whiteList.length) {
        const regex = new RegExp(`^(${whiteList[i]})`, 'i');
        isNotWhitelisted = !regex.test(cookie);
        i++;
    }

    return isNotWhitelisted;
};

export default () => {
    const unneededCookies = document.cookie.split(';')
        .map(cookie => getCookieName(cookie))
        .filter(findUnneededCookies);

    unneededCookies.forEach(deleteCookieByName);
};
