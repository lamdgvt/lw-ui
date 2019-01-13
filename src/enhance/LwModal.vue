<template>
  <div v-transfer-dom :data-transfer="transfer">
    <div :class="hiddenClasses('lw_shade')" @click="close" v-if="shade"></div>
    <div :class="hiddenClasses('lw_window')" :style="getZIndex">
      <div class="lw_box" :style="boxstyless" ref="box">
        <div class="lw_header" :style="cursorState">
          <lw-icon :type="'guanbi'" :class="'close'" :size="16" @click="close"></lw-icon>

          <lw-icon :type="iconState" :class="'screen'" :size="21" v-show="screen" @click="toggle"></lw-icon>
          <span class="lw_header_title">
            <slot name="title"></slot>
          </span>
        </div>
        <div class="lw_content">
          <slot name="content"></slot>
        </div>
        <div class="lw_footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LwIcon from "./LwIcon";
import { TransferDom, getZIndex } from "../public.ts";
export default {
  name: "LwModal",
  components: {
    LwIcon
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    transfer: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 400
    },
    move: {
      type: Boolean,
      default: true
    },
    shade: {
      type: Boolean,
      default: false
    },
    screen: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      visible: this.value,
      windowWidth: innerWidth,
      windowHeight: innerHeight,
      top: 0,
      left: 0,
      center: true,
      screenState: this.fullscreen
      /**
       * screenState  1为开启全屏, -1为关闭全屏
       * 如为Boolean 值, 全屏以 fullscreen 为准
       */
    };
  },
  computed: {
    iconState: function() {
      if (this.screenState) return "quxiaoquanping_o";
      return "quanping_o";
    },
    boxstyless: function() {
      let screenState = this.screenState;
      if (screenState) return { width: "100%", height: "100%" };

      return {
        width: this.width + "px",
        left: this.left + "px",
        top: this.top + "px"
      };
    },
    cursorState() {
      if (this.move && !this.screenState) return { cursor: "move" };
      return {};
    },
    getZIndex: function() {
      return { zIndex: getZIndex() };
    }
  },
  methods: {
    toggle() {
      this.screenState = !this.screenState;
    },
    hiddenClasses: function(cls) {
      return cls + (this.visible ? "" : " lw_hidden");
    },
    close: function() {
      this.visible = false;
      this.$emit("on-close");
    },
    windowEvent: function() {
      if (!this.center) return;
      this.windowHeight = innerHeight;
      this.windowWidth = innerWidth;
      this.centerAdjust();
    },
    centerAdjust: function() {
      let box = this.$refs.box;
      let { width, height } = getComputedStyle(box, null);

      let left = this.windowWidth / 2 - parseInt(width) / 2;
      let top = this.windowHeight / 2 - parseInt(height) / 2;
      this.top = top;
      this.left = left;
    },
    boxEvent: function() {
      let box = this.$refs.box;
      let global = this;
      let mouseDownEvent = false;
      let xy = {};

      box.addEventListener("mousedown", function(e) {
        mouseDownEvent = true;
        xy.clientX = e.clientX;
        xy.clientY = e.clientY;
      });

      document.addEventListener("mousemove", function(e) {
        if (mouseDownEvent && !global.screenState) {
          global.center = false;
          let currentX = e.clientX;
          let currentY = e.clientY;
          global.top += currentY - xy.clientY;
          global.left += currentX - xy.clientX;
          xy.clientX = e.clientX;
          xy.clientY = e.clientY;
        }
      });

      box.addEventListener("mouseup", function() {
        mouseDownEvent = false;
      });
    }
  },
  watch: {
    value: function(val) {
      this.visible = val;
    },
    visible: function(val) {
      this.$emit("on-visible-change", val);
      if (val && this.move && this.center) {
        this.$nextTick(() => this.centerAdjust());
      }
    }
  },
  mounted: function() {
    if (this.visible && this.center) this.centerAdjust();

    if (this.move) this.boxEvent();

    window.addEventListener("resize", this.windowEvent);
  },
  destroyed: function() {
    window.removeEventListener("resize", this.windowEvent);
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
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;
  pointer-events: none;
}
.lw_box {
  min-height: 200px;
  position: absolute;
  border: 1px solid #dadee0;
  background-color: @White;
  box-sizing: border-box;
  border-radius: 3px;
  pointer-events: auto;
}
.lw_header {
  padding: 10px;
  border-bottom: 1px solid @BorderColor;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.lw_header_title {
  font-size: 17px;
  font-weight: bold;
}
.close,
.screen {
  cursor: pointer;
  float: right;
  margin-right: 5px;
}
.screen {
  position: relative;
  top: -3px;
}

.lw_hidden {
  display: none;
}
</style>
