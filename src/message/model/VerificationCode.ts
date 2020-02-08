import { Document, Model, Schema } from 'mongoose'
import database from '../../connection/mongodb'
import { lib } from '../modules'

const {Constant} = lib
import * as _ from 'lodash'

const mongodb = database.get('db')

const modelName = 'verificationCode'

export interface IVerificationCode extends Document {
  mobileNumber: string
  code: string
  type: string
  ip: string
  createdAt: Date
  updatedAt: Date
}

const schema: Schema = new Schema({
  code: {type: String, required: true, comment: '验证码'},
  mobileNumber: { type: String, required: true, comment: '手机号', index: true },
  app: { type: String, required: true, comment: '来源app'},
  ip: { type: String, comment: 'ip地址', index: true },
  type: {
    type: String,
    required: true,
    enum: _.values(Constant.VERIFICATION_CODE.TYPE),
    comment: '验证码类型'
  }
})
schema.set('timestamps', true)
export const VerificationCode = mongodb.model<IVerificationCode>(modelName, schema, modelName)
