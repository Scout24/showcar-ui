const whiteList = [
    '_asga',
    '__gads',
    '_ga',
    '_gid',
    '_gat',
    'AMP_TOKEN',
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
    '5c3e5f30-4d66-4a27-931d-61b7f4905dedcconsent',
    '5c3e5f30-4d66-4a27-931d-61b7f4905dedeuconsent',
    '5c3e5f30-4d66-4a27-931d-61b7f4905dedfaktorChecksum',
    '5c3e5f30-4d66-4a27-931d-61b7f4905dedfaktorId'
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
