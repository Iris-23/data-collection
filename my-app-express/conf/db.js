const env = process.env.NODE_ENV  // 环境参数

let MONGODB_CONF //声明变量

if (env === 'dev') {

  MONGODB_CONF = {
    host: 'localhost',
    user: '',
    password: '',
    port: '27017',
    database: 'localconnect'
  }
}

if (env === 'production') {

  MONGODB_CONF = {
    host: 'localhost',
    user: '',
    password: '',
    port: '27017',
    database: 'localconnect'
  }
}

//导出配置
module.exports = {
  MONGODB_CONF
}