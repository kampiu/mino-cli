const { lastRun, src, dest } = require("gulp")
const less = require("gulp-less");
const cache = require("gulp-cached");
const remember = require("gulp-remember");
const Compiler = require("./compiler");
const Log = require("./../log");

module.exports = function compileStyle () {
	
	return src(["src/**/*.html"], { since: lastRun(compileStyle) })
	// .pipe(Log({
	// 	title: "Style 编译"
	// }))
	.pipe(cache("style"))
	.pipe(Compiler({
		element: "style"
	}))
	.pipe(less())
	.pipe(remember("style"))
	.pipe(dest(function (file) {
		file.extname = ".wxss"
		return "miniprogram/"
	}))
}
