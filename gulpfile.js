const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const named = require('vinyl-named');

const destination = 'dist';

function js() {
    return gulp.src('src/showcar-ui.js')
        .pipe(named())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(destination));
}

function scss() {
    const sourcemaps = require('gulp-sourcemaps');
    const sass = require('gulp-sass');
    const postcss = require('gulp-postcss');
    const autoprefixer = require('autoprefixer');
    const atImport = require('postcss-import');
    const cssnano = require('cssnano');
    const rename = require('gulp-rename');

    const plugins = [
        atImport(),
        autoprefixer(),
        cssnano()
    ];

    const input = 'src/showcar-ui.scss';

    return gulp.src(input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename('showcar-ui.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destination));
}

function jsLinter() {
    return gulp.src(['src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on('error', () => {
            process.exit(1);
        });
}

function cssLinter() {
    const stylelint = require('gulp-stylelint');
    return gulp.src('src/**/*.scss')
        .pipe(stylelint({
            failAfterError: true,
            debug: true,
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
        .on('error', () => {
            process.exit(1);
        });
}

gulp.task('replace', done => {
    const fs = require('fs');
    const UglifyJS = require('uglify-js');
    const readFile = filename => fs.readFileSync(filename, 'utf-8');
    const readJsFile = filename => UglifyJS.minify(readFile(filename)).code;
    const stringReplace = require('gulp-string-replace');
    const replaceOptions = { logs: { enabled: false } };
    gulp.src(['src/html/index.html', 'src/html/index-standalone.html', 'docs/helpers/polyfills.js'])
        .pipe(stringReplace('@@POLYFILL_DOCUMENT_REGISTER_ELEMENT', readFile('node_modules/document-register-element/build/document-register-element.js'), replaceOptions))
        .pipe(stringReplace('@@POLYFILL_DOM4', readFile('node_modules/dom4/build/dom4.js'), replaceOptions))
        .pipe(stringReplace('@@POLYFILL_ARRAY', readJsFile('src/js/polyfills/array.js'), replaceOptions))
        .pipe(stringReplace('@@POLYFILL_STRING', readJsFile('src/js/polyfills/string.js'), replaceOptions))
        .pipe(stringReplace('@@POLYFILL_OBJECT', readJsFile('src/js/polyfills/object.js'), replaceOptions))
        .pipe(stringReplace('@@POLYFILL_PROMISE', readJsFile('node_modules/promiz/promiz.min.js'), replaceOptions))
        .pipe(stringReplace('@@POLYFILL_FETCH', readJsFile('node_modules/whatwg-fetch/fetch.js'), replaceOptions))
        .pipe(stringReplace('@@POLYFILL_URL_SEARCH_PARAMS', readJsFile('node_modules/url-search-params-polyfill/index.js'), replaceOptions))
        .pipe(stringReplace('@@SCRIPT_ERROR_COLLECTOR', readJsFile('src/js/inline-js/js-error-collector.js'), replaceOptions))
        .pipe(gulp.dest('dist/'));
    done();
});

gulp.task('copy:fragments', done => {
    gulp.src('src/html/showcar-ui-fragment.html').pipe(gulp.dest(destination));
    gulp.src('src/html/showcar-ui-standalone-fragment.html').pipe(gulp.dest(destination));
    gulp.src('src/html/showcar-ui-toggled-fragment.html').pipe(gulp.dest(destination));
    gulp.src('src/html/showcar-ui-toggled-test-fragment.html').pipe(gulp.dest(destination));
    gulp.src('src/html/optimizely-*.html').pipe(gulp.dest(destination));
    done();
});

const compileJs = gulp.series(jsLinter, js);
const compileCss = gulp.series(cssLinter, scss);

const build = gulp.series(compileJs, compileCss, 'copy:fragments', 'replace');

function serve() {
    const bs = require('browser-sync').create();

    bs.init({
        open: false,
        server: {
            baseDir: destination
        },
        port: 3000
    });

    gulp.watch(`${destination}/**/*`).on('change', bs.reload);
}

gulp.task('serve', gulp.series(serve));

gulp.task('docs:generate', (done) => {
    require('./docs/tasks/generateJson')();
    require('./docs/tasks/generateHtml')();
    done();
});

const serveDocs = require('./docs/tasks/docs');

gulp.task('docs:serve', done => {
    serveDocs(gulp);
    done();
});
gulp.task('docs:edit', gulp.series(build), () => {serveDocs(gulp);});
gulp.task('docs:watch', gulp.series(build), () => {serveDocs(gulp);});

gulp.task('default', gulp.series('docs:watch'));

var path = require('path');
var karmaParseConfig = require('karma/lib/config').parseConfig;

function runKarma(configFilePath, options, cb) {

    configFilePath = path.resolve(configFilePath);
  
    var Server = require('karma').Server;
    var config = karmaParseConfig(configFilePath, {});
  
    Object.keys(options).forEach(function(key) {
        config[key] = options[key];
    });
  
    var server = new Server(config, function(exitCode) {
        cb();
        process.exit(exitCode);
    });

    server.start();
}

gulp.task('test', gulp.series('docs:serve', function (cb) {
    runKarma('karma.conf.js', {
        browsers: ['Chrome', 'Firefox', 'Safari']
    }, cb);
}));

gulp.task('test:fast', gulp.series('docs:serve', function (cb) {
    runKarma('karma.conf.js', {
        browsers: ['Chrome']
    }, cb);
}));

gulp.task('test:bs', gulp.series('docs:serve', function (cb) {
    runKarma('karma.conf.js', {
        browsers: ['bs_chrome_win', 'bs_firefox_win', 'bs_edge_win', 'bs_ie11_win'],
        browserStack: {
            username: process.env.BROWSERSTACK_USERNAME,
            accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
            build: new Date().toLocaleString('de-DE', {
                hour12: false,
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }),
            project: 'Showcar-ui',
        }
    }, cb);
}));

gulp.task('test:travis', gulp.series(
    'docs:serve', 
    function (cb) {
        runKarma('karma.conf.js', {
            browsers: ['bs_chrome_win', 'bs_firefox_win', 'bs_edge_win', 'bs_ie11_win'],
            browserStack: {
                username: process.env.BROWSERSTACK_USERNAME,
                accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
                project: 'Showcar-ui',
                timeout: 60 * 4
            },
            reporters: ['mocha'],
            concurrency: 1
        }, cb);
    }
));

exports.build = build;
