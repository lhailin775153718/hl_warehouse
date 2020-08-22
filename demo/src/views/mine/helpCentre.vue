<template>
  <div>
    <hl-header :header="header"></hl-header>
    <div class="help">
      <div class="helpItem" v-for="(item,index) in helpList" :key="index">
        <div class="helpTitle">
          <img src="../../assets/image/helpLogo.png" alt />
          <p>{{item.key}}</p>
        </div>
        <div class="helpContent">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
export default {
  data() {
    return {
      header: {
        title: "帮助中心",
        isLeftArrow: true
      },
      searchText: "",
      helpList: [
        {
          key:
            "怎么下单购买商品?怎么下单购买商品?怎么下单购买商品?怎么下单购买商品?",
          value:
            "点商品上的加入购物车按钮，进入确认订单。点商品上的加入购物车按钮，进入确认订单。点商品上的加入购物车按钮，进入确认订单。点商品上的加入购物车按钮，进入确认订单。"
        }
      ]
    };
  },
  components: {
    "hl-header": header
  }
};
</script>

<style lang="less" scoped>
.help {
  background-color: #ffffff;
  padding-bottom: 12.5px;
  box-sizing: border-box;
  .helpItem {
    .helpTitle {
      padding: 12.5px;
      box-sizing: border-box;
      img {
        height: 18px;
        width: 18px;
        vertical-align: top;
      }
      p {
        display: inline-block;
        width: 300px;
        color: #2c2c2c;
        font-size: 15px;
        word-wrap: break-word;
        vertical-align: top;
      }
    }
    .helpContent {
      margin: 0 12.5px auto;
      padding: 12.5px;
      word-wrap: break-word;
      background-color: #f5f5f5;
      color: #747474;
      font-size: 14px;
      border-radius: 5px;
    }
  }
}
</style>