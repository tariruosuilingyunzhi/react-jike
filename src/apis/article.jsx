import { request } from '@/utils'

const GetChannelApi = () => {
  return request({
    url: '/channels',
    method: 'GET',
  })
}

const AddArticleApi = data => {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data,
  })
}
export { GetChannelApi, AddArticleApi }
