## day 09 删除 Record

### 本节目标:实现删除操作

- 1.设置监听函数,发送请求,删除记录
- 2.更新表单

1.设置监听函数

参考网址,仿照方法:

![0804](http://ww1.sinaimg.cn/large/006pJUwqgy1fwq3f43xqpj30r605baa6.jpg)

`src\components\Records.js`:

```js
deleteRecord(){
    // console.log(record,"1");看看删除的记录对不对,然后设置状态将页面刷新
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter( (item, index) => index !== recordIndex);
    this.setState({
      records: newRecords
    });
}

render() {
    ...
<tbody>
            {records.map(record => (
              <Record key={record.id}
              record = {record} 
              handleEditRecord = {this.updateRecord.bind(this)}
              handleDeleteRecord = {this.deleteRecord.bind(this)}
              />
</tbody>
              ...
}
```



1.1`绑定事件`:

`src\components\Record.js`

```js
import React, { Component } from "react";
import PropTypes from "prop-types"; //添加这一行导入静态检查的库
import * as RecordsAPI from '../utils/RecordsAPI';//导入api
export default class Record extends Component {
  constructor() {...}

  handleToggle(){...}

  handleEdit(event){...}

  handleDelete(event){
  //1.2在这里创建函数
      //1-2.1  console.log(record);
      //传递函数给子组件
    event.preventDefault();
    RecordsAPI.remove(this.props.record.id).then(
      response => this.props.handleDeleteRecord(this.props.record)
    ).catch(
      error => console.log(error.message)
    )
  }
//1.1给删除按钮绑定事件
  recordRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.amount}</td>

        <td>
          <button className="btn btn-info mr-1" onClick = {this.handleToggle.bind(this)}>Edit</button>
          <button className="btn btn-danger" onClick = {this.handleDelete.bind(this)}>Delete</button>
        </td>
      </tr>
    );
  }
  /*
  提取表单,输入框   默认值 defaultValue = {this.props.date}
   */
  RecordForm(){...}

Record.propTypes = {...};
```

添加Api:`src\utils\RecordsAPI.js`:

```js
...
export const remove = (id) => axios.delete(`${api}/api/v1/records/${id}`);
```

[![Edit 09-delete-records](https://codesandbox.io/static/img/play-codesandbox.svg)](
