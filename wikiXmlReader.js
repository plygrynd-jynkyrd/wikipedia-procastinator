const fs = require('fs')
const XmlStream = require('xml-stream')

const collectPages = (filename, callback) => {
  const stream = fs.createReadStream(filename)
  const xml = new XmlStream(stream)
  xml.collect('page')
  xml.on('endElement: page', (item) => {
    callback({
      title: item.title,
      text: item.revision.text['$text']
    })
  })
}

module.exports = { collectPages }