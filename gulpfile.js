// gulp build: 
//A - prepare for build
//      1. clean up the old build
//      2. gulp watch to lint all the files
//B - repeat linting until all mistakes are fixed
//C - build the app
//      3. compile sass to css
//      4. copy all the files (html, compiled css, js,...)
//      5. inject the css and js file paths into index.html
//      6. minify & bundle
//D - deployment
//      7. deploy
//      8. serve/host the deployed site

//@TODO: check if all are needed
var gulp = require('gulp'),
    // runSequence = require('run-sequence'),
    // // del = require('del'),
    inject = require('gulp-inject'),
    // watch = require('gulp-watch'),
    rimraf = require('rimraf'),
    // serve = require('gulp-serve'),
    // files = require('./gulp/gulp.config.js'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    angularFilesort = require('gulp-angular-filesort'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    htmlLint = require('gulp-html-lint'),
    gulpsync = require('gulp-sync')(gulp);


gulp.task('default', gulpsync.sync(['prepare', 'build']))

gulp.task('prepare', ['clean', 'lint']);

gulp.task('clean', function (cb) {
    rimraf('./build', cb);
});

gulp.task('lint', ['lintjs', 'lintsass', 'linthtml'])

gulp.task('lintjs', function () {
    return gulp.src(['*.js', '!gulpfile.js',])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('lintsass', function () {
    return gulp.src(['main.scss'])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
})

gulp.task('linthtml', function () {
    return gulp.src(['index.html', 'mondriaanView.html'])
        .pipe(htmlLint())
        .pipe(htmlLint.format())
        .pipe(htmlLint.failOnError())
})

gulp.task('build', gulpsync.sync(['compilesass', 'copyfiles', 'injectpaths', 'bundle']));

gulp.task('compilesass', function () {
    return gulp.src('./sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build'));
});

gulp.task('copyfiles', ['copy-js', 'copy-html', 'copy-css', 'copy-data']);

gulp.task('copy-js', function () {
    return gulp.src(['*.js', '!gulpfile.js'])
        .pipe(gulp.dest('./build'));
});
gulp.task('copy-html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('./build'));
});
gulp.task('copy-css', function () {
    return gulp.src('*.css')
        .pipe(gulp.dest('./build'));
});
gulp.task('copy-data', function () {
    return gulp.src('database.json')
        .pipe(gulp.dest('./build'));
});

gulp.task('injectpaths', function () {
    return gulp.src('index.html')
        .pipe(inject(
            gulp.src(['*.js', '!gulpfile.js']).pipe(angularFilesort())
        ))
        .pipe(inject(
            gulp.src('./build/main.css')
        ))
        .pipe(gulp.dest('./build'));
});

gulp.task('bundle', function () {
    return gulp.src(['*.js', '!gulpfile.js'])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/bundle'))
})