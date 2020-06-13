module.exports = ($, paragraphs) => {
  const valuableLinks = []

  paragraphs.each((i, paragraph) => {
    const hrefs = $(paragraph).find('a')
   
    hrefs.each((i2, href) => {
      const link = $(href).prop('href')

      const isInnerLink = link.startsWith('/wiki/')
      const isList = link.startsWith('/wiki/List_of')
      const isSpecial = link.includes(':') || link.includes('.')

      if(isInnerLink && !isList && !isSpecial){
        valuableLinks.push(link.substr(6)) //removes /wiki/
      }
     })
  })

  return valuableLinks
}