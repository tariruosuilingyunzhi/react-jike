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
// 获取文章列表
const GetArticleListApi = params => {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params,
  })
}

export { GetChannelApi, AddArticleApi, GetArticleListApi }
