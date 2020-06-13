const extractText = (sections) => {
  let text = ''

  
  sections.forEach((section) => {
    if(!section.paragraphs) return

    section.paragraphs.forEach((paragraph) => {
      if(!paragraph.sentences) return
      paragraph.sentences.forEach((sentence) => {
        text += (text.length ? ' ' + sentence.text : sentence.text)
        // sentence.links && sentence.links.forEach((link) => {
        //   if(link.type == 'internal') {
        //     document.links.push(link.page)
        //   }
        // })
      })
    })
  })

  return text
}

module.exports = extractText