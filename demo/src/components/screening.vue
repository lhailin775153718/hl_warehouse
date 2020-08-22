<template>
  <main style="position:relative">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" @change="dropdownChange" />
      <!-- <van-dropdown-item v-model="value2" :options="option2" /> -->
    </van-dropdown-menu>
    <div class="screen" style="right:33.33%;">
      <span class="screenText">价格</span>
    </div>
    <div class="screen" @click="showPopup">
      <span class="screenText">筛选</span>
      <img class="screenIcon" src="../assets/image/carLogo1.png" alt />
    </div>
    <van-popup v-model="show" position="right">
      <p class="popupTitle">筛选</p>
      <div class="popupContainer" v-for="(item,index) in popup" :key="index">
        <span class="itemType">{{item.type}}</span>
        <div class="itemOpt">
          <div
            :class="{'active':items.checked}"
            v-for="(items,indexs) in item.opt"
            :key="indexs"
            @click="screening(item,items)"
          >{{items.categoryName}}</div>
        </div>
      </div>
      <div class="reset" @click="reset">重置</div>
      <div class="sure" @click="sure">确定</div>
    </van-popup>
  </main>
</template>

<script>
import { DropdownMenu, DropdownItem, Popup } from "vant";
export default {
  props: ["selectForm"],
  data() {
    return {
      value1: "",
      value2: "a",
      option1: [
        { text: "销量", value: "" },
        { text: "最低销量", value: "aes" },
        { text: "最高销量", value: "desc" },
      ],
      option2: [
        { text: "价格", value: "a" },
        { text: "最低价格", value: "b" },
        { text: "最高价格", value: "c" },
      ],
      show: false,
      popup: [
        {
          type: "价格",
          opt: [
            {
              categoryName: "从低到高",
              checked: false,
              orderBy: "aes",
            },
            {
              categoryName: "从高到低",
              checked: false,
              orderBy: "desc",
            },
          ],
        },
        {
          type: "分类",
          opt: [],
        },
      ],
      screenData: {},
    };
  },
  components: {
    "van-dropdown-menu": DropdownMenu,
    "van-dropdown-item": DropdownItem,
    "van-popup": Popup,
  },
  created() {
    this.screenData = this.selectForm;
    this.getGoodsCategory();
  },
  methods: {
    getGoodsCategory() {
      let that = this;
      this.$https.get(that.$api.common.goodsCategory).then((res) => {
        res.data.data.forEach((res) => {
          res.checked = false;
        });
        this.$set(this.popup[1], "opt", res.data.data);
        console.log(this.popup);
      });
    },
    screening(item, items) {
      item.opt.forEach((res) => {
        res.checked = false;
      });
      items.checked = true;
    },
    showPopup() {
      this.show = true;
    },
    sure() {
      this.show = false;
      this.popup.forEach((res, index) => {
        res.opt.forEach((res1) => {
          if (res1.checked && index == 0) {
            this.screenData.sort = "active_price";
            this.screenData.orderBy = res1.orderBy;
          } else if (res1.checked && index == 1) {
            this.screenData.categoryFirstCode = res1.id;
          }
        });
      });
      this.$emit("sure", this.screenData);
    },
    reset() {
      this.show = false;
      this.popup.forEach((res1) => {
        res1.opt.forEach((res) => {
          res.checked = false;
        });
      });
      this.value1 = "";
      this.screenData = this.selectForm;
      this.$emit("reset", this.screenData);
    },
    dropdownChange(val) {
      if (val) {
        this.screenData.orderBy = val;
      }
      this.$emit("dropdownChange", this.screenData);
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .van-dropdown-menu {
  width: 33.33%;
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
  background-color: #ff6800;
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
  background-color: #db2016;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  color: #ffffff;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  width: 80px;
  text-align: center;
}
.active {
  background-color: #fff7f7 !important;
  color: #e04038 !important;
}
</style>