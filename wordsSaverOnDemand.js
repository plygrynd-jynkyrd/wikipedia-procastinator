const workerpool = require('workerpool')
const fs = require('fs')
const db = require('./db')

const MAX_STATEMENTS_PER_INSERT = 40000
const MAX_DB_QUERIES = 1000
const MAX_DB_QUEUE = 300000
const ARTICLES_DIR = './elastic/'

let queriesCount = 0
let articlesCount = 0
let seconds = 0
setInterval(() => { seconds++ }, 1000)


const pool = workerpool.pool('./saver.js', { maxWorkers: 16, workerType: 'threads' });
 

setInterval(() => {
  const statementsSize = db.statementsSize()
  if(queriesCount < MAX_DB_QUERIES && statementsSize > MAX_STATEMENTS_PER_INSERT){
    queriesCount++
    db.execute(MAX_STATEMENTS_PER_INSERT)
      .then(() => {
        queriesCount--
      })
      .catch(e => console.error(e))


      process.stdout.clearLine(); 
    const { totalWorkers, busyWorkers, pendingTasks } = pool.stats()
    process.stdin.write(`totalWorkers: ${totalWorkers}, busyWorkers: ${busyWorkers}, pendingTasks:${pendingTasks}, queries: ${queriesCount}, statements: ${statementsSize}, articlesCount: ${articlesCount}, speed: ${(articlesCount / seconds).toFixed(0)}\r`)
  }

}, 100)

fs.readdir(ARTICLES_DIR, (err, files) => {
  articles = files.length

  setInterval(() => {
    
    if(db.statementsSize() < MAX_DB_QUEUE){
      const file = files.splice(0, 1)
      if(file.length === 0) return 

      pool.exec('addToDatabase', [ARTICLES_DIR, file])
        .then((items) => {
          items.forEach((item) => { db.addStatement(item) });
          articlesCount++
        })
        .catch((e) => console.log('fudesalvouu: ' + file, e))
      
    }
  }, 5)
})
