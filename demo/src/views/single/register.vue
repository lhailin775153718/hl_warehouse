<template>
  <div class="background">
    <hl-header :header="header"></hl-header>
    <div class="column" style="margin-top:10px;">
      <input type="phone" class="phoneNumber" placeholder="请输入手机号码" v-model="phoneNumber" />
      <div class="codeBtn" @click="getCode" v-show="show">获取验证码</div>
      <div class="codeBtn" v-show="!show">{{count}} s</div>
    </div>
    <div class="column">
      <input type="text" class="code" placeholder="请输入验证码" v-model="code" />
    </div>
    <div class="column">
      <input type="password" class="password" placeholder="请输入密码" v-model="password" />
    </div>
    <div class="logister" @click="logister">注册</div>
  </div>
</template>


<script>
import header from "@/components/header";
import axios from "axios";
export default {
  data() {
    return {
      header: {
        title: "注册",
        isLeftArrow: true,
      },
      phoneNumber: "",
      code: "",
      password: "",
      show: true,
      count: "",
      timer: null,
    };
  },
  components: {
    "hl-header": header,
  },
  methods: {
    logister() {
      if (this.phoneNumber == "") {
        this.$toast("请输入手机号");
        return;
      }

      let params = {
        loginName: this.phoneNumber,
        checkCode: this.code,
      };
      let that = this;
      this.$https.post(that.$api.common.logister, params).then((res) => {
        this.$toast.success("注册成功");
        setTimeout(() => {
          that.$router.replace({
            path: '/login'
          })
        }, 1000);
      });
    },
    getCode() {
      if (this.phoneNumber == "") {
        this.$toast("请输入手机号");
        return;
      }

      if (this.code == "") {
        this.$toast("请输入验证码");
        return;
      }

      if (this.password == "") {
        this.$toast("请输入密码");
        return;
      }

      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }

      let params = {
        phone: this.phoneNumber,
      };
      let that = this;
      axios({
        url: "http://shopkeeper.gdkeyong.com/api" + that.$api.common.getCode,
        method: "get",
        params: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      }).then((res) => {});
    }
  }
};
</script>

<style lang="less" scoped>
.background {
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  .column {
    width: 315px;
    margin: auto;
    height: 40px;
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    align-items: center;
    .phoneNumber {
      height: 30px;
      border: none;
      font-size: 15px;
      color: #a8a8a8;
    }
    .codeBtn {
      width: 83px;
      display: inline-block;
      box-sizing: border-box;
      color: #959595;
      font-size: 12px;
      padding: 8.5px 10.5px;
      border: 1px solid #f5f5f5;
      border-radius: 5px;
      text-align: center;
    }
    .code,
    .password {
      width: 100%;
      height: 30px;
      border: none;
      font-size: 15px;
      color: #a8a8a8;
    }
  }
  .logister {
    height: 52px;
    width: 315px;
    margin: auto;
    margin-top: 60px;
    line-height: 52px;
    text-align: center;
    color: #ffffff;
    font-size: 17px;
    background-color: #db241d;
    border-radius: 26px;
  }
}

input::-webkit-input-placeholder {
  color: #a8a8a8;
}
</style>