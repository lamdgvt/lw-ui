<template>
  <div class="lw_box" v-on:mouseenter="mousemoveEvent" v-on:mouseleave="mouseleaveEvent">
    <lw-icon
      class="lw_input_icon"
      v-show="iconState"
      :type="icon"
      :size="iconSize"
      @click="iconEvent"
    ></lw-icon>
    <lw-icon
      class="lw_input_icon"
      v-show="removeState"
      :type="'anniu_guanbi_o'"
      :size="20"
      @click="clearEvent"
    ></lw-icon>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="currentValue"
      :maxlength="maxlength"
      :readonly="readonly"
      :disabled="disabled"
      :style="inputStyle"
      class="lw_input"
      v-on:focus="focusEvent"
      v-on:blur="blurEvent"
      @click="clickEvent"
      v-on:change="changeEvent"
      v-on:keyup="keyupEvent"
      v-on:keydown="keydownEvent"
      v-on:keypress="keypressEvent"
    >
  </div>
</template>

<script>
import LwIcon from "./LwIcon";

export default {
  name: "LwInput",
  components: {
    LwIcon
  },
  props: {
    value: [String, Number],
    placeholder: [String, Number],
    remove: Boolean,
    iconSize: Number,
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxlength: Number,
    icon: {
      type: String,
      default: ""
    },
    height: {
      type: [Number, String],
      default: 30
    },
    width: {
      type: [Number, String],
      default: 188
    }
  },
  computed: {
    inputStyle: function() {
      let height = parseFloat(this.height) + "px";
      let paddingRight = this.icon ? "30px" : "10px";
      let width = parseFloat(this.width) + "px";
      return {
        height,
        width,
        paddingRight
      };
    }
  },
  data: function() {
    return {
      currentValue: this.value,
      iconState: this.icon,
      removeState: false
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      this.$emit("input", val);
    },
    removeState(val) {
      this.iconState = !val;
    }
  },
  methods: {
    focusEvent: function() {
      this.$emit("focus", event);
    },
    blurEvent: function() {
      this.$emit("blur", event);
    },
    changeEvent: function() {
      this.$emit("change", event);
    },
    keyupEvent: function() {
      this.$emit("keyup", event);
    },
    keydownEvent: function() {
      this.$emit("keydown", event);
    },
    keypressEvent: function() {
      this.$emit("keypress", event);
    },
    iconEvent: function() {
      this.$emit("icon-click", event);
    },
    clickEvent: function() {
      this.$emit("click", event);
    },
    mousemoveEvent: function() {
      if (!this.remove) return;
      this.removeState = true;
    },
    mouseleaveEvent: function() {
      if (!this.remove) return;
      this.removeState = false;
    },
    clearEvent: function() {
      this.currentValue = "";
    }
  },
  mounted: function() {
    // console.log(this.removeState);
  }
};
</script>

<style lang="less" scoped>
@import "../skins/color.less";
.lw_box {
  display: inline-block;
  position: relative;
}
.lw_input {
  border-radius: 2px;
  border: 1px solid @BorderColor;
  outline: none;
  padding-left: 10px;
  box-sizing: border-box;
}
.lw_input_icon {
  position: absolute;
  right: 5px;
}
.lw_input:hover,
.lw_input:active {
  border-color: @Blue;
}
</style>
