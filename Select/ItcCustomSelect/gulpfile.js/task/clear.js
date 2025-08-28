//* Удаление директории - Build
const clear = () => {
	return $.del('./build')
}
module.exports = clear