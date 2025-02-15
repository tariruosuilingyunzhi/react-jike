import { request } from '@/utils'

const GetChannelApi = () => {
  return request({
    url: '/channels',
    method: 'GET',
  })
}

// 添加文章
const AddArticleApi = data => {
  return request({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data,
  })
}

// 更新文章
const UpdateArticleApi = (id, data) => {
  return request({
    url: `/mp/articles/${id}`,
    method: 'PUT',
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

const DeleteArticleApi = id => {
  return request.delete(`/mp/articles/${id}`)
}

const GetArticleDetailApi = id => {
  return request({
    url: `/mp/articles/${id}`,
    method: 'GET',
  })
}
export { GetChannelApi, AddArticleApi, UpdateArticleApi, GetArticleListApi, DeleteArticleApi, GetArticleDetailApi }
