import * as UserController from './controller/UserController'

export function router (router) {
  router.post('/user/sendLoginCode', UserController.sendLoginCode)
}
