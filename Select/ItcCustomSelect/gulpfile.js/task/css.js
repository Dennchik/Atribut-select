//* Плагины
//* Обработка Css
const css = () => {
	return $.gulp.src($.path.css.src)
		.pipe($.gul.plumber({
			errorHandler: $.gul.notify.onError(error => ({
				title: 'CSS',
				message: error.message,
			})),
		}))
		.pipe($.gulpIf($.app.isDev, $.gul.sourcemaps.init({
			largeFile: true
		})))
		.pipe($.gulpIf($.app.isProd, $.gul.stripCssComments()))
		.pipe($.gulpIf($.app.isProd, $.gul.autoprefixer($.app.autoprefixer)))
		.pipe($.gulpIf($.app.isProd, $.gul.groupCssMediaQueries()))
		.pipe($.gulpIf($.app.isProd, $.gul.shorthand()))
		.pipe($.gulpIf($.app.isProd, $.gul.webpCss()))
		.pipe($.gulpIf($.app.isDev, $.gul.sourcemaps.write('.')))
		.pipe($.gulp.dest($.path.css.dest))
		.pipe($.gulpIf($.app.isProd, $.gul.size({ title: 'До сжатия-CSS:' })))
		.pipe($.gulpIf($.app.isProd, $.gul.csso('style.css')))
		.pipe($.gulpIf($.app.isProd, $.gul.rename($.app.renameScss)))
		.pipe($.gulpIf($.app.isProd, $.gul.size({ title: 'После сжатия-CSS:' })))
		.pipe($.gulp.dest($.path.css.dest));
};
module.exports = css;