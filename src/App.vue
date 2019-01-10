<template>
  <div id="app">
    <el-row>
      <el-col>
        <!-- <Button type="primary" @click="modal1 = true">Display dialog box</Button>
        <Modal
          v-model="modal1"
          title="Common Modal dialog box title"
          @on-ok="ok"
          @on-cancel="cancel"
        >
          <p>Content of dialog</p>
          <p>Content of dialog</p>
          <p>Content of dialog</p>
        </Modal>-->
      </el-col>
    </el-row>
    <el-row>
      <Button type="primary" @click="modal1 = !modal1">Display dialog box</Button>
      <lw-modal :value="modal1" @on-visible-change="changeEvent">
        <span slot="title">普通的Modal对话框标题</span>
        <div slot="content">
          <el-row>
            <el-col></el-col>
          </el-row>
        </div>
      </lw-modal>
    </el-row>
  </div>
</template>

<script>
import { Row, Col, Button } from "element-ui";
import Modal from "./components/modal/modal";
import LwModal from "./enhance/LwModal";
// import LwButton from "./enhance/LwButton";
// import LwSwitch from "./enhance/LwSwitch";
// import LwCalendar from "./enhance/LwCalendar";
// import LwPopup from "./enhance/LwPopup.js";

export default {
  name: "app",
  components: {
    ElRow: Row,
    ElCol: Col,
    Button,
    LwModal,
    Modal
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
