global.$ = {
	//* Пакеты
	gulp: require('gulp'),
	gul: require('gulp-load-plugins')(),
	browserSync: require('browser-sync').create(),
	gulpIf: require('gulp-if'),
	webpack: require('webpack-stream'),
	// uglify: require("gulp-uglify"),
	// gulpIf: require('gulp-minify'),
	del: require('del'),
	sass: require('gulp-sass')(require('sass')),
	//* Конфигурация
	path: require('./config/path'),
	app: require('./config/app'),
	fs: require('fs'),
};
//! Конфигурация
const fontsStyle = require('./task/fontStyle');
//* Задачи
const requireDir = require('require-dir');
const task = requireDir('./task', { recurse: true });
//* Observation
const watcher = () => {
	$.gulp.watch($.path.html.watch, task.html).on('all', $.browserSync.reload);
	// $.gulp.watch($.path.css.watch, task.css).on('all', $.browserSync.reload);
	$.gulp.watch($.path.scss.watch, task.scss).on('all', $.browserSync.reload);
	$.gulp.watch($.path.js.watch, task.js).on('all', $.browserSync.reload);
	$.gulp.watch($.path.image.watch, task.image).on('all', $.browserSync.reload);
	$.gulp.watch($.path.fonts.watch, task.fonts).on('all', $.browserSync.reload);
	$.gulp.watch($.path.fontsStyle.watch, change).on('all', $.browserSync.reload);
};
const change = $.gulp.series(task.clearFonts, task.fonts, fontsStyle);
const end = $.gulp.series(
	task.clear,
	$.gulp.parallel(task.html, task.scss, task.js, task.image, task.fonts),
	fontsStyle,
);
const dev = $.gulp.series(end, $.gulp.parallel(watcher, task.server));
//* Вызов
exports.clear = task.clear;
exports.clearEnd = task.clearEnd;
exports.clearFonts = task.clearFonts;
exports.html = task.html;
exports.js = task.js;
exports.css = task.css;
exports.scss = task.scss;
exports.image = task.image;
exports.fonts = task.fonts;
exports.final = task.final;
exports.fontsStyle = fontsStyle;
exports.watch = watcher;
//*Сборка
exports.default = $.app.isProd ? end : dev;
exports.final = $.gulp.series(task.clearEnd, task.final, task.server);
