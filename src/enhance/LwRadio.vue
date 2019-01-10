<template>
  <label :class="labelClassess">
    <button
      :style="circleStyless"
      @click="clickEvent"
      :class="state? 'lw_radio_checked': ''"
      :disabled="disabled"
    ></button>
    <input type="radio" :style="inputStyless" :checked="state" id="test" :disabled="disabled">
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "LwRadio",
  props: {
    checked: {
      checked: Boolean,
      default: false
    },
    size: {
      size: Number,
      default: 16
    },
    disabled: {
      disabled: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      state: this.checked
    };
  },
  computed: {
    circleStyless: function() {
      return {
        width: this.size + "px",
        height: this.size + "px"
      };
    },
    inputStyless: function() {
      return {
        display: "none"
      };
    },
    labelClassess: function() {
      let ess = ["lw_radio_box"];
      if (this.disabled !== false) ess.push("lw_disabled");
      return ess;
    }
  },
  methods: {
    clickEvent: function() {
      this.state = true;
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
@import "../skins/color.less";
.lw_radio_box {
  > button {
    border: 1px solid @Gray;
    background: @White;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: none;
    outline: none;
  }
  > button.lw_radio_checked {
    border-width: 4px;
    border-color: @Blue;
  }
  > button:hover {
    border-color: @BlueHover;
  }
  > button:active {
    border-color: @BlueActive;
  }
}
.lw_disabled {
  cursor: not-allowed;
  > button {
    cursor: not-allowed;
  }
  > button.lw_radio_checked {
    border-color: @Gray;
  }
  > button:hover {
    border-color: @Gray;
  }
}
</style>


