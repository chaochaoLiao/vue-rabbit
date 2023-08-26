import axios from "axios"
import { useUserStore } from "@/stores/user"
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import router from '@/router'

const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})


// axios请求拦截器
http.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
    return config
  }, e => Promise.reject(e))
  
  // axios响应式拦截器
  http.interceptors.response.use(res => res.data, e => {
    if (e.response.status !== 200) {
      
      ElMessage({
        message: e.response.data.message,
        type: 'error'
      })
    }
    if (e.response.status === 401) {
      const userStore = useUserStore()
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(e)
  })

export default http