interface RowClickEvent {
  rowType: "header" | "content";
  rowKey: string | number;
  rowData?: TableData;
}

interface CellClickEvent {
  rowKey: string | number;
  rowData: TableData;
  column: ColumnItem;
}

interface ColumnItem {
  title: string;
  dataIndex: string;
  width?: number;
}

interface TableData {
  [key: string]: any;
  _m_id: string | number;
}

Component({
  properties: {
    columns: {
      type: Array,
      value: [] as ColumnItem[],
    },
    data: {
      type: Array,
      value: [] as Record<string, any>[],
    },
    loading: {
      type: Boolean,
      value: false,
    },
    rowKey: {
      type: String,
      value: "id",
    },
  },

  data: {
    tableData: [] as TableData[],
  },

  observers: {
    data: function (data: Record<string, any>[]) {
      if (!data || !data.length) return;

      if (data.length === 1 && data[0]._m_id) {
        console.error("m-table中请指定一个唯一的id作为rowKey");
      }

      this.setData({
        tableData: data.map((item, index) => ({
          ...item,
          _m_id: item[this.data.rowKey] ?? item.id ?? index,
        })),
      });
    },
  },

  methods: {
    onCellClick(e: WechatMiniprogram.TouchEvent) {
      const rowKey = e.currentTarget.dataset.rowKey;
      const rowData = this.data.tableData.find((item) => item._m_id === rowKey);
      const columnIndex = e.currentTarget.dataset.columnIndex;
      const column = this.data.columns[columnIndex];

      this.triggerEvent("cellClick", { rowKey, rowData, column });
    },

    onRenderClick(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent("renderClick", e.detail);
    },
  },
});
