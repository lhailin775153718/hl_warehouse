export default [
  {
    path: '/integral',
    name: 'integral',
    component: () => import('./integral')
  },
  {
    path: '/orderDetails',
    name: 'orderDetails',
    component: () => import('./orderDetails')
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import('./orderList')
  },
]
