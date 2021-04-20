const { watch, series, parallel, src, dest } = require("gulp")
const through = require("through2")
const log = require("fancy-log")
const chalk = require("chalk")
const path = require("path")

module.exports = function Log (options = {}) {
	
	options = Object.assign({
		title: "",
	}, options)
	
	return through.obj(function (file, enc, cb) {
		
		const FilePath = path.relative(process.cwd(), file.path)
		
		log(chalk.green(options.title), chalk.blue(FilePath))
		
		cb(null, file)
	})
}
