var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    inject = require('gulp-inject'),
    watch = require('gulp-watch'),
    rimraf = require('rimraf'),
    serve = require('gulp-serve'),
    files = require('./gulp/gulp.config.js'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    angularFilesort = require('gulp-angular-filesort');


// DEFAULT
// gulp.task('default', ['watch']);

gulp.task('default', ['build', 'watch', 'serve']);

gulp.task('watch', function () {
    //todo: add css & other files to watch, not only js
    gulp.watch(files.app_files.js, ['lint', 'build'])
});

gulp.task('build', ['clean'], function () {
    runSequence('copy-build', 'index');
});

gulp.task('clean', function (cb) {
    rimraf('./build', cb);
});

gulp.task('copy-build', ['copy-js', 'copy-html', 'copy-css', 'copy-data']);

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

gulp.task('index', function () {
    return gulp.src('index.html')
        .pipe(inject(
            gulp.src(files.app_files.js).pipe(angularFilesort())
        ))
        .pipe(inject(
            gulp.src(files.app_files.css)
        ))
        .pipe(gulp.dest('./build'));
});

// var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});


// should serve the files on localhost 3000
gulp.task('serve', serve('build'));

gulp.task('lint', function () {
    return gulp.src(files.app_files.js)
        // pipe into jshint package
        .pipe(jshint())
        // pipe into a default reporter which will give feedback
        .pipe(jshint.reporter('default'));
});


// where the bundling magic happens
gulp.task('scripts', function () {
    return gulp.src(files.app_files.js)
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/bundle'))
})