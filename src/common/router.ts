import * as CommonController from './controller/CommonController'

export function router (router) {
  router.get('/health', CommonController.health)
}
