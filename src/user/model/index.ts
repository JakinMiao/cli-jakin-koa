import * as _ from 'lodash'
import { Document, Schema } from 'mongoose'
import database from '../../connection/mongodb'
import * as bcrypt from 'bcryptjs'

const mongodb = database.get('db')

const modelName = 'user'

export interface IUser extends Document {
  phone: string
  password: string
}

const schema: Schema = new Schema({
  phone: {type: String, comment: '手机号'},
  password: {type: String, comment: '密码'}
})
schema.set('timestamps', true)

export const User = mongodb.model<IUser>(modelName, schema, modelName)
