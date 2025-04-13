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

| 属性名          | 类型    | 默认值 | 必填 | 说明                 |
| --------------- | ------- | ------ | ---- | -------------------- |
| columns         | Array   | []     | 是   | 表格列的配置数组     |
| data            | Array   | []     | 是   | 表格数据数组         |
| loading         | Boolean | false  | 否   | 表格加载状态         |
| rowKey          | String  | 'id'   | 否   | 行数据的唯一标识字段 |
| ------          | ----    | ------ | ---- | ----                 |
| selectable      | Boolean | false  | 否   | 是否启用选择功能     |
| selectedRowKeys | Array   | []     | 否   | 选中行的 key 数组    |

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

| 事件名          | 说明             | 回调参数                                            |
| --------------- | ---------------- | --------------------------------------------------- |
| cellClick       | 单元格点击事件   | {rowKey, rowData, column}                           |
| headerCellClick | 表头点击事件     | {column}                                            |
| renderClick     | 自定义渲染事件   | {自定义参数}                                        |
| selectChange    | 选择状态变化事件 | {selectedRowKeys: string[], selectedRows: object[]} |

## 使用示例

见 `example` 目录下的示例代码

## 注意事项

1. 确保数据源中的每条数据都有唯一的 `id` 字段，或通过 `rowKey` 属性指定其他唯一标识字段
2. 列宽度单位为 rpx，如不指定则自适应
3. loading 状态下会显示加载动画，并且表格内容会被遮罩
4. 复杂单元格可以使用 `generic` 传入一个抽象节点组件来自定义渲染，简单改变样式可以使用 `cellStyle`
5. 如果需要使用选择功能，需要在列定义中设置 `selectable` 属性为 true，并在页面中绑定 `selectChange` 事件

- 需要把 MCheckbox 组件的选中图片替换，否则首次加载时选中状态显示的较慢
