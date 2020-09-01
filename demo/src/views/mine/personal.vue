<template>
  <div>
    <hl-header :header="header"></hl-header>
    <van-cell-group>
      <van-cell class="head" title="头像" is-link center @click="show = true">
        <template #default>
          <img class="logo" v-if="userDetail.headImgUrl" :src="imageUrl + userDetail.headImgUrl" alt />
        </template>
      </van-cell>
      <van-cell class="name" title="昵称" :value="userDetail.name" is-link center @click="showName = true" />
      <van-cell class="name" title="手机号" :value="userDetail.phone" is-link center @click="showPhone = true" />
      <van-cell title="性别" :value="userDetail.sexVal" is-link center  @click="showSex = true" />
      <!-- <van-cell title="生日" :value="userDetail.status" is-link center @click="showDate = true" /> -->
    </van-cell-group>

    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" close-on-click-action @select="onSelect" @cancel="onCancel"/>

    <van-uploader ref="upload" :after-read="afterRead" style="display: none;"/>

    <van-dialog v-model="showName" title="昵称修改" show-cancel-button @confirm="onName">
      <van-field v-model="formData.name" label="昵称" placeholder="请输入昵称" />
    </van-dialog>

    <van-dialog v-model="showPhone" title="修改手机号" show-cancel-button @confirm="onPhone">
      <van-field v-model="formData.phone" label="手机号" placeholder="请输入手机号" />
    </van-dialog>
    
    <van-popup v-model="showSex" position="bottom">
      <van-picker show-toolbar :columns="sex" @confirm="onSex" @cancel="showSex = false" />
    </van-popup>

    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" title="选择出生日期" :min-date="minDate" :max-date="maxDate"  @confirm="onDate" @cancel="showDate = false" />
    </van-popup>
  </div>
</template>

<script>
import { Cell, CellGroup, Popup, Picker, Uploader, ActionSheet, DatetimePicker, Dialog, Field } from "vant";
import header from "@/components/header";
export default {
  data() {
    return {
      imageUrl: this.$https.imageUrl,
      header: {
        title: "个人信息",
        isLeftArrow: true,
      },
      userDetail: {},
      sex: [{ text: "未知", value: 0 }, { text: "男", value: 1 } ,{ text: "女", value: 2 }],
      show: false,
      showName: false,
      showPhone: false,
      showSex: false,
      showDate: false,
      actions: [{ name: '选择图片' }],
      fileList: [],
      formData: { id: this.$storage.getItem('userInfo').id, userCode: this.$storage.getItem('userInfo').userCode },
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    };
  },
  components: {
    "hl-header": header,
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "van-popup": Popup,
    "van-uploader": Uploader,
    "van-action-sheet": ActionSheet,
    "van-picker": Picker,
    "van-datetime-picker": DatetimePicker,
    [Dialog.Component.name]: Dialog.Component,
    "van-field": Field
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.formData = { id: this.$storage.getItem('userInfo').id, userCode: this.$storage.getItem('userInfo').userCode };
      let params = { userCode: this.$storage.getItem('userInfo').userCode }
      this.$https.get(this.$api.common.getUserInfo, params).then((res) => {
        this.userDetail = res.data.data;
        this.sexChange();
      });
    },
    sexChange() {
      this.userDetail.sexVal = this.sex[this.userDetail.sex].text;
    },
    onSelect(action) {
      this.$refs.upload.chooseFile();
    },
    onCancel() {
      this.show = false;
    },
    afterRead(file) {
      let formData = new FormData();
      formData.append('file', file.file);
      this.$https.post(this.$api.common.uploadFile, formData, true).then((res) => {
        this.formData.headImgUrl = res.data.data.originalImageUrl;
        this.headUpload();
      });
    },
    headUpload() {
      this.$https.post(this.$api.common.userEdit, this.formData).then((res) => {
        this.getUserInfo();
      });
    },
    onSex(val) {
      this.userDetail.sexVal = val.name;
      this.formData.sex = val.value;
      this.headUpload();
      this.showSex = false;
    },
    onDate(val) {
      let date = new Date(val);
      let month = date.getMonth() + 1;
      month = month > 10 ? month : "0" + month;
      let birthday = date.getFullYear() + "-" + month + "-" + date.getDate();
      this.showDate = false;
    },
    onName() {
      this.headUpload();
    },
    onPhone() {
      this.headUpload();
    },
  },
};
</script>

<style lang="less" scoped>
.logo {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  // border: 1px solid #cfcecf;
}
.head {
  height: 65px;
}
.name .van-cell__right-icon {
  visibility: hidden;
}
</style>