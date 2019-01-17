<template>
  <i :class="classes" :style="styless" @click="clickEvent" @dblclick="dblclickEvent"></i>
</template>

<script>
export default {
  name: "LwIcon",
  props: {
    type: String,
    size: {
      type: [Number, String],
      default: 14
    },
    color: String
  },
  data: function() {
    return {
      icon: this.type
    };
  },
  computed: {
    classes: function() {
      return ["iconfont", "icon-" + this.icon];
    },
    styless: function() {
      return {
        color: this.color,
        fontSize: this.size + "px"
      };
    }
  },
  methods: {
    clickEvent: function() {
      this.$emit("click", event);
    },
    dblclickEvent: function() {
      this.$emit("dblclick", event);
    }
  },
  watch: {
    type(val) {
      this.icon = val;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
