<template>
  <div v-transfer-dom :data-transfer="transfer">
    <div :class="hiddenClasses('lw_shade')" @click="shadeEvent"></div>
    <div :class="hiddenClasses('lw_window')">
      <div class="lw_box" style="width:500px">
        <div class="lw_header">
          <i class="iconfont icon-guanbi close" @click="close"></i>
          <span class="lw_header_title">普通的Modal对话框标题</span>
        </div>
        <div class="lw_content"></div>
        <div class="lw_footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { TransferDom } from "../public.ts";
export default {
  name: "LwModal",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      visible: this.value
    };
  },
  computed: {},
  methods: {
    hiddenClasses: function(cls) {
      return cls + (this.visible ? "" : " lw_hidden");
    },
    shadeEvent: function() {},
    close: function() {
      this.visible = false;
      this.$emit("on-close");
    }
  },
  watch: {
    value: function(val) {
      this.visible = val;
    },
    visible: function(val) {
      
    }
  },
  directives: { TransferDom }
};
</script>

<style lang="less" scoped>
@import "../skins/color.less";
.lw_shade {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(55, 55, 55, 0.6);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.lw_window {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;
  pointer-events: none;
}
.lw_box {
  margin: 0 auto;
  min-width: 350px;
  min-height: 200px;
  position: relative;
  top: 100px;
  background-color: @White;
  box-sizing: border-box;
  border-radius: 3px;
  pointer-events: auto;
}
.lw_header {
  padding: 10px;
  border-bottom: 1px solid @BorderColor;
}
.lw_header_title {
  font-size: 17px;
  font-weight: bold;
}
.iconfont.close {
  cursor: pointer;
  float: right;
}
.lw_hidden {
  display: none;
}
</style>
