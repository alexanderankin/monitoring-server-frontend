var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var injfile = require("gulp-inject-file");
var rmlines = require('gulp-delete-lines');

var paths = {
  index: "./src/index.html",
  dest: "./dist"
};

gulp.task('inject-vendor', function() {
  return gulp.src(paths.index)
    .pipe(wiredep({}))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('default', ['inject-file']);

// gulp.task('inject-own', function() {
//   gulp.src(paths.index)
//     .pipe(inject(gulp.src(paths.sources, {read: false})))
//     .pipe(gulp.dest('./www'));
// });

gulp.task('inject-file', ['inject-vendor'], function () {
  return gulp.src('./dist/index.html')
    .pipe(injfile({
      // can use custom regex pattern here 
      // <filename> token will be replaced by filename regex pattern. 
      // do not use capturing groups within your custom regex. 
      // this parameter is optional, default value: '<!--\\s*inject:<filename>-->' 
      // pattern: '<!--\\s*inject:<filename>-->'
      pattern: '<script src="<filename>"></script>'
    }))
    .pipe(rmlines({
      'filters': [
        '<!--(?:.)*-->'
      ]
    }))
    .pipe(gulp.dest(paths.dest));
});
