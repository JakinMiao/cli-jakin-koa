import * as _ from 'lodash'
import * as superagentPromise from 'superagent-bluebird-promise'
import * as rp from 'request-promise'
import { common } from './modules'
import { Logger, DateUtil, Constant } from '../lib'

const {ProxyLog} = common.model

export class BaseProxy {
  protected name
  protected readonly HTTP_DEFAULT_TIMEOUT

  constructor () {
    this.HTTP_DEFAULT_TIMEOUT = 60 * 1000 // 30s
  }

  protected async httpRequest (
    {url, method, header, body, query, isForm = false, skipLog = true}: { url: string, method: string, header?: object, body?: object, query?: object, isForm?: boolean, skipLog?: boolean }) {
    let operation = superagentPromise[method](url).timeout(this.HTTP_DEFAULT_TIMEOUT)
    operation = this.setHeader(header, operation)

    let res = {}

    // save request Log
    let proxyLog = {
      service: this.name,
      requestTime: DateUtil.getCurrentTime(),
      method,
      url,
      query,
      body,
      isForm,
      status: Constant.PROXY_LOG.STATUS.PENDING
    }

    // send query
    try {
      if (isForm) {
        let suffix = _.map(query as any, (value, key) => `${key}=${value}`).join('&')
        if (!_.isEmpty(suffix)) {
          url += `?${suffix}`
        }
        const options = {
          headers: header,
          method: method,
          url,
          formData: body
        }
        const result = await rp(options)
        res = JSON.parse(result)
      } else {
        const result = await operation.query(query).send(body)
        res = JSON.parse(result.text)
      }
      // 更新proxy log 数据
      proxyLog.status = Constant.PROXY_LOG.STATUS.FINISH
      proxyLog['response'] = res
    } catch (err) {
      // 更新proxy log 数据
      proxyLog.status = Constant.PROXY_LOG.STATUS.ERROR
      proxyLog['response'] = {error: err.message}
      const isRequestTimeoutError = _.has(err, 'originalError') && _.get(err, 'originalError') && 'timeout' in _.get(err, 'originalError') && _.get(err, 'originalError.code') === 'ECONNABORTED'
      if (isRequestTimeoutError) {
        Logger.warn(_.get(err, 'body') ? _.get(err, 'body') : _.get(err, 'message'))
        res = {msg: _.get(err, 'message'), body: _.get(err, 'body'), code: 999}
      } else {
        Logger.error(_.get(err, 'body') ? _.get(err, 'body') : _.get(err, 'message'))
        res = {msg: _.get(err, 'message'), body: _.get(err, 'body'), code: 999}
      }
    }
    // 保存 proxy log 数据
    proxyLog['responseTime'] = DateUtil.getCurrentTime()
    proxyLog['useTime'] = DateUtil.diff(proxyLog.requestTime, proxyLog['responseTime'], 'ms')
    if (!skipLog) {
      await ProxyLog.create(proxyLog)
    }
    return res
  }

  protected async post ({url, body, header, query, isForm, skipLog}: { url: string, body?: object, header?: object, query?: object, isForm?: boolean, skipLog?: boolean }) {
    const resp = await this.httpRequest({url, method: 'post', body, header, query, isForm, skipLog})
    return resp
  }

  protected async get ({url, query, header, skipLog}: { url: string, query?: object, header?: object, skipLog?: boolean }) {
    const resp = await this.httpRequest({url, method: 'get', query, header, skipLog})
    return resp
  }

  private setHeader (header, operation) {
    if (header && !_.isEmpty(header)) {
      for (let key in header) {
        operation.set(key, header[key])
      }
    }
    return operation
  }
}
