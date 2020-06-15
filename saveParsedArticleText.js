const workerpool = require('workerpool')

const wtf = require('wtf_wikipedia')
const fs = require('fs')

const isSpecialArticle = require('./isSpecialArticle')
const extractArticleText = require('./extractArticleText')
const cleanText = require('./cleanText')

const SAVE_DOCUMENTS_DIR = '/var/elastic/'

//const wordsSaverOnDemand = require('./wordsSaverOnDemand')



const parseArticle = ({ title, text }) => { 
  if(isSpecialArticle(title)) return
  
  const article = wtf(text).json()

  if(article.isRedirect) return
  if(article.sections.length < 1) return

  const articleText = extractArticleText(article.sections)
  const finalText = cleanText(articleText)
  
    if(finalText){
      
//      wordsSaverOnDemand.save({ title, text: finalText})
	 const filename = './elastic/' + (cleanText(title).replace('.','')).trim() + ".txt"
	    fs.writeFile(filename, finalText, () => {})
    }

  // return Promise.resolve()
  
}

workerpool.worker({ parseArticle  })
