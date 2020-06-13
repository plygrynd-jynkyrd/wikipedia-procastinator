
const cleanText = (text) => {
  // if(text.includes('[') && text.includes(']')){
  //   text = text.replace(/\[(.*)\]/g, '')
  // }
  // if(text.includes('{') && text.includes('}')){
  //   text = text.replace(/\{(.*)\}/g, '')
  // }


  text = text.replace(/\{(.*)\}/g, '')



  if(text.includes('=')){
    text = text.replace(/====/g, '')
    text = text.replace(/===/g, '')
    text = text.replace(/==/g, '')
    text = text.replace(/=/g, ' ')
  }
  
  text = text.replace(/'s/g, '')
  text = text.replace(/ - /g, '')
  text = text.replace(/[*",()@?!.:;#'\\/]/g,' ');



  text = text.replace(/\s+/g, ' ') //remove double spaces

  return text.toLowerCase()
}

module.exports = cleanText
