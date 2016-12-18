var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var injfile = require("gulp-inject-file");
var rmlines = require('gulp-delete-lines');

var rimraf = require('rimraf');

var paths = {
  index: "./src/index.html",
  dest: "./dist"
};

gulp.task('default', ['inject-file']);

/** populate index with style and script tags */
gulp.task('inject-vendor', function() {
  return gulp.src(paths.index)
    .pipe(wiredep({}))
    .pipe(gulp.dest(paths.dest));
});

/** concatenate and format those tags */
gulp.task('inject-file', ['inject-vendor'], function () {
  return gulp.src('./dist/index.html')
    .pipe(injfile({
      pattern: '<script src="<filename>"></script>'
    }))
    .pipe(injfile({
      pattern: '<link rel="stylesheet" href="<filename>" />'
    }))
    .pipe(rmlines({
      'filters': [
        '<!--(?:.)*-->'
      ]
    }))
    .pipe(gulp.dest(paths.dest));
});

/** clean products */
var path = require('path');
gulp.task('clean', function (done) {
  rimraf.sync(path.join(__dirname, paths.dest));
  done();
});
