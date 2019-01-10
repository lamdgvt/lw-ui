<template>
  <div id="app">
    <el-row>
      <el-col>
        <lw-radio :size="16" :checked="1" disabled></lw-radio>
      </el-col>
    </el-row>
    <el-row>
      <!-- <Button type="primary" @click="modal1 = !modal1">Display dialog box</Button>
      <lw-modal :value="modal1" @on-visible-change="changeEvent" :shade="false">
        <span slot="title">普通的Modal对话框标题</span>
        <div slot="content">
          <el-row>
            <el-col></el-col>
          </el-row>
        </div>
      </lw-modal>-->
    </el-row>
  </div>
</template>

<script>
import { Row, Col } from "element-ui";
// import LwModal from "./enhance/LwModal";
// import LwButton from "./enhance/LwButton";
// import LwSwitch from "./enhance/LwSwitch";
// import LwCalendar from "./enhance/LwCalendar";
// import LwIcon from "./enhance/LwIcon";
import LwRadio from "./enhance/LwRadio";

export default {
  name: "app",
  components: {
    ElRow: Row,
    ElCol: Col,
    // LwIcon,
    // Button,
    // LwModal,
    LwRadio
  },
  data() {
    return {
      modal1: false
    };
  },
  methods: {
    clickEvent: function() {
      // let popup = LwPopup({ text: "这是一条消息", type: "error" });
    },
    changeEvent: function(val) {
      this.modal1 = val;
    },
    ok() {},
    cancel() {}
  }
};
</script>
<style lang="less" scoped>
@import "./skins/color.less";
#app {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @FontColor;
}
</style>
