<template>
  <div class="lw_checkbox_box">
    <input type="checkbox">
  </div>
</template>

<script>
export default {
  name: "LwCheckbox",
  data: function() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "../skins/color.less";
.lw_checkbox_box {
  input {
    background-color: @Blue;
  }
}
</style>
