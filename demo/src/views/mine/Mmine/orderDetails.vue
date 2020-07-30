<template>
  <div>
    <hl-header :header="header"></hl-header>
    <div class="itemA flex_c_sb">
      <div class="blockA">
        <div>等待买家付款</div>
        <div>剩下23小时59分自动关闭</div>
      </div>
      <div class="blockB img">img</div>
    </div>
    <div class="itemB flex_c_sb">
      <div class="blockA img">img</div>
      <div class="blockB">
        <div>{{orderData.name}} {{orderData.phone}}</div>
        <div>地址:{{orderData.address}}</div>
      </div>
    </div>

    <div class="commodity flex_c_sb">
      <div class="img">img</div>
      <div class="content">
        <div class="name">{{orderData.commodityName}}</div>
        <div>{{orderData.specs}}</div>
        <div class="price flex_c_sb">
          <div>￥{{orderData.price}}</div>
          <div>x {{orderData.nub}}</div>
        </div>
      </div>
    </div>

    <div class="itemC">{{orderData.beizhu}}</div>

    <div class="itemD">
      <div class="flex_c_sb" v-for="(item, index) in orderData.itemBlist" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
      <div style="text-align: right">
        实付 {{orderData.Allprice}}
      </div>
    </div>


    <div class="itemE">
      <div class="fuzhi">复制</div>
      <div v-for="(item, index) in  orderData.itemAlist" :key="index">
        {{item.name}} {{item.value}}
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    data() {
      return {
        header:{
          title: '订单详情',
          isLeftArrow: true,
        },
        orderData: {}
      };
    },
    components: {
      "hl-header": ()=> import("@/components/header"),
    },
    created() {
      let data = {
        src: '',
        commodityName: '爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十',
        specs: '5kg',
        price: '66.00',
        nub: 2,
        Allprice: 123,
        itemAlist: [
          {name:'订单编号：', value: 123456123456},
          {name:'下单时间：', value: 123456123456},
          {name:'发货时间：', value: 123456123456},
          {name:'自动签收：', value: 123456123456}
        ],
        itemBlist: [
          {name:'商品总金额：', value: 123},
          {name:'运费：', value: 123},
          {name:'积分：', value: 123},
          {name:'优惠券：', value: 123}
        ],
        name:'林小姐',
        phone: '13247845465465',
        address: '地址啊是吧是吧是吧是吧是吧是吧是吧是吧是吧',
        beizhu: '地址啊是吧是吧是吧是吧是吧是吧是吧是吧是吧'
      }
      this.orderData = data
    },
    methods:{}
  };
</script>
<style scoped lang="less">
  .flex_c_sb{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .img{ height: 50px;width: 50px; background: #DA251B}
  .commodity{
    .img{ height: 50px;width: 50px; background: #DA251B}
    .content{
      flex: 1;
      >div{
        width: 100%;
      }
      .name{
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box !important;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .itemE{
    width: 100%;
    position: relative;
    .fuzhi{
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .itemB .blockB,.itemA .blockA {
    flex: 1;
  }


</style>
