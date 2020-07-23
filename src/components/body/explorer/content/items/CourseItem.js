import React from "react";
import { Progress } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default function CourseItem(props) {
  const course = props.courseData;
  const name = course.name;
  const totalStudents = course.studentList.length;
  const payedStudents = course.studentList.filter(
    (student) => student.payedCourse
  ).length;
  const payedRatio =
    totalStudents !== 0 ? Math.round((payedStudents / totalStudents) * 100) : 0;
  const endDate = moment(course.period.endDate, "YYYY-MM-DD");
  const startDate = moment(course.period.startDate, "YYYY-MM-DD");
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
      <NavLink exact to={`/courses/${course.id}`}>
        <div className="current-section-item-title">{name}</div>
        <div className="current-section-item-contentcourse.">
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
