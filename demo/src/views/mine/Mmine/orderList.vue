<template>
  <div style="height: 100%">
    <hl-header :header="header"></hl-header>
    <van-tabs v-model="active">
      <van-tab class="test123456" v-for="(item, index) in tabList" :key="index" :title="item.name">
        <div class="itemA" :style="{height: height + 'px'}">
          <div class="itemsList" v-for="(item, index) in itemsList" :key="index">
            <div class="blockA flex_c_sb">
              <div>订单号：{{item.orderId}}</div>
              <div>{{item.state}}</div>
            </div>
            <div class="commodity flex_c_sb">
              <div class="img">img</div>
              <div class="content">
                <div class="name">{{item.commodityName}}</div>
                <div>{{item.specs}}</div>
                <div class="price flex_c_sb">
                  <div>￥{{item.price}}</div>
                  <div>x {{item.nub}}</div>
                </div>
              </div>
            </div>
            <div class="blockC flex_c_sb">
              <div>实付 {{item.Allprice}}</div>
              <div>产看物流</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        header:{
          title: '我的积分',
          isLeftArrow: true,
        },
        active: 0,
        tabList: [
          {name: '全部'},
          {name: '待付款'},
          {name: '待发货'},
          {name: '待收货'},
          {name: '已完成'}
        ],
        itemsList: [],
        height: document.body.clientHeight - 100
      };
    },
    components: {
      "hl-header": ()=> import("@/components/header"),
    },
    created() {
      let data = [
        {orderId: '777777', state: '已完成', src: '', commodityName: '爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十', specs:'5kg',price:'66.00', nub: 2, Allprice:123, },
        {orderId: '777777', state: '已完成', src: '', commodityName: '爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十', specs:'5kg',price:'66.00', nub: 2, Allprice:123, },
        {orderId: '777777', state: '已完成', src: '', commodityName: '爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十', specs:'5kg',price:'66.00', nub: 2, Allprice:123, },
        {orderId: '777777', state: '已完成', src: '', commodityName: '爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十', specs:'5kg',price:'66.00', nub: 2, Allprice:123, },
        {orderId: '777777', state: '已完成', src: '', commodityName: '爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十', specs:'5kg',price:'66.00', nub: 2, Allprice:123, },
        {orderId: '777777', state: '已完成', src: '', commodityName: '爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十爱上爸爸撒八十', specs:'5kg',price:'66.00', nub: 2, Allprice:123, }
      ]
      this.itemsList = data
    },
    methods:{}
  };
</script>
<style scoped lang="less">
  .itemA,.itemsList{width: 100%;font-size: 15px}
  .itemA{
    height: calc(100% - 100px);
    overflow-y: scroll;
  }
  .blockA{
    height: 30px;
    font-size: 15px;
  }
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
  .blockC{
    margin-bottom: 10px;
  }
  .flex_c_sb{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }


</style>
