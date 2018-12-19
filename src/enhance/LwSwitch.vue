<template>
  <div class="lw_switch">
    <div class="lw_switch_box">
      <div :class="initBackgroundColor" @click="buttonClickEvent" ref="background">
        <span class="lw_switch_span">{{ text }}</span>
        <button :style="initStyle" class="lw_switch_button" ref="button"></button>
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
      value: Boolean,
      default: false
    },
    openValue: {
      openValue: String,
      default: "open"
    },
    closeValue: {
      closeValue: String,
      default: "close"
    }
  },
  data: function() {
    return {
      state: this.value,
      open: 4,
      close: 23,
      top: 3,
      text: this.value ? this.openValue : this.closeValue
    };
  },
  methods: {
    buttonClickEvent: function() {
      this.state = !this.state;
      let button = this.$refs.button;
      let px = this.state ? this.open + "px" : this.close + "px";
      button.style.right = px;
      this.$emit("change", event);
    }
  },
  computed: {
    initBackgroundColor: function() {
      return (
        "lw_switch_background " +
        (this.state ? "lw_background_open" : "lw_background_close")
      );
    },
    initStyle: function() {
      let { width: openValue } = getTextSize(this.openValue);
      let { width: closeValue } = getTextSize(this.closeValue);
      let width = Math.max(openValue, closeValue);

      return `right:${this.state ? this.open : this.close}px;top:${
        this.top
      }px;`;
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
    padding: 0px 30px 0 10px;
    transition: 0.3s;
    white-space: nowrap;
    display: inline-block;
    position: relative;
    height: 29px;
    line-height: 29px;
    border-radius: 100px;
  }
  .lw_background_open {
    background-color: @Blue;
  }
  .lw_background_close {
    background-color: @Gray;
  }
  .lw_switch_span {
    font-size: 12px;
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
