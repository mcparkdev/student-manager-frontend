import React, { Component } from "react";
import { Table } from "antd";
import { NavLink } from "react-router-dom";
// import NumberFormat from "react-number-format";
import Edit from "../crud/Edit";
import Delete from "../crud/Delete";

export default class StaffTable extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  sortText = (a, b) => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    if (nameA < nameB)
      //sort string ascending
      return -1;
    if (nameA > nameB) return 1;
    return 0; //default return value (no sorting)
  };

  render() {
    // console.log(this.props.staffList);
    const staffList = this.props.staffList;
    const data = staffList.map((staff) => {
      const course = this.props.giveCourseByStaff(staff);
      return course !== undefined
        ? {
            ...staff,
            courseName: course !== undefined ? course.name : "",
            salary: course.salary,
          }
        : {
            ...staff,
            courseName: "없음",
            salary: 0,
          };
    });
    // console.log(data);
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "성명",
        dataIndex: "name",
        key: "name",
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => this.sortText(a.name, b.name),
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
        ellipsis: true,
      },
      // {
      //   title: "영문성명",
      //   dataIndex: "englishName",
      //   key: "englishName",
      //   filteredValue: filteredInfo.englishName || null,
      //   onFilter: (value, record) => record.englishName.includes(value),
      //   sorter: (a, b) => this.sortText(a.englishName, b.englishName),
      //   sortOrder: sortedInfo.columnKey === "englishName" && sortedInfo.order,
      //   ellipsis: true,
      // },
      {
        title: "강의명",
        dataIndex: "courseName",
        key: "courseName",
        filters: [
          { text: "입문-A반", value: "입문-A반" },
          { text: "입문-B반", value: "입문-B반" },
          { text: "초급-A반", value: "초급-A반" },
          { text: "중급-A반", value: "중급-A반" },
        ],
        filteredValue: filteredInfo.courseName || null,
        onFilter: (value, record) => record.courseName.includes(value),
        sorter: (a, b) => this.sortText(a.courseName, b.courseName),
        sortOrder: sortedInfo.columnKey === "courseName" && sortedInfo.order,
        ellipsis: true,
      },
      // {
      //   title: "강사 활동비",
      //   dataIndex: "salary",
      //   key: "salary",
      //   render: (text) => (
      //     <NumberFormat
      //       value={text}
      //       displayType={"text"}
      //       thousandSeparator={true}
      //       prefix={"$ "}
      //     />
      //   ),
      //   sorter: (a, b) => a.salary - b.salary,
      //   sortOrder: sortedInfo.columnKey === "salary" && sortedInfo.order,
      //   ellipsis: true,
      // },
      {
        title: "자세히",
        dataIndex: "id",
        key: "id",
        render: (text) => <NavLink to={`/staffs/${text}`}>자세히</NavLink>,
        ellipsis: true,
      },
      {
        title: "수정",
        dataIndex: "id",
        key: "id",
        render: (id) => (
          <Edit
            label="수정"
            onClickEdit={() => this.props.setCurrentStaffID(id)}
          />
        ),
        ellipsis: true,
      },
      {
        title: "삭제",
        dataIndex: "id",
        key: "id",
        render: (id) => (
          <Delete
            label="삭제"
            onConfirmDelete={() => this.props.onConfirmDelete(id)}
            onCancelDelete={this.props.onCancelDelete}
          />
        ),
        ellipsis: true,
      },
    ];
    return (
      <div className="table-with-buttons">
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          size="small"
          pagination={{ pageSize: 10 }}
          // scroll={{ y: 240 }}
          rowKey="id"
        />
      </div>
    );
  }
}
