const { lastRun, src, dest } = require("gulp")
const uglify = require("gulp-uglify")
const cache = require("gulp-cached")
const remember = require("gulp-remember")
const Log = require("./../log")

module.exports = function transformJs () {
	
	return src(["src/**/*.js"], {
		since: lastRun(transformJs)
	})
	.pipe(Log({
		title: "script 编译"
	}))
	.pipe(cache("javascript"))
	.pipe(uglify())
	.pipe(remember("javascript"))
	.pipe(dest(function (file) {
		return "miniprogram/"
	}))
}
