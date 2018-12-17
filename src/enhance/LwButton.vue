<script lang="ts">
export default {
  name: "LwButton",
  data: function() {
    return {};
  },
  props: {
    value: String,
    type: {
      type: String,
      default: "default"
    }
  },
  render: function(createElement) {
    console.log(createElement);
    return createElement("div", "1234");
  }
};
</script>

<style lang="less" scoped>
.lw_button {
  button {
    padding: 3px 12px;
    box-sizing: border-box;
    font-size: 12px;
    white-space: nowrap;
    text-align: center;
    transition: 0.1s;
    font-weight: 500;
    border-radius: 2px;
    cursor: pointer;
    outline: none;
    border: 1px solid transparent;
    color: #fff;
  }
  .default {
    background-color: #1890ff;
  }
  .default:hover {
    background-color: #40a9ff;
  }
  .default:active {
    background-color: #096dd9;
  }
}
</style>

