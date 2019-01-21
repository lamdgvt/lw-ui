<template>
  <div class="lw_datepicker_box">
    <lw-popup autoWidth :visible="visible">
      <lw-input
        v-model="inputValue"
        v-on:blur="blurEvent"
        icon="riqi_o"
        :iconSize="20"
        class="lw_datepicker_input"
      />
      <lw-calendar
        slot="content"
        :style="{ border:'none'}"
        v-model="calendarValue"
        @click="clickEvent"
        @change="changeEvent"
      ></lw-calendar>
    </lw-popup>
  </div>
</template>

<script>
import LwInput from "./LwInput";
import LwPopup from "./LwPopup";
import LwCalendar from "./LwCalendar";
import { strToDateFormat, dateToStrFormat } from "../public.ts";
import { isString } from "lodash";

export default {
  name: "LwDatepicker",
  props: {
    value: [String, Date, Number],
    format: {
      type: Function,
      default: dateToStrFormat
    },
    timepicker: Boolean
  },
  components: {
    LwInput,
    LwPopup,
    LwCalendar
  },
  data: function() {
    return {
      calendarValue: this.initValue(),
      inputValue: this.value,
      popup: true,
      visible: false
    };
  },
  methods: {
    initValue: function() {
      let date = this.value;
      if (isString(date)) date = strToDateFormat(date);

      return date;
    },
    blurEvent: function(e) {
      let value = e.target.value;
      let timer = strToDateFormat(value);
      if (timer) this.calendarValue = timer;
    },
    clickEvent: function() {},
    changeEvent: function() {
      
    }
  },
  watch: {
    value(val) {
      let timer = strToDateFormat(val);
      if (timer) this.calendarValue = timer;
    },
    calendarValue(val) {
      let str = this.format(val, this.timepicker);
      this.inputValue = str;
    },
    inputValue(val) {
      this.$emit("input", val);
    }
  },
  mounted() {}
};
</script>

<style scoped>
@import "../skins/color.less";
.lw_datepicker_input >>> i {
  color: #1890ff;
}
</style>

