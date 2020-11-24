<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :width="width" append-to-body @open="open" @close="close" :fullscreen="fullscreen">
            <div class="my-dialog-title" slot="title">
                <span>{{whotitle}}</span>
                <button type="button" class="maxnow maxnow1" @click="fullscreen=false">
                    <svg t="1606197240733" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1468" width="16" height="16">
                        <path d="M729.9 756.7H292.2c-14.9 0-27-12.1-27-27V292c0-14.9 12.1-27 27-27h437.7c14.9 0 27 12.1 27 27v437.7c0 14.9-12.1 27-27 27z m-434.7-30h431.7V295H295.2v431.7z" p-id="1469"></path>
                        <path d="M832.1 658c-8.3 0-15-6.7-15-15V207.8h-433c-8.3 0-15-6.7-15-15s6.7-15 15-15h447.2c6 0 11.5 3.6 13.8 9.2l0.8 2c0.8 1.9 1.2 3.8 1.2 5.8V643c0 8.2-6.7 15-15 15z" p-id="1470"></path>
                    </svg>
                </button>
                <button type="button" class="maxnow" @click="fullscreen=true">
                    <svg t="1606197131726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="827" width="16" height="16">
                        <path d="M752.5376 184.32h-205.056c-14.1824 0-25.6512 11.4688-25.6512 25.6s11.4688 25.6 25.6512 25.6h204.6976L567.296 420.0448a25.5232 25.5232 0 0 0 0 36.1984c5.0176 5.0176 11.5712 7.4752 18.1248 7.4752s13.1072-2.5088 18.1248-7.4752l184.8832-184.5248v204.288c0 14.1312 11.4688 25.6 25.6512 25.6 14.1824 0 25.6512-11.4688 25.6512-25.6V271.3088C839.68 223.3344 800.5632 184.32 752.5376 184.32zM476.5696 788.5312H271.8208l184.8832-184.5248a25.5232 25.5232 0 0 0 0-36.1984c-9.984-9.984-26.2144-9.984-36.2496 0l-184.8832 184.5248v-204.288c0-14.1312-11.4688-25.6-25.6512-25.6-14.1312 0-25.6512 11.4688-25.6512 25.6v204.6464c0 47.9744 39.1168 86.9888 87.1424 86.9888h205.056c14.1312 0 25.6512-11.4688 25.6512-25.6 0.0512-14.1312-11.4176-25.5488-25.5488-25.5488z" p-id="828"></path>
                    </svg>
                </button>
            </div>
            <div class="dialog-body" :style="{height: fullscreen?'calc( 100vh - 51px )':height}">
                <div class="shouldwidth">
                    <y1 :accountId="accountId"></y1>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import y1 from "@/pages/ninehome/yy/y1";
export default {
  components: {
    y1
  },
  name: "MyDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "60%"
    },
    height: {
      type: String,
      default: "70vh"
    },
    whotitle: {
      type: String,
      default: "whotitle"
    },
    accountId: {
      type: String,
      default: "accountId"
    }
  },
  data() {
    return {
      dialogVisible: false,
      fullscreen: false
    };
  },
  methods: {
    open() {},
    close() {
      this.$emit("childByValue", false);
      this.$emit("close");
      console.log(666, this.visible);
    }
  },
  watch: {
    visible: {
      handler(newVal, oldVal) {
        this.dialogVisible = newVal;
      },
      deep: true
    },
    accountId: {
      handler(newVal, oldVal) {
        this.accountId = newVal;
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep .el-dialog__header {
  background: #1e407c;

  & .el-dialog__title {
    color: white;
  }
}

::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

::v-deep .el-dialog__body {
  padding: 0;
  overflow: auto;
}

::v-deep iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: none;
  overflow: auto;
}

.my-dialog-title {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
}
</style>
