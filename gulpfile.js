var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    shell = require('gulp-shell'),
    del = require('del'),
    inlineCss = require('gulp-inline-css'),
    data = require('gulp-data'),
    handlebars = require('gulp-compile-handlebars'),
    path = require('path'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');


var dirs = {
    src: './src',
    data: './src/data',
    hbs: './src/partials',
    styles: './src/styles',
    images: './src/img',
    entry: './src/entry',
    dest: './dist',
    build: './build'
}

var plumberErrorHandler = {
    errorHandler: notify.onError({
        message: "Error: <%= error.message %>"
    })
};

var styles = function() {
    return gulp.src([dirs.styles + '/**/*.scss'], {
            base: dirs.styles
        })
        .pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            css: dirs.dest,
            sass: dirs.styles
        }))
        .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9', 'android 4'))
        .pipe(gulp.dest(dirs.dest));
}

var hbs = function() {
    var options = {
        // ignorePartials: false,
        // partials: {
        //     footer: '<footer>the end</footer>'
        // },
        batch: [dirs.hbs],
        // helpers: {
        //     capitals: function(str) {
        //         return str.toUpperCase();
        //     }
        // }
    }

    return gulp.src([dirs.entry + '/*.hbs'])
        .pipe(plumber(plumberErrorHandler))
        .pipe(data(function(file) {
            return require(dirs.data + '/' + path.basename(file.path, '.hbs') + '.json');
        }))
        .pipe(handlebars(data, options))
        .pipe(inlineCss())
        .pipe(rename(function (path) {
          path.extname = '.html'
        }))
        .pipe(gulp.dest(dirs.dest))
        .pipe(gulp.dest(dirs.build));

}

gulp.task('clean', function() {
    del([dirs.dest, dirs.build], {
        force: true
    });
});

gulp.task('watch', function() {
    gulp.watch([dirs.src + '/**/*'], ['build']);
});

gulp.task('hbs', function() {
    hbs();
})

gulp.task('styles', function() {
    styles();
})

gulp.task('build', shell.task([
    'gulp clean',
    'gulp styles',
    'gulp hbs'
]));