import { userService } from '../service'

export async function sendLoginCode (ctx) {
  ctx.body = await userService.sendLoginCode()
}
