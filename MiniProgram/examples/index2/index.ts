Page({
  data: {
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        width: 300,
        cellStyle: function (row: any) {
          if (row.id !== "2") {
            return "color: #1890ff; text-decoration: underline;text-underline-offset: 4rpx;";
          } else return "";
        },
      },
      {
        title: "年龄",
        dataIndex: "age",
        width: 200,
        cellStyle: "color: orange",
      },
      {
        title: "地址",
        dataIndex: "address",
        headerStyle: "color: red;font-weight:bold;",
        width: 500,
      },
      {
        title: "操作",
        width: 300,
        generic: true,
      },
    ],
    data: [
      { id: "1", name: "张三", age: 25, address: "北京市朝阳区广渠路" },
      { id: "2", name: "李四", age: 30, address: "上海市浦东新区世纪大道" },
      { id: "3", name: "王五", age: 28, address: "广州市天河区" },
      { id: "4", name: "赵六", age: 11, address: "深圳市福田区竹子林" },
      { id: "5", name: "丁七", age: 99, address: "北京市海淀区成府路" },
    ],
    loading: false,
    selectedRowKeys: ["2"],
  },

  onCellClick(e: TouchEventType) {
    const { rowKey, rowData, column } = e.detail;

    console.log("rowKey", rowKey);
    console.log("rowData", rowData);
    console.log("column", column);
  },

  onHeaderCellClick(e: TouchEventType) {
    const { column } = e.detail;

    console.log("表头点击", column);
  },

  onRenderClick(e: TouchEventType) {
    const { type, rowData } = e.detail;

    if (type === "remove") {
      wx.showModal({
        title: "提示",
        content: "确定要删除该条数据吗？",
        success: (res) => {
          if (res.confirm) {
            const newData = this.data.data.filter(
              (item) => item.id !== rowData.id,
            );
            const newSelectedRowKeys = this.data.selectedRowKeys.filter(
              (item) => item !== rowData.id,
            );
            this.setData({
              data: newData,
              selectedRowKeys: newSelectedRowKeys,
            });
            wx.showToast({
              title: "删除成功",
              icon: "success",
            });
          }
        },
      });
    } else if (type === "edit") {
      console.log("编辑", rowData);

      wx.showModal({
        content: `跳转到id=${rowData.id}的编辑页面`,
        showCancel: false,
      });
    }
  },

  onSelectChange(e: TouchEventType) {
    const { selectedRowKeys, selectedRows } = e.detail;

    this.setData({
      selectedRowKeys: selectedRowKeys,
    });
  },
});
