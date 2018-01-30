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

var gulp = require('gulp'),
    inject = require('gulp-inject'),
    rimraf = require('rimraf'),
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
    return gulp.src('app/css/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        // @mahmoud : I've changed the path to put it right into the build
        .pipe(gulp.dest('./build'))
});

gulp.task('copyfiles', ['copy-js', 'copy-html', 'copy-data']);
// gulp.task('copyfiles', ['copy-js', 'copy-html', 'copy-css', 'copy-data']);


gulp.task('copy-js', function () {
    return gulp.src(['app/*.js', 'app/!gulpfile.js'])
        // @mahmoud : added "/app" so the injected files can
        // point to the correct path
        .pipe(gulp.dest('./build/app'));
});
gulp.task('copy-html', function () {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('./build'));
});
// gulp.task('copy-css', function () {
//     return gulp.src('app/*.css')
//         .pipe(gulp.dest('./build'));
// });
gulp.task('copy-data', function () {
    return gulp.src('app/database.json')
        .pipe(gulp.dest('./build'));
});

//@TODO: DEBUG (see documentation example below)
gulp.task('injectpaths', function () {
    return gulp.src('app/index.html')
        .pipe(inject(
            gulp.src(['app/*.js', '!app/gulpfile.js']).pipe(angularFilesort()),
            // @mahmoud : this removes the slash from the path when injecting files
            { addRootSlash: false }
            // gulp.src(['app/*.js', '!app/gulpfile.js', 'build/compiledstylesheet/main.css']).pipe(angularFilesort())
        ))
        .pipe(inject(
            gulp.src('build/compiledstylesheet/main.css'), {
                addRootSlash: false,
                // @mahmoud : This basicly removes any given path from the final result
                // U can use this same method when injecting the js files above
                // all options can be found here:
                // https://github.com/klei/gulp-inject#optionsignorepath
                ignorePath: ['build']
            }
        ))
        .pipe(gulp.dest('./build'))
})

// var target = gulp.src('index.html'); DOESN'T GIVE A BUG BUT ALSO DOESN'T WORK
// var target = gulp.src('app/index.html'); DOESN'T WORK
// var target = gulp.src('./app/index.html'); DOESN'T WORK
// var sources = gulp.src(['./*.js', '!./gulpfile.js', './build/compiledstylesheet/main.css'], { read: false });
// var sources = gulp.src(['./*.js', '!./gulpfile.js'], { read: false });

// return target.pipe(inject(sources)).pipe(angularFilesort())
// .pipe(gulp.dest('./'))
// });

// previous version of this task:
// gulp.task('index', function () {
//     return gulp.src('index.html')
//         .pipe(inject(
//             gulp.src(files.app_files.js).pipe(angularFilesort())
//         ))
//         .pipe(inject(
//             gulp.src(files.app_files.css)
//         ))
//         .pipe(gulp.dest('./build'));
// });


//EXAMPLE FROM OFFICIAL DOCUMENTATION
// gulp.task('index', function () {
//   var target = gulp.src('./src/index.html');
//   // It's not necessary to read the files (will speed up things), we're only after their paths:
//   var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

//   return target.pipe(inject(sources))
//     .pipe(gulp.dest('./src'));
// });

//@TODO: DEBUG (probably doesn't run because injectpaths doesn't run properly)
gulp.task('bundle', function () {
    return gulp.src(['*.js', '!gulpfile.js'])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/bundle'))
})