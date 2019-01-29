<template>
  <div id="app">
    <el-row :style="{ marginTop: '60px' }">
      <el-col :push="4" :span="5">
        <lw-select>
          <lw-option v-for="(val,ind) in arrayTest" :key="ind">{{ val.value }}</lw-option>
        </lw-select>
        <!-- <lw-input v-model="text" :iconSize="20" remove/>
        {{ text }}-->
      </el-col>
    </el-row>
    <el-row>
      <el-col :push="4" :span="5">
        <!-- <lw-datepicker v-model="timer"></lw-datepicker> -->
        <!-- {{ timer }} -->
        <!-- <lw-popup>
          <lw-button>Display dialog box</lw-button>
          <div slot="content"></div>
        </lw-popup>-->
      </el-col>
      <el-col>
        <input type="radio" value="One" v-model="picked">
        <br>
        <input type="radio" value="Two" v-model="picked">
        <br>
        <span>Picked: {{ picked }}</span>
        <br>
        <lw-radio :value="'One'" :name="Test"></lw-radio>
        <lw-radio :value="'Two'" :name="Test"></lw-radio>
        {{ Test }}
        <!-- <lw-checkbox></lw-checkbox> -->
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
// import LwButton from "./enhance/LwButton";
// import LwSwitch from "./enhance/LwSwitch";
// import LwCalendar from "./enhance/LwCalendar";
// import LwIcon from "./enhance/LwIcon";
import LwRadio from "./enhance/LwRadio";
// import LwInput from "./enhance/LwInput";
// import LwPopup from "./enhance/LwPopup";
// import LwDatepicker from "./enhance/LwDatepicker";
import LwSelect from "./enhance/LwSelect";
import LwOption from "./enhance/LwOption";
// import LwCheckbox from "./enhance/LwCheckbox";

export default {
  name: "app",
  components: {
    ElRow: Row,
    ElCol: Col,
    // LwIcon,
    // Button,
    // LwModal,
    // LwButton,
    LwRadio,
    // LwInput,
    // LwPopup
    // IRadio,
    // LwCalendar,
    // LwDatepicker,
    LwSelect,
    LwOption
    // LwCheckbox
  },
  data() {
    return {
      Test: "",
      picked: "One",
      modal1: false,
      timer: new Date(),
      arrayTest: [
        {
          value: "李锦狗"
        },
        {
          value: "李锦dog"
        },
        {
          value: "新锦狗"
        },
        {
          value: "哈皮锦"
        }
      ]
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
