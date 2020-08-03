import React, { Component } from "react";
// import BlockView from "../BlockView";
// import BlockListView from "../BlockListView";
// import PeriodProfile from "./PeriodProfile";
import PeriodCreate from "./PeriodCreate";
import PeriodEdit from "./PeriodEdit";
// import StudentTable from "../student/StudentTable";
import SkeletonGeneric from "../SkeletonGeneric";
// import Crud from "../crud/Crud";
import { Redirect } from "react-router-dom";
import { message } from "antd";
import PeriodLeft from "./PeriodLeft";
import PeriodRight from "./PeriodRight";

class Period extends Component {
  state = { redirectDelete: false };

  onConfirmDelete = () => {
    this.props.deletePeriod(this.props.periodData.id);
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

  giveCurrentCourseList = (courseList) => {
    return (
      courseList !== undefined &&
      courseList.map((course) => {
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
    );
  };

  render() {
    const periodID = parseInt(this.props.match.params.periodID);
    const periodData = this.givePeriod(periodID);
    const studentList = this.giveStudentListByPeriod(periodID);
    const staffList = this.giveStaffListByPeriod(periodID);
    const courseList = this.giveCourseListByPeriod(periodID);
    // const data =
    //   periodData !== undefined
    //     ? {
    //         generalLeft: [
    //           {
    //             key: "학기명",
    //             value: `${periodData.year}/${periodData.name}`,
    //           },
    //           { key: "학생 수", value: `${studentList.length} 명` },
    //           { key: "교사 수", value: `${staffList.length} 명` },
    //           {
    //             key: "납부현황",
    //             value: `${
    //               studentList.filter((student) => student.payedCourse).length
    //             }/${studentList.length} 완료`,
    //           },
    //         ],
    //       }
    //     : undefined;
    const editProps =
      periodData !== undefined
        ? {
            periodData,
            studentList,
            staffList,
            courseList,
          }
        : {
            periodData: this.props.periodList[0],
          };
    console.log(this.props);
    const loading =
      this.props.loadingGET ||
      this.props.loadingPOST ||
      this.props.loadingDELETE ||
      this.props.loadingPUT;

    return (
      <React.Fragment>
        {this.state.redirectDelete && <Redirect to="/periods" />}
        <SkeletonGeneric loading={loading} avatar={true} />
        {!loading && (
          <React.Fragment>
            <PeriodLeft
              {...this.props}
              currentCourseList={this.giveCurrentCourseList(courseList)}
            />
            <PeriodRight
              {...this.props}
              {...editProps}
              onConfirmDelete={this.onConfirmDelete}
              onCancelDelete={this.onCancelDelete}
            />
            <PeriodCreate
              {...this.props}
              onClickCreate={this.props.onClickCreate}
              visible={this.props.state.createView}
            />
            <PeriodEdit
              {...this.props}
              id={this.state.currentPeriodID}
              onClickEdit={this.props.onClickEdit}
              visible={this.props.state.editView}
              {...editProps}
            />

            {periodData === {} &&
              !this.props.loadingPeriodGET &&
              !this.props.loadingPeriodPOST && (
                <>
                  <br />
                  <span>학기가 등록 되어있지 않습니다.</span>
                  <span>위 상단에 "새로 만들기" 버튼을 눌러보세요</span>
                </>
              )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Period;
