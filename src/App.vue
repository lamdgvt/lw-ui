<template>
  <div id="app">
    <el-row>
      <el-col :span="2">
        <lw-button v-on:click="clickEvent">确认</lw-button>
      </el-col>
      <el-col :span="2">
        <lw-switch :value="false" @change="changeEvent"></lw-switch>
      </el-col>
    </el-row>
    <el-row>
      <lw-calendar></lw-calendar>
    </el-row>
  </div>
</template>

<script>
import { Row, Col } from "element-ui";
import LwButton from "./enhance/LwButton";
import LwSwitch from "./enhance/LwSwitch";
import LwCalendar from "./enhance/LwCalendar";
import LwPopup from "./enhance/LwPopup.js";
import message from "./components/message/index.js";

export default {
  name: "app",
  components: {
    ElRow: Row,
    ElCol: Col,
    LwButton,
    LwSwitch,
    LwCalendar
  },
  methods: {
    clickEvent: function() {
      let popup = LwPopup({ text: "这是一条消息", type: "error" });
    },
    changeEvent: function() {
      message.info("This is a info tip");
    }
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
