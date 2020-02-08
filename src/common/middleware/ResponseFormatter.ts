import { AppError, Logger } from '../../lib'

export const format = (pattern) => {
  return async (ctx, next) => {
    const reg = new RegExp(pattern)
    // 符合相应规则才格式化返回 例如: ^/api
    if (!reg.test(ctx.originalUrl)) {
      await next()
      return
    }

    try {
      await next()

      ctx.status = 200
      const shouldWrap = ctx.shouldWrap !== false
      if (shouldWrap) {
        ctx.body = {
          code: 0,
          data: ctx.body
        }
      }
    } catch (error) {
      if (error instanceof AppError) {
        Logger.info('业务逻辑错误 ', error.message)
        ctx.status = 200
        ctx.body = {
          code: error.code === undefined ? -1 : error.code,
          msg: error.message
        }
      } else {
        Logger.error('系统内部错误 ', error)
        ctx.status = 200
        ctx.errorStack = error.stack
        ctx.body = {
          code: 503,
          msg: '系统内部错误，请稍后重拾'
        }
      }
    }
  }
}
