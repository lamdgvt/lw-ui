<template>
  <div class="lw_button">
    <component
      :is="tagName"
      :type="type"
      :class="classes"
      :disabled="disabled"
      @click="clickEvent"
      @dblclick="dblclickEvent"
    >
      <slot></slot>
    </component>
  </div>
</template>


<script lang="ts">
import { isString } from "lodash";
export default {
  name: "LwButton",
  data: function() {
    return {
      tagName: "button"
    };
  },
  props: {
    type: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes: function() {
      return this.type && isString(this.type) ? this.type : "default";
    }
  },
  methods: {
    clickEvent: function() {
      this.$emit("click", event);
    },
    dblclickEvent: function() {
      this.$emit("dblclick", event);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../skins/color.less";
.lw_button {
  padding: 2px;
  button,
  a {
    padding: 3px 12px;
    box-sizing: border-box;
    font-size: 12px;
    white-space: nowrap;
    text-align: center;
    transition: 0.3s;
    font-weight: 500;
    border-radius: 2px;
    cursor: pointer;
    outline: none;
    border: 1px solid transparent;
    color: @White;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .default {
    background-color: @Blue;
  }
  .default:hover {
    background-color: @BlueHover;
  }
  .default:active {
    background-color: @BlueActive;
  }
  .success {
    background: @Green;
  }
  .success:hover {
    background: @GreenHover;
  }
  .success:active {
    background: @GreenActive;
  }
  .warn {
    background: @Red;
  }
  .warn:hover {
    background: @RedHover;
  }
  .warn:active {
    background: @RedActive;
  }
  .clear {
    background: @White;
    border-color: @Gray;
    color: @Blue;
  }
  .clear:hover {
    border-color: @Blue;
  }
  .clear:active {
    background-color: @WhiteActive;
  }
}
</style>

