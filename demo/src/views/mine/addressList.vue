<template>
  <div>
    <van-nav-bar
      :title="header.title"
      :left-text="header.leftText"
      :left-arrow="header.isLeftArrow"
      @click-left="onClickLeft"
    />
    <div class="addressItem" v-for="item in list" :key="item.id" @click="pickAddress(item)">
      <div class="itemLeft">
        <div class="itemLeftTop">
          <div class="name">{{item.receiver}}</div>
          <div class="phone">{{item.phone}}</div>
          <div class="tags" v-if="item.isDefault">默认</div>
        </div>
        <div
          class="itemLeftBottom"
        >{{item.provinceName + item.cityName + item.districtName + item.detail}}</div>
      </div>
      <div class="itemRight" @click="toPage(item)"></div>
    </div>

    <div class="btn" @click="toPage">新增地址</div>
  </div>
</template>


<script>
import { NavBar } from "vant";
import header from "@/components/header";
export default {
  data() {
    return {
      header: {
        title: "收货地址",
        isLeftArrow: true,
      },
      chosenAddressId: "1",
      list: [],
      selectForm: {
        userCode: this.$storage.getItem("userInfo").userCode,
        page: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    "van-nav-bar": NavBar,
  },
  created() {
    this.getAddressList();
  },
  methods: {
    getAddressList() {
      let that = this;
      this.$https
        .get(that.$api.common.getUserAddress, that.selectForm)
        .then((res) => {
          console.log(res);
          let array = res.data.data.records;
          this.list.push(...array);
        });
    },
    toPage(val) {
      this.$router.push({
        path: "/addressEdit",
        query: {
          address: JSON.stringify(val),
        },
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    pickAddress(item) {
      let isOrder = this.$route.query.isOrder;
      if (isOrder) {
        this.$storage.setItem("address", JSON.stringify(item));
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.addressItem {
  width: 355px;
  margin: auto;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 12px 0;
  box-sizing: border-box;
  border-radius: 5px;
  .itemLeft {
    width: 280px;
    color: #2c2c2c;
    .itemLeftTop {
      display: flex;
      align-items: center;
      font-size: 14px;
      .phone {
        margin-left: 20px;
      }
      .tags {
        color: #ffffff;
        background-color: #cf332e;
        font-size: 10px;
        text-align: center;
        height: 18.5px;
        line-height: 18.5px;
        width: 30px;
        border-radius: 3px;
        margin-left: 15px;
      }
    }
    .itemLeftBottom {
      font-size: 15px;
      margin-top: 5px;
    }
  }
  .itemRight {
    background-image: url("../../assets/image/addressEdit.png");
    background-size: 100% 100%;
    height: 20.5px;
    width: 20.5px;
    margin-left: 15px;
  }
}

.btn {
  height: 40px;
  line-height: 40px;
  width: 350px;
  margin: auto;
  margin-top: 30px;
  border-radius: 20px;
  background-color: #d8674d;
  text-align: center;
  color: #ffffff;
  font-size: 17px;
}
</style>