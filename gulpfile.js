const { watch, series, parallel } = require("gulp")
const gutil = require("gulp-util")
const PluginError = gutil.PluginError

const { compileTemplate, compileScript, compileStyle, compileJson } = require("./tasks/Compiler")
const { transformJs, transformJson, transformLess } = require("./tasks/Transform")

exports.default = watch("src/**", {
	ignoreInitial: false,
	events: "all"
}, series(
	compileTemplate,
	compileScript,
	compileStyle,
	compileJson,
	parallel(transformJs, transformJson, transformLess),
))

