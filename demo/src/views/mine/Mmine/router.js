export default [{
        path: '/integral',
        name: 'integral',
        component: () =>
            import ('./integral')
    },
    {
        path: '/accountBalance',
        name: 'accountBalance',
        component: () =>
            import ('./accountBalance')
    },
    {
        path: '/gold',
        name: 'gold',
        component: () =>
            import ('./gold')
    },
    {
        path: '/orderDetails',
        name: 'orderDetails',
        component: () =>
            import ('./orderDetails')
    },
    {
        path: '/orderDetails1',
        name: 'orderDetails1',
        component: () =>
            import ('./orderDetails1')
    },
    {
        path: '/orderDetails3',
        name: 'orderDetails3',
        component: () =>
            import ('./orderDetails3')
    },
    {
        path: '/orderList',
        name: 'orderList',
        component: () =>
            import ('./orderList')
    },
]