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
  generic?: boolean;
  headerStyle?: string;
  cellStyle?: string | ((row: TableData) => string);
}

interface TableData {
  [key: string]: any;
  _m_id: string | number;
}

interface SelectEvent {
  selectedRowKeys: (string | number)[];
  selectedRows: TableData[];
}

Component({
  options: {
    addGlobalClass: true, // 启用组件样式共享
  },

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
    selectable: {
      type: Boolean,
      value: false,
    },
    selectedRowKeys: {
      type: Array,
      value: [] as string[],
    },
    MHeaderClass: {
      type: String,
    },
    MRowClass: {
      type: String,
    },
  },

  data: {
    tableData: [] as TableData[],
  },

  observers: {
    "data,columns": function (
      data: Record<string, any>[],
      columns: ColumnItem[],
    ) {
      if (!data || !data.length) return;
      if (!columns || !columns.length) return;

      if (data.length === 1 && data[0]._m_id) {
        console.error("m-table中请指定一个唯一的id作为rowKey");
      }

      const tableData = data.map((item, index) => ({
        ...item,
        _m_id: item[this.data.rowKey] ?? item.id ?? index,
      }));

      // 处理自定义渲染
      const renderedCells: Record<string, string> = {};
      tableData.forEach((row) => {
        columns.forEach((column) => {
          if (column.cellStyle) {
            const cellKey = `${row._m_id}_${column.dataIndex}`;
            renderedCells[cellKey] =
              typeof column.cellStyle == "function"
                ? column.cellStyle(row)
                : column.cellStyle || "";
          }
        });
      });

      this.setData({
        tableData: tableData,
        renderedCells,
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

    onHeaderCellClick(e: WechatMiniprogram.TouchEvent) {
      const columnIndex = e.currentTarget.dataset.columnIndex;
      const column = this.data.columns[columnIndex];

      this.triggerEvent("headerCellClick", { column });
    },

    onRenderClick(e: WechatMiniprogram.CustomEvent) {
      this.triggerEvent("renderClick", e.detail);
    },

    onCheckboxChange(e: WechatMiniprogram.CustomEvent) {
      const { isChecked } = e.detail;
      const { rowKey } = e.currentTarget.dataset;
      const selectedKeys = [...this.data.selectedRowKeys];

      if (isChecked) {
        selectedKeys.push(rowKey);
      } else {
        const index = selectedKeys.indexOf(rowKey);
        if (index > -1) {
          selectedKeys.splice(index, 1);
        }
      }

      const selectedRows = this.data.tableData.filter(
        (item) => selectedKeys.indexOf(item._m_id) > -1,
      );

      this.setData({ selectedRowKeys: selectedKeys });
      this.triggerEvent("selectChange", {
        selectedRowKeys: selectedKeys,
        selectedRows,
      });
    },

    onCheckAll(e: WechatMiniprogram.CustomEvent) {
      const { isChecked } = e.detail;
      const selectedKeys = isChecked
        ? this.data.tableData.map((item) => item._m_id)
        : [];

      const selectedRows = isChecked ? [...this.data.tableData] : [];

      this.setData({ selectedRowKeys: selectedKeys });
      this.triggerEvent("selectChange", {
        selectedRowKeys: selectedKeys,
        selectedRows,
      });
    },
  },
});
