<template>
  <label :class="labelClassess">
    <!-- <button :style="circleStyless" :class="state? 'lw_radio_checked': ''" :disabled="disabled"></button> -->
    <!-- :style="inputStyless" -->
    <input type="radio" :disabled="disabled" ref="input" v-model="state" :value="value">
    <!-- {{ value }} -->
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "LwRadio",
  model: {
    prop: "checked"
  },
  props: {
    name: [String, Number],
    checked: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 16
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: [String, Number],
    value: [String, Number]
  },
  data: function() {
    return {
      state: this.name,
      checkState: ""
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
    changeEvent: function(e) {
      console.log(e);
    },
    clickEvent: function(e) {
      console.log(e);
    },
    change: function(e) {
      let checked = e.target.checked;
      this.state = checked;
    }
  },
  watch: {
    // state(val) {
    //   this.$emit("input", val);
    // },
    checkState: function(val) {
      console.log(val);
    },
    state(val) {
      console.log(val);
    }
  },
  mounted: function() {
    console.log(this.name);
  }
};
</script>

<style lang="less" scoped>
@import "../skins/color.less";
.lw_radio_box {
  > button {
    padding: 0;
    box-sizing: border-box;
    border: 1px solid @Gray;
    background: @White;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: none;
    outline: none;
    vertical-align: middle;
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


