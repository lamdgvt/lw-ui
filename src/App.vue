<template>
  <div id="app">
    <el-row>
      <el-col :span="2">
        <lw-button>确认</lw-button>
      </el-col>
      <el-col :span="2">
        <lw-switch :value="false" :openValue="'oepn'" :closeValue="'close'">开关</lw-switch>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Row, Col } from "element-ui";
import LwButton from "./enhance/LwButton";
import LwSwitch from "./enhance/LwSwitch";

export default {
  name: 'app',
  components: {
    ElRow: Row,
    ElCol: Col,
    LwButton,
    LwSwitch
  },
  methods: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
