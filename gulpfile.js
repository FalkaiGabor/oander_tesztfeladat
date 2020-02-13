const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

//Watch & serve
gulp.task("serve", gulp.series(["sass"], function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch(["css/*.scss"], gulp.series(["sass"]));
    gulp.watch(["*.html"]).on("change", browserSync.reload);
}));

gulp.task("default", gulp.series(["serve"]));