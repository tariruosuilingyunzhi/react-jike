import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Publish from '@/pages/Publish'
import Article from '@/pages/Article'
import AuthRouter from '@/components/AuthRouter'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRouter>
        <Layout />
      </AuthRouter>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'publish',
        element: <Publish />,
      },
      {
        path: 'article',
        element: <Article />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])
export default router
