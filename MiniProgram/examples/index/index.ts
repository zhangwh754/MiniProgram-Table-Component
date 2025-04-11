Page({
  data: {
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        width: 100,
      },
      {
        title: "年龄",
        dataIndex: "age",
        width: 80,
      },
      {
        title: "地址",
        dataIndex: "address",
        width: 200,
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
});
