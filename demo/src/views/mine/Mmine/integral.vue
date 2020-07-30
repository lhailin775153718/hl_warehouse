<template>
  <div class="integral">
    <hl-header :header="header"></hl-header>
    <div class="itemA">
      <div>
        <span style="font-size: 30px">285</span>
        <span style="font-size: 15px">分</span>
      </div>
    </div>
    <div class="itemB">
      <div class="block"></div>
      <div>积分记录</div>
    </div>
    <div class="itemC">
      <div class="itemsList" v-for="(item, index) in itemsList" :key="index">
        <div class="blockA">
          <div>{{item.name}}</div>
          <div>{{item.date}}</div>
        </div>
        <div class="blockB">
          <div>{{item.integral}}</div>
        </div>
      </div>
    </div>
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
        itemsList: []
      };
    },
    components: {
      "hl-header": ()=> import("@/components/header"),
    },
    created() {
      let  data = [
        {name:'购物', integral: '+50', date: '2020/02/12'},
        {name:'分享', integral: '+40', date: '2020/02/12'},
        {name:'购物', integral: '+40', date: '2020/02/12'},
        {name:'消费', integral: '-40', date: '2020/02/12'}
      ]
      this.itemsList = data
    },
    methods:{}
  };
</script>
<style scoped lang="less">
  .integral{
    width: 100%;
    .itemA {
      width: 94%;
      height: 110px;
      border-radius: 20px;
      background: red;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
    }
    .itemB{
      display: flex;
      align-items: center;
      height: 30px;
      .block{
        width: 10px;
        height: 20px;
        background: red;
      }
    }
    .itemC {
      width: 100%;
      .itemsList{
        display: flex;
        align-items: center;
        .blockA{
          flex: 1;
          >div {
            width: 100%;
          }
        }
        .blockB{
          font-size: 30px;
        }
      }
    }
  }


</style>
