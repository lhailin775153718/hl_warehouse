<template>
  <div>
    <div class="carList">
      <div class="carList-item" :class="{'carList-active':index > 0}" v-for="(item,index) in list" :key="index">
        <div class="carListTitle">
          <img src="../../static/image/carLogo1.png" alt />
          <span>{{item.name}}</span>
        </div>
        <div class="carListContainer" v-for="(items,indexs) in item.carList" :key="indexs">
          <img class="checkBox" :src="items.checked ? '../../static/image/check.png' : '../../static/image/check-bg.png'" alt="">
          <img class="carListContainer-image" :src="items.imageUrl" alt="">
          <p class="carListContainer-title">{{items.title}}</p>
          <div class="carListContainer-tag">
            <span>{{items.tags}}</span>
            <img src="../../static/image/carLogo2.png" alt="">
          </div>
          <span class="carListContainer-price"><span class="Currency">￥</span>{{items.price}}</span>
          <div class="carListContainer-num">
            <div class="numLeft">-</div>
            <div class="numText">{{items.num}}</div>
            <div class="numRight">+</div>
          </div>
        </div>
      </div>
    </div>

    <div class="total">
      <img class="total-checkBox" :src="total.checked ? '../../static/image/check.png' : '../../static/image/check-bg.png'" alt="">
      <span class="total-checkBoxText">全选</span>
      <span class="total-price"><span class="total-Currency">￥</span>66.00</span>
      <div class="total-btn">去结算</div>
    </div>

    <div class="totalDiv"></div>
  </div>
</template>

<script>

export default {
  props: [],
  data() {
    return {
      list: [
        {
          name: "华山自营",
          carList: [
            {
              num: 2,
              price: "50.00",
              title: "天禹盘锦大米10斤东北新米种植大米真空大米真空",
              imageUrl: "../../static/image/test.jpg",
              tags: "标签",
              checked: true
            },
            {
              num: 3,
              price: "50.00",
              title: "特产大米",
              imageUrl: "../../static/image/test.jpg",
              tags: "标签",
              checked: false
            }
          ]
        }
      ],
      total: {
        checked: false
      }
    };
  },
  components: {}
};
</script>

<style scoped lang="less">
.carList{
  background-color: #ffffff;
  width: 100%;
  .carList-active{
    border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  }
  .carList-item{
    .carListTitle{
      display: flex;
      height: 40px;
      padding-left: 12.5px;
      box-sizing: border-box;
      align-items: center;
      img{
        height: 13.5px;
        width: 14px;
      }
      span{
        color: #9B9B9B;
        font-size: 12px;
        margin-left: 4.5px;
      }
    }
    .carListContainer{
      position: relative;
      height: 120px;
      padding-top: 10px;
      box-sizing: border-box;
      .checkBox{
        height: 18px;
        width: 18px;
        position: absolute;
        top: 35px;
        left: 12.5px;
      }
      .carListContainer-image{
        height: 90px;
        width: 90px;
        position: absolute;
        left: 46px;
      }
      .carListContainer-title{
        width: 212px;
        color: #2C2C2C;
        font-size: 14px;
        overflow: hidden;  
        display: -webkit-box;  
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        position: absolute;
        right: 14px;
      }
      .carListContainer-tag{
        background-color: #F5F5F5;
        position: absolute;
        height: 24px;
        top: 50px;
        left: 148.5px;
        padding: 0 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          color: #747474;
          font-size: 12px;
        }
        img{
          height: 4px;
          width: 7.5px;
          margin-left: 5px;
        }
      }
      .carListContainer-price{
        color: #DA251B;
        font-size: 14px;
        position: absolute;
        left: 150.5px;
        top: 87px;
        .Currency{
          font-size: 10px;
        }
      }
      .carListContainer-num{
        font-size: 15px;
        position: absolute;
        width: 105px;
        left: 260px;
        top: 80px;
        .numLeft{
          height: 26.5px;
          width: 26.5px;
          line-height: 26.5px;
          display: inline-block;
          text-align: center;
          background-color: #F5F5F5;
        }
        .numText{
          height: 26.5px;
          width: 40px;
          line-height: 26.5px;
          display: inline-block;
          text-align: center;
          background-color: #F5F5F5;
        }
        .numRight{
          height: 26.5px;
          width: 26.5px;
          line-height: 26.5px;
          display: inline-block;
          text-align: center;
          background-color: #F5F5F5;
        }
      }
    }
  }
}
.total{
  height: 53.5px;
  width: 100%;
  position: fixed;
  bottom: 50px;
  left: 0;
  background-color: #ffffff;
  .total-checkBox{
    height: 18px;
    width: 18px;
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .total-checkBoxText{
    color: #747474;
    font-size: 14px;
    line-height: 53.5px;
    position: absolute;
    left: 34.5px;
  }
  .total-priceText{
    color: #747474;
    font-size: 14px;
    line-height: 53.5px;
    position: absolute;
    left: 174.5px;
  }
  .total-price{
    color: #DA251B;
    font-size: 16px;
    position: absolute;
    right: 109px;
    line-height: 53.5px;
    &::before{
      content: '合计:';
      color: #747474;
      font-size: 14px;
      margin-right: 5px;
    }
    .total-Currency{
      font-size: 10px;
    }
  }
  .total-btn{
    height: 35.5px;
    line-height: 35.5px;
    width: 90.5px;
    background-image: url('../../static/image/block3.png');
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 9.5px;
    margin: auto;
    color: #FFFFFF;
    font-size: 14px;
    text-align: center;
  }
}
.totalDiv{
  height: 53.5px;
  width: 100%;
}
</style>
