import React from "react";
// import PeriodCurrentItem from "./PeriodCurrentItem";
import BodyContentLeft from "../BodyContentLeft";
import LeftSection from "../LeftSection";
import CourseItem from "../items/CourseItem";

export default function PeriodLeft(props) {
  // console.log(props);
  return (
    <BodyContentLeft data={props.periodList}>
      <div className="content-left-current">
        <LeftSection title="강의">
          {props.currentCourseList.map((course, index) => {
            return (
              <CourseItem
                key={index}
                studentList={course.studentList}
                staffList={course.staffList}
                courseData={course}
              />
            );
          })}
        </LeftSection>
      </div>
    </BodyContentLeft>
  );
}
