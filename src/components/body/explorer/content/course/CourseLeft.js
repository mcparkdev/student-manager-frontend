import React from "react";
// import PeriodCurrentItem from "./PeriodCurrentItem";
import BodyContentLeft from "../BodyContentLeft";
import LeftSection from "../LeftSection";
import StudentItem from "../items/StudentItem";
import StaffItem from "../items/StaffItem";
export default function CourseLeft(props) {
  // console.log(props);
  return (
    <BodyContentLeft data={props.periodList}>
      <div className="content-left-current">
        <LeftSection title="담임">
          <StaffItem staffData={props.staffData} />
        </LeftSection>
        <LeftSection title="학생목록">
          {props.courseData.studentList.map((student, index) => {
            return <StudentItem key={index} studentData={student} />;
          })}
        </LeftSection>
      </div>
    </BodyContentLeft>
  );
}
