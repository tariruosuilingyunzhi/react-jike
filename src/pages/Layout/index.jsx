import { Layout, Menu, Popconfirm } from 'antd'
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import './index.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, clearUserInfo } from '@/store/modules/user'
const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  // 在页面刚刷新时，获取当前的路由，并设置当前的路由的选中状态
  const route = useLocation()
  const router_key = route.pathname
  const navigate = useNavigate()
  const routerChange = e => {
    const path = e.key

    navigate(path)
  }

  // 获取用户信息
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  // 退出登录
  const onConfirm = () => {
    dispatch(clearUserInfo())
    navigate('/login')
  }

  const { name } = useSelector(state => state.user.userInfo)
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            onClick={e => routerChange(e)}
            mode="inline"
            theme="dark"
            selectedKeys={router_key}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout
