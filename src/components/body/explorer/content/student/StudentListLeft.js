import React from "react";
import StudentItem from "../items/StudentItem";
import BodyContentLeft from "../BodyContentLeft";
import LeftSection from "../LeftSection";

export default function StaffListLeft(props) {
  const studentList = props.currentStudentList;
  return (
    <BodyContentLeft data={studentList}>
      <div className="content-left-current">
        <LeftSection title="학생">
          {studentList.map((student, index) => {
            return <StudentItem {...props} key={index} studentData={student} />;
          })}
        </LeftSection>
      </div>
    </BodyContentLeft>
  );
}
