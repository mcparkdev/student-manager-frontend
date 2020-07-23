import React, { Component } from "react";
import CourseCreate from "./CourseCreate";
import CourseEdit from "./CourseEdit";
import SkeletonGeneric from "../SkeletonGeneric";
import { Redirect } from "react-router-dom";
import { message } from "antd";
import CourseLeft from "./CourseLeft";
import CourseRight from "./CourseRight";

class Course extends Component {
  state = {
    redirectDelete: false,
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
      this.setState({ redirectDelete: true });
      this.props.resetList();
    });
  };

  onCancelDelete = () => {
    message.error("삭제 취소");
  };

  giveCourse = (courseID) => {
    return this.props.courseList
      ? this.props.courseList.find((course) => courseID === course.id)
      : {};
  };

  givePeriodByCourse = (course) => {
    return course !== undefined ? course.period : {};
  };
  giveStaffByCourse = (courseID) => {
    const staff =
      this.props.staffList !== undefined &&
      this.props.courseList[0] !== undefined
        ? this.props.staffList.filter((staff) => {
            return (
              staff.course.filter((course) => {
                return course.id === courseID;
              }).length > 0
            );
          })[0]
        : {};
    return staff !== undefined ? staff : { name: "없음" };
  };
  giveStudentListByCourse = (courseID) => {
    return this.props.studentList !== undefined &&
      this.props.courseList[0] !== undefined
      ? this.props.studentList.filter((student) => {
          return (
            student.course.filter((course) => {
              return course.id === courseID;
            }).length > 0
          );
        })
      : [];
  };
  giveCourseData = (course) => {
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
  };

  render() {
    const courseID = parseInt(this.props.match.params.courseID);
    const studentList = this.giveStudentListByCourse(courseID);
    const staffData = this.giveStaffByCourse(courseID);
    const courseData = this.giveCourseData(this.giveCourse(courseID));
    const periodData = this.givePeriodByCourse(courseData);
    const editProps =
      courseData.id !== undefined && this.props.courseList[0] !== undefined
        ? {
            courseData,
            studentList,
            staffData,
            periodData,
          }
        : {
            courseData: this.props.courseList[0],
          };
    const loading =
      this.props.loadingGET ||
      this.props.loadingPOST ||
      this.props.loadingDELETE ||
      this.props.loadingPUT;
    // console.log(this.props);
    return (
      <React.Fragment>
        {this.state.redirectDelete && <Redirect to="/courses/" />}
        <SkeletonGeneric loading={loading} avatar={true} />
        {!loading && (
          <React.Fragment>
            <CourseLeft
              {...this.props}
              staffData={staffData}
              courseData={courseData}
            />
            <CourseRight
              {...this.props}
              {...editProps}
              onConfirmDelete={this.onConfirmDelete}
              onCancelDelete={this.onCancelDelete}
            />
            <CourseCreate
              {...this.props}
              onClickCreate={this.props.onClickCreate}
              visible={this.props.state.createView}
            />
            <CourseEdit
              {...this.props}
              id={this.state.currentCourseID}
              onClickEdit={this.props.onClickEdit}
              visible={this.props.state.editView}
              {...editProps}
            />
            {courseData === undefined &&
              !this.props.loadingCourseGET &&
              !this.props.loadingCoursePOST && (
                <h1>
                  Course with ID "{this.props.match.params.courseID}" doesn't
                  exist
                </h1>
              )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Course;
