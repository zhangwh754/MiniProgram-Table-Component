// examples/index/components/table.ts
Component({
  properties: {
    dataIndex: Number,
    columnIndex: Number,
    row: Object,
    column: Object,
  },

  data: {},

  methods: {
    onAction(e: WechatMiniprogram.TouchEvent) {
      const { dataIndex, columnIndex, row, column } = this.data;
      const type = e.currentTarget.dataset.type;

      this.triggerEvent("renderClick", {
        type,
        rowData: row,
        column,
        dataIndex,
        columnIndex,
      });
    },
  },
});
