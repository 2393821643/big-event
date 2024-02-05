import request from '@/utils/request.js'

// 用户注册
export const userRegisterService = (user) => {
  return request.post('/api/reg', user)
}

// 用户登录
export const userLoginService = (user) => {
  return request.post('/api/login', user)
}

// 获取用户基本信息
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}
