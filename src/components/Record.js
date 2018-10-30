import React, { Component } from "react";
import PropTypes from "prop-types"; //æ·»å è¿ä¸è¡å¯¼å¥éææ£æ¥çåº
import * as RecordsAPI from "../utils/RecordsAPI"; //å¯¼å¥api
export default class Record extends Component {
  constructor() {
    super();
    this.state = {
      edit: false
    };
  }

  handleToggle() {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleEdit(event) {
    event.preventDefault();
    const record = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: Number.parseInt(this.refs.amount.value, 0)
    };
    // console.log(record);
    //å°å¾å°çå¼ä¼ è¿å»
    RecordsAPI.update(this.props.record.id, record)
      .then(response => {
        this.setState({ edit: false });
        this.props.handleEditRecord(this.props.record, response.data);
      })
      .catch(error => console.log(error.message));
  }

  handleDelete(event) {
    event.preventDefault();
    RecordsAPI.remove(this.props.record.id).then(
      response => this.props.handleDeleteRecord(this.props.record)
    ).catch(
      error => console.log(error.message)
    )
  }

  recordRow() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.amount}</td>

        <td>
          <button
            className="btn btn-info mr-1"
            onClick={this.handleToggle.bind(this)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={this.handleDelete.bind(this)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
  /*
  æåè¡¨å,è¾å¥æ¡   é»è®¤å¼ defaultValue = {this.props.date}
   */
  RecordForm() {
    return (
      <tr>
        <td>
          <input
            type="text"
            className="form-control"
            defaultValue={this.props.record.date}
            ref="date"
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            defaultValue={this.props.record.title}
            ref="title"
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            defaultValue={this.props.record.amount}
            ref="amount"
          />
        </td>

        <td>
          <button
            className="btn btn-info mr-1"
            onClick={this.handleEdit.bind(this)}
          >
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={this.handleToggle.bind(this)}
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  }

  render() {
    //æ¯tureä¸æ¾ç¤º,æ¯falseæ¾ç¤º,é»è®¤ä¸ºfalse(ä¸å¯ç¼è¾ç¶æ)
    if (this.state.edit) {
      return this.RecordForm();
    } else {
      return this.recordRow();
    }
  }
}

Record.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
};
