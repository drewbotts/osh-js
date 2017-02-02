var gulp = require('gulp-help')(require('gulp'),{hideDepsMessage:true});
var argv = require('yargs').argv;
var clean = require('gulp-clean');
var merge = require('merge-stream');
var jshint= require("gulp-jshint");
var uglify = require('gulp-uglify');
var sort = require('gulp-sort');
var order = require('gulp-order');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('build','build a distributable osh-js instance',['normal','minify'],function () {
    // ...
}, {
    options: {
        'ffmpeg': 'Include FFMPEG library. This library provides FFmpeg builds ported to JavaScript using Emscripten project. ' +
        'Builds are optimized for in-browser use: minimal size for faster loading, asm.js, performance tunings, etc. This is a fork ' +
        'from Kagami/ffmpeg.js: https://github.com/sensiasoft/ffmpeg.js\n',
        'nvd3': 'Include NVD3 library: http://nvd3.org/\n',
        'broadway': 'Include broadway JS library. Broadway JS is a JavaScript H.264 decoder: https://github.com/mbebenita/Broadway\n',
        'jsonix': 'Include jsonix library. sonix (JSON interfaces for XML) is a JavaScript library ' +
        'which allows you to convert between XML and JSON structures: ' +
        ' https://github.com/highsource/jsonix\n',
        'cesium':'An open-source JavaScript library for world-class 3D globes and maps: https://cesiumjs.org/\n',
        'leaflet':'An open-source JavaScript library for mobile-friendly interactive maps: http://leafletjs.com/\n',
        'ol3':'OpenLayer 3 makes it easy to put a dynamic map in any web page. It can display map tiles, ' +
        'vector data and markers loaded from any source: https://openlayers.org/\n',
        'nouislider': 'This library is responsible for displaying the RangeSlider bar.It is lightweight JavaScript range slider, ' +
        'originally developed to be a jQuery UI alternative: https://github.com/leongersen/noUiSlider\n',
        'tree': 'This library is responsible for displaying the Entity Tree View. It is a pure Javascript TreeView Component: https://github.com/rafaelthca/aimaraJS\n'
    }
});

