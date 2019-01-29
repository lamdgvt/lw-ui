<template>
  <div class="lw_select_box">
    <lw-popup v-model="visible">
      <lw-input :readonly="!editable" icon="jiantou_liebiaozhankai_o" v-model="selectValue"/>
      <ul slot="content" @click="optionsClick">
        <slot></slot>
      </ul>
    </lw-popup>
  </div>
</template>

<script>
import LwInput from "./LwInput";
import LwPopup from "./LwPopup";

export default {
  name: "LwSelect",
  props: {
    editable: Boolean
  },
  watch: {},
  methods: {
    optionsClick: function(e) {
      let target = e.target;
      if (target.className === "lw_option_item") {
        let text = target.innerText;
        this.selectValue = text;
        this.$emit("input", text);
        this.visible = false;
      }
    }
  },
  components: {
    LwInput,
    LwPopup
  },
  data: function() {
    return {
      visible: false,
      selectValue: ""
    };
  },
  computed: {},
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.lw_select_box {
  ul {
    margin: 0;
    padding: 0;
  }
}
</style>


