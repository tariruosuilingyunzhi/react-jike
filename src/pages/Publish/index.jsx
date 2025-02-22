import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { AddArticleApi, GetArticleDetailApi, UpdateArticleApi } from '@/apis/article'
import { useGetChannel } from '@/hooks/useGetChannel'
const { Option } = Select

const Publish = () => {
  const { channelList } = useGetChannel()

  // 收集表单数据 提交数据
  const onFinish = async formValues => {
    const { title, content, channel_id } = formValues
    if (imageList.length !== imageType) return message.error('请上传正确数量的图片')
    const data = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }
        }),
      },
      channel_id,
    }
    if (articleId) {
      await UpdateArticleApi(articleId, data)
      message.success('更新成功')
    } else {
      await AddArticleApi(data)
      message.success('发布成功')
    }
  }

  // 上传图片
  const [imageList, setImageList] = useState([])
  const onChange = value => {
    setImageList(value.fileList)
    console.log(imageList)
  }

  // 切换封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = e => {
    setImageType(e.target.value)
  }
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')

  // 获取表单实例 调用form的设置表单数据方法
  const [form] = Form.useForm()
  // 表单数据回显
  useEffect(() => {
    async function getArticleDetails() {
      const res = await GetArticleDetailApi(articleId)

      const data = res.data
      const { cover } = data
      console.log(data)
      console.log(cover.type)
      setImageType(cover.type)
      form.setFieldsValue({
        ...data,
        type: cover.type,
      })
      setImageList(
        cover.images.map(url => {
          return { url }
        })
      )
    }
    if (articleId) {
      getArticleDetails()
    }
  }, [articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[{ title: <Link to={'/'}>首页</Link> }, { title: articleId ? '编辑文章' : '发布文章' }]} />
        }
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
        >
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: '请选择文章频道' }]}>
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group
                value={imageType}
                onChange={onTypeChange}
                options={[
                  { value: 1, label: '单图' },
                  { value: 3, label: '三图' },
                  { value: 0, label: '无图' },
                ]}
              />
              {/* <Radio.Group value={imageType} onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group> */}
            </Form.Item>
            {imageType !== 0 && (
              <Upload
                fileList={imageList}
                maxCount={imageType}
                onChange={onChange}
                name="image"
                action={'http://geek.itheima.net/v1_0/upload'}
                listType="picture-card"
                showUploadList
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入文章内容' }]}>
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