gulp.task('minify', false, ['vendor-js-src-all','osh-js-src','vendor-css-src-all','osh-css-src','copy-vendor','images'],function(){
    // Minify OSH js min
    gulp.src("dist/js/osh.js")
        .pipe(uglify({mangle:false}))
        .pipe(concat('osh.min.css'))
        .pipe(gulp.dest('dist/js'));

    // Minify OSH css min
    gulp.src("dist/css/osh.css")
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(concat('osh.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('vendor-js-src-all',false,function(){
    var jsSources = new Array();

    if(argv.ffmpeg) {
        jsSources.push('vendor/ffmpeg/ffmpeg-h264.js');
        jsSources.push('vendor/ffmpeg/YUVCanvas.js');
    }

    if(argv.d3) {
        jsSources.push('vendor/d3/d3.min.js');
    }

    if(argv.nvd3) {
        jsSources.push('vendor/nvd3/build/nv.d3.min.js');
    }

    if(argv.broadway) {
        jsSources.push('vendor/broadway/broadway-all.min.js');
        jsSources.push('vendor/broadway/YUVCanvas.js');
        jsSources.push('vendor/broadway/Decoder.js');
        jsSources.push('vendor/broadway/Player.js');
    }

    if(argv.nouislider) {
        jsSources.push('vendor/nouislider/distribute/nouislider.min.js');
        jsSources.push('vendor/wnumb/wNumb.js');
    }

    if(argv.cesium) {
        jsSources.push('vendor/cesium.js/dist/Cesium.js');
    }
    if(argv.ol3) {
        jsSources.push('vendor/ol3/ol.js');
        jsSources.push('vendor/ol3-layerswitcher/src/ol3-layerswitcher.js');
    }
    if(argv.leaflet) {
        jsSources.push('vendor/leaflet/dist/leaflet.js');
        jsSources.push('vendor/Leaflet.fullscreen/dist/Leaflet.fullscreen.min.js');
    }
    if(argv.tree) {
        jsSources.push('vendor/tree/tree.js');
    }
    if(argv.jsonix) {
        jsSources.push('vendor/jsonix/dist/*.js');
        jsSources.push('vendor-local/jsonix/dist/**/.js');
    }

    return gulp.src(jsSources).pipe(concat('vendor.js')).pipe(gulp.dest("dist/vendor/all-in-one"));
});

gulp.task('vendor-css-src-all',false,function(){
    var cssSources = new Array();

    if(argv.nvd3) {
        cssSources.push('vendor/nvd3/build/nv.d3.min.css');
    }

    if(argv.nouislider) {
        cssSources.push('vendor/nouislider/distribute/nouislider.min.css');
    }

    if(argv.cesium) {
        // copy cesium resources
        gulp.src(['vendor/cesium.js/dist/**','!vendor/cesium.js/dist/Cesium.js'])
            .pipe(gulp.dest('dist/vendor/all-in-one/'));
    }
    if(argv.ol3) {
        cssSources.push('vendor/ol3/ol.css');
        cssSources.push('vendor/ol3-layerswitcher/src/ol3-layerswitcher.css');
    }
    if(argv.leaflet) {
        // copy leaflet resources
        gulp.src('vendor/leaflet/dist/images/*').pipe(gulp.dest('dist/vendor/all-in-one/images'));
        gulp.src('vendor/Leaflet.fullscreen/dist/*.png').pipe(gulp.dest('dist/vendor/all-in-one/'));
    }
    if(argv.tree) {
        cssSources.push('vendor/tree/tree.css');
        // copy tree resources
        gulp.src('vendor/tree/images/*').pipe(gulp.dest('dist/vendor/all-in-one/images'));
    }
    if(argv.jsonix) {
        cssSources.push('vendor/jsonix/dist/*.css');
    }

    return gulp.src(cssSources).pipe(concat('vendor.css')).pipe(gulp.dest("dist/vendor/all-in-one"));;
});

gulp.task('osh-js-src',false,function(){
    return gulp.src('src/osh/**/*.js')
        .pipe(jshint())
        //.pipe(jshint.reporter('default')) //display error on stdout
        .pipe(order([
            'osh-BaseClass.js',
            'osh-Template.js',
            'osh-Utils.js',
            'osh-Browser.js',
            'osh-DomEvent.js',
            'osh-EventManager.js',
            'osh-Buffer.js',
            'dataconnector/osh-DataConnector.js',
            'dataconnector/osh-DataConnector-HttpAjaxConnector.js',
            'dataconnector/osh-DataConnector-Websocket.js',
            'datareceiver/osh-DataReceiver-DataSource.js',
            'datareceiver/osh-DataReceiver-DataSourceEulerOrientation.js',
            'datareceiver/osh-DataReceiver-DataSourceLatLonAlt.js',
            'datareceiver/osh-DataReceiver-DataSourceNexrad.js',
            'datareceiver/osh-DataReceiver-DataSourceOrientationQuaternion.js',
            'datareceiver/osh-DataReceiver-DataSourceVideoH264.js',
            'datareceiver/osh-DataReceiver-DataSourceVideoMjpeg.js',
            'datareceiver/osh-DataReceiver-DataSourceVideoMp4.js',
            'datareceiver/osh-DataReceiver-DataSourceChart.js',
            'datareceiver/osh-DataReceiverController.js',
            'datasender/osh-DataSender-DataSink.js',
            'datasender/osh-DataSender-PtzTasking.js',
            'datasender/osh-DataSender-UavMapTasking.js',
            'datasender/osh-DataSenderController.js',
            'discovery/osh-Sensor.js',
            'discovery/osh-Server.js',
            'log/osh-Log.js',
            'ui/osh-UI-View.js',
            'ui/contextmenu/osh-UI-ContextMenu.js',
            'ui/contextmenu/osh-UI-ContextMenu-CssMenu.js',
            'ui/contextmenu/osh-UI-ContextMenu-CircularMenu.js',
            'ui/contextmenu/osh-UI-ContextMenu-StackMenu.js',
            'ui/styler/osh-UI-Styler.js',
            'ui/styler/osh-UI-StylerImageDraping.js',
            'ui/styler/osh-UI-StylerCurve.js',
            'ui/styler/osh-UI-StylerNexrad.js',
            'ui/styler/osh-UI-StylerPolyline.js',
            'ui/styler/osh-UI-StylerPointMarker.js',
            'ui/view/chart/osh-UI-Nvd3CurveChartView.js',
            'ui/view/discovery/osh-UI-DiscoveryView.js',
            'ui/view/entity/osh-UI-EntityTreeView.js',
            'ui/view/map/osh-UI-CesiumView.js',
            'ui/view/map/osh-UI-LeafletView.js',
            'ui/view/map/osh-UI-OpenLayerView.js',
            'ui/view/osh-UI-DialogView.js',
            'ui/view/osh-UI-Loading.js',
            'ui/view/osh-UI-RangeSlider.js',
            'ui/view/tasking/osh-UI-PtzTaskingView.js',
            'ui/view/video/osh-UI-FFMPEGView.js',
            'ui/view/video/osh-UI-H264View.js',
            'ui/view/video/osh-UI-MjpegView.js',
            'ui/view/video/osh-UI-Mp4View.js',
        ], { base: './src/osh' }))
        .pipe(concat('osh.js')).pipe(gulp.dest("dist/js"));
});

gulp.task('osh-css-src',false,['copy-fonts'],function(){
    return gulp.src('src/css/*.css')
        .pipe(concat('osh.css')).pipe(gulp.dest("dist/css"));
});
//----------- NORMAL ------------------//

gulp.task('normal', false, ['vendor-js-src-all','vendor-css-src-all','osh-js-src','osh-css-src', 'copy-vendor','images']);

//---------- COPY VENDORS ------//
gulp.task('copy-vendor',false, function () {
    if(argv.ffmpeg) {
        gulp.src('vendor/ffmpeg/*.js')
            .pipe(gulp.dest('dist/vendor/ffmpeg'));
    }

    if(argv.d3) {
        gulp.src('vendor/d3/d3.min.js')
            .pipe(gulp.dest('dist/vendor/d3'));
    }

    if(argv.nvd3) {
        gulp.src('vendor/nvd3/build/nv.d3.min.js')
            .pipe(gulp.dest('dist/vendor/nvd3'));
        gulp.src('vendor/nvd3/build/nv.d3.min.css')
            .pipe(gulp.dest('dist/vendor/nvd3'));
    }

    if(argv.broadway) {
        gulp.src('vendor/broadway/*.js')
            .pipe(gulp.dest('dist/vendor/broadway'));
    }

    if(argv.nouislider) {
        gulp.src('vendor/nouislider/distribute/*.min.*')
            .pipe(gulp.dest('dist/vendor/nouislider'));
        gulp.src('vendor/wnumb/wNumb.js')
            .pipe(gulp.dest('dist/vendor/nouislider'));
    }

    if(argv.cesium) {
        gulp.src('vendor/cesium.js/dist/**/*')
            .pipe(gulp.dest('dist/vendor/cesium'));
    }

    if(argv.ol3) {
        gulp.src('vendor/ol3/ol.js')
            .pipe(gulp.dest('dist/vendor/ol3'));
        gulp.src('vendor/ol3/ol.css')
            .pipe(gulp.dest('dist/vendor/ol3'));
        gulp.src('vendor/ol3-layerswitcher/src/ol3-layerswitcher.js')
            .pipe(gulp.dest('dist/vendor/ol3'));
        gulp.src('vendor/ol3-layerswitcher/src/ol3-layerswitcher.css')
            .pipe(gulp.dest('dist/vendor/ol3'));
    }

    if(argv.leaflet) {
        gulp.src('vendor/leaflet/dist/**/*')
            .pipe(gulp.dest('dist/vendor/leaflet'));
        gulp.src('vendor/Leaflet.fullscreen/dist/**')
            .pipe(gulp.dest('dist/vendor/leaflet'));
    }
    if(argv.tree) {
        gulp.src('vendor/tree/**')
            .pipe(gulp.dest('dist/vendor/tree'));
    }
    if(argv.jsonix) {
        gulp.src('vendor/jsonix/dist/**')
            .pipe(gulp.dest('dist/vendor/jsonix'));
        gulp.src('vendor-local/jsonix/**')
            .pipe(gulp.dest('dist/vendor/jsonix'));
    }
});

gulp.task('copy-fonts',false, function () {
    return gulp.src('src/css/font-awesome-4.6.3/**/*')
        .pipe(gulp.dest('dist/css/font-awesome-4.6.3'));
});

//--------- IMAGES -----------//
gulp.task('images', false,function () {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/css/images'));
});

//------- TOOLS -------//
//clean
gulp.task('clean', "Clean the dist directory",function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean({force:true}));
});