import React from "react";
import { Progress } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default function StaffItem(props) {
  const giveStudentListByCourse = (courseID) => {
    return props.studentList !== undefined
      ? props.studentList.filter((student) => {
          return (
            student.course.filter((studentCourse) => {
              return courseID === studentCourse.id;
            }).length > 0
          );
        })
      : [];
  };
  const giveCurrentCourseListByStaff = (staff, period) => {
    return staff.course !== undefined && period !== undefined
      ? staff.course
          .filter((course) => {
            return course.period.id === period.id;
          })
          .map((course) => {
            return {
              ...course,
              studentList: giveStudentListByCourse(course.id),
            };
          })
      : [];
  };
  const sortedPeriodList =
    props.periodList !== undefined &&
    props.periodList
      .map((period) => {
        return {
          ...period,
          sortDate: new Date(period.startDate),
        };
      })
      .sort((a, b) => b.sortDate - a.sortDate);
  const currentPeriod = sortedPeriodList[0];
  console.log(currentPeriod);
  const name = props.staffData.name;
  const courseList = giveCurrentCourseListByStaff(
    props.staffData,
    currentPeriod
  );
  const courseName = courseList.map((course) => course.name).join(", ");
  const totalStudents = courseList
    .map((course) => course.studentList.length)
    .reduce((a, b) => a + b, 0);
  const payedStudents = courseList
    .map((course) => {
      return course.studentList.filter((student) => student.payedCourse).length;
    })
    .reduce((a, b) => a + b, 0);
  const payedRatio =
    totalStudents !== 0 ? (payedStudents / totalStudents) * 100 : 0;

  const endDate =
    currentPeriod !== undefined
      ? moment(currentPeriod.endDate, "YYYY-MM-DD")
      : moment();
  const startDate =
    currentPeriod !== undefined
      ? moment(currentPeriod.startDate, "YYYY-MM-DD")
      : moment();
  const now = moment();
  let progress = 0;
  const totalWeeks = endDate.diff(startDate, "weeks") + 1;
  const diff = now.diff(startDate, "weeks") + 1;
  if (diff > 0) {
    if (diff <= totalWeeks) progress = diff;
    else progress = totalWeeks;
  }
  console.log(progress);
  const progressRatio = (progress / totalWeeks) * 100;
  return (
    <div className="current-section-item">
      <NavLink exact to={`/staffs/${props.staffData.id}`}>
        <div className="current-section-item-title">{name}</div>
        <div className="current-section-item-content">
          <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              강의명: <span>{courseName}</span>
            </div>
          </div>
          <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              학생 수: <span>{totalStudents} 명</span>
            </div>
          </div>
          <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              납부현황:{" "}
              <span>
                {payedStudents}/{totalStudents}
              </span>
            </div>
            <Progress percent={payedRatio} status="active" size="small" />
          </div>
          <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              진도:{" "}
              <span>
                {progress}/{totalWeeks}
              </span>
            </div>
            <Progress percent={progressRatio} status="active" size="small" />
          </div>
        </div>
      </NavLink>
    </div>
  );
}
