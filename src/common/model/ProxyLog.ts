import { Document, Model, Schema } from 'mongoose'
import * as _ from 'lodash'
import database from '../../connection/mongodb'
import { lib } from '../modules'

const {Constant} = lib

const mongodb = database.get('log')

const modelName = 'proxyLog'

interface IProxyLog extends Document {
  id: string
  url: string
  requestTime: Date
  responseTime: Date
  useTime: number
  status: string
  service: string
  method: string
  query: object
  isForm: boolean
  body: object
  response: object
}

const schema: Schema = new Schema({
  url: {type: String, index: true, comment: '请求链接'},
  requestTime: {type: Date, comment: '请求时间'},
  responseTime: {type: Date, comment: '响应时间'},
  useTime: {type: Number, index: true, comment: '请求耗时 ms'},
  status: {
    type: String,
    required: true,
    index: true,
    default: Constant.PROXY_LOG.STATUS.PENDING,
    enum: _.values(Constant.PROXY_LOG.STATUS),
    comment: '状态'
  },
  service: {type: String, index: true, comment: '外部系统名称'},
  method: {type: String, comment: 'http方法'},
  query: {type: Object, comment: '请求参数'},
  isForm: {type: Boolean, comment: '是否表单类型'},
  body: {type: Object, comment: '请求body'},
  response: {type: Object, comment: '返回结果'}
})
schema.set('timestamps', true)
export const ProxyLog = mongodb.model<IProxyLog>(modelName, schema, modelName)
