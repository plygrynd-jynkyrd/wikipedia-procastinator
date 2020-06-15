const db = require('./db')

const MAX_STATEMENTS_PER_INSERT = 20000
const MAX_DB_QUERIES = 100

let queriesCount = 0
// let seconds = 0
// setInterval(() => { seconds++ }, 1000)


setInterval(() => {

  if(queriesCount < MAX_DB_QUERIES && db.statementsSize() > MAX_STATEMENTS_PER_INSERT){
 
    queriesCount++
    db.execute(MAX_STATEMENTS_PER_INSERT)
      .then(() => {
        queriesCount--
      })
      .catch(e => console.error(e))
  }

  //process.stdout.clearLine(); 
  //process.stdout.write(`speed: ${(articlesCount / seconds).toFixed(2)},  %: ${((articlesCount * 100) / articles).toFixed(2)}, db: ${queriesCount}, statements: ${db.getStatementsSize()} \r`)
}, 100)

//console.log("ORRA")

const save = ({ title, text }) => {

  const words = text.split(' ').filter((word) => word.length > 1)

  for(let i = 0; i < words.length -1; i++){
    let ws = []
    for(let j = 0; j <= 6; j++){
      if(words[i + j]){
        ws.push(words[i + j])

        // console.log(j + 1, ws.join(' '))
        db.addStatement({ title, text: ws.join(' '), size: j + 1 })
      }

    }
  }

  // words.forEach((word,i) => {
  //   // if(i < (words.length - 7)){
  //   //   const wordsText = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim() + ' ' + words[i + 3].trim()  + ' ' + words[i + 4].trim() + ' ' + words[i + 5].trim() + ' ' + words[i + 6].trim()
  //   //   db.addStatement({ title, text: wordsText, size: 7 })
  //   // }

  //   // if(i < (words.length - 6)){
  //   //   const wordsText = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim() + ' ' + words[i + 3].trim()  + ' ' + words[i + 4].trim() + ' ' + words[i + 5].trim()
  //   //   db.addStatement({ title, text: wordsText, size: 6 })
  //   // }

  //   if(i < (words.length - 5)){
  //     const wordsText = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim() + ' ' + words[i + 3].trim() + ' ' + words[i + 4].trim()
  //     db.addStatement({ title, text: wordsText, size: 5 })
  //   }

  //   if(i < (words.length - 4)){
  //     const wordsText = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim() + ' ' + words[i + 3].trim()
  //     db.addStatement({ title, text: wordsText, size: 4 })
  //   }

  //   if(i < (words.length - 3)){
  //     const wordsText = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim()
  //     db.addStatement({ title, text: wordsText, size: 3 })
  //   }

  //   if(i < (words.length - 2)){
  //     const wordsText = words[i].trim() + ' ' + words[i + 1].trim()
  //     db.addStatement({ title, text: wordsText, size: 2 })
  //   }

  //   db.addStatement({ title, text:word, size: 1 })
  // })
}

module.exports = { save, statementsSize: () => db.statementsSize() }
