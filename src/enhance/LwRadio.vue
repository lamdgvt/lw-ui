<template>
  <label :class="labelClassess">
    <button
      :style="circleStyless"
      @click="clickEvent"
      :class="state? 'lw_radio_checked': ''"
      :disabled="disabled"
    ></button>
    <!-- :style="inputStyless" -->
    <input type="radio" :disabled="disabled" :name="name" @change="change" ref="input">
    {{ state }}
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
    name: {
      type: String,
      default: ""
    },
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
      this.$refs.input.click();
    },
    change: function(e) {
      let checked = e.target.checked;
      this.state = checked;
    }
  },
  watch: {
    state(val) {
      this.$emit("input", val);
    }
  }
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


