import { useEffect } from 'react'
import { request } from '@/utils'
const Layout = () => {
  useEffect(() => {
    request.get('/user/profile')
  }, [])
  return <div>我是layout</div>
}
export default Layout
