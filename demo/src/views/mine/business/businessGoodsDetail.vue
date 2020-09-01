<template>
  <div>
    <div class="detailTitle">
      <img-swipe :images="imageList" :swipeData="swipeData" />
      <div class="cancelBtn" @click="cancel">
        <img src="../../../assets/image/return-w.png" alt />
      </div>
    </div>
    <van-cell-group>
      <van-field v-model="goodsDetail.goodsName" label="商品名称" type="textarea" rows="1" autosize placeholder="请输入商品名称" />
      <van-cell title="商品分类" :value="goodsDetail.categoryFirstCode" center is-link @click="showType = true" />
      <van-cell title="商品规格" :value="goodsDetail.goodsName" center is-link />
      <van-field v-model="goodsDetail.originalPrice" label="原价" placeholder="请输入原价(元)" />
      <van-field v-model="goodsDetail.price" label="售价" placeholder="请输入售价(元)" />
      <van-cell title="是否保持不变" :value="goodsDetail.goodsName" center is-link />
    </van-cell-group>

    <van-popup v-model="showType" position="right" style="height: 100%;width: 100%;">
      <div class="depart-header" @click="cancelType">
        <van-icon class="depart-icon" size="16" name="arrow-left"/>
        <span>确定</span>
      </div>
      <goodsCategory  />
    </van-popup>
  </div>
</template>

<script>
import imgSwipe from "@/components/imgSwipe";
import goodsCategory from "./components/goodsCategory"
import { Field, Cell, CellGroup, Popup, Picker, Icon } from 'vant';
export default {
  data() {
    return {
      dataInfo: {},
      goodsDetail: {},
      imageList: [],
      swipeData: {
        height: "375",
      },
      showType: false,
    };
  },
  components: {
    "img-swipe": imgSwipe,
    "van-field": Field,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "van-popup": Popup,
    "van-picker": Picker,
    "van-icon": Icon,
    goodsCategory,
  },
  created() {
    this.getQuery();
  },
  methods: {
    getQuery() {
      this.dataInfo = JSON.parse(this.$route.query.obj);
      this.getDetail();
    },
    getDetail() {
      let params = {
        goodsCode: this.dataInfo.goodsCode,
      };
      let that = this;
      this.$https.get(that.$api.common.getGoodsDetail, params).then((res) => {
        console.log(res)
        let array = res.data.data.goodsMediaList;
        for (let i = 0; i < array.length; i++) {
          let obj = {};
          obj.imgUrl = array[i].fileUrl;
          this.imageList.push(obj);
        }
        res.data.data.goodsSpecVOS.forEach((res) => {
          res.specProperties.forEach((resB) => {
            resB.select = false;
          });
        });
        this.goodsDetail = res.data.data;
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    cancelType() {
      this.showType = false;
    }
  },
};
</script>

<style scoped lang="less">
.detailTitle {
  position: relative;
  .cancelBtn {
    position: fixed;
    left: 12.5px;
    top: 12.5px;
    height: 26px;
    width: 26px;
    border-radius: 13px;
    background-color: #797b7d;
    img {
      height: 14px;
      width: 8.5px;
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
}
.depart-header {
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 40px;
  span {
    font-size: 16px;
  }
}
</style>
