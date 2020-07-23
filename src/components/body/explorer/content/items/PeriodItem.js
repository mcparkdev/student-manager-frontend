import React from "react";
import { Progress } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default function PeriodItem(props) {
  // console.log(props);
  const name = props.periodData.name;
  const totalCourses = props.courseList.length;
  const totalStaffs = props.staffList.length;
  const totalStudents = props.studentList.length;
  // const payedStudents = props.studentList.filter(
  //   (student) => student.payedCourse
  // ).length;
  // const payedRatio =
  //   totalStudents !== 0 ? Math.round((payedStudents / totalStudents) * 100) : 0;
  const endDate = moment(props.periodData.endDate, "YYYY-MM-DD");
  const startDate = moment(props.periodData.startDate, "YYYY-MM-DD");
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

  // const progress = endDate.diff(now, "weeks") >= 0
  //   ? now.diff(startDate,"weeks") > 0 ? endDate.diff(now, "weeks") :
  // console.log(now / 1000 / 3600, "weeks");
  return (
    <div className="current-section-item">
      <NavLink exact to={`/periods/${props.periodData.id}`}>
        <div className="current-section-item-title">{name}</div>
        <div className="current-section-item-content">
          <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              강의 수: <span>{totalCourses} 개</span>
            </div>
          </div>
          <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              강사 수: <span>{totalStaffs} 명</span>
            </div>
          </div>
          <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              학생 수: <span>{totalStudents} 명</span>
            </div>
          </div>
          {/* <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              납부현황:{" "}
              <span>
                {payedStudents}/{totalStudents}
              </span>
            </div>
            <Progress percent={payedRatio} status="active" size="small" />
          </div> */}
          <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              학기기간:{" "}
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
