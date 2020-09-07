<template>
  <div class="integral">
    <hl-header :header="header"></hl-header>
    <div class="itemA">
      <div>
        <span class="integralNum">{{userInfo.accountBalance/100}}</span>
        <span class="Company">元</span>
      </div>
    </div>
    <div class="itemB">
      <div class="block"></div>
      <div class="titleB">余额记录</div>
    </div>
    <div class="itemC">
      <div class="itemsList" v-for="(item, index) in itemsList" :key="index">
        <div class="blockA">
          <div class="nameC">{{item.remark}}</div>
          <div class="timeC">{{item.createTime}}</div>
        </div>
        <div class="blockB">
          <div class="integralC">{{item.type == 1 ? '-' : '+'}}{{item.amount/100}}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      header: {
        title: "我的余额",
        isLeftArrow: true,
      },
      itemsList: [],
      userInfo: this.$storage.getItem("userInfo"),
      selectForm: {
        page: 1,
        pageSize: 10,
        userCode: this.$storage.getItem("userInfo").userCode,
        // userCode: "13226150",
        accountType: 1,
      },
    };
  },
  components: {
    "hl-header": () => import("@/components/header"),
  },
  created() {
    this.getAccountLog();
  },
  methods: {
    getAccountLog() {
      let params = this.selectForm;
      let that = this;
      this.$https.get(that.$api.common.getAccountLog, params).then((res) => {
        let array = res.data.data.records;
        this.itemsList.push(...array);
      });
    },
  },
};
</script>
<style scoped lang="less">
.integral {
  width: 100%;
  background-color: #ffffff;
  .itemA {
    width: 350px;
    height: 120px;
    border-radius: 10px;
    background: #cf332e;
    margin: auto;
    margin-top: 12.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    .integralNum {
      font-size: 36px;
      font-weight: bold;
    }
    .Company {
      font-size: 12px;
    }
  }
  .itemB {
    display: flex;
    align-items: center;
    height: 30px;
    margin-top: 30px;
    margin-left: 12.5px;
    .block {
      width: 6px;
      height: 21.5px;
      background: #cf332e;
      border-radius: 3px;
    }
    .titleB {
      color: #000000;
      font-size: 16px;
      font-weight: bold;
      margin-left: 7px;
    }
  }
  .itemC {
    width: 100%;
    padding: 12.5px;
    box-sizing: border-box;
    .itemsList {
      margin-top: 15px;
      display: flex;
      align-items: center;
      .blockA {
        flex: 1;
        .nameC {
          color: #747474;
          font-size: 15px;
        }
        .timeC {
          margin-top: 10px;
          color: #949494;
          font-size: 12px;
        }
        > div {
          width: 100%;
        }
      }
      .blockB {
        color: #2c2c2c;
        font-size: 18px;
      }
    }
  }
}
</style>
