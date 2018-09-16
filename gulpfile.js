const connect = require('gulp-connect');
const webpack = require('webpack-stream');
const gulp = require('gulp');
const fs = require('fs');
const del = require('del');
const cors = require('cors');

gulp.task('rollup', () => {
    return gulp.src('src/index.js')
        .pipe(webpack({
            output: {
                filename: 'app.js'
            }, 
            node: {
                fs: 'empty'
            }
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy', () => {
    return gulp.src(['model/*/**', 'data/*', 'src/index.html'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', () => {
    return del.sync(['/dist/**']);    
});

gulp.task('connect', () => {
    connect.server({
        host: '0.0.0.0',
        root: 'dist',
        livereload: true,
        middleware: function() {
            return [cors()];
        }
    });
});


gulp.task('default', ['clean', 'copy', 'connect', 'rollup']);