const { lastRun, src, dest } = require("gulp")
const less = require("gulp-less")
const cache = require("gulp-cached")
const remember = require("gulp-remember")
const Log = require("./../log")

module.exports = function transformLess () {
	
	return src(["src/**/*.less"], { since: lastRun(transformLess) })
	.pipe(Log({
		title: "Style 编译"
	}))
	.pipe(cache("style"))
	.pipe(less())
	.pipe(remember("style"))
	.pipe(dest(function (file) {
		file.extname = ".wxss"
		return "miniprogram/"
	}))
}
