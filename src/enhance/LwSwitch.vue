<template>
  <div class="lw_switch">
    <div class="lw_switch_box">
      <div :class="initBackgroundColor" @click="buttonClickEvent" :style="initBackground">
        <span class="lw_switch_close" v-if="!state">{{ closeValue }}</span>
        <span class="lw_switch_open" v-else>{{ openValue }}</span>
        <button :style="initButton" class="lw_switch_button"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { getTextSize } from "../public.ts";
export default {
  name: "LwSwitch",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    openValue: {
      type: String,
      default: "open"
    },
    closeValue: {
      type: String,
      default: "close"
    }
  },
  data: function() {
    return {
      state: this.value,
      open: 4,
      close: 13,
      top: 3,
      textSize: this.initTextSize(),
      padding: {
        top: 0,
        right: 30,
        bottom: 0,
        left: 10
      }
    };
  },
  methods: {
    buttonClickEvent: function() {
      this.state = !this.state;
      this.$emit("change", event);
    },
    initTextSize: function() {
      let { width: openWidth, height: openHeight } = getTextSize(
        this.openValue,
        "font-size: 12px;"
      );

      let { width: closeWidth, height: closeHeight } = getTextSize(
        this.closeValue,
        "font-size: 12px;"
      );

      let width = Math.max(openWidth, closeWidth);
      let height = Math.max(openHeight, closeHeight);
      return { width, height };
    }
  },
  computed: {
    initBackgroundColor: function() {
      return (
        "lw_switch_background " +
        (this.state ? "lw_background_open" : "lw_background_close")
      );
    },
    initBackground: function() {
      let { top, right, bottom, left } = this.padding;
      let { width } = this.textSize;
      width += right + left;

      return `padding: ${top}px ${right}px ${bottom}px ${left}px; width: ${width}px`;
    },
    initButton: function() {
      let { width } = this.textSize;
      let px = this.state ? this.open : this.close + width;
      return `right:${px}px;top:${this.top}px;`;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../skins/color.less";
.lw_switch {
  input {
    display: none;
  }
  .lw_switch_box {
    height: 33px;
    padding: 2px;
    box-sizing: border-box;
  }
  .lw_switch_background {
    transition: 0.3s;
    box-sizing: border-box;
    white-space: nowrap;
    position: relative;
    height: 29px;
    line-height: 28px;
    border-radius: 100px;
  }
  .lw_background_open {
    background-color: @Blue;
  }
  .lw_background_close {
    background-color: @Gray;
  }
  .lw_switch_close {
    right: 11px;
    font-size: 12px;
    position: absolute;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: @White;
  }
  .lw_switch_open {
    font-size: 12px;
    position: absolute;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: @White;
  }
  .lw_switch_button {
    height: 23px;
    width: 23px;
    transition: 300ms;
    border-radius: 50%;
    position: absolute;
    cursor: pointer;
    vertical-align: middle;
    border-color: transparent;
    background-color: @White;
    outline: none;
  }
}
</style>
