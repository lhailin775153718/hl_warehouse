<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-form @submit="onSubmit">
      <van-field v-model="formData.bankName" name="银行名称" label="银行名称" placeholder="请输入银行名称" autocomplete="off" readonly @click="bankShow = true"/>
      <van-field v-model="formData.cardNumber" name="银行卡号" label="银行卡号" placeholder="请输入银行卡号" autocomplete="off"/>
      <van-field v-model="formData.cardholder" name="持卡人" label="持卡人" placeholder="请输入持卡人" autocomplete="off"/>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>

    <van-popup v-model="bankShow" position="right" :style="{ width: '100%' }">
      <div class="popupHeader" @click="bankShow = false">
        <van-icon size="16" name="arrow-left"/>
        <span>确定</span>
      </div>
      <van-radio-group v-model="formData.bankName">
        <van-cell-group>
          <van-cell v-for="(item,index) in bankList" :key="index" :title="item.bankName" clickable @click="pickRadio(item)">
            <template #right-icon>
              <van-radio :name="item.bankName" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </div>
</template>

<script>
import header from "@/components/header";
import { Form, Field, Button, Popup, Cell, CellGroup, RadioGroup, Radio, Icon } from "vant";
export default {
  data() {
    return {
      header: {
        title: "添加银行卡",
        isLeftArrow: true
      },
      formData: {},
      bankList: [],
      bankShow: false,
    };
  },
  components: {
    "hl-header": header,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    "van-popup": Popup,
    "van-radio-group": RadioGroup,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-radio": Radio,
    "van-icon": Icon
  },
  created() {
    this.formData = this.$route.query.obj ? JSON.parse(this.$route.query.obj) : {};
    this.getList();
  },
  methods: {
    getList() {
      let params = this.formData;
      params.userCode = this.$storage.getItem("userInfo").userCode;
      this.$https.get(this.$api.common.getBankList, params).then((res) => {
        this.bankList = res.data.data;
      })
    },
    pickRadio(item) {
      this.formData.bankName = item.bankName;
      this.bankShow = false;
    },
    onSubmit() {
      let params = this.formData;
      params.userCode = this.$storage.getItem("userInfo").userCode;
      this.$https.post(this.$api.common.addCard, params).then((res) => {
        this.$router.go(-1);
      })
    }
  }
};
</script>

<style lang="less" scoped>

</style>