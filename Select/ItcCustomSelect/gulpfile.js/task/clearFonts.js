//* Удаление директории - Fonts
const clear = () => {
	return $.del('./build/fonts')
}
module.exports = clear