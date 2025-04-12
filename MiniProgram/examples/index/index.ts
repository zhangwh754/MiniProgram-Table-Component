Page({
  data: {
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        width: 100,
        cellStyle: function (row: any) {
          if (row.id !== "2") {
            return "color: #1890ff; text-decoration: underline;text-underline-offset: 4rpx;";
          } else return "";
        },
      },
      {
        title: "年龄",
        dataIndex: "age",
        width: 80,
        cellStyle: "color: orange",
      },
      {
        title: "地址",
        dataIndex: "address",
        headerStyle: "color: red;font-weight:bold;font-size:40rpx",
        width: 200,
      },
      {
        title: "操作",
        width: 200,
        generic: true,
      },
    ],
    data: [
      { id: "1", name: "张三", age: 25, address: "北京市朝阳区" },
      { id: "2", name: "李四", age: 30, address: "上海市浦东新区世纪大道" },
      { id: "3", name: "王五", age: 28, address: "广州市天河区" },
    ],
    loading: false,
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
            this.setData({
              data: newData,
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
});
