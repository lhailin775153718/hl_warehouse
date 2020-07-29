const common = {
    getCode: '/system/sms/sendSms', //获取验证码
    register: '/user/register', //注册
    login: '/user/login', //登录
    getSwiperImage: '/system/Carousel/getList', //轮播图

    activityGoodsList: '/activityGoods/getPage', //分页查询活动商品数据
    getactivityGoodsDetail: '/activityGoods/getInfo', //获取活动商品详情

    GoodsList: '/goods/getPage', //分页查询商品数据
    getGoodsDetail: '/goods/getInfo', //获取商品详情

    goodsCategory: '/goods/goodsCategory/getList', //商品分类列表
    goodsCategoryList: '/goods/goodsCategory/getInfo', //获取分类详情
}

export default {
    common
}