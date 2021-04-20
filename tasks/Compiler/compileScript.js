const { lastRun, src, dest } = require("gulp")
const uglify = require("gulp-uglify")
const cache = require("gulp-cached")
const remember = require("gulp-remember")
const Compiler = require("./compiler")
const Log = require("./../log")

module.exports = function compileScript () {
	
	return src(["src/**/*.html"], {
		since: lastRun(compileScript)
	})
	// .pipe(Log({
	// 	title: "script 编译"
	// }))
	.pipe(cache("javascript"))
	.pipe(Compiler({
		element: "script"
	}))
	.pipe(uglify())
	.pipe(remember("javascript"))
	.pipe(dest(function (file) {
		file.extname = ".js"
		return "miniprogram/"
	}))
}
