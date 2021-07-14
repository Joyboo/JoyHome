import Layout from '@/layout'

const DevelopRoutes = [
  {
    path: '/develop',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/build',
        component: () => import('@/views/develop/build'),
        name: 'Build',
        meta: { title: '客户端Build', icon: 'el-icon-lollipop' }
      },
      {
        path: '/document',
        component: () => import('@/views/develop/document'),
        name: 'Build',
        meta: { title: '开发文档', icon: 'el-icon-document' }
      }
    ]
  }
]

export default DevelopRoutes
