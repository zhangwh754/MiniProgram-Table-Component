# MTable 表格组件

一个简单易用的微信小程序表格组件，支持基础的表格展示功能和加载状态。

## 功能特点

- 支持自定义列配置
- 支持表格加载状态
- 支持行点击和单元格点击事件
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

| 属性名    | 类型   | 必填 | 说明                       |
| --------- | ------ | ---- | -------------------------- |
| title     | String | 是   | 列标题                     |
| dataIndex | String | 是   | 列数据在数据项中对应的路径 |
| width     | Number | 否   | 列宽度，单位 rpx           |

### 事件

| 事件名    | 说明           | 回调参数                  |
| --------- | -------------- | ------------------------- |
| cellClick | 单元格点击事件 | {rowKey, rowData, column} |

## 使用示例

```wxml
<MTable
  columns="{{columns}}"
  data="{{data}}"
  loading="{{loading}}"
  bind:cellClick="onCellClick"
/>
```

```js
Page({
  data: {
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
        width: 200,
      },
      {
        title: "年龄",
        dataIndex: "age",
      },
      {
        title: "地址",
        dataIndex: "address",
      },
    ],
    data: [
      {
        id: "1",
        name: "张三",
        age: 18,
        address: "北京市",
      },
      {
        id: "2",
        name: "李四",
        age: 20,
        address: "上海市",
      },
    ],
    loading: false,
  },

  onCellClick(e) {
    const { rowKey, rowData, column } = e.detail;
    console.log("单元格点击", rowKey, rowData, column);
  },
});
```

## 注意事项

1. 确保数据源中的每条数据都有唯一的 `id` 字段，或通过 `rowKey` 属性指定其他唯一标识字段
2. 列宽度单位为 rpx，如不指定则自适应
3. loading 状态下会显示加载动画，并且表格内容会被遮罩
