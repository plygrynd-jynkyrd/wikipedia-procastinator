const fs = require('fs')
const db = require('./db')

const ARTICLES_DIR = '/var/elastic/'
const MAX_DB_QUEUE = 3000000
const MAX_STATEMENTS_PER_INSERT = 50000
const MAX_DB_QUERIES = 85

let articles = 0
let queriesCount = 0
let articlesCount = 0
let seconds = 0
setInterval(() => { seconds++ }, 1000)

fs.readdir(ARTICLES_DIR, (err, files) => {
  articles = files.length

  setInterval(() => {
    if(db.getStatementsSize() < MAX_DB_QUEUE){
      const file = files.splice(0, 1)
      fs.readFile(ARTICLES_DIR + '/' + file, 'utf8', (err, data) => {
        if(err) return console.error(err)
        articlesCount++
        addArticleWordsToSave({ title: file, text: data })
      })
      
    }
  }, 5)
})

setTimeout(() => { 
  
  setInterval(() => {
    
    if(queriesCount < MAX_DB_QUERIES && db.getStatementsSize() > MAX_STATEMENTS_PER_INSERT){
      // console.log('ta ino?')
      queriesCount++
      db.execute(MAX_STATEMENTS_PER_INSERT)
        .then(() => {
          queriesCount--
        })
        .catch(e => console.error(e))
    }
  
    process.stdout.write(`speed: ${(articlesCount / seconds).toFixed(2)},  %: ${((articlesCount * 100) / articles).toFixed(2)}, db: ${queriesCount}, statements: ${db.getStatementsSize()} \r`)
  }, 5)

}, 10000)

const addArticleWordsToSave = ({ title, text }) => {
  const words = text.split(' ').filter((word) => word.length > 1)

  words.forEach((word,i) => {
    // if(i < (words.length - 7)){
    //   const text = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim() + ' ' + words[i + 3].trim()  + ' ' + words[i + 4].trim() + ' ' + words[i + 5].trim() + ' ' + words[i + 6].trim()
    //   db.addStatement(db.createInsert(article, 7, text))
    // }

    // if(i < (words.length - 6)){
    //   const text = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim() + ' ' + words[i + 3].trim()  + ' ' + words[i + 4].trim() + ' ' + words[i + 5].trim()
    //   db.addStatement(db.createInsert(article, 5, text))
    // }

    // if(i < (words.length - 5)){
    //   const text = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim() + ' ' + words[i + 3].trim() + ' ' + words[i + 4].trim()
    //   db.addStatement(db.createInsert(article, 5, text))
    // }

    if(i < (words.length - 4)){
      const wordsText = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim() + ' ' + words[i + 3].trim()
      db.addStatement({ title, text: wordsText, size: 4 })
    }

    if(i < (words.length - 3)){
      const wordsText = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim()
      db.addStatement({ title, text: wordsText, size: 3 })
    }

    if(i < (words.length - 2)){
      const wordsText = words[i].trim() + ' ' + words[i + 1].trim()
      db.addStatement({ title, text: wordsText, size: 2 })
    }

    db.addStatement({ title, text:word, size: 1 })
  })
}
