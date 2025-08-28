//* Плагины
//* Обработка scss
const scss = () => {
	return $.gulp.src($.path.scss.src)
		.pipe($.gul.plumber({
			errorHandler: $.gul.notify.onError(error => ({
				title: 'scss',
				message: error.message,
			})),
		}))
		.pipe($.gul.sassGlob())
		.pipe($.gulpIf($.app.isDev, $.gul.sourcemaps.init({
			largeFile: true
		})))
		.pipe($.gulpIf($.app.isDev, $.gul.debug({
			title: 'Source - Maps (INIT)'
		})))
		.pipe($.sass.sync({
			outputStyle: 'expanded',
		}).on('error', $.gul.notify.onError()))
		.pipe($.gulpIf($.app.isProd, $.gul.stripCssComments()))
		.pipe($.gulpIf($.app.isProd, $.gul.autoprefixer($.app.autoprefixer)))
		.pipe($.gulpIf($.app.isProd, $.gul.debug({
			title: '(Autoprefixer)'
		})))
		.pipe($.gulpIf($.app.isProd, $.gul.groupCssMediaQueries()))
		.pipe($.gulpIf($.app.isProd, $.gul.shorthand()))
		.pipe($.gulpIf($.app.isProd, $.gul.webpCss()))
		.pipe($.gulpIf($.app.isDev, $.gul.sourcemaps.write('.')))
		.pipe($.gulpIf($.app.isDev, $.gul.debug({
			title: 'Source - Maps (WRITE)'
		})))
		.pipe($.gulp.dest($.path.scss.dest))
		.pipe($.gulpIf($.app.isProd, $.gul.size({
			title: 'До сжатия - (CSS):'
		})))
		.pipe($.gulpIf($.app.isProd, $.gul.csso('style.css')))
		.pipe($.gulpIf($.app.isProd, $.gul.rename($.app.renameScss)))
		.pipe($.gulpIf($.app.isProd, $.gul.size({
			title: 'После сжатия - (CSS):'
		})))
		.pipe($.gulp.dest($.path.scss.dest));
};
module.exports = scss;