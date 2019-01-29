<template>
  <div class="lw_popup_master" v-click-outside="clickOutsideEvent">
    <div @click.prevent="clickEvent" ref="slot">
      <slot></slot>
    </div>
    <div class="lw_popup_box" v-show="show" :style="popupBoxStyle">
      <slot class="lw_popup_box" name="content"></slot>
    </div>
  </div>
</template>

<script>
import { directive as clickOutside } from "v-click-outside-x";
export default {
  name: "LwPopup",
  model: {
    prop: "visible"
  },
  props: {
    autoWidth: Boolean,
    visible: Boolean
  },
  directives: { clickOutside },
  methods: {
    clickEvent: function() {
      this.show = !this.show;
      this.$emit("input", this.show);
    },
    clickOutsideEvent: function() {
      this.show = false;
      this.$emit("input", this.show);
    }
  },
  computed: {
    popupBoxStyle: function() {
      let top = this.offsetHeight + "px";
      let left = "0px";
      let width = this.offsetWidth + "px";
      if (this.autoWidth) width = "auto";
      return {
        top,
        left,
        width
      };
    }
  },
  data: function() {
    return {
      show: this.visible,
      offsetHeight: 0,
      offsetWidth: 0
    };
  },
  watch: {
    visible(val) {
      this.show = val;
    }
  },
  mounted: function() {
    let slot = this.$refs.slot;
    this.offsetHeight = slot.offsetHeight;
    this.offsetWidth = slot.offsetWidth;
  }
};
</script>

<style lang="less" scoped>
@import "../skins/color.less";
.lw_popup_master {
  display: inline-block;
  position: relative;
}
.lw_popup_box {
  background-color: @White;
  border: 1px solid @BorderColor;
  position: absolute;
  box-sizing: border-box;
  border-radius: 2px;
}
</style>

