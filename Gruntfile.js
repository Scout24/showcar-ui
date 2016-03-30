module.exports = function(grunt) {
    var moduleName = "ui";
    var loadConfig = function (name, module) {
        var result = {};
        if (module) {
            module         = module || moduleName || "module";
            result[module] = loadConfig(name);
            return result;
        }
        name   = name.indexOf(".") > -1 ? name : name + ".conf";
        result = require("./config/" + name + ".js");
        return result;
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        webpack: loadConfig("webpack", "ui"),
        uglify: loadConfig("uglify"),
        sass: loadConfig("sass", "ui"),
        copy: loadConfig("copy", "ui"),
        watch: loadConfig("watch"),
        pleeease: loadConfig("pleeease"),
        assemble: loadConfig("assemble", "ui"),
        selenium_standalone: loadConfig("selenium-standalone", 'local'),
        webdriver: loadConfig("webdriver")
    });

    grunt.registerTask("build", ["sass", "webpack", "copy"]);
    grunt.registerTask("dist", ["sass", "pleeease", "webpack", "uglify", "copy", "assemble"]);

    grunt.registerTask("default", ["dist"]);
    grunt.registerTask("docs", ["assemble"]);


    grunt.registerTask("test-local", [
        "selenium_standalone:local:install",
        "selenium_standalone:local:start",
        "webdriver:local",
        "selenium_standalone:local:stop"]);
    grunt.registerTask("test-cbt", ["webdriver:cbt"]);

    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', "!grunt-cli"]
    });
};
