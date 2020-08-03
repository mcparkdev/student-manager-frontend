import React, { Component } from "react";
import { Table } from "antd";
import { NavLink } from "react-router-dom";
import NumberFormat from "react-number-format";
import Edit from "../crud/Edit";
import Delete from "../crud/Delete";

export default class PeriodTable extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };
  handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
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
    const periodList = this.props.periodList;
    // const courseList = this.props.courseList;
    const staffList = this.props.staffList;
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

    const data = periodList
      .map((period) => {
        const courseListFiltered =
          this.props.courseList !== undefined &&
          this.props.courseList.filter((course) => {
            return (
              period.id === (course.period !== null ? course.period.id : 0)
            );
          });
        console.log(courseListFiltered);
        let income = 0;
        let staffSalary = 0;
        if (courseListFiltered !== undefined) {
          courseListFiltered.map((course) => {
            income += parseInt(course.fee);
            staffSalary += parseInt(course.salary);
            return null;
          });
        }
        return {
          ...period,
          studentNum: studentList.filter((student) => {
            return (
              student.course.filter((course) => {
                return course.period.id === period.id;
              }).length > 0
            );
          }).length,

          staffNum: staffList.filter((staff) => {
            return (
              staff.course.filter((course) => {
                return course.period.id === period.id;
              }).length > 0
            );
          }).length,

          periodRange: `${
            new Date(period.startDate).getUTCMonth() + 1
          }.${new Date(period.startDate).getUTCDate()}~
          ${new Date(period.endDate).getUTCMonth() + 1}.${new Date(
            period.endDate
          ).getUTCDate()}`,
          // name: `${period.year}/${period.name}`,
          income,
          staffSalary,
          sortDate: new Date(period.startDate),
        };
      })
      .sort((a, b) => b.id - a.id);
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "연도",
        dataIndex: "year",
        key: "year",
        filters: filterYear,
        filteredValue: filteredInfo.course || null,
        onFilter: (value, record) => record.year.includes(value),
        sorter: (a, b) => this.sortText(a.year, b.year),
        sortOrder: sortedInfo.columnKey === "year" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "학기",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => this.sortText(a.name, b.name),
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
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
      //   title: "학생 수",
      //   dataIndex: "studentNum",
      //   key: "studentNum",
      //   render: (text) => `${text} 명`,
      //   sorter: (a, b) => a.studentNum - b.studentNum,
      //   sortOrder: sortedInfo.columnKey === "studentNum" && sortedInfo.order,
      //   ellipsis: true,
      // },
      // {
      //   title: "교사 수",
      //   dataIndex: "staffNum",
      //   key: "staffNum",
      //   render: (text) => `${text} 명`,
      //   sorter: (a, b) => a.staffNum - b.staffNum,
      //   sortOrder: sortedInfo.columnKey === "staffNum" && sortedInfo.order,
      //   ellipsis: true,
      // },
      {
        title: "총 수입",
        dataIndex: "income",
        key: "income",
        render: (text) => (
          <NumberFormat
            value={text}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$ "}
          />
        ),
        sorter: (a, b) => a.income - b.income,
        sortOrder: sortedInfo.columnKey === "income" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "총 비용",
        dataIndex: "staffSalary",
        key: "staffSalary",
        render: (text) => (
          <NumberFormat
            value={text}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$ "}
          />
        ),
        sorter: (a, b) => a.staffSalary - b.staffSalary,
        sortOrder: sortedInfo.columnKey === "staffSalary" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "자세히",
        dataIndex: "id",
        key: "id",
        render: (id) => <NavLink to={`/periods/${id}`}>자세히</NavLink>,

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
                onClickEdit={() => this.props.setCurrentPeriodID(id)}
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
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
          rowKey="id"
          // scroll={{ x: "max-content" }}
          // pagination={{ position: ["bottomRight", "topRight"] }}
        />
      </div>
    );
  }
}
