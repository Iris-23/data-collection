const mongoose = require('mongoose')
const { MONGODB_CONF } = require('../conf/db')

const url = `mongodb://${MONGODB_CONF.host}:${MONGODB_CONF.port}`

const dbName = MONGODB_CONF.database

mongoose.connect(`${url}/${dbName}`, {
  // 配置
})

const db = mongoose.connection

db.on('error', err => {
  console.log('err :', err)
})

db.once('open', () => {
  console.log('db success')
})

module.exports = mongoose