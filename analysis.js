const fs = require('fs')
const dir = '/var/elastic'
const db = require('./db')

const dbStatements = []
let dbCount = 0

const runDb = () => {

  if(dbCount < 90 && dbStatements.length > 5000){
   
    const qvai = dbStatements.splice(0,5000)
    dbCount++
    db.execute(qvai.join(''))
      .then(() => {
        dbCount--
        
      })
      .catch((e) => {
        console.error(e)
        neivinha
      })
  } else {
    //console.log('ta sussa')
  }
}

setInterval(() => {
  
  runDb()
}, 5)


const readFile = (file ,cb) => {
  //console.log(2)
  fs.readFile(dir + '/' + file, 'utf8', function(err, data) {
   // console.log(3)
    
    if(err) return console.error(err)
    const promises = []
    //console.log("FOI")
    const article = file.replace('.txt', '')
    const rawWords = data.split(' ')
    const words = rawWords.filter((word) => word.length > 1)
    

    words.forEach((word,i) => {

      if(i < (words.length - 5)){
        const text = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim() + ' ' + words[i + 3].trim()  + words[i + 4].trim()
        dbStatements.push(db.save(article, 5, text))
      }

      if(i < (words.length - 4)){
        const text = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim() + ' ' + words[i + 3].trim()
        dbStatements.push(db.save(article, 4, text))
      }

      if(i < (words.length - 3)){
        const text = words[i].trim() + ' ' + words[i + 1].trim() + ' ' + words[i + 2].trim()
        dbStatements.push(db.save(article, 3, text))
      }

      if(i < (words.length - 2)){
        const text = words[i].trim() + ' ' + words[i + 1].trim()
        dbStatements.push(db.save(article, 2, text))
      }


      dbStatements.push(db.save(article, '', word.trim()))

      
    })

    cb()

  })

  
}


fs.readdir(dir, (err, files) => {
  if(err) return console.error(err)

  let workers = 0
  let fcount = 0
  let seconds = 0

  setInterval(() => { seconds++ }, 1000)
  

  setInterval(() => {
    if(workers < 100 && dbStatements.length < 500000){
      workers++
      const file = files.shift()
      readFile(file, () => {
        fcount++;
        workers--
        //console.log('files remaining: ' + fcount)
      })
      
    } else { 
      
    }

    process.stdout.write(`speed: ${(fcount / seconds).toFixed(2)} % ${((100 * fcount) / files.length).toFixed(4)}, workers: ${workers}, db: ${dbCount}, totaldb: ${dbStatements.length}\r`)

    
    //console.log(workers)
  }, 10)
  
  
})

//readFile('018dbb43-0e0b-4ed3-adf9-ff55514cd43c.txt')