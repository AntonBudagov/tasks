var gulp = require('gulp');
var browserSync = require('browser-sync').create();


// Server
gulp.task('serve', function() {
    browserSync.init({
      // server: "app/"
       server: {
        baseDir: "./"
      }
    });
    browserSync.watch('./**/*.*').on('change', browserSync.reload)
});

// Default gulp task
gulp.task('default', ['serve'])