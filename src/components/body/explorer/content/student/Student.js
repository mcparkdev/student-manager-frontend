import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import SkeletonGeneric from "../SkeletonGeneric";
// import StudentCreate from "./StudentCreate";
import StudentEdit from "./StudentEdit";
import { message } from "antd";
import StudentLeft from "./StudentLeft";
import StudentRight from "./StudentRight";
import StudentCreate from "../student/StudentCreate";

class Student extends Component {
  state = {
    redirectDelete: false,
  };

  onConfirmDelete = (studentID) => {
    this.props.deleteStudent(studentID);
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
  render() {
    const studentID = parseInt(this.props.match.params.studentID);

    const studentList = this.props.studentList.map((student) => {
      return {
        ...student,
        course: student.course
          .map((course) => {
            return {
              ...course,
              sortDate: new Date(course.period.startDate),
            };
          })
          .sort((a, b) => b.sortDate - a.sortDate)
          .map((course) => {
            let studentList = this.props.studentList.filter((student) => {
              return (
                student.course.find((studentCourse) => {
                  return studentCourse.id === course.id;
                }) !== undefined
              );
            });
            let staff = this.props.staffList.find((staff) => {
              return (
                staff.course.find((staffCourse) => {
                  return staffCourse.id === course.id;
                }) !== undefined
              );
            });
            if (studentList === undefined) studentList = [];
            if (staff === undefined) staff = {};

            return {
              ...course,
              studentList,
              staff,
            };
          }),
      };
    });
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
    const studentData = studentList.find((student) => student.id === studentID);
    const editProps = {
      studentData,
      studentList,
      currentPeriod,
    };
    const loading =
      this.props.loadingGET ||
      this.props.loadingPOST ||
      this.props.loadingPATCH ||
      this.props.loadingDELETE ||
      this.props.loadingPUT;
    return (
      <React.Fragment>
        {this.state.redirectDelete && <Redirect to="/students/" />}
        <SkeletonGeneric loading={this.props.loadingStudentGET} />
        {!loading && (
          <React.Fragment>
            <StudentLeft {...this.props} {...editProps} />
            <StudentRight
              {...this.props}
              {...editProps}
              onConfirmDelete={this.onConfirmDelete}
              onCancelDelete={this.onCancelDelete}
            />
            <StudentCreate
              {...this.props}
              {...editProps}
              visible={this.props.state.createView}
            />
            <StudentEdit
              {...this.props}
              studentData={studentData}
              id={this.state.currentStudentID}
              onClickEdit={this.props.onClickEdit}
              visible={this.props.state.editView}
              // {...editProps}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Student;
