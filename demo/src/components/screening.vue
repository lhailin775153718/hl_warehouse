<template>
  <main style="position:relative">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
    <div class="screen" @click="showPopup">
      <span class="screenText">筛选</span>
      <img class="screenIcon" src="../../static/image/carLogo1.png" alt />
    </div>
    <van-popup v-model="show" position="right">
      <p class="popupTitle">筛选</p>
      <div class="popupContainer" v-for="(item,index) in popup" :key="index">
        <span class="itemType">{{item.type}}</span>
        <div class="itemOpt">
          <div v-for="(items,indexs) in item.opt" :key="indexs">{{items}}</div>
        </div>
      </div>
      <div class="reset">重置</div>
      <div class="sure">确定</div>
    </van-popup>
  </main>
</template>

<script>
import { DropdownMenu, DropdownItem, Popup } from "vant";
export default {
  props: [],
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: "a",
      option1: [
        { text: "销量", value: 0 },
        { text: "最低销量", value: 1 },
        { text: "最高销量", value: 2 }
      ],
      option2: [
        { text: "价格", value: "a" },
        { text: "最低价格", value: "b" },
        { text: "最高价格", value: "c" }
      ],
      option3: [{ text: "筛选", value: "a" }],
      show: false,
      popup: [
        {
          type: "价格区间",
          opt: ["最低价格", "最高价格"]
        },
        {
          type: "价格区间",
          opt: ["最低价格", "最高价格", "最高价格"]
        },
        {
          type: "价格区间",
          opt: ["最低价格", "最高价格", "最高价格", "最高价格"]
        }
      ]
    };
  },
  components: {
    "van-dropdown-menu": DropdownMenu,
    "van-dropdown-item": DropdownItem,
    "van-popup": Popup
  },
  created() {},
  methods: {
    onConfirm() {
      this.$refs.item.toggle();
    },
    showPopup() {
      this.show = true;
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .van-dropdown-menu {
  width: 66.66%;
}
/deep/.van-dropdown-menu__item--disabled .van-dropdown-menu__title {
  color: #323233;
}
.screen {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 33.33%;
  height: 48px;
  background-color: #ffffff;
  z-index: 100;
  border-bottom: 1px solid #f5f5f5;
  .screenText {
    color: #747474;
    font-size: 14px;
  }
  .screenIcon {
    height: 14px;
    width: 14px;
    margin-left: 5px;
  }
}
/deep/ .van-popup--right {
  height: 100%;
  width: 255px;
}
.popupTitle {
  color: #2c2c2c;
  font-size: 16px;
  padding-left: 10.5px;
  margin-top: 14.5px;
}
.popupContainer {
  margin-top: 15px;
  .itemType {
    color: #2c2c2c;
    font-size: 14px;
    margin-left: 11px;
  }
  .itemOpt {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    div {
      margin-left: 11px;
      margin-top: 10px;
      width: 70.5px;
      height: 23.5;
      line-height: 23.5px;
      text-align: center;
      background-color: #f5f5f5;
      color: #747474;
      font-size: 12px;
    }
  }
}
.reset {
  position: absolute;
  right: 50%;
  bottom: 37.5px;
  background-color: yellow;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  color: #ffffff;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  width: 80px;
  text-align: center;
}
.sure {
  position: absolute;
  left: 50%;
  bottom: 37.5px;
  background-color: red;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  color: #ffffff;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  width: 80px;
  text-align: center;
}
</style>