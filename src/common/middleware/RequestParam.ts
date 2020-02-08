import * as _ from 'lodash'

export async function translate (ctx, next) {
  // 把APP设置到header
  ctx.state.app = ctx.headers.app
  ctx.state.os = ctx.headers.os
  ctx.state.version = ctx.headers.version
  ctx.state.channel = ctx.headers.channel
  ctx.params = Object.assign({}, ctx.query, ctx.params, ctx.request.body)
  await next()
}
