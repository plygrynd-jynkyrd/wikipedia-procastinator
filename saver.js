const workerpool = require('workerpool');


const addToDatabase = (ARTICLES_DIR, file) => new Promise((resolve, reject) => {
  const fs = require('fs')

  fs.readFile(ARTICLES_DIR + '/' + file, 'utf8', (err, data) => {
    if(err) return reject(err)
    
    let result = []
    
    const words = data.split(' ').filter((word) => word.length > 1)

    for(let i = 0; i < words.length -1; i++){
      let ws = []
      for(let j = 0; j <= 6; j++){
        if(words[i + j]){
          ws.push(words[i + j])

          result.push({ title: file, text: ws.join(' '), size: j + 1 })
        }

      }
    }
    
    resolve(result)
  })
})



workerpool.worker({ addToDatabase })