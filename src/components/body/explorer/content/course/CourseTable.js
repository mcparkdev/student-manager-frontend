import React, { Component } from "react";
import { Table } from "antd";
// import { Space, Button } from "antd";
import { NavLink } from "react-router-dom";
import Edit from "../crud/Edit";
import Delete from "../crud/Delete";
// import NumberFormat from "react-number-format";

export default class CourseTable extends Component {
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

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };
  render() {
    // const periodData = this.props.periodData;
    const periodList = this.props.periodList;
    const courseList = this.props.courseList;
    // const staffList = this.props.staffList;
    const studentList = this.props.studentList;
    let year = "";
    const filterYear =
      periodList !== undefined
        ? periodList
            .filter((period) => {
              if (year === period.year) {
                return false;
              }
              year = period.year;
              return true;
            })
            .map((period) => {
              return { text: period.year, value: period.year };
            })
            .sort((a, b) => b.year - a.year)
        : {};
    let periodName = "";
    const filterPeriodName =
      periodList !== undefined
        ? periodList
            .filter((period) => {
              if (periodName === period.name) {
                return false;
              }
              periodName = period.name;
              return true;
            })
            .map((period) => {
              return { text: period.name, value: period.name };
            })
            .sort((a, b) => b.name - a.name)
        : {};
    const data = courseList
      // .filter((course) => {
      //   return periodList.length > 0 ? course.period.id === periodList[0].id : true;
      // })
      .map((course) => {
        return {
          ...course,
          startDate: new Date(course.period.startDate),
          timeRange: `${course.startTime.substring(
            0,
            course.startTime.length - 3
          )}~${course.endTime.substring(0, course.endTime.length - 3)}`,
          periodRange: `${
            new Date(course.period.startDate).getUTCMonth() + 1
          }.${new Date(course.period.startDate).getUTCDate()}~
          ${new Date(course.period.endDate).getUTCMonth() + 1}.${new Date(
            course.period.endDate
          ).getUTCDate()}`,
          periodYear: course.period.year,
          periodName: course.period.name,
          payedCourse: `${
            studentList.filter((student) => {
              return (
                student.course.filter((studentCourse) => {
                  return studentCourse.id === course.id;
                }).length > 0 && student.payedCourse
              );
            }).length
          }/${
            studentList.filter((student) => {
              return (
                student.course.filter((studentCourse) => {
                  return studentCourse.id === course.id;
                }).length > 0
              );
            }).length
          }`,
        };
      })
      .sort((a, b) => b.startDate - a.startDate);
    let courseName = "";
    const unique =
      courseList !== undefined
        ? courseList
            .filter((course) => {
              if (courseName === course.name) {
                return false;
              }
              courseName = course.name;
              return true;
            })
            .map((course) => {
              return { text: course.name, value: course.name };
            })
        : {};

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "연도",
        dataIndex: "periodYear",
        key: "periodYear",
        filters: filterYear,
        filteredValue: filteredInfo.course || null,
        onFilter: (value, record) => record.periodYear.includes(value),
        sorter: (a, b) => this.sortText(a.periodYear, b.periodYear),
        sortOrder: sortedInfo.columnKey === "periodYear" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "학기",
        dataIndex: "periodName",
        key: "periodName",
        filters: filterPeriodName,
        filteredValue: filteredInfo.course || null,
        onFilter: (value, record) => record.periodName.includes(value),
        sorter: (a, b) => this.sortText(a.periodName, b.periodName),
        sortOrder: sortedInfo.columnKey === "periodName" && sortedInfo.order,
        ellipsis: true,
      },
      // {
      //   title: "학기기간",
      //   dataIndex: "periodRange",
      //   key: "periodRange",
      //   sorter: (a, b) => this.sortText(a.periodRange, b.periodRange),
      //   sortOrder: sortedInfo.columnKey === "periodRange" && sortedInfo.order,
      //   ellipsis: true,
      // },
      // {
      //   title: "강의시간",
      //   dataIndex: "timeRange",
      //   key: "timeRange",
      //   sorter: (a, b) => this.sortText(a.timeRange, b.timeRange),
      //   sortOrder: sortedInfo.columnKey === "timeRange" && sortedInfo.order,
      //   ellipsis: true,
      // },
      {
        title: "강의명",
        dataIndex: "name",
        key: "name",
        filters: unique,
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => this.sortText(a.name, b.name),
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "납부현황",
        dataIndex: "payedCourse",
        key: "payedCourse",
        sorter: (a, b) => this.sortText(a.payedCourse, b.payedCourse),
        sortOrder: sortedInfo.columnKey === "payedCourse" && sortedInfo.order,
        ellipsis: true,
      },
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
        render: (text) => <NavLink to={`/courses/${text}`}>자세히</NavLink>,
        filteredValue: filteredInfo.id || null,
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "수정",
        dataIndex: "id",
        key: "id",
        render: (id) => {
          return (
            <React.Fragment>
              <Edit
                label="수정"
                onClickEdit={() => this.props.setCurrentCourseID(id)}
              />
            </React.Fragment>
          );
        },
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
    ].filter((column) => {
      if (this.props.hidePay === undefined) return true;
      else if (column.key === "payedCourse") return false;
      else return true;
    });

    return (
      <div className="table-with-buttons">
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          size="small"
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </div>
    );
  }
}
