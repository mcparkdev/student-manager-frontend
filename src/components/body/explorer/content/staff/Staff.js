import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import SkeletonGeneric from "../SkeletonGeneric";
import StaffCreate from "./StaffCreate";
import StaffEdit from "./StaffEdit";
import { message } from "antd";
import StaffLeft from "./StaffLeft";
import StaffRight from "./StaffRight";

class Staff extends Component {
  state = {
    redirectDelete: false,
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
      this.setState({ redirectDelete: true });
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
    const staffID = parseInt(this.props.match.params.staffID);
    const staffData = this.giveStaff(staffID);
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
    const currentCourseList = this.giveCurrentCourseListByStaff(
      staffData,
      currentPeriod
    );

    const editProps =
      staffData.id !== undefined
        ? {
            staffID,
            staffData,
            periodList: sortedPeriodList,
            periodData: currentPeriod,
            courseList: currentCourseList,
          }
        : {
            staffData: this.props.staffList[0],
          };
    console.log(this.props);
    const loading =
      this.props.loadingGET ||
      this.props.loadingPOST ||
      this.props.loadingPATCH ||
      this.props.loadingDELETE ||
      this.props.loadingPUT;

    return (
      <React.Fragment>
        {this.state.redirectDelete && <Redirect to="/staffs/" />}
        <SkeletonGeneric loading={this.props.loadingStaffGET} avatar={true} />
        {!loading && (
          <React.Fragment>
            <StaffLeft {...editProps} currentCourseList={currentCourseList} />
            <StaffRight
              {...this.props}
              staffData={staffData}
              onConfirmDelete={this.onConfirmDelete}
              onCancelDelete={this.onCancelDelete}
            />
            <StaffCreate
              {...this.props}
              {...editProps}
              visible={this.props.state.createView}
            />
            <StaffEdit
              {...this.props}
              {...editProps}
              id={staffData.id}
              visible={this.props.state.editView}
              courseList={this.props.courseList}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default Staff;
