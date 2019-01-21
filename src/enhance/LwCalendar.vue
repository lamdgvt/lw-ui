<script>
import { cloneDeep } from "lodash";
export default {
  name: "LwCalendar",
  props: {
    value: {
      value: [Number, String, Date],
      validator: function(value) {
        return isNaN(String(new Date(value)));
      }
    }
  },
  data: function() {
    return {
      renderDate: this.timeFilter(),
      selectDate: new Date(this.value),
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
      weekStr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      renderType: "date"
    };
  },
  computed: {},
  methods: {
    clickEvent: function() {
      this.$emit("click", event);
    },
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
      return createElement(
        "div",
        {
          class: "lw_calendar_header",
          on: {
            click: this.headerClickEvent
          }
        },
        [
          createElement("div", { class: "lw_icon_pre" }, [
            createElement("span", {
              class: "iconfont icon-jiantou_liebiaoxiangzuo_o",
              attrs: {
                "data-arrow": "-1"
              }
            })
          ]),
          createElement(
            "div",
            {
              class: "lw_calendar_title",
              attrs: {
                "data-title": true
              }
            },
            [this.createHeaderElement()]
          ),
          createElement("div", { class: "lw_icon_next" }, [
            createElement("span", {
              class: "iconfont icon-jiantou_liebiaoxiangyou_o",
              attrs: {
                "data-arrow": "1"
              }
            })
          ])
        ]
      );
    },
    bodyLayout: function(createElement) {
      let type = this.renderType;
      let body;
      switch (type) {
        case "year":
          body = [
            createElement(
              "div",
              { class: "lw_body_month" },
              this.createYearElement(createElement)
            )
          ];
          break;
        case "month":
          body = [
            createElement(
              "div",
              { class: "lw_body_month" },
              this.createMonthElement(createElement)
            )
          ];
          break;
        default:
          body = [
            createElement(
              "div",
              {
                class: "lw_body_week"
              },
              this.createWeekElement(createElement)
            ),
            createElement(
              "div",
              {
                class: "lw_body_day"
              },
              this.createDateElement(createElement)
            )
          ];
      }

      return createElement(
        "div",
        {
          class: "lw_calendar_body",
          on: {
            click: this.selectDateEvent
          }
        },
        body
      );
    },
    createHeaderElement: function() {
      let type = this.renderType;
      let str;
      switch (type) {
        case "year":
          str = this.yearHeaderElement();
          break;
        case "month":
          str = this.monthHeaderElement();
          break;
        default:
          str = this.dateHeaderElement();
      }
      return str;
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
      let value = this.renderDate;
      let size = this.getCalendarSize(value);
      let number = 0;
      let currentTime = (() => {
        let t = new Date(this.selectDate);
        if (
          isNaN(t) ||
          t.getFullYear() !== value.getFullYear() ||
          t.getMonth() !== value.getMonth()
        )
          return -1;

        return t.getDate();
      })();

      for (let i = 0; i < 6; i++) {
        let cols = [];

        for (let r = 0; r < 7; r++) {
          number++;

          let { current, className } = (() => {
            if (size.preShowDay >= number) {
              return {
                current: size.preNumber - size.preShowDay + number,
                className: "lw_body_col_date lw_date_gray lw_date_pre"
              };
            } else if (number - size.preShowDay > size.number) {
              return {
                current: number - size.number - size.preShowDay,
                className: "lw_body_col_date lw_date_gray lw_date_next"
              };
            } else if (number - size.preShowDay === currentTime) {
              return {
                current: number - size.preShowDay,
                className: "lw_body_col_date lw_date_select"
              };
            } else {
              return {
                current: number - size.preShowDay,
                className: "lw_body_col_date"
              };
            }
          })();

          cols.push(createElement("div", { class: className }, current));
        }

        rows.push(createElement("div", { class: "lw_body_row_date" }, cols));
      }

      return rows;
    },
    createMonthElement: function(createElement) {
      let rows = [];
      let number = 0;
      for (let i = 0; i < 3; i++) {
        let cols = [];
        for (let r = 0; r < 4; r++) {
          cols.push(
            createElement(
              "div",
              { class: "lw_body_col_month" },
              this.monthStr[number].slice(0, 3)
            )
          );
          number++;
        }
        rows.push(
          createElement(
            "div",
            {
              class: "lw_body_row_month"
            },
            cols
          )
        );
      }

      rows.push(this.doneButtonElement(createElement));

      return rows;
    },
    createYearElement: function(createElement) {
      let year = this.renderDate.getFullYear();
      let floor = Math.floor(year / 10) * 10;
      let rows = [];
      let number = -1;

      for (let i = 0; i < 3; i++) {
        let cols = [];
        for (let r = 0; r < 4; r++) {
          cols.push(
            createElement("div", { class: "lw_body_col_year" }, floor + number)
          );
          number++;
        }

        rows.push(createElement("div", { class: "lw_body_row_year" }, cols));
      }

      rows.push(this.doneButtonElement(createElement));

      return rows;
    },
    selectDateEvent: function(e) {
      // e.stopPropagation();
      let target = e.target;
      if (!target) return;
      let isCol = className => {
        return target.className.indexOf(className) !== -1;
      };
      let time = new Date(this.renderDate);
      let dateSelect = () => {
        if (!isCol("lw_body_col_date")) return;

        let date = Number(target.innerText);
        if (!date || isNaN(date)) return;

        target.className.indexOf("lw_date_pre") !== -1 &&
          (function() {
            if (time.getMonth()) time.setMonth(time.getMonth() - 1);
            else {
              time.setFullYear(time.getFullYear() - 1);
              time.setMonth(11);
            }
          })();

        target.className.indexOf("lw_date_next") !== -1 &&
          (function() {
            if (time.getMonth() < 11) time.setMonth(time.getMonth() + 1);
            else {
              time.setFullYear(time.getFullYear() + 1);
              time.setMonth(0);
            }
          })();

        time.setDate(date);
        this.renderDate = time;
        this.selectDate = time;
        this.$emit("input", this.selectDate);
        // this.$emit("value", this.selectDate);
      };
      let monthSelect = () => {
        if (!isCol("lw_body_col_month")) return;

        let n = (() => {
          for (let i = 0; i < this.monthStr.length; i++) {
            let item = this.monthStr[i];
            if (item.indexOf(target.innerText) !== -1) return i;
          }
        })();
        if (isNaN(Number(n))) return;

        time.setMonth(n);
        this.renderType = "date";
        this.renderDate = time;
      };

      let yearSelect = () => {
        if (!isCol("lw_body_col_year")) return;
        let date = Number(target.innerText);
        if (!date || isNaN(date)) return;
        time.setFullYear(date);

        this.renderType = "month";
        this.renderDate = time;
      };

      switch (this.renderType) {
        case "year":
          yearSelect();
          break;
        case "month":
          monthSelect();
          break;
        default:
          dateSelect();
      }
    },
    headerClickEvent: function(e) {
      // e.stopPropagation();
      let target = e.target;
      let arrow = target.getAttribute("data-arrow");
      let title = target.getAttribute("data-title");

      let arrowEvent = () => {
        let n = Number(arrow);
        if (isNaN(n)) return;
        let time = new Date(this.renderDate);

        let dateToggle = () => {
          let month = time.getMonth();

          if ((month === 11 && n === 1) || (month === 0 && n === -1)) {
            time.setFullYear(time.getFullYear() + n);
            month === 11 && time.setMonth(0);
            month === 0 && time.setMonth(11);
          } else time.setMonth(time.getMonth() + n);

          this.renderDate = time;
        };
        let monthToggle = () => {
          let year = time.getFullYear();
          time.setFullYear(year + n);
          this.renderDate = time;
        };
        let yearToggle = () => {
          let year = time.getFullYear();
          time.setFullYear(year + n * 10);
          this.renderDate = time;
        };

        switch (this.renderType) {
          case "year":
            yearToggle();
            break;
          case "month":
            monthToggle();
            break;
          default:
            dateToggle();
        }
      };

      let titleEvent = () => {
        switch (this.renderType) {
          case "month":
            this.renderType = "year";
            break;
          case "date":
            this.renderType = "month";
            break;
        }
      };

      if (arrow) arrowEvent();
      else if (title) titleEvent();
    },
    dateHeaderElement: function() {
      let date = this.renderDate;
      let year = date.getFullYear();
      let month = date.getMonth();
      return this.monthStr[month] + " " + year;
    },
    monthHeaderElement: function() {
      return this.renderDate.getFullYear();
    },
    yearHeaderElement: function() {
      let year = this.renderDate.getFullYear();
      let ceil = Math.ceil(year / 10) * 10;
      !(year % 10) && (ceil += 10);
      let floor = Math.floor(year / 10) * 10 - 1;
      return floor + " - " + ceil;
    },
    doneButtonElement: function(createElement) {
      return createElement(
        "div",
        {
          class: "lw_body_done",
          on: {
            click: () => {
              switch (this.renderType) {
                case "year":
                  this.renderType = "month";
                  break;
                default:
                  this.renderType = "date";
              }
            }
          }
        },
        "Done"
      );
    }
  },
  watch: {
    selectDate: function(val) {
      this.$emit("change", val);
    }
  },
  render: function(createElement) {
    return createElement(
      "div",
      { class: "lw_calendar_box", on: { click: this.clickEvent } },
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
  border-radius: 2px;
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
    cursor: pointer;
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
    width: 35px;
    margin: 0 3px;
    text-align: center;
  }
  .lw_body_row_date {
    height: 35px;
    line-height: 25px;
  }
  .lw_body_row_date::after,
  lw_body_row_month::after {
    content: "";
    display: table;
    clear: both;
  }
  .lw_body_col_date {
    float: left;
    text-align: center;
    width: 25px;
    margin: 5px 8px;
    cursor: pointer;
    border-radius: 50%;
  }
  .lw_body_col_date:hover {
    background: @WhiteActive;
  }
  .lw_body_col_date.lw_date_select {
    background: @Blue;
    color: @White;
  }
  .lw_date_gray {
    color: @Gray;
  }
  .lw_body_row_month,
  .lw_body_row_year {
    height: 65px;
  }
  .lw_body_done {
    height: 40px;
  }
  .lw_body_col_month,
  .lw_body_col_year {
    float: left;
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin: 7px 11px;
    text-align: center;
    cursor: pointer;
    border-radius: 50%;
  }
  .lw_body_col_month:hover,
  .lw_body_col_year:hover {
    background: @WhiteActive;
  }
  .lw_body_done {
    text-align: center;
    line-height: 40px;
    border: 1px solid @BorderColor;
    border-radius: 3px;
    box-sizing: border-box;
    margin: 0 15px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
  .lw_body_done:hover {
    background: @WhiteActive;
  }
}
</style>
