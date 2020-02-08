import { userService } from '../service'
import { messageModule } from '../modules'

const { VerificationCode } = messageModule

describe('UserService', () => {
  test('发送短信验证码', async () => {
    const result = await userService.sendLoginCode()
    const verficationCodes = await VerificationCode.find({})
    expect(verficationCodes.length).toEqual(1)
  })
})
