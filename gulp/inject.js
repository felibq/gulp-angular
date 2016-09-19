'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});

gulp.task('inject', ['scripts'], function () {
  
  var injectStyles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.css')
  ], { read: false });
  
  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js')
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));
  //注入的选项
  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };
  gulp.src(path.join(conf.paths.src, '/*.html'))
    //注入css
    .pipe($.inject(injectStyles, injectOptions))
    //注入js
    .pipe($.inject(injectScripts, injectOptions))
    //管理bower的依赖
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    //输出
    .pipe(gulp.dest(path.join(conf.paths.src, '')));

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    //注入css
    .pipe($.inject(injectStyles, injectOptions))
    //注入js
    .pipe($.inject(injectScripts, injectOptions))
    //管理bower的依赖
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    //输出
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
