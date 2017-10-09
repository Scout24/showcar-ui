(function(navigator, location) {
    'use strict';

    function postError(url, data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(data);
    }

    function getPagePath(pathname) {
        var pathArray = pathname.split('/');
        if(pathArray.includes('nl') || pathArray.includes('fr')) {
            // include 2nd part of the path for Belgium
            return pathArray.slice(1, 3).join('/');
        }
        return pathArray[1];
    }

    window.onerror = function(errorMsg, sourceUrl, lineNumber, column, errorObj) {
        
        if (errorMsg.indexOf('Script error') > -1) {
            return;
        }
        
        if (location.host.indexOf('www.autoscout24') < 0) {
            return;
        }

        var data = {
            httpUri: location.href,
            httpReferrer: document.referrer,
            pagePath: getPagePath(location.pathname),
            jsSrc: sourceUrl || '',
            jsLine: lineNumber || '',
            jsColumn: column || '',
            browserOs: navigator.platform,
            browserUseragent: navigator.userAgent,
            errorStacktrace: errorObj ? errorObj.stack : '',
            errorMessage: errorMsg || ''
        };
        
        var prefix = (location.host.indexOf('dev-www.') > -1) ? 'dev-' : '';
        var url = 'https://' + prefix + 'js-error-logger.infinity.eu-west-1.s24cloud.net/log';
        postError(url, JSON.stringify(data));
    };
})(navigator, location);
