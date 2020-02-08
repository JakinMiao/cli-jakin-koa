module.exports = {
  isProd: false,
  database: {
    redis: {
      url: process.env.REDIS_URI || 'redis://127.0.0.1:6379'
    },
    mongooseDebug: false,
    mongodb: [
      {
        name: 'db',
        url: process.env.CASH_LOAN_MONGODB_URI || 'mongodb://127.0.0.1:27017/koa',
        options: {}
      },
      {
        name: 'log',
        url: process.env.LOG_MONGODB_URI || 'mongodb://127.0.0.1:27017/koa-log',
        options: {}
      }
    ]
  }
}