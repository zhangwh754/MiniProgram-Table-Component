# MTable 表格组件

一个简单易用的微信小程序表格组件，支持基础的表格展示功能和加载状态。

## 功能特点

- 支持自定义列配置
- 支持表格加载状态
- 支持单元格点击事件
- 自适应列宽
- 空数据状态展示

## 安装

1. 将 `MTable` 组件复制到你的项目中
2. 在页面的 json 配置文件中声明组件：

```json
{
  "usingComponents": {
    "MTable": "/components/MTable/index"
  }
}
```

## API

### 属性

| 属性名  | 类型    | 默认值 | 必填 | 说明                 |
| ------- | ------- | ------ | ---- | -------------------- |
| columns | Array   | []     | 是   | 表格列的配置数组     |
| data    | Array   | []     | 是   | 表格数据数组         |
| loading | Boolean | false  | 否   | 表格加载状态         |
| rowKey  | String  | 'id'   | 否   | 行数据的唯一标识字段 |

#### columns 列定义

| 属性名      | 类型                        | 必填 | 说明                         |
| ----------- | --------------------------- | ---- | ---------------------------- |
| title       | String                      | 是   | 列标题                       |
| dataIndex   | String                      | 是   | 列数据在数据项中对应的路径   |
| width       | Number                      | 否   | 列宽度，单位 rpx             |
| generic     | String                      | 否   | 是否使用自定义渲染           |
| headerStyle | String                      | 否   | 表头单元格样式               |
| cellStyle   | String \| ((row) => String) | 否   | 内容单元格样式，支持函数返回 |

### 事件

| 事件名          | 说明           | 回调参数                     |
| --------------- | -------------- | ---------------------------- |
| cellClick       | 单元格点击事件 | {rowKey, rowData, column}    |
| headerCellClick | 表头点击事件   | {column}                     |
| renderClick     | 自定义渲染事件 | {自定义参数} |

## 使用示例

```wxml
<MTable
  columns="{{columns}}"
  data="{{data}}"
  loading="{{loading}}"
  bind:cellClick="onCellClick"
  generic:CustomRender="Column"
  bind:headerCellClick="onHeaderCellClick"
  bind:cellClick="onCellClick"
  bind:renderClick="onRenderClick"
/>
```

```js
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
```

## 注意事项

1. 确保数据源中的每条数据都有唯一的 `id` 字段，或通过 `rowKey` 属性指定其他唯一标识字段
2. 列宽度单位为 rpx，如不指定则自适应
3. loading 状态下会显示加载动画，并且表格内容会被遮罩
4. 复杂单元格可以使用 `generic` 传入一个抽象节点组件来自定义渲染，简单改变样式可以使用 `cellStyle`
