import axios from 'axios'
import { useUserStore } from '@/stores/index.js'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    //  2. 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers = {
        Authorization: userStore.token
      }
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  // 成功正常返回
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    // 失败提示错误信息
    ElMessage.error(res.data.message)
    return Promise.reject(res.data)
  },
  (err) => {
    // 处理401错误
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // 处理其他情况
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
