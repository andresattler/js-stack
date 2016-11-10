/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import del from 'del';
import {exec} from 'child_process';

const paths = {
  allSrcJs: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js',
  libDir: 'lib',
};

gulp.task('lint', () => {
  return gulp.src([
    paths.allSrcJs
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean', () => {
  return del(paths.libDir);
});

gulp.task('build', ['lint', 'clean'], () => {
  return gulp.src(paths.allScrJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir));
});

gulp.task('main', ['build'], (callback) => {
  exec(`node ${paths.libDir}`, (error, stdout)=> {
    console.log(stdout);
    return callback(error);
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
});

gulp.task('default', ['watch', 'main']);
