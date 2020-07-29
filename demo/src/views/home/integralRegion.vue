<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-search v-model="searchText" placeholder="请输入搜索关键词" />
    <div style="margin-top:1px;">
      <hl-screening />
    </div>

    <div class="list">
      <div
        class="item"
        :class="{'item-active':index == 0}"
        v-for="(item,index) in list"
        :key="index"
      >
        <img class="itemImage" src="../../../static/image/test.jpg" alt />
        <div class="itemRight">
          <p class="itemTitle">{{item.title}}</p>
          <span class="itemNum">{{item.num}}</span>
          <span class="itemIntegral">
            {{item.integral}}积分+
            <span class="itemPirce">{{item.price}}</span>
          </span>
          <img class="itemIcon" src="../../../static/image/carLogo.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "@/components/header";
import screening from "@/components/screening";
import { Search } from "vant";
export default {
  data() {
    return {
      header: {
        title: "积分专区",
        isLeftArrow: true
      },
      searchText: "",
      list: [
        {
          title:
            "Burberry红粉恋歌/粉红风格女士香水...Burberry红粉恋歌/粉红风格女士香水...0",
          num: "638",
          price: "200",
          integral: "20000"
        },
        {
          title:
            "Burberry红粉恋歌/粉红风格女士香水...Burberry红粉恋歌/粉红风格女士香水...0",
          num: "638",
          price: "200",
          integral: "20000"
        }
      ]
    };
  },
  components: {
    "hl-header": header,
    "van-search": Search,
    "hl-screening": screening
  }
};
</script>

<style lang="less" scoped>
.list {
  background-color: #ffffff;
  padding: 12px;
  box-sizing: border-box;
  .item-active {
    margin-top: 0 !important;
  }
  .item {
    margin-top: 10px;
    display: flex;
    .itemImage {
      height: 90px;
      width: 90px;
    }
    .itemRight {
      position: relative;
      width: 260px;
      height: 90px;
      .itemTitle {
        color: #2c2c2c;
        font-size: 14px;
        font-weight: bold;
        width: 247.5px;
        position: absolute;
        left: 11.5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .itemNum {
        color: #959595;
        font-size: 12px;
        position: absolute;
        left: 10.5px;
        top: 45px;
        &::after {
          content: "人购买";
        }
      }
      .itemIntegral {
        color: #da251c;
        font-size: 15px;
        font-weight: bold;
        position: absolute;
        left: 10.5px;
        bottom: 3px;
        .itemPirce {
          font-size: 12px;
          &::before {
            content: "￥";
            font-weight: 400;
          }
        }
      }
      .itemIcon {
        height: 24.5px;
        width: 24.5px;
        position: absolute;
        right: 8px;
        bottom: 4.5px;
      }
    }
  }
}
</style>