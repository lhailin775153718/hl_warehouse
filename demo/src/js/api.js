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

    addCollect: '/goods/collect/addCollect', //添加收藏
    cancelCollect: '/goods/collect/cancelCollect', //取消收藏
    getCollectList: '/goods/collect/getPage', //获取收藏列表

    getPrice: '/goods/getPrice', //获取规格价格
    addGoods: '/order/shoppingCar/addGoods', //加入购物车
    buyGoods: '/order/shoppingCar/buyGoods', //立刻购买
    delCarGoods: '/order/shoppingCar/delCarGoods', //移除购物车商品
    getShopCar: '/order/shoppingCar/getInfo', //获取购物车详情
    carAddNum: '/order/shoppingCar/addNum', //购物车商品数量增加
    settlement: '/order/shoppingCar/settlement', //购物车结算

    createOrder: '/order/order/createOrder', //创建订单
    getOrderList: '/order/order/getPage', //分页获取订单列表
    getOrderDetail: '/order/order/getInfo', //获取订单详情

    getCoupon: '/activity/receive/getPage', //分页获取用户券列表

    addOrUpdate: '/user/userAddress/addOrUpdate', //新增&编辑地址
    getUserAddress: '/user/userAddress/getPage', //分页获取地址

    getAllArea: '/system/Area/getAllArea', //获取所有区域

    getShop: '/shop/getShopInfo', //获取小店详情
    getShopCoupon: '/activity/getPage', //小店获取优惠券

    getAccountLog: '/user/accountLog/getPage', //获取用户交易流水

    addCard: '/user/bankCard/addCard', //新增银行卡
    getCardList: '/user/bankCard/getList', //获取银行卡列表

    getUserInfo: '/user/getUserInfo', //获取用户详情
    userEdit: '/user/edit', //用户编辑
    uploadFile: '/system/file/uploadFile', //文件上传
}

export default {
    common
}