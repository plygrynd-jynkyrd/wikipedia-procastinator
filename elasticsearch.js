const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://172.17.0.2:9200' })

const { v4 } = require('uuid')
fs = require('fs');

const create = (document) => {
  return fs.writeFile(`/var/elastic/${v4()}.txt`, document.text, undefined, () => {})
  // const x = await client.create({
  //   id: v4(),
  //   index: 'article',
  //   body: document
  // })

  // console.log(x)

  // return x
}

module.exports = { create }