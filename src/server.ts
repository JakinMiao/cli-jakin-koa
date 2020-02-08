import * as http from 'http'
import * as koaStatic from 'koa-static'
import * as bodyParser from 'koa-bodyparser'
import * as koaJson from 'koa-json'
import * as koaMorgan from 'koa-morgan'
import * as config from 'config'
import * as Koa from 'koa'
import {ApiRouter, ToolRouter} from './router'
import Logger from './lib/Logger'
import * as KoaRouter from 'koa-router'

const indexRouter = new KoaRouter()

const app = new Koa()
const apiRouter = new ApiRouter()
const toolRouter = new ToolRouter()
const port = config.get('port')
const time = Date.now()

// middleware
app.use(bodyParser({
  extendTypes: {
    text: ['application/xml', 'text/xml']
  },
  enableTypes: ['text', 'json', 'form']
}))
app.use(koaJson())
app.use(koaMorgan('tiny', {
  skip: function (req, res) {
    return /\/docs\//.exec(req.url) || /\/healthcheck\//.exec(req.url)
  }
}))

buildRoutes(app)

// initializer
require('./connection')

// statics
app.use(koaStatic('assets'))

Logger.info(` app star in ${process.env.NODE_ENV || 'local'} env `)
Logger.info(` app star in ${(Date.now() - time) / 1000} s, listen on port ${port}`)

const server = http.createServer(app.callback()).listen(port)

// router middleware
function buildRoutes (app) {
  app.use(indexRouter.routes())
  app.use(toolRouter.routes())
  app.use(apiRouter.routes())
}

export default server
