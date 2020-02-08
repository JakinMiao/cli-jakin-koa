import * as config from 'config'
import * as Redis from 'ioredis'
// url 格式 见 https://www.iana.org/assignments/uri-schemes/prov/redis
const redis = new Redis(config.get('database.redis.url'))
export { redis }
