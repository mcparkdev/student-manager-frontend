import React, { Component } from "react";
import { Table } from "antd";
import { NavLink } from "react-router-dom";
import PayTag from "../../../PayTag";
import Edit from "../crud/Edit";
import Delete from "../crud/Delete";
// import NumberFormat from "react-number-format";

export default class StudentTable extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };
  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
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
    const rawData = this.props.studentList;
    const data = rawData.map((student) => {
      return {
        ...student,
        key: student.studentID,
        course: student.course[0].name,
        fee: student.course[0].fee,
      };
    });
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "학생 ID",
        dataIndex: "studentID",
        key: "studentID",
        filteredValue: filteredInfo.studentID || null,
        sorter: (a, b) => a.studentID - b.studentID,
        sortOrder: sortedInfo.columnKey === "studentID" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "이름",
        dataIndex: "firstName",
        key: "firstName",
        filteredValue: filteredInfo.firstName || null,
        onFilter: (value, record) => record.firstName.includes(value),
        sorter: (a, b) => this.sortText(a.firstName, b.firstName),
        sortOrder: sortedInfo.columnKey === "firstName" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "성",
        dataIndex: "lastName",
        key: "lastName",
        filteredValue: filteredInfo.lastName || null,
        onFilter: (value, record) => record.lastName.includes(value),
        sorter: (a, b) => this.sortText(a.lastName, b.lastName),
        sortOrder: sortedInfo.columnKey === "lastName" && sortedInfo.order,
        ellipsis: true,
      },
      // {
      //   title: "강의",
      //   dataIndex: "course",
      //   key: "course",
      //   filters: [
      //     { text: "입문-A반", value: "입문-A반" },
      //     { text: "입문-B반", value: "입문-B반" },
      //     { text: "초급-A반", value: "초급-A반" },
      //     { text: "중급-A반", value: "중급-A반" },
      //   ],
      //   filteredValue: filteredInfo.course || null,
      //   onFilter: (value, record) => record.course.includes(value),
      //   sorter: (a, b) => this.sortText(a.course, b.course),
      //   sortOrder: sortedInfo.columnKey === "course" && sortedInfo.order,
      //   ellipsis: true,
      // },
      // {
      //   title: "등록급",
      //   dataIndex: "fee",
      //   key: "fee",
      //   render: (text) => (
      //     <NumberFormat
      //       value={text}
      //       displayType={"text"}
      //       thousandSeparator={true}
      //       prefix={"$ "}
      //     />
      //   ),
      //   sorter: (a, b) => a.fee - b.fee,
      //   sortOrder: sortedInfo.columnKey === "fee" && sortedInfo.order,
      //   ellipsis: true,
      // },
      {
        title: "납부현황",
        dataIndex: "payedCourse",
        key: "payedCourse",
        render: (text) => (
          <React.Fragment>
            <PayTag payedCourse={text} />
          </React.Fragment>
        ),
        filters: [
          { text: "완료", value: true },
          { text: "예정", value: false },
        ],
        filteredValue: filteredInfo.payedCourse || null,
        onFilter: (value, record) => record.payedCourse === value,
        sorter: (a, b) => a.payedCourse - b.payedCourse,
        sortOrder: sortedInfo.columnKey === "payedCourse" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "자세히",
        dataIndex: "id",
        key: "id",
        render: (text) => <NavLink to={`/students/${text}`}>자세히</NavLink>,
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "수정",
        dataIndex: "id",
        key: "id",
        render: (id) => (
          <Edit
            label="수정"
            onClickEdit={() => this.props.setCurrentStudentID(id)}
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
        {/* <Space style={{ margin: "16px 0" }}>
          <Button onClick={this.clearFilters}>필터 지우기</Button>
          <Button onClick={this.clearAll}>필터 및 순서 지우기</Button>
        </Space> */}
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          size="small"
        />
      </div>
    );
  }
}
