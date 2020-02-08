import { Document, Model, Schema } from 'mongoose'
import database from '../../connection/mongodb'

const mongodb = database.get('db')

const modelName = 'log'

interface ILog extends Document {
  id: string
  time: number
  fromUser: string,
  toUser: string,
  msgType: string,
  type: string,
  status: string,
  notifyUrl: string
}

const schema: Schema = new Schema({
  requestId: {type: String, comment: 'request Id'},
  userId: {type: String, comment: '用户ID，如果请求需要账号验证'},
  type: {type: String, required: true, enum: ['in', 'out'], index: true, comment: '类型，是请求其他系统 out 还是接受其他请求 in'},
  requestTime: {type: Date, comment: '请求时间'},
  responseTime: {type: Date, comment: '响应时间'},
  retCode: {type: String, comment: '响应代码'},
  retMsg: {type: String, comment: '响应信息，一般是报错才有'},
  useTime: {type: Number, comment: '请求耗时 ms'},
  httpMethod: {type: String, comment: '请求类型'},
  url: {type: String, comment: '请求 url'},
  query: {type: Object, comment: '通过url传输请求参数'},
  body: {type: Object, comment: '通过post的body传输请求参数'},
  params: {type: Object, comment: '整合的请求参数'},
  response: {type: Object, comment: '返回结果'}
})
schema.set('timestamps', true)
export const Log = mongodb.model<ILog>(modelName, schema, modelName)
