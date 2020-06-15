const workerpool = require('workerpool')

const wtf = require('wtf_wikipedia')
const fs = require('fs')

const isSpecialArticle = require('./isSpecialArticle')
const extractArticleText = require('./extractArticleText')
const cleanText = require('./cleanText')

const SAVE_DOCUMENTS_DIR = '/var/elastic/'


const parseArticle = ({ title, text }) => { 
  
  if(isSpecialArticle(title)) return
  
  const article = wtf(text).json()

  if(article.isRedirect) return
  if(article.sections.length < 1) return

  const articleText = extractArticleText(article.sections)
  const finalText = cleanText(articleText)
  
  
  const filename = SAVE_DOCUMENTS_DIR + (cleanText(title).replace('.', '')).trim() + ".txt"
  //console.log(filename)

  //process.stdout.clearLine(); 
  // process.stdin.write(`total: ${articleCount}, speed: ${(articleCount / seconds).toFixed(0)}, saving:${filename}\r`)
  
  return new Promise((resolve) => {
    fs.writeFile(filename, finalText,() => resolve())
  })
  
}

workerpool.worker({ parseArticle  })
