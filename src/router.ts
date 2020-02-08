import * as KoaRouter from 'koa-router'
import { middleware } from './common'

export class ApiRouter extends KoaRouter {
  public constructor () {
    super({prefix: '/api/v1'})
    this.use('/', middleware.RequestParam.translate)
    this.use('/', middleware.RequestFileLog.log)
    this.use('/', middleware.ResponseFormatter.format('^/api'))
    // this.use('/', abTest.middleware.ABTest.run)
    this.setupRoutes()
  }

  /**
   * Initialize routes
   */
  public setupRoutes = (): void => {
    require('./user/router').router(this)
  }
}

export class ToolRouter extends KoaRouter {
  public constructor () {
    super()
    this.use('/', middleware.RequestParam.translate)
    this.use('/', middleware.RequestFileLog.log)
    this.setupRoutes()
  }

  /**
   * Initialize routes
   */
  public setupRoutes = (): void => {
    require('./common/router').router(this)
  }
}
