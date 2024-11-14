import axios, { AxiosError } from 'axios'
import { TGWebApp } from './TgWebApp'

export const api = axios.create({
  baseURL: process.env.VITE_API_URL!,
})

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token')

      try {
        const initData = TGWebApp?.initData
        const user = !__IS_DEV__ ? initData : process.env.VITE_INIT_DATA
        const { data } = await axios.post(process.env.VITE_API_URL + 'user/auth', { initData: user })

        if (data.token) {
          localStorage.setItem('token', data.token)
          originalRequest.headers.Authorization = 'Bearer ' + data.token
          return api(originalRequest) // Retry the original request with the new token
        } else {
          throw new Error('Failed to refresh token')
        }
      } catch (refreshError) {
        throw refreshError
      }
    }

    throw error
  }
)
