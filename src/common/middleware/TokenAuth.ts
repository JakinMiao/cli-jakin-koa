import { lib } from '../modules'

const {AppError, Constant} = lib
import { TokenService } from '../service'

export async function tokenAuth (ctx, next) {
  const token = ctx.params.token || ctx.headers.token
  if (!token) {
    throw new AppError('Invalid token')
  }
  let decoded = await TokenService.verify(token)
  if (!decoded || !decoded.userId) {
    throw new AppError('Please login again', Constant.RESPONSE.AUTH_FAIL)
  }
  ctx.userId = decoded.userId
  await next()
}
