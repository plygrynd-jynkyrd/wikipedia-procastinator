const pg = require('pg')

pg.defaults.poolSize = 50;
const client = new pg.Pool({
  user: 'postgres',
  host: '10.0.2.50',
  database: 'dutchess',
  password: 'password123',
  port: 5432,
  max: 1000, // set pool max size to 20
})

const statements = {
  '1': [],
  '2': [],
  '3': [],
  '4': [],
  '5': [],
  '6': [],
  '7': []
}

let statementsSize = 0

const addStatement = ({ title, text, size }) =>  {
  ++statementsSize

  statements[size].push(`('${text}', '${title}')`)
}

const getStatements = (size) => {
  const missing = size
  const toQuery = {}

  for(let i = 0; i < Object.keys(statements).length; i++){
    const key = Object.keys(statements)[i]
    const values =  statements[key]
    if(values.length < missing) {
      toQuery[key] = values
      statementsSize -= values.length
      break;
    }

    statementsSize -= missing
    toQuery[key] = values.splice(0, missing)
  }

  return Object.keys(toQuery).map((key) => {
    const toQueryValues = toQuery[key]

    return `INSERT INTO words${key} (word, article) VALUES ${toQueryValues};`
  }).join('')
}



const execute = (MAX_STATEMENTS_PER_INSERT) => new Promise((r, re) => {
  const q = getStatements(MAX_STATEMENTS_PER_INSERT)
  //console.log('olar', q)
  return client.query(q, (err, res) => {
    if(err) return re(err)
    
    r(res)
  })  
})

module.exports = { addStatement, statementsSize: () => statementsSize > 0 ? statementsSize : 0, execute }
