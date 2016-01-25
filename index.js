var fs = require('fs')
var fse = require('fs-extra')
var needle = require('needle')
var marked = require('marked')
var mustache = require('mustache')

var uri = 'https://api.github.com/repos/nodejs/node/issues'
var dist = 'dist/'

// Clean dist folder
fse.emptyDirSync('dist')

var postTemplate = fs.readFileSync('./templates/post.mustache', 'utf-8')

needle.get(uri, function (err, resp) {
  if (!err && resp.statusCode === 200) {
    var issues = resp.body
    issues.map(issue => {
      issue.content = marked(issue.body)

      var name = dist + issue.created_at + '.html'
      var content = mustache.render(postTemplate, issue)
      fse.outputFile(name, content)
    })
  }
})
