const workerpool = require('workerpool')
const fs = require('fs')
const wikiXmlReader = require('./wikiXmlReader')

const SAVE_DOCUMENTS_DIR = '/var/elastic/'

const pool = workerpool.pool('./saveParsedArticleText.js', { maxWorkers: 16, workerType: 'threads' });

let seconds = 0
setInterval(() => { seconds++ }, 1000)


let articleCount = 0



const parseWikiPage = ({ title, text }) => {
   try{
   
  pool.exec('parseArticle', [{ title, text}])
  .then((finalText) => {
    articleCount++
  
    // if(finalText){
      
    //   wordsSaverOnDemand.save({ title, text: finalText})
    // }
    
     process.stdout.clearLine(); 
    
    const { totalWorkers, busyWorkers, pendingTasks, activeTasks } = pool.stats()
    // process.stdin.write(`totalWorkers: ${totalWorkers}, busyWorkers: ${busyWorkers}, pendingTasks:${pendingTasks} activeTasks: ${activeTasks}, statementsSize: ${wordsSaverOnDemand.statementsSize()}, total: ${articleCount}, speed: ${(articleCount / seconds).toFixed(0)}\r`)
    process.stdin.write(`totalWorkers: ${totalWorkers}, busyWorkers: ${busyWorkers}, pendingTasks:${pendingTasks} activeTasks: ${activeTasks}, total: ${articleCount}, speed: ${(articleCount / seconds).toFixed(0)}\r`)



  })
  .catch((e) => console.error(e))
  // pool.exec(parseArticle, [{ title, text }])
  // //.then((a) => parseArticle({ title, article: a}))
  // .catch((b) => console.log('b', b))

  //  
   
  


 }catch(e){
   console.log(e)
 }


}

const filename = '/home/wagner/Downloads/nlwiki-20200520-pages-articles-multistream1.xml-p1p123351'
wikiXmlReader.collectPages(filename, parseWikiPage)
