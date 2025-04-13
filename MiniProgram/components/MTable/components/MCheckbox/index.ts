Component({
  options: {
    addGlobalClass: true, // 启用组件样式共享
  },

  properties: {
    checkStatus: {
      type: String,
      value: undefined,
    },
    checked: {
      type: Boolean,
    },
  },

  data: {},

  methods: {
    onToggleCheckbox() {
      const { checked, checkStatus } = this.data;

      if (checkStatus) {
        // 处理全选状态：不是全选状态时全选，是全选状态时清空
        this.triggerEvent("change", { isChecked: checkStatus !== "all" });
      } else {
        // 处理单个选择状态
        this.triggerEvent("change", { isChecked: !checked });
      }
    },
  },
});
