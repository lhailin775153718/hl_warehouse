import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const loginCompnent = resolve => require(['@/views/single/login'], resolve)
const registerCompnent = resolve => require(['@/views/single/register'], resolve)
    // const layoutCompnent = resolve => require(['@/views/single/layout'], resolve)
const homeComponent = resolve => require(['@/views/home/index'], resolve)
const sortComponent = resolve => require(['@/views/sort/index'], resolve)
const carComponent = resolve => require(['@/views/car/index'], resolve)
const mineComponent = resolve => require(['@/views/mine/index'], resolve)

//home
const recommendationZoneComponent = resolve => require(['@/views/home/recommendationZone'], resolve) //推荐专区
const integralRegionComponent = resolve => require(['@/views/home/integralRegion'], resolve) //积分专区
const baokuanComponent = resolve => require(['@/views/home/baokuan'], resolve) //爆款专区
const timeLimitedComponent = resolve => require(['@/views/home/timeLimited'], resolve) //限时秒杀
const commodityDetailComponent = resolve => require(['@/views/home/commodityDetail'], resolve) //活动商品详情页
const goodsDetailComponent = resolve => require(['@/views/home/goodsDetail'], resolve) //商品详情页

//sort
const goodsCategoryListComponent = resolve => require(['@/views/sort/goodsCategoryList'], resolve) //商品详情页

//car
const confirmOrderComponent = resolve => require(['@/views/car/confirmOrder'], resolve) //确认订单

//mine
const personalComponent = resolve => require(['@/views/mine/personal'], resolve) //个人信息
const helpCentreComponent = resolve => require(['@/views/mine/helpCentre'], resolve) //帮助中心
const addressEditComponent = resolve => require(['@/views/mine/addressEdit'], resolve) //地址编辑
const viewLogisticsComponent = resolve => require(['@/views/mine/viewLogistics'], resolve) //查看物流
const addressListComponent = resolve => require(['@/views/mine/addressList'], resolve) //收货地址
const orderDetailComponent = resolve => require(['@/views/mine/orderDetail'], resolve) //订单详情
const cardAddComponent = resolve => require(['@/views/mine/cardAdd'], resolve) //添加银行卡
const collectComponent = resolve => require(['@/views/mine/collect'], resolve) //我的收藏
const logisticsInformationComponent = resolve => require(['@/views/mine/logisticsInformation'], resolve) //填写物流信息
const passwordEditComponent = resolve => require(['@/views/mine/passwordEdit'], resolve) //密码修改
const commissionComponent = resolve => require(['@/views/mine/commission'], resolve) //佣金玩法
const commissionListComponent = resolve => require(['@/views/mine/commissionList'], resolve) //佣金玩法
const myCouponComponent = resolve => require(['@/views/mine/myCoupon'], resolve) //我的优惠券
const bankCardComponent = resolve => require(['@/views/mine/bankCard'], resolve) //我的银行卡
const shopCouponComponent = resolve => require(['@/views/mine/shopCoupon'], resolve) //小店领取优惠券
const paymentComponent = resolve => require(['@/views/mine/payment'], resolve) //付款方式

//business
const businessComponent = resolve => require(['@/views/mine/business/business'], resolve) //商家端主页
const businessOrderListComponent = resolve => require(['@/views/mine/business/businessOrderList'], resolve) //商家订单
const businessGoodsListComponent = resolve => require(['@/views/mine/business/businessGoodsList'], resolve) //商家商品
const businessCouponComponent = resolve => require(['@/views/mine/business/businessCoupon'], resolve) //商家优惠券
const businessGoodsDetailComponent = resolve => require(['@/views/mine/business/businessGoodsDetail'], resolve) //商家优惠券

import mine from '@/views/mine/Mmine/router'

const router = new Router({
    routes: [
        ...mine,
        { path: '/', redirect: '/home' },
        { path: '/login', component: loginCompnent },
        { path: '/register', component: registerCompnent },
        { path: '/home', component: homeComponent },
        { path: '/sort', component: sortComponent },
        { path: '/car', component: carComponent },
        { path: '/mine', component: mineComponent },

        { path: '/recommendationZone', component: recommendationZoneComponent },
        { path: '/integralRegion', component: integralRegionComponent },
        { path: '/baokuan', component: baokuanComponent },
        { path: '/timeLimited', component: timeLimitedComponent },
        { path: '/commodityDetail', component: commodityDetailComponent },
        { path: '/goodsDetail', component: goodsDetailComponent },
        // {path: '/login',component: loginCompnent}

        { path: '/goodsCategoryList', component: goodsCategoryListComponent },


        { path: '/confirmOrder', component: confirmOrderComponent },


        { path: '/personal', component: personalComponent },
        { path: '/helpCentre', component: helpCentreComponent },
        { path: '/addressEdit', component: addressEditComponent },
        { path: '/viewLogistics', component: viewLogisticsComponent },
        { path: '/addressList', component: addressListComponent },
        { path: '/orderDetail', component: orderDetailComponent },
        { path: '/cardAdd', component: cardAddComponent },
        { path: '/collect', component: collectComponent },
        { path: '/logisticsInformation', component: logisticsInformationComponent },
        { path: '/passwordEdit', component: passwordEditComponent },
        { path: '/commission', component: commissionComponent },
        { path: '/commissionList', component: commissionListComponent },
        { path: '/myCoupon', component: myCouponComponent },
        { path: '/bankCard', component: bankCardComponent },
        { path: '/shopCoupon', component: shopCouponComponent },
        { path: '/payment', component: paymentComponent },

        {
            path: '/business',
            component: businessComponent,
            redirect: '/businessOrderList',
            children: [
                { path: '/businessOrderList', component: businessOrderListComponent },
                { path: '/businessGoodsList', component: businessGoodsListComponent },
                { path: '/businessCoupon', component: businessCouponComponent },
                // { path: '/businessGoodsDetail', component: businessGoodsDetailComponent },
            ]
        },
        { path: '/businessGoodsDetail', component: businessGoodsDetailComponent },

        // { path: '/businessOrderList', component: businessOrderListComponent },
    ]
})

export default router;