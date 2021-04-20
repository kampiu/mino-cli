const crypto = require("crypto")
const defaults = require("lodash/defaults")
const through = require("through2")

const plugin = function (name, opt) {
	const opts = defaults(opt || {}, {
		optimizeMemory: false
	})
	
	if (!plugin.caches[name]) {
		plugin.caches[name] = {}
	}
	
	return through.obj(function (file, enc, callback) {
		let contents = file.checksum
		
		if (!contents) {
			if (file.isStream()) {
				this.push(file)
				return callback()
			}
			if (file.isBuffer()) {
				contents = file.contents.toString("utf8")
				
				if (opts.optimizeMemory) {
					contents = crypto.createHash("md5").update(contents).digest("hex")
				}
			}
		}
		
		let cacheFile = plugin.caches[name][file.path]
		
		if (typeof cacheFile !== "undefined" && cacheFile === contents) {
			callback()
			return
		}
		
		plugin.caches[name][file.path] = contents
		this.push(file)
		callback()
	})
}

plugin.caches = {}

module.exports = plugin
