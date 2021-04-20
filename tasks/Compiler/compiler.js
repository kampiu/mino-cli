const { series, src, dest } = require("gulp")
const through = require("through2")
const cheerio = require("cheerio")

// 重新缓存区
module.exports = function (opt = {}) {
	
	const {
		element = "template"
	} = opt
	
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file)
		}
		if (file.isBuffer()) {
			const $ = cheerio.load(file.contents.toString())
			const Context = $(element).html()
			
			// console.log("Context", file.path)
			if (Context) {
				file.contents = Buffer.concat([Buffer.from(Context)])
			}else{
				file.contents = Buffer.concat([])
			}
		}
		cb(null, file)
	})
}
