<template>
  <div id="app">
    <el-row :style="{ marginTop: '60px' }">
      <el-col :push="4" :span="5">
        <!-- <lw-input v-model="text" :iconSize="20" remove/>
        {{ text }}-->
      </el-col>
    </el-row>
    <el-row>
      <el-col :push="4" :span="5">
        <lw-popup>
          <lw-button>Display dialog box</lw-button>
          <div slot="content"></div>
        </lw-popup>
      </el-col>

      <!--
      <lw-modal :value="modal1" @on-visible-change="changeEvent" screen>
        <span slot="title">普通的Modal对话框标题</span>
        <div slot="content">
          <el-row>
            <el-col></el-col>
          </el-row>
        </div>
      </lw-modal>-->
      <!-- <lw-calendar v-model="timer"></lw-calendar> -->
    </el-row>
  </div>
</template>

<script>
import { Row, Col } from "element-ui";
// import LwModal from "./enhance/LwModal";
import LwButton from "./enhance/LwButton";
// import LwSwitch from "./enhance/LwSwitch";
// import LwCalendar from "./enhance/LwCalendar";
// import LwIcon from "./enhance/LwIcon";
// import LwRadio from "./enhance/LwRadio";
// import LwInput from "./enhance/LwInput";
import LwPopup from "./enhance/LwPopup";
// import IRadio from "./components/radio/radio";

export default {
  name: "app",
  components: {
    ElRow: Row,
    ElCol: Col,
    // LwIcon,
    // Button,
    // LwModal,
    LwButton,
    // LwRadio,
    // LwInput,
    LwPopup
    // IRadio,
    // LwCalendar
  },
  data() {
    return {
      modal1: false,
      timer: new Date(),
      text: ""
    };
  },
  methods: {
    clickEvent: function() {},
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
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @FontColor;
}
</style>
