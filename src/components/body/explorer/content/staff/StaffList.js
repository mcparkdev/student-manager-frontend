import React, { Component } from "react";

import StaffCreate from "./StaffCreate";
import StaffEdit from "./StaffEdit";
import StaffListLeft from "./StaffListLeft";
import StaffListRight from "./StaffListRight";

import { message } from "antd";

class StaffList extends Component {
  state = {
    currentStaffID: 1,
  };

  setCurrentStaffID = (ID) => {
    this.setState({ currentStaffID: ID });
    this.props.onClickEdit(true);
  };

  onConfirmDelete = (staffID) => {
    this.props.deleteStaff(staffID);
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

  giveStaff = (staffID) => {
    return this.props.staffList !== undefined
      ? this.props.staffList.filter((staff) => staffID === staff.id)[0]
      : {};
  };
  givePeriodListByStaff = (staff) => {
    return staff !== undefined
      ? staff.course
          .map((course) => {
            return course.period;
          })
          .map((period) => {
            return {
              ...period,
              sortDate: new Date(period.startDate),
            };
          })
          .sort((a, b) => b.sortDate - a.sortDate)
      : [];
  };

  giveCourseByStaff = (staff) => {
    return staff.course !== undefined
      ? staff.course
          .map((course) => {
            return {
              ...course,
              sortDate: new Date(course.period.startDate),
            };
          })
          .sort((a, b) => b.sortDate - a.sortDate)[0]
      : {};
  };
  giveStudentListByCourse = (courseID) => {
    return this.props.studentList !== undefined
      ? this.props.studentList.filter((student) => {
          return (
            student.course.filter((studentCourse) => {
              return courseID === studentCourse.id;
            }).length > 0
          );
        })
      : [];
  };
  giveCurrentCourseListByStaff = (staff, period) => {
    return staff.course !== undefined && period !== undefined
      ? staff.course
          .filter((course) => {
            return course.period.id === period.id;
          })
          .map((course) => {
            return {
              ...course,
              studentList: this.giveStudentListByCourse(course.id),
            };
          })
      : [];
  };

  render() {
    const { currentStaffID } = this.state;
    const staffData = this.giveStaff(currentStaffID);
    const periodList = this.givePeriodListByStaff(staffData);
    const periodData = periodList[0];
    const courseData = this.giveCourseByStaff(staffData);
    const sortedPeriodList =
      this.props.periodList !== undefined &&
      this.props.periodList
        .map((period) => {
          return {
            ...period,
            sortDate: new Date(period.startDate),
          };
        })
        .sort((a, b) => b.sortDate - a.sortDate);
    const currentPeriod = sortedPeriodList[0];
    const studentList =
      courseData !== undefined
        ? this.giveStudentListByCourse(courseData.id)
        : [];
    // const currentCourseList = this.props.courseList.filter((course) => {
    //   return course.period.id === periodData.id;
    // });
    const currentStaffList = this.props.staffList.filter((staff) => {
      return (
        staff.course.filter((course) => {
          return course.period.id === currentPeriod.id;
        }).length > 0
      );
    });
    const editProps =
      courseData !== undefined
        ? {
            courseData,
            studentList,
            staffData,
            periodData,
          }
        : {
            staffData: this.props.staffList[0],
          };
    // console.log(this.giveStudentListByCourse(4));
    // console.log(currentStaffList);
    return (
      <React.Fragment>
        {editProps.courseData !== undefined && (
          <React.Fragment>
            <StaffEdit
              {...this.props}
              id={this.state.currentStaffID}
              onClickEdit={this.props.onClickEdit}
              visible={this.props.state.editView}
              {...editProps}
            />
            <StaffCreate
              {...this.props}
              onClickCreate={this.props.onClickCreate}
              visible={this.props.state.createView}
            />
            <StaffListLeft
              {...this.props}
              staffList={currentStaffList}
              giveCurrentCourseListByStaff={this.giveCurrentCourseListByStaff}
              periodData={currentPeriod}
            />
            <StaffListRight
              {...this.props}
              currentStaffList={currentStaffList}
              giveCourseByStaff={this.giveCourseByStaff}
              setCurrentStaffID={this.setCurrentStaffID}
              onConfirmDelete={this.onConfirmDelete}
              onCancelDelete={this.onCancelDelete}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default StaffList;
