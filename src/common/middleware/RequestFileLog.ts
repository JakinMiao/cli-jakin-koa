import * as _ from 'lodash'
import { Log } from '../model'
import { lib } from '../modules'

const {ObjectId, Logger, DateUtil} = lib

const sortKeys = [
  'requestId',
  'userId',
  'type',
  'requestTime',
  'responseTime',
  'retCode',
  'retMsg',
  'useTime',
  'params',
  'body',
  'query',
  'httpMethod',
  'url',
  'app',
  'version',
  'channel',
  'response',
  'errorStack'
]

/**
 * 日志中间件：
 * 1. 将信息写到日志文件
 * 2. 判断是否要将(重要)日志写到数据库
 */
export async function log (ctx, next) {
  let response = null
  const time = Date.now()
  const {app, os, version, channel} = ctx.state
  const params = _.cloneDeep({...ctx.params, app, os, version, channel})
  const body = _.cloneDeep(ctx.request.body)
  const query = _.cloneDeep(ctx.request.query)
  const requestId = ObjectId().toString()
  const httpMethod = ctx.request.method

  ctx.requestId = requestId

  try {
    await next()
  } catch (err) {
    response = _.cloneDeep(ctx.body)
    ctx.errorStack = err.stack
    throw err
  } finally {
    response = response || ctx.body
    const userId = ctx.userId || 'none'
    const currentTime = Date.now()
    const log = {
      requestId,
      userId,
      type: 'in',
      requestTime: DateUtil.getCurrentTime(time),
      responseTime: DateUtil.getCurrentTime(currentTime),
      retCode: _.get(response, 'code', 'none'),
      retMsg: _.get(response, 'msg', 'none'),
      useTime: currentTime - time,
      params,
      body,
      query,
      httpMethod,
      url: ctx.url,
      app: ctx.state.app || 'none',
      version: ctx.state.version || 'none',
      channel: ctx.state.channel || 'none',
      response,
      errorStack: ctx.errorStack
    }

    // 设置字段分割符，并将object的转成字符串
    const values = sortKeys.map(key => {
      let value = log[key]
      if (typeof value === 'object') {
        return JSON.stringify(value)
      } else {
        return value
      }
    })

    // 将日志记录到日志文件
    if (!/statistic\/save/.exec(ctx.url) || !/health/.exec(ctx.url)) {
      Logger.info(values.join('|#|'))
    }
    // 如果需要记录到数据库，则在路由加上RequestLog中间件，设置ctx.isLogSave = true
    if (ctx.isLogSave) {
      new Log(log).save().then()
    }
  }
}
