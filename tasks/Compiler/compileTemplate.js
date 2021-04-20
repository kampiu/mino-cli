const { lastRun, src, dest } = require("gulp")
const cache = require("gulp-cached")
const remember = require("gulp-remember")
const Compiler = require("./compiler")
const Log = require("./../log")

module.exports = function compileTemplate () {
	
	return src(["src/**/*.html"], { since: lastRun(compileTemplate) })
	.pipe(Log({
		title: "Template 编译"
	}))
	.pipe(cache("template"))
	.pipe(Compiler({
		element: "template"
	}))
	.pipe(remember("template"))
	// .pipe(debug({title: '编译:'}))
	.pipe(dest(function (file) {
		file.extname = ".wxml"
		return "miniprogram/"
	}))
}
