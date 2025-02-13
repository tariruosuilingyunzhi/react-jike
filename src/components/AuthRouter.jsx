import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'
const AuthRouter = ({ children }) => {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    // replace: 强制替换当前路由，而不是添加到历史记录中
    return <Navigate to="/login" replace />
  }
}
export default AuthRouter
