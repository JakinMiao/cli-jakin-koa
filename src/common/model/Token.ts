import { Document, Model, Schema } from 'mongoose'
import database from '../../connection/mongodb'
import { lib } from '../modules'

const {Constant} = lib

const mongodb = database.get('db')

const modelName = 'token'

export interface IToken extends Document {
  userId: string
  token: string
  createdAt: Date
  updatedAt: Date
}

const schema: Schema = new Schema({
  userId: {type: String, required: true, comment: '用户Id'},
  token: {type: String, required: true, comment: '登录token'},
  createdAt: {type: Date, expires: Constant.TOKEN.EXPIRES_IN}
})
schema.set('timestamps', true)
export const Token = mongodb.model<IToken>(modelName, schema, modelName)
