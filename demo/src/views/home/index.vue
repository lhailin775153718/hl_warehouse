<template>
  <div :style="{'overflow': isSearch ? 'hidden' : 'visible'}">
    <van-search
      v-model="selectInfo"
      placeholder="请输入搜索关键词"
      shape="round"
      readonly
      @click="showSearch"
    />
    <hl-searchHistory
      :selectData="selectData"
      @onSearch="onSearch"
      @cancelSearch="cancelSearch"
      v-if="isSearch"
    />
    <img-swipe :images="imageList" :swipeData="swipeData" />
    <hl-grid :grid="grid" :columnNum="columnNum" @toPage="toPage" />
    <hl-deadline />
    <div class="recommendTitle">
      <img src="../../assets/image/carLogo.png" />
      <span>推荐商品</span>
    </div>
    <hl-recommend />
  </div>
</template>

<script>
import { Search } from "vant";
import searchHistory from "@/components/searchHistory";
import imgSwipe from "@/components/imgSwipe";
import grid from "@/components/grid";
import deadline from "@/components/deadline";
import recommend from "@/components/recommend";
import axios from "axios";

export default {
  data() {
    return {
      selectInfo: "",
      selectData: "",
      isSearch: false,
      imageList: [],
      swipeData: {
        height: "200",
      },
      grid: [
        {
          text: "特惠专区",
          icon: require('../../assets/image/tehui.png'),
          path: "/recommendationZone",
          type: 1,
        },
        {
          text: "爆款专区",
          icon: require('../../assets/image/baokuan.png'),
          path: "/baokuan",
        },
        {
          text: "低价专区",
          icon: require('../../assets/image/dijia.png'),
          path: "/recommendationZone",
          type: 2,
        },
        {
          text: "积分专区",
          icon: require('../../assets/image/jifen.png'),
          path: "/integralRegion",
          type: 3,
        },
      ],
      columnNum: 4,
    };
  },
  components: {
    "van-search": Search,
    "img-swipe": imgSwipe,
    "hl-grid": grid,
    "hl-deadline": deadline,
    "hl-recommend": recommend,
    "hl-searchHistory": searchHistory,
  },
  created() {
    this.checkToken();
  },
  methods: {
    checkToken() {
      let userInfo = this.$storage.getItem("userInfo");
      if(userInfo) {
        this.$https.get(this.$api.common.checkToken).then((res) => {
          if(res.data.code == 1) {
            this.getSwiperImage();
          } else {
            let wxCode = this.GetUrlParam('code');
            this.getVXUserInfo(wxCode);
          }
        });
      } else {
        this.getUserInfo();
        // let wxCode = this.GetUrlParam('code');
        // this.getVXUserInfo(wxCode);
      }
    },
    getUserInfo() {
      let params = { userCode: "13226150"}
      let that = this;
      this.$https.get(that.$api.common.getUserInfo, params).then((res) => {
        that.$storage.setItem("userInfo", res.data.data);
        that.getSwiperImage();
      });
    },
    getSwiperImage() {
      let that = this;
      this.$https.get(that.$api.common.getSwiperImage).then((res) => {
        this.imageList = res.data.data;
      });
    },
    onSearch(val) {
      this.selectInfo = val;
      this.isSearch = false;
    },
    showSearch() {
      this.selectData = this.selectInfo;
      this.isSearch = true;
    },
    cancelSearch() {
      this.isSearch = false;
    },
    toPage(val) {
      this.$router.push({
        path: val.path,
        query: {
          text: val.text,
          type: val.type,
        },
      });
    },
    //获取微信用户信息
    getVXUserInfo(code) {
      let that = this;
      let params = {
        code: code,
        // userCode: this.$storage.getItem("userInfo").userCode,
        sdk: "JS_SDK"
      }
      axios({
        url: "http://shopkeeper.gdkeyong.com/api" + that.$api.common.getVXUserInfo,
        method: "get",
        params: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      }).then((res) => {
        that.$storage.setItem("userInfo", res.data.data);
        that.getSwiperImage();
      });
    },
    GetUrlParam(paraName){
      try
      {
        let url = window.location.href
        if (url.indexOf(paraName + '=') > -1) {
          let array = url.split(paraName + '=')[1]
          let data =array.split('&')[0]
          return data
        } else {
          return ''
        }
      }
      catch(err)
      {
        console.log(err)
        return  ''
      }
    }
  },
};
</script>

<style scoped lang="less">
/deep/ .van-grid .van-grid-item__content {
  background-color: rgba(255, 255, 255, 0);
}
.recommendTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75.5px;
  width: 100%;
  img {
    height: 18px;
    width: 18px;
  }
  span {
    color: #2c2c2c;
    font-size: 17px;
    font-weight: bold;
    margin-left: 10px;
  }
}
</style>
