const wikiXmlReader = require('./wikiXmlReader')
const isSpecialArticle = require('./isSpecialArticle')
const extractArticleText = require('./extractArticleText')
const cleanText = require('./cleanText')
const wordsSaver = require('./wordsSaver')
const wtf = require('wtf_wikipedia')
const fs = require('fs')
const SAVE_DOCUMENTS_DIR = '/var/elastic/'

let articleCount = 0
const parseWikiPage = ({ title, text}) => {
  if(isSpecialArticle(title)) return

  const article = wtf(text).json()

  if(article.isRedirect) return
  if(article.sections.length < 1) return

  try{
    const articleText = extractArticleText(article.sections)
    const finalText = cleanText(articleText)
    articleCount++;
    const filename = SAVE_DOCUMENTS_DIR + (cleanText(title).replace('.', '')).trim() + ".txt"
    process.stdout.clearLine(); 
    process.stdin.write('total: ' + articleCount + ', saving:' + filename + '\r')
    fs.writeFileSync(filename, finalText)
    
  }catch(e){
    console.error(e)
  }
}

const filename = '/home/wagner/Downloads/nlwiki-20200520-pages-articles-multistream1.xml-p1p123351'
wikiXmlReader.collectPages(filename, parseWikiPage)
