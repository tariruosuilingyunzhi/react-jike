import { request } from '@/utils'

const GetChannelApi = () => {
  return request({
    url: '/channels',
    method: 'GET',
  })
}

export { GetChannelApi }
