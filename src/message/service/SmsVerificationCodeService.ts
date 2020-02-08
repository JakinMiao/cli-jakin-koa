import * as _ from 'lodash'
import { VerificationCode } from '../model'
import { lib } from '../modules'

const { Constant } = lib

export class SmsVerificationCodeService {
  /**
   * 发送验证码
   * @param mobileNumber 
   * @param ip 
   * @param app 
   * @param verificationCodeType 
   */
  async sendLoginCode (mobileNumber: string, ip: string, app: string) {
    const verificationCodeType = Constant.VERIFICATION_CODE.TYPE.LOGIN
    const verificationCode = _.random(100000, 999999).toString()
    const code = {
      mobileNumber,
      code: verificationCode,
      type: verificationCodeType,
      app,
      ip
    }
    await VerificationCode.create(code)
    // 发送逻辑
    return {}
  }
}
