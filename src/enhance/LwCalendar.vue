<script>
import { cloneDeep } from "lodash";
export default {
  name: "LwCalendar",
  props: {
    value: {
      value: [Number, String, Object],
      default: Number(new Date())
    }
  },
  data: function() {
    return {
      date: this.value,
      monthStr: [
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
      ],
      weekStr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    };
  },
  computed: {},
  methods: {
    timeFilter: function(date) {
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
      return { row, number, preNumber, preShowDay: day };
    },
    getMonthHasDay: function(timer) {
      let fullYear = timer.getFullYear();
      let month = timer.getMonth();
      let monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let number = monthArr[month];
      if (month === 1 && fullYear % 4 === 0) number = 29;
      return number;
    },

    headerLayout: function(createElement) {
      return createElement("div", { class: "lw_calendar_header" }, [
        createElement("div", { class: "lw_icon_pre" }, [
          createElement("span", {
            class: "iconfont icon-jiantou_liebiaoxiangzuo_o"
          })
        ]),
        createElement(
          "div",
          {
            class: "lw_calendar_title"
          },
          [this.createHeaderElement()]
        ),
        createElement("div", { class: "lw_icon_next" }, [
          createElement("span", {
            class: "iconfont icon-jiantou_liebiaoxiangyou_o"
          })
        ])
      ]);
    },
    bodyLayout: function(createElement) {
      return createElement("div", { class: "lw_calendar_body" }, [
        createElement(
          "div",
          {
            class: "lw_body_week"
          },
          this.createWeekElement(createElement)
        ),
        createElement(
          "div",
          { class: "lw_body_day" },
          this.createDateElement(createElement)
        )
      ]);
    },
    createHeaderElement: function() {
      let date = this.timeFilter(this.date);
      let year = date.getFullYear();
      let month = date.getMonth();
      return this.monthStr[month] + " " + year;
    },
    createWeekElement: function(createElement) {
      let cols = [];
      for (let i = 0; i < 7; i++) {
        cols.push(
          createElement(
            "div",
            {
              class: "lw_body_week_row"
            },
            this.weekStr[i]
          )
        );
      }
      return cols;
    },
    createDateElement: function(createElement) {
      let rows = [];
      let size = this.getCalendarSize(this.timeFilter(this.date));
      let number = 0;
      for (let i = 0; i < 6; i++) {
        let cols = [];

        for (let r = 0; r < 7; r++) {
          number++;
          let current = (() => {
            let n = 0;
            if (size.preShowDay >= number)
              return size.preNumber - size.preShowDay + number;
            else if (number - size.preShowDay > size.number) {
              return number - size.number - size.preShowDay;
            } else {
              return number - size.preShowDay;
            }
          })();

          cols.push(
            createElement("div", { class: "lw_body_col_date" }, current)
          );
        }

        rows.push(createElement("div", { class: "lw_body_row_date" }, cols));
      }

      return rows;
    }
  },
  render: function(createElement) {
    return createElement(
      // {String | Object | Function}
      // 一个 HTML 标签字符串，组件选项对象，或者
      // 解析上述任何一种的一个 async 异步函数。必需参数。
      "div",

      // {Object}
      // 一个包含模板相关属性的数据对象
      // 你可以在 template 中使用这些特性。可选参数。
      { class: "lw_calendar_box" },
      // {String | Array}
      // 子虚拟节点 (VNodes)，由 `createElement()` 构建而成，
      // 也可以使用字符串来生成“文本虚拟节点”。可选参数。
      [this.headerLayout(createElement), this.bodyLayout(createElement)]
    );
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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .lw_calendar_header {
    display: flex;
  }
  .lw_calendar_title {
    line-height: 33px;
    font-family: Roboto, sans-serif;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    flex-grow: 3;
  }
  .lw_icon_pre,
  .lw_icon_next {
    flex-grow: 1;
    cursor: pointer;
    line-height: 33px;
    > span {
      font-size: 26px;
    }
  }
  .lw_icon_next {
    text-align: right;
  }
  .lw_calendar_body {
    font-size: 12px;
  }
  .lw_body_week {
    height: 25px;
    line-height: 25px;
  }
  .lw_body_week::after {
    content: "";
    clear: both;
    display: table;
  }
  .lw_body_week_row {
    float: left;
    width: 14.28%;
    text-align: center;
  }
  .lw_body_row_date {
    height: 30px;
    line-height: 30px;
  }
  .lw_body_row_date::after {
    content: "";
    display: table;
    clear: both;
  }
  .lw_body_col_date {
    float: left;
    text-align: center;
    width: 14.28%;
  }
}
</style>
