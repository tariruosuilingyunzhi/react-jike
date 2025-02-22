import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm, message } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useGetChannel } from '@/hooks/useGetChannel'
import { GetArticleListApi, DeleteArticleApi } from '@/apis/article'
import { useEffect, useState } from 'react'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()
  const stuts = {
    1: <Tag color="blue">待审核</Tag>,
    2: <Tag color="green">审核通过</Tag>,
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => stuts[data],

      // == 1 ? <Tag color="blue">待审核</Tag> : <Tag color="green">审核通过</Tag>,
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button onClick={() => editor(data)} type="primary" shape="circle" icon={<EditOutlined />} />
            <Popconfirm
              title="温馨提示"
              description="确定要删除该文章吗?"
              onConfirm={() => confirm(data)}
              // onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const [params, setParams] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 8,
  })

  const { channelList } = useGetChannel()
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    const getArticleList = async () => {
      const res = await GetArticleListApi(params)
      setCount(res.data.total_count)
      setArticleList(res.data.results)
      // console.log(res)
    }
    getArticleList()
  }, [params])

  // 获取表单数据
  const onFinish = values => {
    // console.log(values)

    const { status, channel_id, date } = values
    const beginDate = date[0].format('YYYY-MM-DD')
    const endDate = date[1].format('YYYY-MM-DD')
    setParams({
      ...params,
      status: status,
      channel_id: channel_id,
      begin_pubdate: beginDate,
      end_pubdate: endDate,
    })
  }
  const onChange = page => {
    // console.log(page)
    setParams({ ...params, page: page.current, per_page: page.pageSize })
  }

  // 确认删除
  const confirm = async value => {
    // console.log(value)
    await DeleteArticleApi(value.id)
    message.success('删除成功')
    setParams({ ...params })
  }

  const editor = data => {
    navigate(`/publish?id=${data.id}`)
  }
  return (
    <div>
      <Card
        title={<Breadcrumb items={[{ title: <Link to={'/'}>首页</Link> }, { title: '文章列表' }]} />}
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onFinish} initialValues={{ status: '' }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channelList.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          onChange={onChange}
          pagination={{ total: count, pageSize: params.per_page, pageSizeOptions: [4, 8, 10] }}
          rowKey="id"
          columns={columns}
          dataSource={articleList}
        />
      </Card>
    </div>
  )
}

export default Article
