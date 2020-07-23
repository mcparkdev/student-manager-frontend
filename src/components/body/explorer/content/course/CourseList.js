import React, { Component } from "react";
import CourseCreate from "./CourseCreate";
import CourseEdit from "./CourseEdit";
import CourseListLeft from "./CourseListLeft";
import CourseListRight from "./CourseListRight";
import { message } from "antd";

class CourseList extends Component {
  state = {
    currentCourseID: 1,
  };

  setCurrentCourseID = (ID) => {
    this.setState({ currentCourseID: ID });
    this.props.onClickEdit(true);
  };

  onConfirmDelete = (courseID) => {
    this.props.deleteCourse(courseID);
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

  giveCourse = (courseID) => {
    return this.props.courseList !== undefined
      ? this.props.courseList.filter((course) => courseID === course.id)[0]
      : {};
  };
  givePeriodByCourse = (courseID) => {
    return this.props.courseList !== undefined
      ? this.props.courseList.filter((course) => course.id === courseID)[0]
          .period
      : {};
  };
  giveStaffListByCourse = (courseID) => {
    return this.props.staffList !== undefined
      ? this.props.staffList.filter((staff) => {
          return (
            staff.course.filter((course) => {
              return course.id === courseID;
            }).length > 0
          );
        })
      : [];
  };
  giveStudentListByCourse = (courseID) => {
    return this.props.studentList !== undefined
      ? this.props.studentList.filter((student) => {
          return (
            student.course.filter((course) => {
              return course.id === courseID;
            }).length > 0
          );
        })
      : [];
  };
  giveCurrentCourseList = (periodID) => {
    return this.props.courseList !== undefined
      ? this.props.courseList
          .filter((course) => {
            return course.period.id === periodID;
          })
          .map((course) => {
            return {
              ...course,
              studentList: this.props.studentList.filter((student) => {
                return (
                  student.course.filter((studentCourse) => {
                    return studentCourse.id === course.id;
                  }).length > 0
                );
              }),
              staffList: this.props.staffList.filter((staff) => {
                return (
                  staff.course.filter((staffCourse) => {
                    return staffCourse.id === course.id;
                  }).length > 0
                );
              }),
            };
          })
      : [];
  };

  render() {
    const { currentCourseID } = this.state;
    const course = this.giveCourse(currentCourseID);
    const editProps =
      course !== undefined
        ? {
            courseData: this.giveCourse(currentCourseID),
            studentList: this.giveStudentListByCourse(currentCourseID),
            staffList: this.giveStaffListByCourse(currentCourseID),
            periodData: this.givePeriodByCourse(currentCourseID),
          }
        : {
            courseData: this.props.courseList[0],
          };
    // console.log(currentCourseID);
    // console.log(editProps);
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
    // console.log(sortedPeriodList);
    const currentCourseList =
      sortedPeriodList[0] !== undefined
        ? this.giveCurrentCourseList(sortedPeriodList[0].id)
        : [];
    // console.log(currentCourseList);
    return (
      <React.Fragment>
        {editProps.courseData !== undefined && (
          <React.Fragment>
            <CourseEdit
              {...this.props}
              id={this.state.currentCourseID}
              onClickEdit={this.props.onClickEdit}
              visible={this.props.state.editView}
              {...editProps}
            />
            <CourseCreate
              {...this.props}
              onClickCreate={this.props.onClickCreate}
              visible={this.props.state.createView}
            />
            <CourseListLeft {...this.props} courseList={currentCourseList} />
            <CourseListRight
              {...this.props}
              currentCourseList={currentCourseList}
              setCurrentCourseID={this.setCurrentCourseID}
              onConfirmDelete={this.onConfirmDelete}
              onCancelDelete={this.onCancelDelete}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default CourseList;
