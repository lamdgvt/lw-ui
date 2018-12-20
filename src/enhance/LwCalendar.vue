<template>
  <div class="lw_calendar_box">
    <div class="lw_calendar_header">
      <div class="lw_icon_pre">
        <span class="iconfont icon-jiantou_liebiaoxiangzuo_o"></span>
      </div>
      <div v-html="createHeader" class="lw_calendar_title"></div>
      <div class="lw_icon_next">
        <span class="iconfont icon-jiantou_liebiaoxiangyou_o"></span>
      </div>
    </div>
    <div class="lw_calendar_body" v-html="createBody"></div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
export default {
  name: "LwCalendar",
  props: {
    value: {
      value: [Number, String, Object],
      default: Number(new Date("2012-12"))
    }
  },
  data: function() {
    return {
      date: this.timeFilter()
    };
  },
  computed: {
    createHeader: function() {
      let date = this.date;
      let year = date.getFullYear();
      let month = date.getMonth();
      let monthStr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      return monthStr[month] + " " + year;
    },
    createBody: function() {
      let timer = this.date;
      let size = this.getCalendarSize(timer);
      return `<div>${size}</div>`;
    }
  },
  methods: {
    timeFilter: function() {
      let date = this.value;
      if (isNaN(Number(new Date(date)))) date = new Date();

      return new Date(date);
    },
    getCalendarSize: function(d) {
      let timer = cloneDeep(d);
      let month = timer.getMonth();
      timer.setDate(1);
      let day = timer.getDay();
      let number = this.getMonthHasDay(timer);
      timer.setMonth(month - 1);
      let preNumber = this.getMonthHasDay(timer);
      let row = Math.ceil((number - (day ? 7 - day : 0)) / 7) + (day ? 1 : 0);
      return { row, number, preNumber };
    },
    getMonthHasDay: function(timer) {
      let fullYear = timer.getFullYear();
      let month = timer.getMonth();
      let monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let number = monthArr[month];
      if (month === 1 && fullYear % 4 === 0) number = 29;
      return number;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../skins/color.less";
.lw_calendar_box {
  width: 320px;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid @BorderColor;
  letter-spacing: 0.2px;
  .lw_calendar_header {
    display: flex;
  }
  .lw_calendar_title {
    height: 26px;
    line-height: 26px;
    font-family: Roboto, sans-serif;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    flex-grow: 3;
  }
  .lw_icon_pre,
  .lw_icon_next {
    font-size: 24px;
    flex-grow: 1;
    cursor: pointer;
  }
  .lw_icon_next {
    text-align: right;
  }
}
</style>
