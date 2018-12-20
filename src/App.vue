<template>
  <div id="app">
    <el-row>
      <el-col :span="2">
        <lw-button>确认</lw-button>
      </el-col>
      <el-col :span="2">
        <lw-switch :value="false"></lw-switch>
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

export default {
  name: "app",
  components: {
    ElRow: Row,
    ElCol: Col,
    LwButton,
    LwSwitch,
    LwCalendar
  },
  methods: {}
};
</script>
<style lang="less" scoped>
@import "./skins/color.less";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @FontColor;
  margin-top: 60px;
}
</style>
