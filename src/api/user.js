import request from '@/utils/request.js'

export const userRegisterService = (user) => {
  return request.post('/api/reg', user)
}

export const userLoginService = (user) => {
  return request.post('/api/login', user)
}
