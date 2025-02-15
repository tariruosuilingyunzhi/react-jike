import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
// import Home from '@/pages/Home'
// import Publish from '@/pages/Publish'
// import Article from '@/pages/Article'
import AuthRouter from '@/components/AuthRouter'
import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article'))

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
        element: (
          <Suspense fallback={'加载中'}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'publish',
        element: (
          <Suspense fallback={'加载中'}>
            <Publish />
          </Suspense>
        ),
      },
      {
        path: 'article',
        element: (
          <Suspense fallback={'加载中'}>
            <Article />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])
export default router
