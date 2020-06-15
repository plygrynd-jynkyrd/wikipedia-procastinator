const workerpool = require('workerpool')
const fs = require('fs')
const wikiXmlReader = require('./wikiXmlReader')

const SAVE_DOCUMENTS_DIR = '/var/elastic/'

const pool = workerpool.pool('./saveParsedArticleText.js', { maxWorkers: 8, workerType: 'threads' });


let seconds = 0
setInterval(() => { seconds++ }, 1000)


let articleCount = 0

const parseWikiPage = ({ title, text }) => {
//  try{
//   pool.exec('parseArticle', [{ title, text}])
//   .then((finalText) => {
//     articleCount++
    
//     // const filename = SAVE_DOCUMENTS_DIR + (title.replace('/^[A-Za-z ]+$/', '')).trim() + ".txt"

//     // fs.writeFile(filename, finalText,() => {})
//   })
//   .catch((e) => console.error(e))
//   // pool.exec(parseArticle, [{ title, text }])
//   // //.then((a) => parseArticle({ title, article: a}))
//   // .catch((b) => console.log('b', b))

//    const { totalWorkers, busyWorkers, pendingTasks, activeTasks } = pool.stats()
   
//    process.stdout.clearLine(); 
//    process.stdin.write(`totalWorkers: ${totalWorkers}, busyWorkers: ${busyWorkers}, pendingTasks:${pendingTasks} activeTasks: ${activeTasks}, total: ${articleCount}, speed: ${(articleCount / seconds).toFixed(0)}\r`)
  
//   //process.stdin.write(`, saving:${filename}\r`)


//  }catch(e){
//    console.log(e)
//  }

articleCount++
  process.stdout.clearLine()
  process.stdin.write(`c: ${articleCount} s:${(articleCount / seconds).toFixed(0)} \r`)

}

const filename = '/home/wagner/Downloads/nlwiki-20200520-pages-articles-multistream1.xml-p1p123351'
wikiXmlReader.collectPages(filename, parseWikiPage)
