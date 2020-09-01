<template>
  <div class="backColor">
    <div class="backImage"></div>
    <div class="phone">
      <input type="phone" placeholder="请输入手机号" v-model="phoneNumber" />
      <div class="codeBtn" @click="getCode" v-show="show">获取验证码</div>
      <div class="codeBtn" v-show="!show">{{count}} s</div>
    </div>
    <div class="code">
      <input type="text" placeholder="请输入验证码" v-model="code" />
    </div>
    <div class="login" @click="login">登录</div>
    <div class="registerContainer">
      <span class="register" @click="register">注册</span>
      <div class="forGet">
        <!-- <span>忘记密码</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import divider from "@/components/divider";
import axios from "axios";
export default {
  data() {
    return {
      phoneNumber: "",
      code: "",
      show: true,
      count: "",
      timer: null,
      wxCode: "",
    };
  },
  components: {
    "hl-divider": divider,
  },
  created() {
    this.wxCode = this.GetUrlParam('code');
    console.log('code', this.wxCode)
  },
  methods: {
    getCode() {
      if (this.phoneNumber == "") {
        this.$toast("请输入手机号");
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
    },
    login() {
      if (this.phoneNumbe == "") {
        this.$toast("请输入手机号");
        return;
      }
      if (this.code == "") {
        this.$toast("请输验证码");
        return;
      }
      let params = {
        loginName: this.phoneNumber,
        checkCode: this.code,
      };
      let that = this;
      axios({
        url: "http://shopkeeper.gdkeyong.com/api" + that.$api.common.login,
        method: "post",
        data: params,
      }).then((res) => {
        if (res.data.success) {
          that.$storage.setItem("userInfo", res.data.data);
          that.$router.replace({
            path: "/home",
            query: {
              code: this.wxCode
            }
          });
        } else {
          that.$toast(res.data.message);
        }
      });
    },
    register() {
      this.$router.push({
        path: "/register",
      });
    },
    GetUrlParam(paraName){
      try
      {
        let url = window.location.href
        if (url.indexOf(paraName + '=') > -1) {
          // console.log('123')
          let array = url.split(paraName + '=')[1]
          let data =array.split('&')[0]
          // console.log(data)
          return data
        } else {
          // console.log('789')
          return ''
        }
      }
      catch(err)
      {
        console.log(err)
        return  ''
      }
    }
    // GetUrlParam(paraName) {
    //   var url = document.location.toString();
    //   // var url = 'http://shopkeeper-mp.gdkeyong.com/mp/dist/index.html?code=0213AyFa1JAdtz09p9Ia1Umz3t43AyFH&state=STATE#/login';
    //   var arrObj = url.split("?");
    //   if (arrObj.length > 1) {
    //     var arrPara = arrObj[1].split("&");
    //     var arr;
    //     for (var i = 0; i < arrPara.length; i++) {
    //       arr = arrPara[i].split("=");
    //       if (arr != null && arr[0] == paraName) {
    //         return arr[1];
    //       }
    //     }
    //     return "";
    //   }
    //   else {
    //     return "";
    //   }
    // }
  },
};
</script>

<style scoped lang="less">
.backColor {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  padding-top: 46.5px;
  box-sizing: border-box;
  .backImage {
    background: url("../../assets/image/loginLogo.png");
    background-size: 100% 100%;
    height: 163.5px;
    width: 200px;
    margin: auto;
  }
  .phone {
    height: 40px;
    margin-top: 30px;
    text-align: center;
    input {
      border: none;
      line-height: 40px;
      width: 200px;
      color: #a8a8a8;
      font-size: 15px;
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
    }
  }
  .code {
    margin-top: 20px;
    text-align: center;
    input {
      border: none;
      line-height: 40px;
      width: 290px;
      color: #a8a8a8;
      font-size: 15px;
    }
  }
  .login {
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
  .registerContainer {
    position: relative;
    margin-top: 20px;
    padding: 0 30px;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    .register {
      color: #747474;
      font-size: 14px;
      vertical-align: middle;
    }
    .forGet {
      position: absolute;
      right: 30px;
      top: 0;
      vertical-align: middle;
      span {
        font-size: 14px;
        color: #747474;
      }
    }
  }
}
input::-webkit-input-placeholder {
  color: #a8a8a8;
}
</style>
