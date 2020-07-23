import React from "react";
import BaseRouter from "../routes";

export default function ContentBody(props) {
  return (
    <div className="content-body">
      {props.studentList[0] !== undefined &&
        props.courseList[0] !== undefined &&
        props.staffList[0] !== undefined &&
        props.periodList[0] !== undefined && <BaseRouter {...props} />}
    </div>
  );
}
