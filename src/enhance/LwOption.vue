<template>
  <li class="lw_option_item">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "LwOption",
  props: {
    value: [String, Number],
    label: [String, Number]
  }
};
</script>

<style lang="less" scoped>
@import "../skins/color.less";
.lw_option_item {
  list-style: none;
  font-size: 12px;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 30px;
  padding: 0 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.lw_option_item:hover {
  background-color: @WhiteActive;
}
</style>

