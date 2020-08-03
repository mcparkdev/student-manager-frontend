import React, { Component } from "react";
import { Input, AutoComplete } from "antd";
import { NavLink, Redirect } from "react-router-dom";

const renderTitle = (title, label, count) => (
  <span>
    {`${title} (${count})`}
    <NavLink
      style={{
        float: "right",
      }}
      to={`/${label}/`}
    >
      더 보기
    </NavLink>
  </span>
);

const renderItem = (context) => ({
  value: context.name,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {context.label}
      <span></span>
    </div>
  ),
});

class ContentSearch extends Component {
  state = { input: "", redirect: false, path: "/" };

  componentDidMount() {
    this.setState({ redirect: false });
  }

  filterObject = (object, input, section) => {
    let filteredItems = [];
    if (object !== undefined) {
      const remove = ["createdAt", "updatedAt"];
      const filtered = Object.keys(object)
        .filter((key) => !remove.includes(key))
        .reduce((obj, key) => {
          obj[key] = object[key];
          return obj;
        }, {});
      filteredItems = Object.values(filtered)
        .filter((item) => {
          return item !== null && item !== "" && item !== undefined;
        })
        .filter((item) => {
          return item.toString().includes(input);
        });
      if (filteredItems !== "undefined" && filteredItems.length > 0) {
        return {
          name: `${section}/${object.id}`,
          items: filteredItems.join(" "),
          label:
            object.name === undefined
              ? `${object.firstName} ${object.lastName}`
              : object.name,
        };
      } else return null;
    } else return null;
  };

  filterArrayOfObjects = (array, input, section) => {
    let filteredArray = [];
    if (array !== undefined) {
      array.map((object) => {
        if (this.filterObject(object, input, section) !== null) {
          return (filteredArray = [
            ...filteredArray,
            this.filterObject(object, input, section),
          ]);
        }
        return false;
      });
      // console.log(filteredArray);
      return filteredArray.map((object) => renderItem(object));
    } else return "";
  };

  handleOnChange = (value) => {
    this.setState({ input: value });
  };

  handleOnSelect = (data) => {
    this.setState({ redirect: true });
    this.setState({ path: `/${data}` });
  };

  render() {
    const options =
      this.props.periodList !== undefined &&
      this.props.courseList !== undefined &&
      this.props.staffList !== undefined &&
      this.props.studentList !== undefined
        ? [
            {
              label: renderTitle(
                "학기",
                "periods",
                this.filterArrayOfObjects(
                  this.props.periodList,
                  this.state.input,
                  "학기"
                ).length
              ),
              options: this.filterArrayOfObjects(
                this.props.periodList,
                this.state.input,
                "periods"
              ),
            },
            {
              label: renderTitle(
                "수업",
                "courses",
                this.filterArrayOfObjects(
                  this.props.courseList,
                  this.state.input,
                  "수업"
                ).length
              ),
              options: this.filterArrayOfObjects(
                this.props.courseList,
                this.state.input,
                "courses"
              ),
            },
            {
              label: renderTitle(
                "교사",
                "staffs",
                this.filterArrayOfObjects(
                  this.props.staffList,
                  this.state.input,
                  "교사"
                ).length
              ),
              options: this.filterArrayOfObjects(
                this.props.staffList,
                this.state.input,
                "staffs"
              ),
            },
            {
              label: renderTitle(
                "학생",
                "students",
                this.filterArrayOfObjects(
                  this.props.studentList,
                  this.state.input,
                  "students"
                ).length
              ),
              options: this.filterArrayOfObjects(
                this.props.studentList,
                this.state.input,
                "students"
              ),
            },
          ]
        : [];
    const { redirect, path } = this.state;
    return (
      <React.Fragment>
        {redirect && <Redirect to={path} />}
        <AutoComplete
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={"100%"}
          options={options}
          onChange={this.handleOnChange}
          onSelect={this.handleOnSelect}
        >
          <Input.Search
            allowClear
            size="default"
            placeholder="검색어를 입력해주세요"
            loading={false}
            // style={{ width: "40vw" }}
          />
        </AutoComplete>
      </React.Fragment>
    );
  }
}

export default ContentSearch;
