var gulp = require('gulp');
runSequence = require('run-sequence');
del = require('del');
inject = require('gulp-inject');

// when 'gulp' is called from commandline, default task gets executed
gulp.task('default', [], function (callback) {
    // every task in the runSequence gets called
    runSequence('build', callback)
});


gulp.task('build', function (callback) {
    //13 jan
    runSequence('clean', 'copy-build', 'index', callback)

})

// gulp.task('build', function(callback) {
//     runSequence('build-clean',
//                 ['build-scripts', 'build-styles'],
//                 'build-html',
//                 callback);
//   });

gulp.task('clean', function (callback) {
    del(['./build'], { force: true }, callback)
});


// gulp.task('copy-app-js', function () {
//     return gulp.src('./src/ **/*.js')
//         .pipe(gulp.dest('./build'));
// });


// gulp.task('copy-build', ['copy-js', 'copy-html', 'copy-css', 'copy-data']);

gulp.task('copy-build', function (callback) {
    runSequence(['copy-js', 'copy-html', 'copy-css', 'copy-data'], callback)
})

gulp.task('copy-js', function () {
    return gulp.src('*.js')
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
    // PRO-T: no need for *.html because of routing, correct?
    var template_source = ['./build/*.js', './build/*.css', './build/*.json'];
    return gulp.src('./build/index.html')
        //gulp.src takes (a variable that holds) an array of file path definitions OR a gulp config file => var template_source
        .pipe(inject(gulp.src(template_source), { ignorePath: './build' }))
        .pipe(gulp.dest('./build'));
});



