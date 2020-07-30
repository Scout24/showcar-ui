const whiteList = [
    '_asga',
    '__gads',
    '_ga',
    '_gid',
    '_gat',
    'AMP_TOKEN',
    'as24AutoAboLike2Drive',
    'as24AutoAboMobileAppView',
    'as24-gtmSearchCrit',
    'as24AutoAboMobileAppView',
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
    'page-views-feed',
    'last-search-feed',
    'home-feed-bucket',
    'home-feed-location',
    'consentForAds',
    'acExperiment',
];

const deleteCookieByName = function(cookie) {
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
