const isSpecial = (title) => {
  const specials = [
    'Lijst van',
    'Wikipedia:',
    'Help:',
    'Bestand:',
    'MediaWiki:',
    'Portaal:',
    'Sjabloon:',
    'Categorie:'
  ]

  return specials.find(x => title.startsWith(x))
}

module.exports = isSpecial