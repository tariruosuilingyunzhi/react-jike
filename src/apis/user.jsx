import { request } from '@/utils'

const LoginApi = formData => {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: formData,
  })
}

const UserInfoApi = () => {
  return request({
    url: '/user/profile',
    method: 'GET',
  })
}
export { LoginApi, UserInfoApi }
