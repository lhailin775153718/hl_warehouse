<template>
  <main style="position:relative">
    <div class="option">
      <div v-for="(item, index) in option"  >
        <div class="screen" v-if="item.type !== 'screen'" @click="itemCLick(item)">
          <span :class="{select: item.select}"  class="screenText">{{item.text}}</span>
        </div>
        <div v-else class="screen" @click="showPopup">
          <span class="screenText">筛选</span>
          <img class="screenIcon" src="../assets/image/carLogo1.png" alt />
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="right">
      <p class="popupTitle">筛选</p>
      <div class="popupContainer" v-for="(item,index) in popup" :key="index">
        <span class="itemType">{{item.text}}</span>
        <div class="Itemfield" v-if="item.type === 'field'">
          <div v-for="(items, indexs) in item.opt" :key="indexs">
            <van-field   v-model="items.value" :placeholder="items.placeholder" />
          </div>

        </div>
        <div v-else class="itemOpt">
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
import { DropdownMenu, DropdownItem, Popup, Field } from "vant";
export default {
  props: ["selectForm"],
  data() {
    return {
      option: [
        { text: "销量", select: false , value: {orderBy: 'desc', sort: 'sales'}},
        { text: "价格", select: false , value: {orderBy: 'desc', sort: 'active_price'}},
        { text: "筛选", select: false , type: "screen" },
      ],
      show: false,
      popup: [
        {
          text: "价格",
          type: 'field',
          key: 'field',
          opt: [
            {value:'', type:"number", placeholder: '输入价格'},
            {value:'', type:"number", placeholder: '输入价格'},
          ],
        },
        {
          text: "分类",
          key: 'categoryFirstCode',
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
    "van-field": Field,
  },
  created() {
    this.screenData = this.selectForm || {};
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
      let data = {}
      this.popup.forEach((res) => {
        data[res.key] = null
        res.opt.forEach((res1) => {
          if(res.type === 'field') {
            if(!data[res.key]) {
              data[res.key] = []
            }
            data[res.key].push(res1.value)
          } else {
            if(res1.checked) {
              data[res.key] = res1.id
            }
          }
        })
      });
      console.log(this.popup)
      // console.log('data', data)
      this.$emit("sure", data);
    },
    reset() {
      // this.show = false;
      this.popup.forEach((res1) => {
          res1.opt.forEach((res) => {
            if(res1.type === 'field') {
              res.value = ''
            } else {
              res.checked = false;
            }
          });
      });
      this.$emit("reset", this.screenData);
    },
    itemCLick(item) {
      this.option.forEach(res => {
        res.select= false
      })
      item.select = true
      this.$emit("dropdownChange", item.value)
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
.option{
  display: flex;
  justify-content: center;
  align-items: center;
  >div{
    flex: 1;
  }
}
.Itemfield{
  display: flex;
}
.select{
  color: #da251c !important;
}
.screen {
  display: flex;
  justify-content: center;
  align-items: center;
  /*position: absolute;*/
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
