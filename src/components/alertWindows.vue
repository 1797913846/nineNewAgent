<template>
    <div class="bigalert">
        <div class="alertbox">
            <div class="topalert">
                <img src="../assets/nine/wen.png" alt="" v-if="sure==true">
                <img src="../assets/nine/nosure.png" alt="" v-if="nosure==true">
                <span>{{deleteTitle}}</span>
            </div>
            <div class="bottomalert">
                <span class="savebt" @click="sureDelete">确认</span>
                <span class="nobt" @click="noDelete">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      text: "是否删除",
      sure: true,
      nosure: false,
      deleteNow: false
    };
  },
  props: ["deleteTitle"],
  methods: {
    sureDelete() {
      this.deleteNow = true;
      this.$emit("childByValue", this.deleteNow);
    },
    noDelete() {
      this.deleteNow = false;
      this.$emit("childByValue", this.deleteNow);
    }
  }
};
</script>

<style lang="scss" scoped>
.bigalert {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 100000;
}
.alertbox {
  width: 626px;
  height: 271px;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  right: 0px;
  top: 50%;
  bottom: 0px;
  transform: translate(-50%, -50%);
}
.topalert {
}
.topalert img {
  width: 62px;
  height: 54px;
  margin-left: 150px;
  margin-top: 100px;
  float: left;
}
.topalert span {
  float: left;
  color: #333333;
  font-size: 19px;
  margin-top: 110px;
  margin-left: 20px;
}
.bottomalert {
}
.bottomalert span {
  width: 80px;
  height: 30px;
  border-radius: 15px;
  line-height: 30px;
  font-size: 14px;
  padding: 0px;
  margin-top: 50px;
  margin-bottom: 26px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.bottomalert .savebt {
  background: #2562ee;
  margin-left: 335px;
  color: #fff;
  margin-right: 20px;
}

.bottomalert .nobt {
  background-color: rgba(37, 98, 238, 0.1);
  border: 1px solid rgba(233, 239, 243, 0.21);
  color: #2562ee;
}
</style>