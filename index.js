var fse = require('fs-extra')
var needle = require('needle')
var marked = require('marked')

var uri = 'https://api.github.com/repos/nodejs/node/issues'
var dist = 'dist/'

function clean () {
  fse.emptyDir('dist')
}

clean()

needle.get(uri, function (err, resp) {
  if (!err && resp.statusCode === 200) {
    var issues = resp.body
    issues.map(issue => {
      var name = dist + issue.created_at + '.html'
      var content = marked(issue.body)
      fse.outputFile(name, content)
    })
  }
})
