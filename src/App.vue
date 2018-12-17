<template>
  <div id="app">
    <el-row>
      <el-col :span="2">
        <lw-button>确认</lw-button>
      </el-col>
      <el-col :span="2">
        <lw-button>清除</lw-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Row, Col } from "element-ui";
import LwButton from "./enhance/LwButton";

export default {
  name: 'app',
  components: {
    ElRow: Row,
    ElCol: Col,
    LwButton
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
