<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-cell-group>
      <van-cell class="head" title="头像" is-link center>
        <template #default>
          <img class="logo" src="../../../static/image/test.jpg" alt />
        </template>
      </van-cell>
      <van-cell class="name" title="昵称" :value="userDetail.name" is-link center />
      <van-cell class="name" title="手机号" :value="userDetail.phone" is-link center />
      <van-cell title="性别" :value="userDetail.sexVal" is-link center />
      <van-cell title="生日" :value="userDetail.status" is-link center />
      <van-cell
        title="地区"
        :value="userDetail.userDetail.province + userDetail.userDetail.city"
        is-link
        center
      />
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";
import header from "@/components/header";
export default {
  data() {
    return {
      header: {
        title: "个人信息",
        isLeftArrow: true,
      },
      userDetail: this.$storage.getItem("userInfo"),
    };
  },
  components: {
    "hl-header": header,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
  },
  created() {
    switch (this.userDetail.sex) {
      case 0:
        this.userDetail.sexVal = "未知";
        break;
      case 1:
        this.userDetail.sexVal = "男";
        break;
      case 2:
        this.userDetail.sexVal = "女";
        break;
    }
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.logo {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border: 1px solid #cfcecf;
}
.head {
  height: 65px;
}
.name .van-cell__right-icon {
  visibility: hidden;
}
</style>