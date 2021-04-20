const { lastRun, src, dest } = require("gulp")
const cache = require("gulp-cached")
const remember = require("gulp-remember")
const Compiler = require("./compiler")
const Log = require("./../log")

module.exports = function compileJson () {
	
	return src(["src/**/*.html"], { since: lastRun(compileJson) })
	// .pipe(Log({
	// 	title: "Json 编译"
	// }))
	.pipe(cache("json"))
	.pipe(Compiler({
		element: "json"
	}))
	.pipe(remember("json"))
	.pipe(dest(function (file) {
		file.extname = ".json"
		return "miniprogram/"
	}))
}
