const pg = require('pg')
const { v4 } = require('uuid')

pg.defaults.poolSize = 50;
const client = new pg.Pool({
  user: 'postgres',
  host: '172.17.0.2',
  database: 'dutchess',
  password: '123',
  port: 5432,
  max: 90, // set pool max size to 20
})

const statements = {
  '1': [],
  '2': [],
  '3': [],
  '4': [],
  // '5': [],
  // '6': [],
  // '7': []
}

const addStatement = ({ title, text, size }) =>  {
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
      break;
    }

    toQuery[key] = values.splice(0, missing)
  }

  return Object.keys(toQuery).map((key) => {
    const toQueryValues = toQuery[key]

    return `INSERT INTO words${key} (word, article) VALUES ${toQueryValues};`
  }).join('')
}

const getStatementsSize = () =>
  Object.keys(statements).reduce((a, key) => {
    return a + statements[key].length
  }, 0)


const execute = (MAX_STATEMENTS_PER_INSERT) => new Promise((r, re) => {
  const q = getStatements(MAX_STATEMENTS_PER_INSERT)
  //console.log('olar', q)
  return client.query(q, (err, res) => {
    if(err) return re(err)
    r(res)
  })  
})

module.exports = { addStatement, getStatementsSize, execute }