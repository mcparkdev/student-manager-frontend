import React, { Component } from "react";
// import BlockView from "../BlockView";
// import StudentTable from "./StudentTable";

import StudentCreate from "./StudentCreate";
import StudentEdit from "./StudentEdit";
import { message } from "antd";
import StudentListLeft from "./StudentListLeft";
import StudentListRight from "./StudentListRight";

class StudentList extends Component {
  state = {
    currentStudentID: 1,
  };

  setCurrentStudentID = (ID) => {
    this.setState({ currentStudentID: ID });
    this.props.onClickEdit(true);
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
      this.props.resetList();
    });
  };

  onCancelDelete = () => {
    message.error("삭제 취소");
  };

  giveStudent = (studentList, studentID) => {
    return studentList !== undefined
      ? studentList.find((student) => studentID === student.id)
      : {};
  };

  giveCurrentStudentList = (studentList, period) => {
    return studentList !== undefined
      ? studentList.filter((student) => {
          return (
            student.course.filter((course) => {
              return course.period.id === period.id;
            }).length > 0
          );
        })
      : [];
  };

  render() {
    const { currentStudentID } = this.state;
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
            return {
              ...course,
              studentList: this.props.studentList.filter((student) => {
                return student.course.find((studentCourse) => {
                  return studentCourse.id === course.id;
                });
              }),
              staff: this.props.staffList.find((staff) => {
                return staff.course.find((staffCourse) => {
                  return staffCourse.id === course.id;
                });
              }),
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
    const currentStudentList = this.giveCurrentStudentList(
      studentList,
      currentPeriod
    );
    const studentData = this.giveStudent(studentList, currentStudentID);
    const loading =
      this.props.loadingGET ||
      this.props.loadingPOST ||
      this.props.loadingDELETE ||
      this.props.loadingPATCH ||
      this.props.loadingPUT;
    // console.log(studentData);
    return (
      <React.Fragment>
        {!loading && (
          <React.Fragment>
            <StudentListLeft
              {...this.props}
              studentList={studentList}
              currentStudentList={currentStudentList}
            />
            <StudentListRight
              {...this.props}
              currentStudentList={currentStudentList}
              setCurrentStudentID={this.setCurrentStudentID}
              onConfirmDelete={this.onConfirmDelete}
              onCancelDelete={this.onCancelDelete}
            />
            <StudentEdit
              {...this.props}
              studentData={studentData}
              id={this.state.currentStudentID}
              onClickEdit={this.props.onClickEdit}
              visible={this.props.state.editView}
              // {...editProps}
            />
            <StudentCreate
              {...this.props}
              onClickCreate={this.props.onClickCreate}
              visible={this.props.state.createView}
            />
            {/* <StudentListLeft
              {...this.props}
              studentList={currentStudentList}
              giveCurrentCourseListByStudent={this.giveCurrentCourseListByStudent}
              periodData={currentPeriod}
            />
            <StudentListRight
              {...this.props}
              currentStudentList={currentStudentList}
              giveCourseByStudent={this.giveCourseByStudent}
              setCurrentStudentID={this.setCurrentStudentID}
              onConfirmDelete={this.onConfirmDelete}
              onCancelDelete={this.onCancelDelete}
            /> */}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default StudentList;
