import React from "react";
import CourseItem from "../items/CourseItem";
import StaffItem from "../items/StaffItem";
import BodyContentLeft from "../BodyContentLeft";
import LeftSection from "../LeftSection";

export default function StudentLeft(props) {
  const profileImage =
    props.studentData.profileImage !== null
      ? props.studentData.profileImage
      : undefined;

  // console.log(profileImage);
  const courseData = props.studentData.course[0];
  const staff = courseData.staff;
  // console.log(props.studentData);
  return (
    <BodyContentLeft data={props.courseList} profileImage={profileImage}>
      <div className="content-left-current">
        <LeftSection title="강의">
          <CourseItem
            studentList={props.studentList}
            courseData={props.studentData.course[0]}
          />
        </LeftSection>

        <LeftSection title="담임">
          <StaffItem staffData={staff} />
        </LeftSection>
      </div>
    </BodyContentLeft>
  );
}
