import React, { Component } from "react";
import { Table } from "antd";
import { NavLink } from "react-router-dom";

class StaffHistory extends Component {
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
    let rawData = this.props.data;
    const data =
      rawData !== undefined &&
      rawData.map((course) => {
        return {
          ...course,
          period: `${course.period.year}/${course.period.name}`,
          periodRange: `${course.period.startDate}~${course.period.endDate}`,
        };
      });
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "학기",
        dataIndex: "period",
        key: "period",
        sorter: (a, b) => this.sortText(a.period, b.period),
        sortOrder: sortedInfo.columnKey === "period" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "수업명",
        dataIndex: "name",
        key: "name",
        filters: [
          { text: "입문-A반", value: "입문-A반" },
          { text: "입문-B반", value: "입문-B반" },
          { text: "초급-A반", value: "초급-A반" },
          { text: "중급-A반", value: "중급-A반" },
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => this.sortText(a.name, b.name),
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "학기기간",
        dataIndex: "periodRange",
        key: "periodRange",
        sorter: (a, b) => this.sortText(a.periodRange, b.periodRange),
        sortOrder: sortedInfo.columnKey === "periodRange" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "교사 봉사료",
        dataIndex: "salary",
        key: "salary",
        render: (text) => <React.Fragment>${text}</React.Fragment>,
        sorter: (a, b) => a.salary - b.salary,
        sortOrder: sortedInfo.columnKey === "salary" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "자세히",
        dataIndex: "id",
        key: "id",
        render: (text) => (
          <NavLink to={`/courses/${text}`}>자세히 보기</NavLink>
        ),
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
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
          rowKey="id"
        />
      </div>
    );
  }
}

export default StaffHistory;
