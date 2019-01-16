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
  props: {},
  directives: { clickOutside },
  methods: {
    clickEvent: function() {
      this.show = !this.show;
    },
    clickOutsideEvent: function() {
      this.show = false;
    }
  },
  computed: {
    popupBoxStyle: function() {
      let top = this.offsetHeight + "px";
      let left = "0px";
      let width = this.offsetWidth + "px";
      return {
        top,
        left,
        width
      };
    }
  },
  data: function() {
    return {
      show: false,
      offsetHeight: 0,
      offsetWidth: 0
    };
  },
  watch: {},
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
}
.lw_popup_box {
  border: 1px solid @BorderColor;
  position: absolute;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 2px;
}
</style>

