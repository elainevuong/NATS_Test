import pg from 'pg'

const pgClient = new pg.Client({
  database: 'flag_test'
})

pgClient.connect()

export default pgClient