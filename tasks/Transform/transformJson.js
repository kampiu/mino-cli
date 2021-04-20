const { lastRun, src, dest } = require("gulp")
const cache = require("gulp-cached")
const remember = require("gulp-remember")
const Log = require("./../log")

module.exports = function transformJson () {
	
	return src(["src/**/*.json"], { since: lastRun(transformJson) })
	.pipe(Log({
		title: "Json 编译"
	}))
	.pipe(cache("json"))
	.pipe(remember("json"))
	.pipe(dest(function (file) {
		return "miniprogram/"
	}))
}
