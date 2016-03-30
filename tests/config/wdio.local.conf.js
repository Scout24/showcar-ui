exports.config = (function() {
    var config = require('./wdio.base.conf').config;
    config['capabilities'] = [{
        browserName: 'chrome'
    }];
    return config;
})();
