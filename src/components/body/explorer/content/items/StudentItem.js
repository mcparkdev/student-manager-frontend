import React from "react";
// import { Progress } from "antd";
import PayTag from "../../../PayTag";
import { NavLink } from "react-router-dom";

export default function StudentItem(props) {
  const student = props.studentData;
  const firstName = student.firstName;
  const lastName = student.lastName;
  const courseName =
    student.course[0] !== undefined ? student.course[0].name : "없음";
  const payedCourse = student.payedCourse;
  return (
    <div className="current-section-item">
      <NavLink exact to={`/students/${props.studentData.id}`}>
        <div className="current-section-item-title">{firstName}</div>
        <div className="current-section-item-title">{lastName}</div>
        <div className="current-section-item-content">
          <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              <PayTag payedCourse={payedCourse} />
            </div>
          </div>
          <div className="current-section-item-content-inline">
            <div className="current-section-item-content-inline-text">
              수업: <span>{courseName}</span>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
