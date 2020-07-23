import React, { Component } from "react";
// import Create from "../crud/Create";
// import BlockView from "../BlockView";
// import PeriodTable from "./PeriodTable";
import PeriodCreate from "./PeriodCreate";
import PeriodEdit from "./PeriodEdit";
import PeriodListLeft from "./PeriodListLeft";
import PeriodListRight from "./PeriodListRight";
import { message } from "antd";

class PeriodList extends Component {
  state = {
    currentPeriodID: 1,
  };

  setCurrentPeriodID = (ID) => {
    this.setState({ currentPeriodID: ID });
    this.props.onClickEdit(true);
  };

  onConfirmDelete = (periodID) => {
    this.props.deletePeriod(periodID);
    const key = "updatable";
    message.loading({ content: `삭제 중`, key });
    setTimeout(() => {
      message.success({
        content: `삭제 완료`,
        key,
        duration: 2,
      });
      this.props.resetList();
    });
  };

  onCancelDelete = () => {
    message.error("삭제 취소");
  };

  givePeriod = (periodID) => {
    return this.props.periodList !== undefined
      ? this.props.periodList.filter((period) => periodID === period.id)[0]
      : {};
  };
  giveCourseListByPeriod = (periodID) => {
    return this.props.courseList !== undefined
      ? this.props.courseList.filter((course) => periodID === course.period.id)
      : [];
  };
  giveStaffListByPeriod = (periodID) => {
    return this.props.staffList !== undefined
      ? this.props.staffList.filter((staff) => {
          return (
            staff.course.filter((course) => {
              return course.period.id === periodID;
            }).length > 0
          );
        })
      : [];
  };
  giveStudentListByPeriod = (periodID) => {
    return this.props.studentList !== undefined
      ? this.props.studentList.filter((student) => {
          return (
            student.course.filter((course) => {
              return course.period.id === periodID;
            }).length > 0
          );
        })
      : [];
  };

  render() {
    // console.log(this.props);
    const { currentPeriodID } = this.state;
    const period = this.givePeriod(currentPeriodID);
    const editProps =
      period !== undefined
        ? {
            periodData: this.givePeriod(currentPeriodID),
            studentList: this.giveStudentListByPeriod(currentPeriodID),
            staffList: this.giveStaffListByPeriod(currentPeriodID),
            courseList: this.giveCourseListByPeriod(currentPeriodID),
          }
        : {
            periodData: this.props.periodList[0],
          };
    // console.log(currentPeriodID);
    console.log(editProps);
    return (
      <React.Fragment>
        {editProps.periodData !== undefined && (
          <React.Fragment>
            <PeriodEdit
              {...this.props}
              id={this.state.currentPeriodID}
              onClickEdit={this.props.onClickEdit}
              visible={this.props.state.editView}
              {...editProps}
            />
            <PeriodCreate
              {...this.props}
              onClickCreate={this.props.onClickCreate}
              visible={this.props.state.createView}
            />
            <PeriodListLeft
              {...this.props}
              giveCourseListByPeriod={this.giveCourseListByPeriod}
              giveStaffListByPeriod={this.giveStaffListByPeriod}
              giveStudentListByPeriod={this.giveStudentListByPeriod}
            />
            <PeriodListRight
              {...this.props}
              // currentStaffList={currentStaffList}
              // giveCourseByStaff={this.giveCourseByStaff}
              setCurrentPeriodID={this.setCurrentPeriodID}
              onConfirmDelete={this.onConfirmDelete}
              onCancelDelete={this.onCancelDelete}
            />
          </React.Fragment>
        )}
        {/* <Create label="새로 만들기" onClickCreate={this.props.onClickCreate} />
        

        <div className="body-content-student-list">
          <BlockView title="학기명단">
            <PeriodTable
              {...this.props}
              setCurrentPeriodID={this.setCurrentPeriodID}
              onConfirmDelete={this.onConfirmDelete}
              onCancelDelete={this.onCancelDelete}
            />
          </BlockView>
        </div> */}
      </React.Fragment>
    );
  }
}

export default PeriodList;
