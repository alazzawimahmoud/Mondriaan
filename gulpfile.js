var gulp        = require('gulp'),
browserSync     = require('browser-sync'),
reload          = browserSync.reload;

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

// reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('*.css', function(file) {
    if (file.type === "changed") {
      reload(file.path);
    }
  });

  gulp.watch(['*.html'], ['bs-reload']);
  gulp.watch(['*.js'], ['bs-reload']);
});
