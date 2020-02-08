import {redis as _redis} from '../connection'
import DateUtil from './DateUtil'
const redis = _redis as any // 要校验类型, 所以才出此下策,
class RedisUtil {
  static async setHash (hashKey, obj) {
    const res = await redis.hmset(hashKey, obj)
    return res
  }

  static async getHash (hashKey, key?) {
    const res = await redis.hgetall(hashKey)
    if (res) {
      if (key) return res[key]
      return res
    }
    return null
  }

  static async set (key, value) {
    if (typeof value === 'object') value = JSON.stringify(value)
    const res = await redis.set(key, value)
    return res
  }

  static async get (key, isObject?) {
    let result = await redis.get(key)
    if (isObject && result) result = JSON.parse(result)
    return result
  }

  static async remove (key) {
    const res = await redis.del(key)
    return res
  }

  static async setNumber (key: string, numb: number, expiresIn?: any): Promise<string> {
    // 为了防止redis数据太多设置自动过期时间为当天凌晨
    expiresIn = expiresIn || DateUtil.getCurrentMoment().endOf('day').diff(DateUtil.getCurrentMoment()) / 1000
    // 取整秒数
    expiresIn = parseInt(expiresIn + '', null)
    let res = await redis.setex(key, expiresIn, numb)
    return res
  }

  static async getNumber (key: String) {
    const numb = await redis.get(key)
    return numb ? parseInt(numb, null) : 0
  }

  static async setNumberByInc (key, integer = 1) {
    const num = await this.getNumber(key)
    // TODO: 首次并发由于调用的是'setNumber'可能存在部分integer累加不到，暂时可忽略
    let res
    if (!num) res = await this.setNumber(key, integer)
    if (num) res = await redis.incrby(key, integer)
    return res
  }

  static async setHasEx (key, value, expiresIn) {
    if (typeof value === 'object') value = JSON.stringify(value)
    const res = await redis.setex(key, expiresIn, value)
    return res
  }

  static async rpush (key, value) {
    const res = await redis.rpush([key, ...value])
    return res
  }

  static async lrange (key) {
    const res = await redis.lrange(key, 0, -1)
    return res
  }
}
export default RedisUtil
