import { messageModule } from '../modules'

const { smsVerificationCodeService } = messageModule

export class UserService {

  static instance: UserService
  static getInstance () {
    if (UserService.instance) return UserService.instance
    UserService.instance = new UserService()
    return UserService.instance
  }

  async sendLoginCode () {
    const mobileNumber = '12367899'
    const ip = '109.090.90.89'
    const app = 'test'
    const result = await smsVerificationCodeService.sendLoginCode(mobileNumber, ip, app)
    return {
      result: 'success'
    }
  }
}
