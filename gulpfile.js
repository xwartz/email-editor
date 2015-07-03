var gulp = require('gulp');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var shell = require('gulp-shell');
var del = require('del');
var fs = require('fs');
var inlineCss = require('gulp-inline-css');

var dirs = {
  src : {
    dest : 'src',
    styles: 'src/styles',
    html: 'index.html'
  },

  dist : {
    dest : 'dist',
    styles: 'dist/styles'
  },

  build : {
    dest : 'build'
  }

};


gulp.task('styles', function() {
  gulp.src([dirs.src.styles + '/**/*.scss'], {base : dirs.src.styles})
    .pipe(compass({
      css: dirs.dist.styles,
      sass: dirs.src.styles
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(dirs.dist.styles));
});

gulp.task('clean', function() {
  del([dirs.dist.dest], {force: true});
});

gulp.task('watch', function() {
  gulp.watch([dirs.src.styles + '/**/*.scss', './index.html'], ['build']);
});

gulp.task('html', function () {
  gulp.src(dirs.src.html)
  .pipe(inlineCss())
  .pipe(gulp.dest('build/'));
  
})

gulp.task('dev',['styles']);

gulp.task('build', shell.task([
  'gulp styles'
  ,'gulp html'
]));




