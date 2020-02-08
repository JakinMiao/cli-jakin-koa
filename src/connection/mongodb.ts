import * as mongoose from 'mongoose'
import * as config from 'config'

const mongodbConfig = config.get('database.mongodb')
const DEBUG_FLAG = config.get('database.mongooseDebug')

mongoose.set('debug', DEBUG_FLAG)
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)

let dbs: Map<string, mongoose.Connection> = new Map()

function createConnection (url, options = {}) {
  const db = mongoose.createConnection(url, options)
  db.on('error', err => {
    err.message = `[mongoose]${err.message}`
    console.error(err)
  })

  db.on('disconnected', () => {
    console.error(`[mongoose] ${url} disconnected`)
  })

  db.on('connected', () => {
    console.log(`[mongoose] ${url} connected successfully`)
  })

  db.on('reconnected', () => {
    console.log(`[mongoose] ${url} reconnected successfully`)
  })
  return db
}

for (let c of mongodbConfig) {
  dbs.set(c.name, createConnection(c.url, c.options))
}

export default dbs
